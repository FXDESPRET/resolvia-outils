import CadreOutil from "@/components/CadreOutil";

export const metadata = { title: "Offres et biographies" };

const OFFRES = [
  {
    titre: "Médiation commerciale",
    pour: "Entreprises en litige avec un client, un fournisseur, un partenaire ou un sous-traitant.",
    comment: "Entretiens préalables, puis séances communes avec les décideurs et leurs conseils. Accord rédigé et, si souhaité, homologué.",
    plus: "Préserver une relation d'affaires et trouver des solutions qu'un jugement ne permet pas.",
  },
  {
    titre: "Successions et patrimoine familial",
    pour: "Héritiers, indivisaires et familles en désaccord sur un partage, un bien ou une entreprise familiale.",
    comment: "Travail en lien avec le notaire et les avocats, entretiens individuels, réunions familiales encadrées.",
    plus: "Sortir de l'impasse en tenant compte de la valeur affective des biens, et préserver les liens familiaux.",
  },
  {
    titre: "Associés et gouvernance",
    pour: "Associés et actionnaires en désaccord sur la stratégie, les rôles, la rémunération ou la sortie de l'un d'eux.",
    comment: "Diagnostic de la relation, séances de médiation, et si besoin construction d'un pacte de désaccord.",
    plus: "Protéger la société pendant le conflit et organiser, le cas échéant, une séparation négociée.",
  },
  {
    titre: "Ateliers pour prescripteurs",
    pour: "Cabinets d'avocats, études notariales, experts-comptables, conseils d'entreprise.",
    comment: "Ateliers courts sur la médiabilité des dossiers, la rédaction des clauses et l'accompagnement du client en médiation.",
    plus: "Des outils concrets, utilisables dès le lendemain dans les dossiers.",
  },
];

export default function Page() {
  return (
    <CadreOutil
      id="offres"
      chapeau="Présentation des offres Resolvia et des médiateurs. Page en préparation : les éléments en orange sont à compléter."
      confidentialite={false}
      aVerifier={[
        "Ne mentionner la qualité de médiateur agréé qu'une fois l'agrément obtenu.",
        "Vérifier les règles de communication du barreau applicables à Amandine (mention de la qualité d'avocate, publicité, cumul d'activités).",
        "Définir et indiquer les tarifs, ou le principe de tarification.",
        "Compléter les biographies avec les intéressés.",
      ]}
    >
      <section>
        <h2>Nos offres</h2>
        <div className="grille-2">
          {OFFRES.map((o) => (
            <div key={o.titre} className="carte">
              <h3>{o.titre}</h3>
              <p className="etiquette" style={{ margin: "10px 0 2px" }}>Pour qui</p>
              <p>{o.pour}</p>
              <p className="etiquette" style={{ margin: "10px 0 2px" }}>Comment</p>
              <p>{o.comment}</p>
              <p className="etiquette" style={{ margin: "10px 0 2px" }}>Ce que cela apporte</p>
              <p>{o.plus}</p>
              <p className="note" style={{ margin: 0 }}>Tarif : <span className="a-completer">à définir</span></p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Les médiateurs</h2>
        <div className="grille-2">
          {["Médiateur", "Médiatrice — avocate"].map((r) => (
            <div key={r} className="carte">
              <h3><span className="a-completer">Prénom Nom</span></h3>
              <p className="note">{r}</p>
              <p><span className="a-completer">Parcours professionnel en deux ou trois phrases.</span></p>
              <p><span className="a-completer">Domaines de prédilection en médiation.</span></p>
              <p><span className="a-completer">Formation : formation en médiation (HEC), agrément (date à venir).</span></p>
              <p style={{ margin: 0 }}><span className="a-completer">Ce qui l&apos;a conduit à la médiation, en une phrase personnelle.</span></p>
            </div>
          ))}
        </div>
      </section>
    </CadreOutil>
  );
}
