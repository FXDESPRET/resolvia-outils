// « Ce que cet outil vous apporte », selon la profession de la personne connectée.
// Chaque profession est rattachée à un groupe ; chaque outil peut avoir un texte par groupe.
// STATUT : à relire (FX, Amandine) et à confronter aux retours des testeurs de chaque profession.

export type Groupe = "avocat" | "notaire" | "assurance" | "entreprise" | "immobilier";

export const GROUPES: Record<Groupe, { titre: string; professions: string[] }> = {
  avocat: { titre: "Avocats", professions: ["avocat"] },
  notaire: { titre: "Notaires", professions: ["notaire"] },
  assurance: { titre: "Assureurs et courtiers", professions: ["assureur", "courtier"] },
  entreprise: { titre: "Dirigeants, administrateurs, investisseurs, experts-comptables", professions: ["administrateur", "gestionnaire-fonds", "expert-comptable"] },
  immobilier: { titre: "Construction, immobilier et copropriétés", professions: ["entrepreneur", "syndic"] },
};

export function groupeDe(profession?: string): Groupe | undefined {
  if (!profession) return undefined;
  return (Object.keys(GROUPES) as Groupe[]).find((g) => GROUPES[g].professions.includes(profession));
}

export const REGARDS: Record<string, Partial<Record<Groupe, string>>> = {
  mediabilite: {
    avocat: "Objectiver en cinq minutes l'opportunité d'une médiation, et la proposer au client sur la base d'éléments concrets plutôt que comme un signe de faiblesse.",
    notaire: "Repérer, dès les premiers signes de blocage d'une succession ou d'une indivision, si un tiers neutre peut éviter l'enlisement du dossier.",
    assurance: "Trier rapidement les dossiers litigieux qui se prêtent à une solution amiable, et repérer ceux où une contre-indication impose une autre voie.",
    entreprise: "Évaluer, avant d'engager la société dans une procédure, si le différend peut se régler plus vite et plus discrètement.",
    immobilier: "Savoir si un litige avec un client, un sous-traitant ou un copropriétaire peut se régler sans bloquer le chantier ou l'immeuble.",
  },
  "simulateur-cout": {
    avocat: "Présenter au client, chiffres à l'appui, le coût et surtout la durée réaliste d'une procédure, y compris l'attente d'audience.",
    assurance: "Mesurer, dossier par dossier, les frais et le temps évités par une solution amiable.",
    entreprise: "Mettre en regard le coût d'un litige, la durée pendant laquelle la somme reste bloquée et l'énergie mobilisée.",
    immobilier: "Comparer ce que coûterait réellement un litige sur un solde de chantier, et le temps pendant lequel il resterait impayé.",
  },
  "fiche-preparation": {
    avocat: "Un client mieux préparé, qui arrive en médiation avec ses priorités claires : des séances plus courtes et plus productives.",
    notaire: "Un support simple à remettre aux héritiers avant une réunion, pour qu'ils viennent avec leurs besoins plutôt qu'avec leurs griefs.",
  },
  "carnet-clauses": {
    avocat: "Des clauses prêtes à intégrer dans les contrats rédigés pour vos clients, avec leurs points d'attention.",
    notaire: "Des clauses pour les conventions d'indivision et les actes, qui organisent le dialogue avant le conflit.",
    entreprise: "Prévoir dans les contrats et les statuts la manière de traiter un différend, avant qu'il ne survienne.",
    immobilier: "Insérer dans vos contrats d'entreprise une clause qui évite de passer directement au tribunal.",
  },
  "preparer-negociation": {
    avocat: "Structurer avec le client sa solution de repli et ses marges de manœuvre avant une négociation ou une médiation.",
    entreprise: "Préparer une négociation commerciale ou un règlement de litige avec méthode : seuil, objectif, monnaies d'échange.",
    immobilier: "Préparer la discussion sur un supplément, un solde ou une réclamation sans laisser la relation se dégrader.",
  },
  "portefeuille-sinistres": {
    assurance: "Estimer, sur votre portefeuille, ce que représenterait l'orientation d'une partie des dossiers vers la médiation : frais, délais, réserves.",
    entreprise: "Comprendre ce qu'un assureur gagne à régler vite, et en tirer parti dans la gestion d'un sinistre.",
  },
  "inventaire-attachements": {
    notaire: "Faire apparaître avant le partage les biens qui cristallisent les tensions, et ceux qui peuvent être attribués sans difficulté.",
    avocat: "Comprendre ce qui compte vraiment pour le client au-delà de la valeur des biens, et trouver des leviers d'accord.",
  },
  "schema-indivision": {
    notaire: "Une vue d'ensemble des quotes-parts et des souhaits de chaque indivisaire, utile pour préparer un rendez-vous ou un projet de partage.",
    avocat: "Situer la position de votre client dans l'indivision et les alliances possibles.",
  },
  "kit-reunion-familiale": {
    notaire: "Aider les familles à préparer une réunion constructive, et savoir quand proposer un médiateur.",
  },
  "bilan-association": {
    entreprise: "Détecter les tensions entre associés avant qu'elles n'affectent la gouvernance, la valeur ou la relation avec les investisseurs.",
    avocat: "Un support neutre pour ouvrir la discussion entre associés clients, avant une révision des statuts ou du pacte.",
  },
  "pacte-desaccord": {
    entreprise: "Rassurer investisseurs et administrateurs : les désaccords entre fondateurs ou associés suivront un chemin connu à l'avance.",
    avocat: "Un complément simple à la convention d'actionnaires, à proposer à la création ou lors d'une levée de fonds.",
  },
  "expertise-judiciaire": {
    avocat: "Expliquer au client ce qu'une expertise judiciaire tranchera, et ce qu'elle ne tranchera pas, avant de l'engager.",
    assurance: "Mesurer le coût et la durée réels d'une expertise, et les moments où une solution amiable reste possible.",
    immobilier: "Comprendre le rôle exact de l'expert avant de vous y engager : il éclaire les faits, il ne dit pas qui a raison.",
  },
  "diagnostic-construction": {
    avocat: "Qualifier rapidement un litige de construction, repérer les intervenants à mettre en cause et les points de vigilance.",
    assurance: "Identifier les intervenants et les assureurs concernés, et la voie la plus économique pour régler le sinistre.",
    immobilier: "Savoir comment traiter un litige de chantier sans compromettre le paiement, la relation ou le chantier lui-même.",
  },
  "budget-technique": {
    avocat: "Chiffrer avec le client une voie amiable avec expert commun, face à une expertise judiciaire et une procédure.",
    assurance: "Comparer le coût d'un constat commun avec sapiteurs à celui d'une expertise judiciaire, frais de défense compris.",
    immobilier: "Voir combien de temps et d'argent un constat commun permet d'économiser par rapport à une expertise judiciaire.",
  },
  desordres: {
    avocat: "Les bonnes questions techniques et les preuves à réunir dès la première consultation.",
    assurance: "Une grille de lecture des sinistres de construction et des analyses qui permettent de trancher les débats techniques.",
    immobilier: "Les preuves à conserver pour défendre votre position, et les analyses qui évitent les débats sans fin.",
  },
  "constat-conjoint": {
    avocat: "Un protocole pour organiser un constat commun au lieu de multiplier les expertises unilatérales.",
    assurance: "Partager le coût d'un seul constat entre assureurs et assurés, avec un budget plafonné.",
    immobilier: "Faire constater un désordre rapidement, avec l'autre partie, sans attendre une expertise judiciaire.",
  },
  "reperes-modes": {
    avocat: "Une réponse simple au client qui demande : « Et maintenant, que fait-on ? »",
    notaire: "Savoir quand orienter une famille vers un médiateur agréé.",
    assurance: "Situer la médiation par rapport aux autres voies dans la gestion des sinistres.",
    entreprise: "Comprendre les options avant de décider d'une action au nom de la société.",
    immobilier: "Comprendre les options avant d'envoyer une mise en demeure ou de saisir un avocat.",
  },
  "valeur-entreprise": {
    entreprise: "Mesurer l'effet d'un litige sur les provisions, la valorisation, une levée de fonds ou une cession, et le gain d'une issue rapide.",
    avocat: "Montrer au dirigeant ou à l'investisseur ce qu'un litige qui dure coûte au-delà des honoraires.",
  },
};
