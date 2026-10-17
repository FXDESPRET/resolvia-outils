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

// Aucune donnée n'est enregistrée : tout vit dans la mémoire de la page
// et disparaît à la fermeture de l'onglet.
export default function TestMediabilite() {
  const [type, setType] = useState<TypeDossier | null>(null);
  const [etape, setEtape] = useState(0); // 0 = type de dossier, 1..4 = blocs, 5 = résultat
  const [reponses, setReponses] = useState<Reponses>({});
  const [copie, setCopie] = useState(false);

  const nbEtapes = BLOCS.length + 1;
  const blocCourant = etape >= 1 && etape <= BLOCS.length ? BLOCS[etape - 1] : null;
  const questionsBloc = blocCourant ? QUESTIONS.filter((q) => q.bloc === blocCourant.id) : [];
  const blocComplet = questionsBloc.every((q) => reponses[q.id] !== undefined);

  const resultat = useMemo(() => calculer(reponses), [reponses]);

  function aller(n: number) {
    setEtape(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function recommencer() {
    setType(null);
    setReponses({});
    setCopie(false);
    aller(0);
  }

  // ---------- Écran 0 : type de dossier ----------
  if (etape === 0) {
    return (
      <div>
        <Progression etape={0} total={nbEtapes} />
        <div className="carte">
          <h2>De quel type de dossier s&apos;agit-il ?</h2>
          <p className="note">Ce choix adapte les questions à poser à votre client en fin de test.</p>
          <div className="choix">
            {TYPES.map((t) => (
              <label key={t.id} className={`choix-option ${type === t.id ? "choisi" : ""}`}>
                <input type="radio" name="type" checked={type === t.id} onChange={() => setType(t.id)} />
                <span>
                  <strong>{t.libelle}</strong>
                  <small>{t.exemple}</small>
                </span>
              </label>
            ))}
          </div>
          <p className="note" style={{ marginTop: 12 }}>
            Pour une séparation ou des questions liées aux enfants, une médiation familiale spécifique existe ; ce test
            vise les litiges civils et commerciaux.
          </p>
          <div className="actions">
            <span />
            <button className="bouton" disabled={!type} onClick={() => aller(1)}>
              Commencer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Écrans 1 à 4 : questions ----------
  if (blocCourant) {
    return (
      <div>
        <Progression etape={etape} total={nbEtapes} />
        <div className="carte">
          <p className="surtitre">
            Étape {etape} sur {BLOCS.length}
          </p>
          <h2>{blocCourant.titre}</h2>
          <p className="note">{blocCourant.intro}</p>

          {questionsBloc.map((q, i) => (
            <fieldset key={q.id} className="question">
              <legend>
                <span className="num">{i + 1}</span>
                {q.texte}
              </legend>
              <p className="aide">{q.aide}</p>
              <div className="choix">
                {q.options.map((o, idx) => (
                  <label key={idx} className={`choix-option ${reponses[q.id] === idx ? "choisi" : ""}`}>
                    <input
                      type="radio"
                      name={q.id}
                      checked={reponses[q.id] === idx}
                      onChange={() => setReponses((r) => ({ ...r, [q.id]: idx }))}
                    />
                    <span>{o.libelle}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}

          <div className="actions">
            <button className="bouton discret" onClick={() => aller(etape - 1)}>
              ← Retour
            </button>
            <button className="bouton" disabled={!blocComplet} onClick={() => aller(etape + 1)}>
              {etape === BLOCS.length ? "Voir le résultat" : "Continuer"}
            </button>
          </div>
          {!blocComplet && <p className="note" style={{ textAlign: "right", margin: "8px 0 0" }}>Répondez à toutes les questions pour continuer.</p>}
        </div>
      </div>
    );
  }

  // ---------- Écran 5 : résultat ----------
  const v = verdict(resultat.pourcentage, resultat.contre.length > 0, resultat.vigilances);
  const typeInfo = TYPES.find((t) => t.id === type)!;
  const questionsClient = [...typeInfo.questionsClient, ...QUESTIONS_COMMUNES];
  const synthese = texteSynthese(typeInfo.libelle, v.titre, resultat, questionsClient, v.etape);

  async function copier() {
    try {
      await navigator.clipboard.writeText(synthese);
      setCopie(true);
      setTimeout(() => setCopie(false), 2500);
    } catch {
      /* presse-papiers indisponible */
    }
  }

  return (
    <div>
      <div className={`carte resultat niveau-${v.niveau}`}>
        <p className="surtitre">Résultat · {typeInfo.libelle}</p>
        <h2 style={{ fontSize: "1.6rem" }}>{v.titre}</h2>
        <Jauge valeur={resultat.pourcentage} niveau={v.niveau} />
        <p>{v.texte}</p>

        <div className="blocs-scores">
          {resultat.parBloc.map((b) => (
            <div key={b.id}>
              <div className="bloc-ligne">
                <span>{b.titre}</span>
                <span className="note">{b.pourcentage} %</span>
              </div>
              <div className="barre"><div style={{ width: `${b.pourcentage}%` }} /></div>
            </div>
          ))}
        </div>
      </div>

      {resultat.contre.length > 0 && (
        <Liste titre="Contre-indications à examiner" classe="alerte" items={resultat.contre} />
      )}
      {resultat.attention.length > 0 && (
        <Liste titre="Points d'attention" classe="attention" items={resultat.attention} />
      )}
      {resultat.atouts.length > 0 && <Liste titre="Atouts du dossier" classe="info" items={resultat.atouts} />}

      <div className="carte section">
        <h3>Questions à poser à votre client</h3>
        <ul className="liste">
          {questionsClient.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      </div>

      <div className="carte section">
        <h3>Prochaine étape suggérée</h3>
        <p style={{ margin: 0 }}>{v.etape}</p>
      </div>

      <p className="note section">
        Résultat indicatif, établi à partir de vos seules réponses. Il ne remplace ni votre appréciation professionnelle
        ni l&apos;analyse d&apos;un médiateur. Aucune réponse n&apos;a été enregistrée.
      </p>

      <div className="actions non-imprime">
        <button className="bouton discret" onClick={() => aller(BLOCS.length)}>
          ← Modifier mes réponses
        </button>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className="bouton secondaire" onClick={copier}>
            {copie ? "Synthèse copiée ✓" : "Copier la synthèse"}
          </button>
          <button className="bouton secondaire" onClick={() => window.print()}>
            Imprimer
          </button>
          <button className="bouton" onClick={recommencer}>
            Nouveau test
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Calcul ----------
function calculer(reponses: Reponses) {
  let total = 0;
  let max = 0;
  let vigilances = 0;
  const atouts: string[] = [];
  const attention: string[] = [];
  const contre: string[] = [];

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
          vigilances++;
        }
        else if (o.points === 3) atouts.push(o.note);
        else attention.push(o.note);
      }
    }
    total += t;
    max += m;
    return { id: b.id, titre: b.titre, pourcentage: m ? Math.round((t / m) * 100) : 0 };
  });

  return {
    pourcentage: max ? Math.round((total / max) * 100) : 0,
    parBloc,
    atouts,
    attention,
    contre,
    vigilances,
  };
}

function texteSynthese(
  type: string,
  titre: string,
  r: ReturnType<typeof calculer>,
  questions: string[],
  etape: string,
) {
  const l: string[] = [
    "TEST DE MÉDIABILITÉ — Resolvia",
    `Type de dossier : ${type}`,
    `Résultat : ${titre} (${r.pourcentage} %)`,
    "",
    ...r.parBloc.map((b) => `- ${b.titre} : ${b.pourcentage} %`),
  ];
  const section = (t: string, items: string[]) => {
    if (items.length) l.push("", t.toUpperCase(), ...items.map((i) => `- ${i}`));
  };
  section("Contre-indications à examiner", r.contre);
  section("Points d'attention", r.attention);
  section("Atouts du dossier", r.atouts);
  section("Questions à poser au client", questions);
  l.push("", "PROCHAINE ÉTAPE SUGGÉRÉE", etape, "", "Résultat indicatif, ne remplace pas l'appréciation professionnelle.");
  return l.join("\n");
}

// ---------- Petits composants ----------
function Progression({ etape, total }: { etape: number; total: number }) {
  return (
    <div className="progression" aria-hidden>
      <div style={{ width: `${(etape / total) * 100}%` }} />
    </div>
  );
}

function Jauge({ valeur, niveau }: { valeur: number; niveau: string }) {
  return (
    <div className="jauge" role="img" aria-label={`Indice de médiabilité : ${valeur} sur 100`}>
      <div className={`jauge-rempli niveau-${niveau}`} style={{ width: `${valeur}%` }} />
      <span className="jauge-valeur">{valeur}<small> / 100</small></span>
    </div>
  );
}

function Liste({ titre, classe, items }: { titre: string; classe: string; items: string[] }) {
  return (
    <div className={`encadre ${classe} section`}>
      <h3>{titre}</h3>
      <ul className="liste" style={{ margin: 0 }}>
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
