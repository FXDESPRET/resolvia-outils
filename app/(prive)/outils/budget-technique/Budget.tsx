"use client";

import { useMemo, useState } from "react";
import ActionsResultat from "@/components/ActionsResultat";
import FriseTemps, { formatMois } from "@/components/FriseTemps";
import { SAPITEURS, type SapiteurId } from "@/lib/construction";

// VALEURS D'EXEMPLE — à remplacer par des tarifs réels (FX / Amandine).
const DEFAUTS = {
  tva: true,
  parties: 2,
  // Voie amiable
  coMediation: true,
  tauxMediateur: 150,
  seances: 3,
  heuresSeance: 3,
  heuresHorsSeance: 4,
  tauxExpert: 100,
  heuresExpertAmiable: 12,
  fraisExpert: 150,
  heuresAvocatAmiable: 6,
  moisAmiable: 4,
  // Voie judiciaire
  heuresExpertJudiciaire: 30,
  fraisExpertJudiciaire: 400,
  heuresAvocatJudiciaire: 35,
  fraisProcedure: 1500,
  moisAvantExpertise: 3,
  moisExpertise: 12,
  attenteAudienceMois: 10,
  moisProcedure: 6,
  montantEnJeu: 40000,
  tauxAnnuel: 4,
  tauxAvocat: 150,
};
type Valeurs = typeof DEFAUTS;

const euros = (n: number) =>
  new Intl.NumberFormat("fr-BE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export default function Budget() {
  const [v, setV] = useState<Valeurs>(DEFAUTS);
  const [sap, setSap] = useState<Partial<Record<SapiteurId, number>>>({
    "labo-eau": milieu("labo-eau"),
    "recherche-fuite": milieu("recherche-fuite"),
  });

  const maj = (k: keyof Valeurs) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setV((x) => ({ ...x, [k]: e.target.type === "checkbox" ? e.target.checked : Number(e.target.value) || 0 }));

  const r = useMemo(() => calculer(v, sap), [v, sap]);
  const dureeJud = v.moisAvantExpertise + v.moisExpertise + v.attenteAudienceMois + v.moisProcedure;
  const coutTemps = (m: number) => v.montantEnJeu * (v.tauxAnnuel / 100) * (m / 12);
  const max = Math.max(r.amiable.total, r.judiciaire.total, 1);

  const texte = [
    "BUDGET DE RÉSOLUTION TECHNIQUE — Resolvia",
    `Montants ${v.tva ? "TVA comprise" : "hors TVA"}, ${v.parties} parties, valeurs à confirmer.`,
    "",
    `Temps gagné par la voie amiable : ${formatMois(Math.max(0, dureeJud - v.moisAmiable))}`,
    "",
    `VOIE AMIABLE (${v.coMediation ? "co-médiation" : "médiation"} + expert commun) : ${euros(r.amiable.total)}, environ ${formatMois(v.moisAmiable)}`,
    ...r.amiable.lignes.map(([l, m]) => `  - ${l} : ${euros(m)}`),
    `  Par partie : environ ${euros(r.amiable.parPartie)}`,
    "",
    `VOIE JUDICIAIRE (expertise judiciaire + procédure) : ${euros(r.judiciaire.total)}, environ ${formatMois(dureeJud)}`,
    ...r.judiciaire.lignes.map(([l, m]) => `  - ${l} : ${euros(m)}`),
    "",
    "SAPITEURS RETENUS",
    ...(r.sapiteurs.length ? r.sapiteurs.map(([l, m]) => `- ${l} : ${euros(m)}`) : ["- aucun"]),
    "",
    "Ordre de grandeur indicatif, ni devis ni engagement d'honoraires.",
  ].join("\n");

  return (
    <div>
      <div className="encadre attention" style={{ marginBottom: 20 }}>
        Tous les montants sont des <strong>valeurs d&apos;exemple</strong> à remplacer par les tarifs réels du dossier.
        Le coût des sapiteurs est le même dans les deux voies ; ce qui change, c&apos;est qu&apos;en voie amiable ils
        sont choisis et payés ensemble, une seule fois.
      </div>

      <div className="carte" style={{ marginBottom: 16 }}>
        <h2>Analyses et sapiteurs</h2>
        <p className="note">Cochez les analyses utiles et ajustez leur coût. Les fourchettes indiquées sont des exemples.</p>
        <div className="choix">
          {(Object.keys(SAPITEURS) as SapiteurId[]).map((id) => {
            const s = SAPITEURS[id];
            const actif = sap[id] !== undefined;
            return (
              <div key={id} className={`choix-option ${actif ? "choisi" : ""}`} style={{ alignItems: "center", flexWrap: "wrap" }}>
                <input
                  type="checkbox"
                  aria-label={s.titre}
                  checked={actif}
                  onChange={(e) => setSap((x) => {
                    const n = { ...x };
                    if (e.target.checked) n[id] = milieu(id); else delete n[id];
                    return n;
                  })}
                />
                <span style={{ flex: "1 1 260px" }}>
                  <strong>{s.titre}</strong>
                  <small>{s.usage} Exemple : {euros(s.coutMin)} à {euros(s.coutMax)}.</small>
                </span>
                {actif && (
                  <input
                    type="number"
                    min={0}
                    step={50}
                    aria-label={`Coût ${s.titre}`}
                    value={sap[id]}
                    onChange={(e) => setSap((x) => ({ ...x, [id]: Number(e.target.value) || 0 }))}
                    style={{ width: 120 }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grille-2">
        <fieldset className="carte" style={{ margin: 0 }}>
          <legend className="etiquette" style={{ padding: "0 6px" }}>Voie amiable</legend>
          <label className="choix-option" style={{ marginBottom: 12 }}>
            <input type="checkbox" checked={v.coMediation} onChange={maj("coMediation")} />
            <span><strong>Co-médiation</strong><small>Un médiateur juriste et un médiateur technicien</small></span>
          </label>
          <Champ l="Taux horaire par médiateur (€ HTVA)" v={v.tauxMediateur} f={maj("tauxMediateur")} />
          <div className="grille-3">
            <Champ l="Séances" v={v.seances} f={maj("seances")} />
            <Champ l="Heures par séance" v={v.heuresSeance} f={maj("heuresSeance")} />
          </div>
          <Champ l="Heures hors séance (par médiateur)" v={v.heuresHorsSeance} f={maj("heuresHorsSeance")} />
          <div className="grille-3">
            <Champ l="Expert commun : taux (€)" v={v.tauxExpert} f={maj("tauxExpert")} />
            <Champ l="Expert : heures" v={v.heuresExpertAmiable} f={maj("heuresExpertAmiable")} />
          </div>
          <Champ l="Frais de l'expert (déplacements, matériel)" v={v.fraisExpert} f={maj("fraisExpert")} />
          <Champ l="Heures d'avocat par partie" v={v.heuresAvocatAmiable} f={maj("heuresAvocatAmiable")} />
          <Champ l="Durée estimée (mois)" v={v.moisAmiable} f={maj("moisAmiable")} />
        </fieldset>

        <fieldset className="carte" style={{ margin: 0 }}>
          <legend className="etiquette" style={{ padding: "0 6px" }}>Voie judiciaire</legend>
          <Champ l="Expert judiciaire : heures" a="Réunions contradictoires, notes de synthèse, rapport" v={v.heuresExpertJudiciaire} f={maj("heuresExpertJudiciaire")} />
          <Champ l="Frais de l'expert judiciaire" v={v.fraisExpertJudiciaire} f={maj("fraisExpertJudiciaire")} />
          <Champ l="Heures d'avocat par partie" a="Expertise et procédure au fond" v={v.heuresAvocatJudiciaire} f={maj("heuresAvocatJudiciaire")} />
          <Champ l="Frais de procédure (global)" v={v.fraisProcedure} f={maj("fraisProcedure")} />
          <p className="etiquette" style={{ marginTop: 6 }}>Durées</p>
          <div className="grille-3">
            <Champ l="Avant l'expertise (mois)" a="Citation, désignation de l'expert" v={v.moisAvantExpertise} f={maj("moisAvantExpertise")} />
            <Champ l="Expertise (mois)" v={v.moisExpertise} f={maj("moisExpertise")} />
            <Champ l="Attente d'audience (mois)" a="Arriéré des juridictions" v={v.attenteAudienceMois} f={maj("attenteAudienceMois")} />
            <Champ l="Plaidoiries et jugement (mois)" v={v.moisProcedure} f={maj("moisProcedure")} />
          </div>
        </fieldset>
      </div>

      <div className="carte section">
        <div className="grille-3">
          <Champ l="Nombre de parties" v={v.parties} f={maj("parties")} />
          <Champ l="Taux horaire des avocats (€ HTVA)" v={v.tauxAvocat} f={maj("tauxAvocat")} />
          <Champ l="Montant en jeu (€)" a="Travaux, solde, indemnités disputés" v={v.montantEnJeu} f={maj("montantEnJeu")} />
          <Champ l="Taux annuel de référence (%)" a="Coût de l'argent bloqué" v={v.tauxAnnuel} f={maj("tauxAnnuel")} />
        </div>
        <label className="choix-option">
          <input type="checkbox" checked={v.tva} onChange={maj("tva")} />
          <span>Afficher les honoraires TVA comprise (21 %)</span>
        </label>
      </div>

      <div className="carte section resultat">
        <p className="surtitre">Comparaison pour l&apos;ensemble des parties</p>
        <h2>
          {dureeJud > v.moisAmiable
            ? `Une solution environ ${formatMois(dureeJud - v.moisAmiable)} plus tôt`
            : "Dans ces hypothèses, la voie amiable n'est pas plus rapide"}
        </h2>
        <div className="tuiles">
          <div className="tuile"><p className="etiquette">Temps gagné</p><p className="chiffre">{formatMois(Math.max(0, dureeJud - v.moisAmiable))}</p></div>
          <div className="tuile"><p className="etiquette">Économie directe</p><p className="chiffre">{euros(Math.max(0, r.judiciaire.total - r.amiable.total))}</p></div>
          <div className="tuile"><p className="etiquette">Coût du temps évité</p><p className="chiffre">{euros(Math.max(0, coutTemps(dureeJud) - coutTemps(v.moisAmiable)))}</p></div>
        </div>
        <FriseTemps
          scenarios={[
            { nom: "Voie amiable", segments: [{ libelle: v.coMediation ? "Co-médiation et constat commun" : "Médiation et constat commun", mois: v.moisAmiable, couleur: "var(--vert)" }] },
            {
              nom: "Voie judiciaire",
              segments: [
                { libelle: "Avant l'expertise", mois: v.moisAvantExpertise, couleur: "var(--sauge-clair)" },
                { libelle: "Expertise judiciaire", mois: v.moisExpertise, couleur: "var(--sauge-fonce)" },
                { libelle: "Attente d'audience", mois: v.attenteAudienceMois, couleur: "var(--ambre)" },
                { libelle: "Jugement", mois: v.moisProcedure, couleur: "var(--accent-fonce)" },
              ],
            },
          ]}
        />
        <p className="note">Pendant tout ce temps, les travaux de réparation attendent souvent la fin de l&apos;expertise, et le désordre peut s&apos;aggraver.</p>
        <h3 style={{ marginTop: 16 }}>Combien cela coûte-t-il, toutes parties confondues ?</h3>
        {[
          { nom: `Voie amiable · ${formatMois(v.moisAmiable)}`, d: r.amiable, c: "var(--vert)" },
          { nom: `Voie judiciaire · ${formatMois(dureeJud)}`, d: r.judiciaire, c: "var(--sauge-fonce)" },
        ].map((s) => (
          <div key={s.nom} style={{ marginTop: 16 }}>
            <div className="bloc-ligne"><span>{s.nom}</span><span>{euros(s.d.total)}</span></div>
            <div className="barre" style={{ height: 14 }}><div style={{ width: `${(s.d.total / max) * 100}%`, background: s.c }} /></div>
            <p className="note" style={{ margin: "4px 0 0" }}>{s.d.lignes.map(([l, m]) => `${l} ${euros(m)}`).join(" · ")}</p>
          </div>
        ))}
        <div className="encadre info" style={{ marginTop: 16 }}>
          <strong>Par partie, en voie amiable :</strong> environ {euros(r.amiable.parPartie)} (part des frais communs + son
          propre avocat). En voie judiciaire, la provision d&apos;expertise est en général avancée par la partie
          demanderesse, et la charge finale dépend de l&apos;issue du procès.
        </div>
      </div>

      <p className="note section">Ordre de grandeur indicatif, établi sur vos seules hypothèses. Ni devis, ni engagement d&apos;honoraires.</p>
      <ActionsResultat texte={texte} libelleCopie="Copier le budget">
        <button type="button" className="bouton discret" onClick={() => setV(DEFAUTS)}>Revenir aux valeurs d&apos;exemple</button>
      </ActionsResultat>
    </div>
  );
}

function milieu(id: SapiteurId) {
  const s = SAPITEURS[id];
  return Math.round((s.coutMin + s.coutMax) / 2 / 50) * 50;
}

function calculer(v: Valeurs, sap: Partial<Record<SapiteurId, number>>) {
  const tva = v.tva ? 1.21 : 1;
  const n = Math.max(1, v.parties);
  const sapiteurs = (Object.entries(sap) as [SapiteurId, number][]).map(([id, m]) => [SAPITEURS[id].titre, m * tva] as [string, number]);
  const totalSap = sapiteurs.reduce((a, [, m]) => a + m, 0);

  const mediateurs = (v.coMediation ? 2 : 1) * (v.seances * v.heuresSeance + v.heuresHorsSeance) * v.tauxMediateur * tva;
  const expertAmiable = (v.heuresExpertAmiable * v.tauxExpert + v.fraisExpert) * tva;
  const avocatsAmiable = n * v.heuresAvocatAmiable * v.tauxAvocat * tva;
  const communsAmiable = mediateurs + expertAmiable + totalSap;

  const expertJud = (v.heuresExpertJudiciaire * v.tauxExpert + v.fraisExpertJudiciaire) * tva;
  const avocatsJud = n * v.heuresAvocatJudiciaire * v.tauxAvocat * tva;

  return {
    sapiteurs,
    amiable: {
      lignes: [
        [v.coMediation ? "Co-médiation" : "Médiation", mediateurs],
        ["Expert commun", expertAmiable],
        ["Sapiteurs", totalSap],
        ["Avocats", avocatsAmiable],
      ] as [string, number][],
      total: communsAmiable + avocatsAmiable,
      parPartie: communsAmiable / n + v.heuresAvocatAmiable * v.tauxAvocat * tva,
    },
    judiciaire: {
      lignes: [
        ["Expertise judiciaire", expertJud],
        ["Sapiteurs", totalSap],
        ["Avocats", avocatsJud],
        ["Frais de procédure", v.fraisProcedure],
      ] as [string, number][],
      total: expertJud + totalSap + avocatsJud + v.fraisProcedure,
    },
  };
}

function Champ({ l, a, v, f }: { l: string; a?: string; v: number; f: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="champ">
      <label>
        {l}
        <input type="number" inputMode="decimal" min={0} value={v} onChange={f} style={{ marginTop: 6 }} />
      </label>
      {a && <span className="aide-champ">{a}</span>}
    </div>
  );
}
