"use client";

import { useMemo, useState } from "react";
import {
  BLOCS,
  QUESTIONS,
  QUESTIONS_COMMUNES,
  TYPES,
  verdict,
  type Option,
  type TypeDossier,
} from "./contenu";

type Reponses = Record<string, number>;
type Partie = "A" | "B";
type Phase = "debut" | "questions" | "relais" | "resultat";

// Aucune donnée n'est enregistrée : tout vit dans la mémoire de la page.
// Pour combiner deux tests remplis séparément, chaque partie obtient un « code de réponse »
// (ses choix encodés en chiffres, sans aucun nom ni texte libre) à transmettre à l'autre.
const PREFIXE = "RM1";

function encoder(type: TypeDossier, r: Reponses) {
  const t = TYPES.findIndex((x) => x.id === type);
  return `${PREFIXE}-${t}-${QUESTIONS.map((q) => r[q.id] ?? "x").join("")}`;
}

function decoder(code: string): { type: TypeDossier; reponses: Reponses } | null {
  const m = code.trim().toUpperCase().match(/^RM1-(\d+)-([0-9]+)$/);
  if (!m || m[2].length !== QUESTIONS.length) return null;
  const type = TYPES[Number(m[1])]?.id;
  if (!type) return null;
  const reponses: Reponses = {};
  for (let i = 0; i < QUESTIONS.length; i++) {
    const v = Number(m[2][i]);
    if (v >= QUESTIONS[i].options.length) return null;
    reponses[QUESTIONS[i].id] = v;
  }
  return { type, reponses };
}

export default function TestMediabilite() {
  const [type, setType] = useState<TypeDossier | null>(null);
  const [mode, setMode] = useState<"seul" | "deux">("seul");
  const [phase, setPhase] = useState<Phase>("debut");
  const [bloc, setBloc] = useState(0);
  const [partie, setPartie] = useState<Partie>("A");
  const [reps, setReps] = useState<Record<Partie, Reponses>>({ A: {}, B: {} });
  const [codeSaisi, setCodeSaisi] = useState("");
  const [erreurCode, setErreurCode] = useState("");
  const [copie, setCopie] = useState<string | null>(null);

  const complet = (r: Reponses) => QUESTIONS.every((q) => r[q.id] !== undefined);
  const deuxParties = complet(reps.A) && complet(reps.B);
  const resA = useMemo(() => calculer(reps.A), [reps.A]);
  const resB = useMemo(() => calculer(reps.B), [reps.B]);

  function haut() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function demarrer(p: Partie) {
    setPartie(p);
    setBloc(0);
    setPhase("questions");
    haut();
  }
  function suivant() {
    if (bloc < BLOCS.length - 1) {
      setBloc(bloc + 1);
    } else if (partie === "A" && mode === "deux") {
      setPhase("relais");
    } else {
      setPhase("resultat");
    }
    haut();
  }
  function precedent() {
    if (bloc > 0) setBloc(bloc - 1);
    else if (partie === "B") setPhase("relais");
    else setPhase("debut");
    haut();
  }
  function importer() {
    const d = decoder(codeSaisi);
    if (!d) {
      setErreurCode("Ce code n'est pas reconnu. Vérifiez qu'il a été copié en entier.");
      return;
    }
    if (d.type !== type) {
      setErreurCode("Ce code correspond à un autre type de dossier.");
      return;
    }
    setReps((x) => ({ ...x, B: d.reponses }));
    setErreurCode("");
    setCodeSaisi("");
    setPhase("resultat");
    haut();
  }
  function recommencer() {
    setType(null);
    setMode("seul");
    setReps({ A: {}, B: {} });
    setPhase("debut");
    setCopie(null);
  }
  async function copier(id: string, texte: string) {
    try {
      await navigator.clipboard.writeText(texte);
      setCopie(id);
      setTimeout(() => setCopie(null), 2500);
    } catch {
      /* indisponible */
    }
  }

  const nomPartie = (p: Partie) => (p === "A" ? "Première partie" : "Autre partie");

  // ---------- Début : type de dossier et mode ----------
  if (phase === "debut") {
    return (
      <div>
        <div className="carte">
          <h2>De quel type de dossier s&apos;agit-il ?</h2>
          <p className="note">Ce choix adapte les questions à poser en fin de test.</p>
          <div className="choix">
            {TYPES.map((t) => (
              <label key={t.id} className={`choix-option ${type === t.id ? "choisi" : ""}`}>
                <input type="radio" name="type" checked={type === t.id} onChange={() => setType(t.id)} />
                <span><strong>{t.libelle}</strong><small>{t.exemple}</small></span>
              </label>
            ))}
          </div>

          <h2 style={{ marginTop: 28 }}>Qui répond ?</h2>
          <p className="note">
            Une médiation réunit au moins deux parties, et elle ne peut avoir lieu que si chacune y adhère. Le
            résultat est donc plus fiable lorsque les deux parties, ou leurs conseils, répondent.
          </p>
          <div className="choix">
            <label className={`choix-option ${mode === "seul" ? "choisi" : ""}`}>
              <input type="radio" name="mode" checked={mode === "seul"} onChange={() => setMode("seul")} />
              <span><strong>Une seule partie</strong><small>Vous répondez pour vous ou pour votre client, et vous estimez la position de l&apos;autre partie. Résultat provisoire.</small></span>
            </label>
            <label className={`choix-option ${mode === "deux" ? "choisi" : ""}`}>
              <input type="radio" name="mode" checked={mode === "deux"} onChange={() => setMode("deux")} />
              <span><strong>Les deux parties</strong><small>Chaque partie répond de son côté, ici à tour de rôle ou séparément grâce à un code de réponse à se transmettre.</small></span>
            </label>
          </div>

          <p className="note" style={{ marginTop: 12 }}>
            Pour une séparation ou des questions liées aux enfants, une médiation familiale spécifique existe ; ce test
            vise les litiges civils et commerciaux.
          </p>
          <div className="actions">
            <span />
            <button className="bouton" disabled={!type} onClick={() => demarrer("A")}>Commencer</button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Questions ----------
  if (phase === "questions") {
    const b = BLOCS[bloc];
    const r = reps[partie];
    const qs = QUESTIONS.filter((q) => q.bloc === b.id);
    const ok = qs.every((q) => r[q.id] !== undefined);
    const avance = ((partie === "B" ? BLOCS.length : 0) + bloc) / (BLOCS.length * (mode === "deux" ? 2 : 1));
    return (
      <div>
        <div className="progression" aria-hidden><div style={{ width: `${avance * 100}%` }} /></div>
        <div className="carte">
          <p className="surtitre">
            {mode === "deux" ? `${nomPartie(partie)} · ` : ""}Étape {bloc + 1} sur {BLOCS.length}
          </p>
          <h2>{b.titre}</h2>
          <p className="note">{b.intro}</p>
          {qs.map((q, i) => (
            <fieldset key={q.id} className="question">
              <legend><span className="num">{i + 1}</span>{q.texte}</legend>
              <p className="aide">{q.aide}</p>
              <div className="choix">
                {q.options.map((o, idx) => (
                  <label key={idx} className={`choix-option ${r[q.id] === idx ? "choisi" : ""}`}>
                    <input
                      type="radio"
                      name={`${partie}-${q.id}`}
                      checked={r[q.id] === idx}
                      onChange={() => setReps((x) => ({ ...x, [partie]: { ...x[partie], [q.id]: idx } }))}
                    />
                    <span>{o.libelle}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <div className="actions">
            <button className="bouton discret" onClick={precedent}>← Retour</button>
            <button className="bouton" disabled={!ok} onClick={suivant}>
              {bloc < BLOCS.length - 1 ? "Continuer" : partie === "A" && mode === "deux" ? "Passer à l'autre partie" : "Voir le résultat"}
            </button>
          </div>
          {!ok && <p className="note" style={{ textAlign: "right", margin: "8px 0 0" }}>Répondez à toutes les questions pour continuer.</p>}
        </div>
      </div>
    );
  }

  // ---------- Relais vers l'autre partie ----------
  if (phase === "relais") {
    const code = encoder(type!, reps.A);
    return (
      <div>
        <div className="carte">
          <p className="surtitre">À l&apos;autre partie</p>
          <h2>Les réponses de la première partie sont enregistrées dans cette page</h2>
          <p>Deux possibilités pour obtenir celles de l&apos;autre partie :</p>

          <div className="grille-2">
            <div className="encadre info">
              <h3>Répondre ici, à tour de rôle</h3>
              <p>Si l&apos;autre partie, ou son conseil, est à vos côtés, elle répond maintenant sur cet appareil.</p>
              <button className="bouton" onClick={() => demarrer("B")}>L&apos;autre partie répond</button>
            </div>
            <div className="encadre info">
              <h3>Combiner avec un test fait ailleurs</h3>
              <p>Si l&apos;autre partie a rempli le test de son côté, collez ici son code de réponse.</p>
              <div className="champ">
                <label htmlFor="code-b">Code de réponse de l&apos;autre partie</label>
                <input id="code-b" type="text" placeholder="RM1-…" value={codeSaisi} onChange={(e) => setCodeSaisi(e.target.value)} />
              </div>
              {erreurCode && <p className="erreur">{erreurCode}</p>}
              <button className="bouton secondaire" disabled={!codeSaisi.trim()} onClick={importer}>Combiner</button>
            </div>
          </div>

          <div className="carte" style={{ marginTop: 16, background: "var(--fond)" }}>
            <h3>Le code de réponse de la première partie</h3>
            <p className="note">À transmettre à l&apos;autre partie si c&apos;est elle qui combine les résultats. Il ne contient que les choix, sous forme de chiffres : aucun nom, aucun texte.</p>
            <code className="code-reponse">{code}</code>
            <div style={{ marginTop: 10 }}>
              <button className="bouton secondaire" onClick={() => copier("codeA", code)}>{copie === "codeA" ? "Code copié ✓" : "Copier le code"}</button>
            </div>
          </div>

          <div className="actions">
            <button className="bouton discret" onClick={() => { setPartie("A"); setBloc(BLOCS.length - 1); setPhase("questions"); }}>← Revoir mes réponses</button>
            <button className="bouton discret" onClick={() => { setPhase("resultat"); haut(); }}>Voir le résultat provisoire</button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Résultat ----------
  const combine = deuxParties;
  const pourcentage = combine ? Math.min(resA.pourcentage, resB.pourcentage) : resA.pourcentage;
  const contre = unique([...resA.contre, ...(combine ? resB.contre : [])]);
  const attention = unique([...resA.attention, ...(combine ? resB.attention : [])]);
  const atouts = combine ? resA.atouts.filter((a) => resB.atouts.includes(a)) : resA.atouts;
  const vigilances = unique([...resA.notesVigilance, ...(combine ? resB.notesVigilance : [])]).length;
  const v = verdict(pourcentage, contre.length > 0, vigilances);
  const typeInfo = TYPES.find((t) => t.id === type)!;
  const questionsClient = [...typeInfo.questionsClient, ...QUESTIONS_COMMUNES];
  const ecarts = combine
    ? BLOCS.map((b, i) => ({ titre: b.titre, a: resA.parBloc[i].pourcentage, b: resB.parBloc[i].pourcentage })).filter((x) => Math.abs(x.a - x.b) >= 30)
    : [];
  const codeA = encoder(type!, reps.A);

  const synthese = [
    "TEST DE MÉDIABILITÉ — Resolvia",
    `Type de dossier : ${typeInfo.libelle}`,
    combine
      ? `Résultat (deux parties) : ${v.titre} — ${pourcentage} % (première partie ${resA.pourcentage} %, autre partie ${resB.pourcentage} %)`
      : `Résultat provisoire (une seule partie) : ${v.titre} — ${pourcentage} %`,
    ...(ecarts.length ? ["", "ÉCARTS DE PERCEPTION", ...ecarts.map((e) => `- ${e.titre} : ${e.a} % / ${e.b} %`)] : []),
    ...(contre.length ? ["", "CONTRE-INDICATIONS À EXAMINER", ...contre.map((x) => `- ${x}`)] : []),
    ...(attention.length ? ["", "POINTS D'ATTENTION", ...attention.map((x) => `- ${x}`)] : []),
    ...(atouts.length ? ["", combine ? "ATOUTS PARTAGÉS" : "ATOUTS DU DOSSIER", ...atouts.map((x) => `- ${x}`)] : []),
    "",
    "QUESTIONS À POSER",
    ...questionsClient.map((x) => `- ${x}`),
    "",
    "PROCHAINE ÉTAPE SUGGÉRÉE",
    v.etape,
    "",
    "Résultat indicatif, ne remplace pas l'appréciation professionnelle.",
  ].join("\n");

  return (
    <div>
      {!combine && (
        <div className="encadre attention" style={{ marginBottom: 16 }}>
          <strong>Résultat provisoire.</strong> Il repose sur les réponses d&apos;une seule partie, qui estime la position
          de l&apos;autre. Une médiation ne peut avoir lieu que si les deux parties y adhèrent : pour un résultat complet,
          faites compléter le test par l&apos;autre partie ou son conseil.
          <div style={{ marginTop: 10 }} className="non-imprime">
            <button className="bouton secondaire" onClick={() => { setMode("deux"); setPhase("relais"); haut(); }}>Ajouter les réponses de l&apos;autre partie</button>
          </div>
        </div>
      )}

      <div className={`carte resultat niveau-${v.niveau}`}>
        <p className="surtitre">Résultat · {typeInfo.libelle}{combine ? " · deux parties" : ""}</p>
        <h2 style={{ fontSize: "1.6rem" }}>{v.titre}</h2>
        <Jauge valeur={pourcentage} niveau={v.niveau} />
        <p>{v.texte}</p>
        {combine && (
          <p className="note">
            L&apos;indice retenu est celui de la partie la moins disposée ({pourcentage} %) : une médiation avance au rythme
            de celui qui y croit le moins.
          </p>
        )}

        {combine ? (
          <div className="defile">
            <table className="tableau">
              <thead><tr><th>Dimension</th><th>Première partie</th><th>Autre partie</th></tr></thead>
              <tbody>
                {BLOCS.map((b, i) => (
                  <tr key={b.id}>
                    <td><strong>{b.titre}</strong></td>
                    <td><BarreMini v={resA.parBloc[i].pourcentage} /></td>
                    <td><BarreMini v={resB.parBloc[i].pourcentage} /></td>
                  </tr>
                ))}
                <tr><td><strong>Ensemble</strong></td><td><strong>{resA.pourcentage} %</strong></td><td><strong>{resB.pourcentage} %</strong></td></tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="blocs-scores">
            {resA.parBloc.map((b) => (
              <div key={b.id}>
                <div className="bloc-ligne"><span>{b.titre}</span><span className="note">{b.pourcentage} %</span></div>
                <div className="barre"><div style={{ width: `${b.pourcentage}%` }} /></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {ecarts.length > 0 && (
        <Liste
          titre="Les parties ne voient pas la situation de la même manière"
          classe="attention"
          items={ecarts.map((e) => `${e.titre} : ${e.a} % pour la première partie, ${e.b} % pour l'autre. C'est un sujet à aborder dès les entretiens préalables.`)}
        />
      )}
      {contre.length > 0 && <Liste titre="Contre-indications à examiner" classe="alerte" items={contre} />}
      {attention.length > 0 && <Liste titre="Points d'attention" classe="attention" items={attention} />}
      {atouts.length > 0 && <Liste titre={combine ? "Atouts reconnus par les deux parties" : "Atouts du dossier"} classe="info" items={atouts} />}

      <div className="carte section">
        <h3>Questions à poser</h3>
        <ul className="liste">{questionsClient.map((q) => <li key={q}>{q}</li>)}</ul>
      </div>

      <div className="carte section">
        <h3>Prochaine étape suggérée</h3>
        <p style={{ margin: 0 }}>{v.etape}</p>
      </div>

      {!combine && (
        <div className="carte section non-imprime">
          <h3>Votre code de réponse</h3>
          <p className="note">Transmettez-le à l&apos;autre partie ou à son conseil : en le collant dans son propre test, elle obtiendra le résultat combiné. Il ne contient aucun nom ni texte.</p>
          <code className="code-reponse">{codeA}</code>
          <div style={{ marginTop: 10 }}>
            <button className="bouton secondaire" onClick={() => copier("code", codeA)}>{copie === "code" ? "Code copié ✓" : "Copier le code"}</button>
          </div>
        </div>
      )}

      <p className="note section">
        Résultat indicatif, établi à partir des seules réponses saisies. Il ne remplace ni l&apos;appréciation
        professionnelle ni l&apos;analyse d&apos;un médiateur. Aucune réponse n&apos;a été enregistrée.
      </p>

      <div className="actions non-imprime">
        <button className="bouton discret" onClick={() => { setPartie("A"); setBloc(BLOCS.length - 1); setPhase("questions"); }}>← Modifier les réponses</button>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className="bouton secondaire" onClick={() => copier("synthese", synthese)}>{copie === "synthese" ? "Synthèse copiée ✓" : "Copier la synthèse"}</button>
          <button className="bouton secondaire" onClick={() => window.print()}>Imprimer</button>
          <button className="bouton" onClick={recommencer}>Nouveau test</button>
        </div>
      </div>
    </div>
  );
}

// ---------- Calcul ----------
function calculer(reponses: Reponses) {
  let total = 0;
  let max = 0;
  const atouts: string[] = [];
  const attention: string[] = [];
  const contre: string[] = [];
  const notesVigilance: string[] = [];

  const parBloc = BLOCS.map((b) => {
    let t = 0;
    let m = 0;
    for (const q of QUESTIONS.filter((q) => q.bloc === b.id)) {
      m += 3;
      const idx = reponses[q.id];
      if (idx === undefined) continue;
      const o: Option = q.options[idx];
      t += o.points;
      if (o.note) {
        if (o.drapeau === "contre") contre.push(o.note);
        else if (o.drapeau === "vigilance") {
          attention.push(o.note);
          notesVigilance.push(o.note);
        } else if (o.points === 3) atouts.push(o.note);
        else attention.push(o.note);
      }
    }
    total += t;
    max += m;
    return { id: b.id, titre: b.titre, pourcentage: m ? Math.round((t / m) * 100) : 0 };
  });

  return { pourcentage: max ? Math.round((total / max) * 100) : 0, parBloc, atouts, attention, contre, notesVigilance };
}

const unique = (l: string[]) => Array.from(new Set(l));

// ---------- Petits composants ----------
function Jauge({ valeur, niveau }: { valeur: number; niveau: string }) {
  return (
    <div className="jauge" role="img" aria-label={`Indice de médiabilité : ${valeur} sur 100`}>
      <div className={`jauge-rempli niveau-${niveau}`} style={{ width: `${valeur}%` }} />
      <span className="jauge-valeur">{valeur}<small> / 100</small></span>
    </div>
  );
}

function BarreMini({ v }: { v: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 120 }}>
      <div className="barre" style={{ flex: 1 }}><div style={{ width: `${v}%` }} /></div>
      <span className="note" style={{ width: 48, textAlign: "right", whiteSpace: "nowrap" }}>{v} %</span>
    </div>
  );
}

function Liste({ titre, classe, items }: { titre: string; classe: string; items: string[] }) {
  return (
    <div className={`encadre ${classe} section`}>
      <h3>{titre}</h3>
      <ul className="liste" style={{ margin: 0 }}>{items.map((i) => <li key={i}>{i}</li>)}</ul>
    </div>
  );
}
