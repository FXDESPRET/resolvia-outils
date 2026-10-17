import Link from "next/link";
import CadreOutil from "@/components/CadreOutil";

export const metadata = { title: "Cibles et enjeux" };

const ENJEUX = ["Délai", "Coût", "Risque", "Discrétion", "Relation", "Cadre et déontologie", "Provisions", "Valeur"] as const;

// 2 = enjeu central, 1 = enjeu secondaire, 0 = peu présent. Grille à confronter aux retours des testeurs.
const CIBLES: {
  nom: string;
  enjeux: number[];
  question: string;
  argument: string;
  outils: { titre: string; lien: string }[];
  vigilance: string;
}[] = [
  {
    nom: "Avocats",
    enjeux: [2, 1, 2, 1, 2, 2, 0, 0],
    question: "« Proposer une médiation, est-ce donner un signe de faiblesse, ou perdre mon dossier ? »",
    argument: "L'avocat reste au centre : il conseille, prépare et vérifie l'accord. La médiation agréée est un cadre qu'il connaît et qui protège son client.",
    outils: [{ titre: "Test de médiabilité", lien: "/outils/mediabilite" }, { titre: "Simulateur de coût", lien: "/outils/simulateur-cout" }, { titre: "Carnet de clauses", lien: "/outils/carnet-clauses" }],
    vigilance: "Ne jamais donner l'impression de concurrencer l'avocat ; Amandine, avocate, est la meilleure porte d'entrée.",
  },
  {
    nom: "Notaires",
    enjeux: [2, 1, 1, 2, 2, 2, 0, 1],
    question: "« Comment débloquer une succession sans prendre parti entre les héritiers ? »",
    argument: "Un tiers neutre traite le conflit relationnel ; le notaire garde la maîtrise de l'acte et du calendrier.",
    outils: [{ titre: "Inventaire des attachements", lien: "/outils/inventaire-attachements" }, { titre: "Schéma de l'indivision", lien: "/outils/schema-indivision" }, { titre: "Kit de réunion familiale", lien: "/outils/kit-reunion-familiale" }],
    vigilance: "Le notaire est tenu à l'impartialité : présenter la médiation comme un service aux familles, pas comme une prescription commerciale.",
  },
  {
    nom: "Juges et juridictions",
    enjeux: [2, 0, 1, 0, 1, 2, 0, 0],
    question: "« Ce dossier pourrait-il être réglé autrement que par un jugement ? »",
    argument: "Le juge oriente vers un médiateur agréé : l'agrément et l'inscription sur les listes sont la condition pour être proposé.",
    outils: [{ titre: "Comprendre l'expertise judiciaire", lien: "/outils/expertise-judiciaire" }],
    vigilance: "Pas de prospection directe : se faire connaître par l'agrément, la qualité des médiations et le réseau des avocats.",
  },
  {
    nom: "Assureurs et courtiers",
    enjeux: [2, 2, 2, 1, 2, 1, 2, 0],
    question: "« Combien de dossiers pourrions-nous clôturer plus vite, et à quel coût ? »",
    argument: "Moins de frais de défense et d'expertise, des réserves libérées plus tôt, des assurés plus satisfaits ; un constat commun au lieu d'expertises croisées.",
    outils: [{ titre: "Portefeuille de sinistres", lien: "/outils/portefeuille-sinistres" }, { titre: "Budget de résolution technique", lien: "/outils/budget-technique" }],
    vigilance: "En Belgique, la prise en charge de la médiation n'est pas un poste défini des contrats : commencer par des dossiers pilotes, avant de parler de produit.",
  },
  {
    nom: "Dirigeants et conseils d'administration",
    enjeux: [2, 2, 2, 2, 2, 1, 1, 2],
    question: "« Combien ce litige nous coûte-t-il vraiment, et pour combien de temps ? »",
    argument: "Un litige mobilise la direction, immobilise une exposition et pèse sur l'image ; une médiation le ferme en quelques mois, en toute discrétion.",
    outils: [{ titre: "Litige et valeur de l'entreprise", lien: "/outils/valeur-entreprise" }, { titre: "Bilan de santé de l'association", lien: "/outils/bilan-association" }, { titre: "Préparer une négociation", lien: "/outils/preparer-negociation" }],
    vigilance: "S'assurer que l'interlocuteur a le pouvoir de décider, ou qu'il saura convaincre son conseil.",
  },
  {
    nom: "Investisseurs et gestionnaires de fonds",
    enjeux: [2, 1, 2, 2, 1, 1, 1, 2],
    question: "« Ce litige va-t-il compromettre la sortie ou la prochaine levée ? »",
    argument: "Un litige clos avant l'opération évite décote, garantie spécifique ou séquestre ; un pacte de désaccord rassure dès l'entrée au capital.",
    outils: [{ titre: "Litige et valeur de l'entreprise", lien: "/outils/valeur-entreprise" }, { titre: "Pacte de désaccord", lien: "/outils/pacte-desaccord" }],
    vigilance: "L'investisseur n'est pas toujours partie au litige : respecter la confidentialité vis-à-vis des parties.",
  },
  {
    nom: "Experts-comptables et réviseurs",
    enjeux: [1, 1, 2, 1, 2, 1, 2, 1],
    question: "« Comment aider mon client à sortir d'un conflit qui pèse sur ses comptes et sa trésorerie ? »",
    argument: "Ils voient les conflits naître (associés, clients, fournisseurs) et peuvent orienter tôt ; l'issue rapide simplifie les provisions.",
    outils: [{ titre: "Litige et valeur de l'entreprise", lien: "/outils/valeur-entreprise" }, { titre: "Bilan de santé de l'association", lien: "/outils/bilan-association" }],
    vigilance: "Rester sur le terrain de la gestion du conflit, sans empiéter sur leur conseil.",
  },
  {
    nom: "Entrepreneurs et architectes",
    enjeux: [2, 2, 2, 1, 2, 0, 0, 1],
    question: "« Comment me faire payer sans perdre le client ni bloquer le chantier ? »",
    argument: "Un litige de chantier réglé en quelques semaines, un constat commun au lieu d'une expertise judiciaire, une clause de médiation dans les contrats.",
    outils: [{ titre: "Diagnostic d'un litige de construction", lien: "/outils/diagnostic-construction" }, { titre: "Constat technique conjoint", lien: "/outils/constat-conjoint" }, { titre: "Carnet de clauses", lien: "/outils/carnet-clauses" }],
    vigilance: "Ne pas apparaître comme le conseil de l'entreprise : la médiation est neutre.",
  },
  {
    nom: "Syndics et copropriétés",
    enjeux: [2, 1, 1, 1, 2, 1, 0, 1],
    question: "« Comment éviter qu'un conflit entre copropriétaires, ou avec un prestataire, ne paralyse l'immeuble ? »",
    argument: "Un mode de règlement amiable prévu à l'avance apaise l'assemblée et protège le budget de la copropriété.",
    outils: [{ titre: "Carnet de clauses", lien: "/outils/carnet-clauses" }, { titre: "Diagnostic d'un litige de construction", lien: "/outils/diagnostic-construction" }],
    vigilance: "Démarche déjà tentée par le passé sans relais : à reprendre après l'agrément, avec des cas concrets.",
  },
];

const point = (n: number) => (n === 2 ? "●" : n === 1 ? "◐" : "·");

export default function Page() {
  return (
    <CadreOutil
      id="cibles"
      etroit={false}
      confidentialite="Page strictement interne, réservée aux administrateurs."
      chapeau="Ce qui compte pour chaque cible, la question qu'elle se pose, notre argument et les outils à lui montrer. À enrichir avec les retours des testeurs de chaque profession."
    >
      <section className="carte">
        <h2>Les enjeux par cible</h2>
        <p className="note">● enjeu central · ◐ enjeu secondaire · · peu présent</p>
        <div className="defile">
          <table className="tableau grille-enjeux">
            <thead><tr><th>Cible</th>{ENJEUX.map((e) => <th key={e}>{e}</th>)}</tr></thead>
            <tbody>
              {CIBLES.map((c) => (
                <tr key={c.nom}><td><strong>{c.nom}</strong></td>{c.enjeux.map((n, i) => <td key={i} className={`niveau-${n}`}>{point(n)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="pp-grille section">
        {CIBLES.map((c) => (
          <div key={c.nom} className="carte">
            <h3>{c.nom}</h3>
            <p><em>{c.question}</em></p>
            <p><span className="etiquette">Notre argument</span><br />{c.argument}</p>
            <p><span className="etiquette">Outils à montrer</span><br />
              {c.outils.map((o, i) => <span key={o.lien}>{i > 0 && " · "}<Link href={o.lien}>{o.titre}</Link></span>)}
            </p>
            <p className="note" style={{ margin: 0 }}><strong>Vigilance :</strong> {c.vigilance}</p>
          </div>
        ))}
      </div>
    </CadreOutil>
  );
}
