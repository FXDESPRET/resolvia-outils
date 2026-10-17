"use client";

import { useMemo, useState } from "react";
import ActionsResultat from "@/components/ActionsResultat";
import FriseTemps, { formatMois } from "@/components/FriseTemps";

// VALEURS D'EXEMPLE — à remplacer par celles de la société.
const DEFAUTS = {
  montant: 250000,
  probabilite: 40,
  fraisDefense: 45000,
  dureeLitige: 30,
  dureeMediation: 4,
  coutMediation: 12000,
  heuresDirectionMois: 12,
  coutHeureDirection: 150,
  tauxAnnuel: 5,
  operation: true,
  delaiOperation: 18,
  prixOperation: 3000000,
  partSequestre: 10,
};
type Valeurs = typeof DEFAUTS;

const euros = (n: number) =>
  new Intl.NumberFormat("fr-BE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export default function Valeur() {
  const [v, setV] = useState<Valeurs>(DEFAUTS);
  const maj = (k: keyof Valeurs) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setV((x) => ({ ...x, [k]: e.target.type === "checkbox" ? e.target.checked : Number(e.target.value) || 0 }));

  const r = useMemo(() => {
    const risque = v.montant * (v.probabilite / 100);
    const direction = (m: number) => v.heuresDirectionMois * v.coutHeureDirection * m;
    const tempsArgent = (m: number) => risque * (v.tauxAnnuel / 100) * (m / 12);
    const litige = { frais: v.fraisDefense, direction: direction(v.dureeLitige), temps: tempsArgent(v.dureeLitige) };
    const mediation = { frais: v.coutMediation, direction: direction(v.dureeMediation), temps: tempsArgent(v.dureeMediation) };
    const total = (x: typeof litige) => x.frais + x.direction + x.temps;
    const ouvertLitige = v.operation && v.dureeLitige > v.delaiOperation;
    const ouvertMediation = v.operation && v.dureeMediation > v.delaiOperation;
    const sequestre = v.prixOperation * (v.partSequestre / 100);
    return { risque, litige, mediation, totalLitige: total(litige), totalMediation: total(mediation), ouvertLitige, ouvertMediation, sequestre };
  }, [v]);

  const texte = [
    "LITIGE ET VALEUR DE L'ENTREPRISE — Resolvia",
    `Montant en jeu ${euros(v.montant)}, risque estimé ${v.probabilite} % : exposition de ${euros(r.risque)}.`,
    "",
    `Litige mené à son terme (${formatMois(v.dureeLitige)}) : ${euros(r.totalLitige)} de coûts indirects et de frais`,
    `Médiation (${formatMois(v.dureeMediation)}) : ${euros(r.totalMediation)}`,
    ...(v.operation
      ? ["", `Opération prévue dans ${formatMois(v.delaiOperation)} : ${r.ouvertLitige ? `le litige serait encore ouvert ; garantie ou séquestre possible d'environ ${euros(r.sequestre)}` : "le litige serait clos"}.`]
      : []),
    "",
    "Estimation indicative ; le traitement comptable du litige est à vérifier avec l'expert-comptable ou le réviseur.",
  ].join("\n");

  return (
    <div>
      <div className="encadre attention" style={{ marginBottom: 20 }}>
        Toutes les valeurs proposées sont des <strong>exemples</strong>. Le traitement comptable d&apos;un litige
        (provision, mention dans les comptes) relève de l&apos;expert-comptable ou du réviseur de la société.
      </div>

      <div className="grille-2">
        <fieldset className="carte" style={{ margin: 0 }}>
          <legend className="etiquette" style={{ padding: "0 6px" }}>Le litige</legend>
          <Champ l="Montant en jeu (€)" v={v.montant} f={maj("montant")} />
          <Champ l="Risque estimé de perdre (%)" a="Selon l'appréciation de l'avocat" v={v.probabilite} f={maj("probabilite")} />
          <Champ l="Frais de défense jusqu'au terme (€)" a="Avocats, expertises, conseils techniques" v={v.fraisDefense} f={maj("fraisDefense")} />
          <Champ l="Durée jusqu'à une décision définitive (mois)" v={v.dureeLitige} f={maj("dureeLitige")} />
        </fieldset>
        <fieldset className="carte" style={{ margin: 0 }}>
          <legend className="etiquette" style={{ padding: "0 6px" }}>La société</legend>
          <Champ l="Heures de direction mobilisées par mois" a="Dirigeants, administrateurs, cadres" v={v.heuresDirectionMois} f={maj("heuresDirectionMois")} />
          <Champ l="Coût d'une heure de direction (€)" v={v.coutHeureDirection} f={maj("coutHeureDirection")} />
          <Champ l="Coût de l'argent immobilisé (% par an)" v={v.tauxAnnuel} f={maj("tauxAnnuel")} />
          <div className="grille-3">
            <Champ l="Médiation : durée (mois)" v={v.dureeMediation} f={maj("dureeMediation")} />
            <Champ l="Médiation : coût (€)" v={v.coutMediation} f={maj("coutMediation")} />
          </div>
        </fieldset>
      </div>

      <div className="carte section">
        <label className="choix-option" style={{ marginBottom: 12 }}>
          <input type="checkbox" checked={v.operation} onChange={maj("operation")} />
          <span><strong>Une opération est prévue</strong><small>Cession, levée de fonds, entrée d&apos;un investisseur, transmission</small></span>
        </label>
        {v.operation && (
          <div className="grille-3">
            <Champ l="Dans combien de mois ?" v={v.delaiOperation} f={maj("delaiOperation")} />
            <Champ l="Prix ou montant de l'opération (€)" v={v.prixOperation} f={maj("prixOperation")} />
            <Champ l="Part bloquée en garantie ou séquestre (%)" a="Pratique fréquente face à un litige ouvert" v={v.partSequestre} f={maj("partSequestre")} />
          </div>
        )}
      </div>

      <div className="carte section resultat">
        <p className="surtitre">Ce que le litige coûte à la société</p>
        <h2>Exposition de {euros(r.risque)}, et {euros(r.totalLitige - r.totalMediation)} de coûts évitables</h2>
        <div className="tuiles">
          <div className="tuile"><p className="etiquette">Exposition (risque × montant)</p><p className="chiffre">{euros(r.risque)}</p><p className="note" style={{ margin: 0 }}>ordre de grandeur d&apos;une provision</p></div>
          <div className="tuile"><p className="etiquette">Temps de direction</p><p className="chiffre">{euros(r.litige.direction)}</p><p className="note" style={{ margin: 0 }}>contre {euros(r.mediation.direction)} en médiation</p></div>
          <div className="tuile"><p className="etiquette">Frais de défense</p><p className="chiffre">{euros(r.litige.frais)}</p><p className="note" style={{ margin: 0 }}>contre {euros(r.mediation.frais)} en médiation</p></div>
          <div className="tuile"><p className="etiquette">Coût de l&apos;incertitude</p><p className="chiffre">{euros(r.litige.temps)}</p><p className="note" style={{ margin: 0 }}>exposition immobilisée pendant {formatMois(v.dureeLitige)}</p></div>
        </div>

        <FriseTemps
          scenarios={[
            { nom: "Médiation", segments: [{ libelle: "Médiation", mois: v.dureeMediation, couleur: "var(--vert)" }] },
            { nom: "Litige", segments: [{ libelle: "Procédure", mois: v.dureeLitige, couleur: "var(--sauge-fonce)" }] },
            ...(v.operation ? [{ nom: "Opération prévue", segments: [{ libelle: "Jusqu'à l'opération", mois: v.delaiOperation, couleur: "var(--or)" }] }] : []),
          ]}
        />

        {v.operation && (
          <div className={`encadre ${r.ouvertLitige ? "alerte" : "info"}`} style={{ marginTop: 12 }}>
            {r.ouvertLitige ? (
              <>
                <strong>Le litige serait encore ouvert au moment de l&apos;opération.</strong> Un acquéreur ou un
                investisseur en tiendra compte : décote, garantie spécifique ou séquestre, ici de l&apos;ordre de{" "}
                {euros(r.sequestre)}. {r.ouvertMediation ? "" : "Une médiation menée maintenant permettrait d'arriver à l'opération avec un litige clos."}
              </>
            ) : (
              <>Dans ces hypothèses, le litige serait clos avant l&apos;opération.</>
            )}
          </div>
        )}
      </div>

      <p className="note section">Estimation indicative fondée sur les seules hypothèses saisies.</p>
      <ActionsResultat texte={texte} libelleCopie="Copier l'analyse">
        <button type="button" className="bouton discret" onClick={() => setV(DEFAUTS)}>Revenir aux valeurs d&apos;exemple</button>
      </ActionsResultat>
    </div>
  );
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
