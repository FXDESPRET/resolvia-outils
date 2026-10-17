import CadreOutil from "@/components/CadreOutil";

export const metadata = { title: "Offres et biographies" };

const OFFRES = [
  {
    titre: "Médiation commerciale",
    pour: "Entreprises en litige avec un client, un fournisseur, un partenaire ou un sous-traitant.",
    comment: "Entretiens préalables, puis séances communes avec les décideurs et leurs conseils. Une longue pratique de la négociation commerciale aide à faire émerger des solutions réalistes pour chacun. Accord rédigé et, si souhaité, homologué.",
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
    titre: "Médiation en construction",
    pour: "Maîtres d'ouvrage, entrepreneurs, architectes, promoteurs, syndics et assureurs : retards, suppléments, réception, solde impayé, malfaçons, et litiges plus spécialisés (piscines, traitement de l'eau, extérieurs).",
    comment: "Co-médiation associant une avocate rompue au contentieux de la construction et un négociateur qui connaît le bâtiment et la pratique de l'expertise judiciaire. Si les causes sont contestées, constat confié à un expert commun choisi par les parties, avec les sapiteurs nécessaires et un budget convenu à l'avance.",
    plus: "S'accorder d'abord sur les faits techniques, puis sur la solution : réparation, reprise des travaux, réduction de prix, calendrier, paiement du solde.",
  },
  {
    titre: "Compagnies d'assurance et courtiers",
    pour: "Gestionnaires de sinistres, services juridiques et courtiers : responsabilité civile construction, protection juridique, recours entre assureurs, sinistres en copropriété.",
    comment: "Tri des dossiers médiables, médiations à plusieurs parties réunissant assurés et assureurs, constat technique commun lorsque les faits sont contestés.",
    plus: "Clôturer plus vite, réduire les frais de défense et d'expertise, et préserver la relation avec l'assuré. À terme : intégrer un recours amiable préalable dans les contrats, notamment en protection juridique et en copropriété.",
  },
  {
    titre: "Formations en négociation et gestion des conflits",
    pour: "Entreprises, équipes commerciales, cadres, cabinets et études.",
    comment: "Formations pratiques fondées sur une expérience de terrain en négociation commerciale : préparation, solution de repli, concessions, gestion des tensions, jeux de rôle.",
    plus: "Négocier mieux, et désamorcer les conflits avant qu'ils ne deviennent des litiges.",
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
        "Compatibilité de l'activité d'expert judiciaire avec celle de médiateur, et règles de présentation de la qualité d'expert judiciaire dans une communication commerciale.",
        "Formulation « connaît la pratique de l'expertise judiciaire » plutôt que « expert » dans la présentation des offres de médiation.",
        "Assureurs : vérifier le vocabulaire et la pertinence de l'offre auprès d'un gestionnaire de sinistres testeur.",
        "Positionnement « une avocate et un négociateur » : à confirmer avec Amandine.",
        "Posture du médiateur (aider à faire émerger des options, ou proposer des solutions à la demande des parties) : à préciser après la formation HEC avant toute formulation publique.",
        "Formations : cohérence avec l'offre de formations Resolvia existante (négociation commerciale, gestion des conflits).",
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
        <h2>Notre approche des litiges techniques</h2>
        <div className="carte">
          <p>
            Les litiges de construction se bloquent souvent sur les faits : chacun a son expert, et les rapports
            s&apos;opposent. Beaucoup de parties attendent aussi d&apos;une expertise judiciaire qu&apos;elle dise « qui a
            raison », alors que l&apos;expert ne fait que répondre aux questions techniques du juge. Resolvia réunit une
            lecture juridique et une lecture technique du dossier, et une connaissance concrète de ce qu&apos;une
            expertise judiciaire coûte, dure et apporte réellement.
          </p>
          <ul className="liste">
            <li><strong>La co-médiation</strong> : une avocate formée au contentieux de la construction et un négociateur qui connaît le bâtiment et la pratique de l&apos;expertise judiciaire conduisent ensemble les séances. Ils restent neutres et ne tranchent rien.</li>
            <li><strong>Un regard lucide sur l&apos;alternative</strong> : aider chaque partie à évaluer ce qu&apos;une procédure et une expertise judiciaire lui apporteraient vraiment, en coût, en délai et en résultat.</li>
            <li><strong>Le constat commun</strong> : si nécessaire, les parties désignent ensemble un expert, distinct des médiateurs, et conviennent des analyses utiles et de leur budget.</li>
            <li><strong>Une règle simple</strong> : on ne cumule jamais, dans un même dossier, les rôles de médiateur et d&apos;expert.</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2>Les médiateurs</h2>
        <p className="chapeau" style={{ fontSize: "1rem" }}>Un duo complémentaire : une avocate et un négociateur.</p>
        <div className="grille-2">
          {[
            "Médiateur — négociateur : négociation commerciale, conciliation, connaissance du bâtiment et de l'expertise judiciaire",
            "Médiatrice — avocate, expérience en cabinet spécialisé dans les litiges de construction",
          ].map((r) => (
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
