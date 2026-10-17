"use client";

import { useState } from "react";
import ActionsResultat from "@/components/ActionsResultat";
import ZoneTexte from "@/components/ZoneTexte";

type Role = "recevoir" | "payer";

const euros = (n: number) =>
  new Intl.NumberFormat("fr-BE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export default function Negociation() {
  const [role, setRole] = useState<Role>("recevoir");
  const [objet, setObjet] = useState("");
  const [objectif, setObjectif] = useState(50000);
  const [seuil, setSeuil] = useState(38000);
  const [seuilAutre, setSeuilAutre] = useState(42000);
  const [repli, setRepli] = useState("");
  const [repliAutre, setRepliAutre] = useState("");
  const [criteres, setCriteres] = useState("");
  const [donner, setDonner] = useState("");
  const [obtenir, setObtenir] = useState("");

  const recevoir = role === "recevoir";
  // Zone d'accord possible : entre mon seuil et celui de l'autre, s'ils se recouvrent.
  const bas = recevoir ? seuil : seuilAutre;
  const haut = recevoir ? seuilAutre : seuil;
  const zone = haut >= bas;
  const ecart = Math.abs(objectif - seuil);
  const pas = [0.5, 0.3, 0.2];
  let courant = objectif;
  const concessions = pas.map((p, i) => {
    courant = recevoir ? courant - ecart * p : courant + ecart * p;
    return { etape: i + 2, montant: Math.round(courant) };
  });
  const coherent = recevoir ? objectif >= seuil : objectif <= seuil;

  const texte = [
    "PLAN DE NÉGOCIATION — Resolvia",
    `Objet : ${objet || "[objet]"}`,
    `Position : ${recevoir ? "je réclame ou je vends" : "je paie ou j'achète"}`,
    "",
    `Objectif : ${euros(objectif)}`,
    `Mon seuil : ${euros(seuil)}`,
    `Seuil estimé de l'autre partie : ${euros(seuilAutre)}`,
    zone ? `Zone d'accord possible : de ${euros(bas)} à ${euros(haut)}` : "Pas de zone d'accord en l'état des hypothèses.",
    "",
    "MA SOLUTION DE REPLI SANS ACCORD",
    repli || "—",
    "",
    "LA SOLUTION DE REPLI ESTIMÉE DE L'AUTRE PARTIE",
    repliAutre || "—",
    "",
    "CRITÈRES OBJECTIFS À INVOQUER",
    criteres || "—",
    "",
    "CE QUE JE PEUX DONNER (me coûte peu, vaut pour l'autre)",
    donner || "—",
    "",
    "CE QUE JE PEUX OBTENIR (compte pour moi, coûte peu à l'autre)",
    obtenir || "—",
    "",
    "CONCESSIONS PRÉVUES",
    `1. Première proposition : ${euros(objectif)}`,
    ...concessions.map((c) => `${c.etape}. ${euros(c.montant)}`),
  ].join("\n");

  // Échelle de la frise des montants.
  const valeurs = [objectif, seuil, seuilAutre];
  const min = Math.min(...valeurs) * 0.9;
  const max = Math.max(...valeurs) * 1.1;
  const pos = (x: number) => ((x - min) / (max - min || 1)) * 100;

  return (
    <div>
      <div className="carte" style={{ marginBottom: 16 }}>
        <h2>1. La négociation</h2>
        <div className="champ">
          <label htmlFor="objet">Objet</label>
          <input id="objet" type="text" value={objet} onChange={(e) => setObjet(e.target.value)} placeholder="Ex. : solde du chantier, prix de cession, indemnité" />
        </div>
        <div className="grille-2">
          <label className={`choix-option ${recevoir ? "choisi" : ""}`}>
            <input type="radio" name="role" checked={recevoir} onChange={() => setRole("recevoir")} />
            <span><strong>Je réclame ou je vends</strong><small>Je cherche à obtenir le montant le plus élevé.</small></span>
          </label>
          <label className={`choix-option ${!recevoir ? "choisi" : ""}`}>
            <input type="radio" name="role" checked={!recevoir} onChange={() => setRole("payer")} />
            <span><strong>Je paie ou j&apos;achète</strong><small>Je cherche à payer le montant le plus bas.</small></span>
          </label>
        </div>
      </div>

      <div className="grille-2">
        <div className="carte">
          <h2>2. Mon côté</h2>
          <Montant l="Mon objectif (ce que je vise)" v={objectif} f={setObjectif} />
          <Montant l={recevoir ? "Mon seuil (en dessous, je préfère ma solution de repli)" : "Mon seuil (au-dessus, je préfère ma solution de repli)"} v={seuil} f={setSeuil} />
          {!coherent && <p className="erreur">L&apos;objectif devrait être plus {recevoir ? "élevé" : "bas"} que le seuil.</p>}
          <div className="champ">
            <label>Ma solution de repli sans accord</label>
            <ZoneTexte value={repli} onChange={setRepli} placeholder="Que ferai-je concrètement si nous ne trouvons pas d'accord ? Quel coût, quel délai, quel risque ?" />
          </div>
        </div>
        <div className="carte">
          <h2>3. L&apos;autre partie</h2>
          <Montant l={recevoir ? "Son seuil estimé (le maximum qu'elle accepterait)" : "Son seuil estimé (le minimum qu'elle accepterait)"} v={seuilAutre} f={setSeuilAutre} />
          <div className="champ">
            <label>Sa solution de repli, selon vous</label>
            <ZoneTexte value={repliAutre} onChange={setRepliAutre} placeholder="Que fera-t-elle sans accord ? Est-ce vraiment meilleur pour elle ?" />
          </div>
        </div>
      </div>

      <div className="carte section resultat">
        <p className="surtitre">Zone d&apos;accord possible</p>
        <h2>{zone ? `Un accord est possible entre ${euros(bas)} et ${euros(haut)}` : "Pas de zone d'accord en l'état de vos hypothèses"}</h2>
        <div className="zone-negociation" aria-hidden>
          <div className="zn-ligne" />
          {zone && <div className="zn-zone" style={{ left: `${pos(bas)}%`, width: `${pos(haut) - pos(bas)}%` }} />}
          <Repere x={pos(objectif)} libelle="Mon objectif" classe="objectif" />
          <Repere x={pos(seuil)} libelle="Mon seuil" classe="seuil" />
          <Repere x={pos(seuilAutre)} libelle="Seuil de l'autre" classe="autre" bas />
        </div>
        <p className="note" style={{ marginTop: 50 }}>
          {zone
            ? "Votre objectif se situe en dehors de cette zone ? C'est normal : il sert d'ancrage. Préparez des arguments pour justifier chaque proposition."
            : "Avant de renoncer : vérifiez votre estimation du seuil de l'autre partie, élargissez la discussion à d'autres éléments que le prix (délais, garanties, prestations, relation future), ou faites appel à un médiateur."}
        </p>
      </div>

      <div className="grille-2 section">
        <div className="carte">
          <h3>Monnaies d&apos;échange</h3>
          <div className="champ">
            <label>Ce que je peux donner : me coûte peu, vaut pour l&apos;autre</label>
            <ZoneTexte value={donner} onChange={setDonner} placeholder="Délai de paiement, garantie, publicité, exclusivité, service après-vente…" />
          </div>
          <div className="champ">
            <label>Ce que je peux obtenir : compte pour moi, coûte peu à l&apos;autre</label>
            <ZoneTexte value={obtenir} onChange={setObtenir} placeholder="Calendrier, référence, renonciation à une réclamation, discrétion…" />
          </div>
        </div>
        <div className="carte">
          <h3>Critères objectifs</h3>
          <p className="note">Prix de marché, devis comparables, barèmes, rapports : ce qui permet de justifier une proposition sans en faire une question d&apos;ego.</p>
          <ZoneTexte value={criteres} onChange={setCriteres} lignes={4} />
          <h3 style={{ marginTop: 16 }}>Concessions prévues</h3>
          <p className="note">Des concessions de plus en plus petites signalent que l&apos;on approche de sa limite.</p>
          <ol className="liste">
            <li>Première proposition : <strong>{euros(objectif)}</strong></li>
            {concessions.map((c) => <li key={c.etape}>{euros(c.montant)}</li>)}
          </ol>
        </div>
      </div>

      <div className="encadre info section">
        <strong>Rappel :</strong> une négociation se gagne surtout avant la table. Connaître sa solution de repli, celle
        de l&apos;autre et ce qui compte vraiment pour chacun permet d&apos;accepter un bon accord, et de refuser un
        mauvais. Si la négociation se bloque, un médiateur neutre peut prendre le relais.
      </div>

      <ActionsResultat texte={texte} libelleCopie="Copier le plan" />
    </div>
  );
}

function Montant({ l, v, f }: { l: string; v: number; f: (n: number) => void }) {
  return (
    <div className="champ">
      <label>
        {l}
        <input type="number" inputMode="decimal" min={0} step={500} value={v} onChange={(e) => f(Number(e.target.value) || 0)} style={{ marginTop: 6 }} />
      </label>
    </div>
  );
}

function Repere({ x, libelle, classe, bas }: { x: number; libelle: string; classe: string; bas?: boolean }) {
  return (
    <div className={`zn-repere zn-${classe} ${bas ? "zn-bas" : ""}`} style={{ left: `${x}%` }}>
      <span>{libelle}</span>
    </div>
  );
}
