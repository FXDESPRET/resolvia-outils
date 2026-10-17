"use client";

import Link from "next/link";
import { useState } from "react";
import ActionsResultat from "@/components/ActionsResultat";
import { ACTEURS, OUVRAGES, PREUVES_GENERALES, SAPITEURS, type Ouvrage, type SapiteurId } from "@/lib/construction";

type Stade = "chantier" | "avant-reception" | "apres-provisoire" | "apres-definitive";
const STADES: Record<Stade, string> = {
  chantier: "Chantier en cours",
  "avant-reception": "Travaux terminés, pas encore réceptionnés",
  "apres-provisoire": "Après la réception provisoire",
  "apres-definitive": "Après la réception définitive",
};

type Anciennete = "moins1" | "1a2" | "2a10" | "plus10";
const ANCIENNETES: Record<Anciennete, string> = {
  moins1: "Moins d'un an",
  "1a2": "Un à deux ans",
  "2a10": "Deux à dix ans",
  plus10: "Plus de dix ans",
};

export default function Diagnostic() {
  const [ouvrageId, setOuvrageId] = useState<Ouvrage["id"] | null>(null);
  const [desordres, setDesordres] = useState<string[]>([]);
  const [stade, setStade] = useState<Stade | null>(null);
  const [anciennete, setAnciennete] = useState<Anciennete | null>(null);
  const [acteurs, setActeurs] = useState<string[]>(["maitre", "entrepreneur"]);
  const [aggravation, setAggravation] = useState(false);
  const [securite, setSecurite] = useState(false);
  const [solde, setSolde] = useState(false);
  const [relation, setRelation] = useState(false);
  const [contestes, setContestes] = useState(true);

  const ouvrage = OUVRAGES.find((o) => o.id === ouvrageId);
  const choisis = ouvrage?.desordres.filter((d) => desordres.includes(d.id)) ?? [];
  const pret = ouvrage && choisis.length > 0 && stade;
  const bascule = (l: string[], v: string) => (l.includes(v) ? l.filter((x) => x !== v) : [...l, v]);

  // ---------- Analyse ----------
  const sapiteurs = Array.from(new Set(choisis.flatMap((d) => d.sapiteurs))) as SapiteurId[];
  const questions = choisis.flatMap((d) => d.questions);
  const preuves = Array.from(new Set([...choisis.flatMap((d) => d.preuves), ...PREUVES_GENERALES]));
  const pieges = choisis.map((d) => d.piege).filter(Boolean) as string[];
  const nbActeurs = acteurs.length;

  const priorites: string[] = [];
  if (securite) priorites.push("Sécuriser les lieux sans attendre (accès, électricité, stabilité) et documenter ce qui est fait.");
  if (aggravation) priorites.push("Prendre les mesures conservatoires pour éviter l'aggravation, après avoir documenté l'état actuel ; en cas de désaccord sur ces mesures, envisager rapidement un constat contradictoire.");

  const voies: { titre: string; texte: string }[] = [];
  if (stade === "chantier" || relation)
    voies.push({
      titre: "Médiation technique rapide",
      texte: "La relation doit se poursuivre (chantier en cours, entretien, garantie) : une médiation courte, sur le chantier si possible, permet de traiter le désordre sans arrêter les travaux ni rompre la confiance.",
    });
  if (contestes)
    voies.push({
      titre: "Constat technique conjoint",
      texte: "Les causes sont contestées : plutôt que deux expertises unilatérales qui s'opposent, les parties désignent ensemble un expert, et au besoin des sapiteurs, dont les constats servent de base commune à la négociation.",
    });
  if (nbActeurs >= 3)
    voies.push({
      titre: "Médiation à plusieurs parties",
      texte: `${nbActeurs} intervenants sont concernés : réunir tous ceux qui peuvent contribuer à la solution, assureurs compris, évite que chacun renvoie la responsabilité vers un absent.`,
    });
  if (solde)
    voies.push({
      titre: "Traiter ensemble le désordre et le solde",
      texte: "Un solde de facture est retenu : la médiation peut lier le paiement à l'exécution des travaux de réparation, avec un calendrier et, si nécessaire, un compte bloqué.",
    });
  if (voies.length === 0)
    voies.push({
      titre: "Médiation classique",
      texte: "Les faits semblent peu contestés : une médiation centrée sur la solution (réparation, réduction de prix, calendrier) peut suffire, sans expertise préalable.",
    });

  const vigilance: string[] = [];
  if (stade === "apres-definitive" || anciennete === "2a10" || anciennete === "plus10")
    vigilance.push("Délais : selon la nature du désordre et la date de réception, certaines garanties ou actions peuvent être limitées dans le temps. À vérifier sans tarder avec un avocat, avant d'engager une démarche amiable longue.");
  if (stade === "avant-reception")
    vigilance.push("Absence de réception : la réception et les réserves éventuelles sont un enjeu en soi ; à clarifier dans la discussion.");
  if (acteurs.includes("assureur"))
    vigilance.push("Assureurs : les associer tôt, car un accord sans leur adhésion risque de ne pas être financé.");
  if (acteurs.includes("sous-traitant") || acteurs.includes("fournisseur"))
    vigilance.push("Chaîne contractuelle : le maître d'ouvrage n'a souvent de contrat qu'avec l'entrepreneur ; inviter les sous-traitants et fournisseurs facilite une répartition réaliste.");

  const texte = pret
    ? [
        "DIAGNOSTIC D'UN LITIGE DE CONSTRUCTION — Resolvia",
        `Ouvrage : ${ouvrage!.titre}`,
        `Désordres : ${choisis.map((d) => d.titre).join(", ")}`,
        `Stade : ${STADES[stade!]}${anciennete ? `, apparu depuis : ${ANCIENNETES[anciennete].toLowerCase()}` : ""}`,
        `Intervenants : ${ACTEURS.filter((a) => acteurs.includes(a.id)).map((a) => a.libelle).join(", ")}`,
        "",
        ...(priorites.length ? ["PRIORITÉS", ...priorites.map((x) => `- ${x}`), ""] : []),
        "VOIES À PRIVILÉGIER",
        ...voies.map((v) => `- ${v.titre} : ${v.texte}`),
        "",
        ...(vigilance.length ? ["VIGILANCE", ...vigilance.map((x) => `- ${x}`), ""] : []),
        "QUESTIONS TECHNIQUES CLÉS",
        ...questions.map((q) => `- ${q}`),
        "",
        "ANALYSES ET SAPITEURS POSSIBLES",
        ...sapiteurs.map((s) => `- ${SAPITEURS[s].titre} : ${SAPITEURS[s].usage}`),
        "",
        "PREUVES À RASSEMBLER",
        ...preuves.map((p) => `- ${p}`),
        "",
        "Diagnostic indicatif, qui ne remplace ni une expertise ni un avis juridique.",
      ].join("\n")
    : "";

  return (
    <div>
      <div className="carte" style={{ marginBottom: 16 }}>
        <h2>1. L&apos;ouvrage concerné</h2>
        <div className="grille-3">
          {OUVRAGES.map((o) => (
            <label key={o.id} className={`choix-option ${ouvrageId === o.id ? "choisi" : ""}`}>
              <input type="radio" name="ouvrage" checked={ouvrageId === o.id} onChange={() => { setOuvrageId(o.id); setDesordres([]); }} />
              <span><strong>{o.titre}</strong></span>
            </label>
          ))}
        </div>
      </div>

      {ouvrage && (
        <div className="carte" style={{ marginBottom: 16 }}>
          <h2>2. Le ou les désordres</h2>
          <p className="note">{ouvrage.intro}</p>
          <div className="choix">
            {ouvrage.desordres.map((d) => (
              <label key={d.id} className={`choix-option ${desordres.includes(d.id) ? "choisi" : ""}`}>
                <input type="checkbox" checked={desordres.includes(d.id)} onChange={() => setDesordres((l) => bascule(l, d.id))} />
                <span><strong>{d.titre}</strong><small>{d.signes}</small></span>
              </label>
            ))}
          </div>
        </div>
      )}

      {ouvrage && (
        <div className="carte" style={{ marginBottom: 16 }}>
          <h2>3. Le calendrier</h2>
          <div className="grille-2">
            <div>
              <p className="etiquette">Stade des travaux</p>
              <div className="choix">
                {(Object.keys(STADES) as Stade[]).map((s) => (
                  <label key={s} className={`choix-option ${stade === s ? "choisi" : ""}`}>
                    <input type="radio" name="stade" checked={stade === s} onChange={() => setStade(s)} />
                    <span>{STADES[s]}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="etiquette">Le désordre est apparu depuis</p>
              <div className="choix">
                {(Object.keys(ANCIENNETES) as Anciennete[]).map((a) => (
                  <label key={a} className={`choix-option ${anciennete === a ? "choisi" : ""}`}>
                    <input type="radio" name="anciennete" checked={anciennete === a} onChange={() => setAnciennete(a)} />
                    <span>{ANCIENNETES[a]}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {ouvrage && (
        <div className="carte" style={{ marginBottom: 16 }}>
          <h2>4. Les intervenants et les enjeux</h2>
          <p className="etiquette">Qui est concerné ?</p>
          <div className="grille-2" style={{ marginBottom: 16 }}>
            {ACTEURS.map((a) => (
              <label key={a.id} className={`choix-option ${acteurs.includes(a.id) ? "choisi" : ""}`}>
                <input type="checkbox" checked={acteurs.includes(a.id)} onChange={() => setActeurs((l) => bascule(l, a.id))} />
                <span>{a.libelle}</span>
              </label>
            ))}
          </div>
          <p className="etiquette">La situation</p>
          <div className="choix">
            {[
              { v: contestes, set: setContestes, t: "Les causes du désordre sont contestées entre les parties" },
              { v: aggravation, set: setAggravation, t: "Le désordre risque de s'aggraver (eau, gel, terrain)" },
              { v: securite, set: setSecurite, t: "Il existe un risque pour la sécurité des personnes" },
              { v: solde, set: setSolde, t: "Un solde de facture est retenu ou contesté" },
              { v: relation, set: setRelation, t: "La relation doit se poursuivre (garantie, entretien, autres travaux)" },
            ].map((x) => (
              <label key={x.t} className={`choix-option ${x.v ? "choisi" : ""}`}>
                <input type="checkbox" checked={x.v} onChange={(e) => x.set(e.target.checked)} />
                <span>{x.t}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {pret ? (
        <>
          <div className="carte resultat section">
            <p className="surtitre">Diagnostic · {ouvrage!.titre}</p>
            <h2>Voie à privilégier : {voies[0].titre.toLowerCase()}</h2>
            {voies.length > 1 && <p className="note">À combiner avec : {voies.slice(1).map((v) => v.titre.toLowerCase()).join(" ; ")}.</p>}
            {priorites.length > 0 && (
              <div className="encadre alerte" style={{ marginBottom: 14 }}>
                <h3>D&apos;abord</h3>
                <ul className="liste">{priorites.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            )}
            <ul className="liste">
              {voies.map((v) => <li key={v.titre}><strong>{v.titre}.</strong> {v.texte}</li>)}
            </ul>
          </div>

          {vigilance.length > 0 && (
            <div className="encadre attention section">
              <h3>Points de vigilance</h3>
              <ul className="liste">{vigilance.map((v) => <li key={v}>{v}</li>)}</ul>
            </div>
          )}

          <div className="grille-2 section">
            <div className="carte">
              <h3>Questions techniques clés</h3>
              <ul className="liste">{questions.map((q) => <li key={q}>{q}</li>)}</ul>
            </div>
            <div className="carte">
              <h3>Analyses et sapiteurs possibles</h3>
              <ul className="liste">
                {sapiteurs.map((s) => <li key={s}><strong>{SAPITEURS[s].titre}</strong> — <span className="note">{SAPITEURS[s].usage}</span></li>)}
              </ul>
              <p className="note non-imprime" style={{ margin: "10px 0 0" }}>
                Estimer leur coût : <Link href="/outils/budget-technique">budget de résolution technique</Link>.
              </p>
            </div>
          </div>

          <div className="carte section">
            <h3>Preuves à rassembler dès maintenant</h3>
            <ul className="cases">{preuves.map((p) => <li key={p}>{p}</li>)}</ul>
            {pieges.length > 0 && (
              <div className="encadre info" style={{ marginTop: 12 }}>
                <h3>À savoir</h3>
                <ul className="liste">{pieges.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            )}
          </div>

          <p className="note section">Diagnostic indicatif, établi à partir de vos seules réponses. Il ne remplace ni une expertise technique ni un avis juridique.</p>
          <ActionsResultat texte={texte} libelleCopie="Copier le diagnostic" />
        </>
      ) : (
        <p className="note section">Le diagnostic s&apos;affiche dès que l&apos;ouvrage, au moins un désordre et le stade des travaux sont indiqués.</p>
      )}
    </div>
  );
}
