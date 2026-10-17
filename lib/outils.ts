// Registre des outils et de leur statut.
// Pour changer le statut d'un outil : modifier la ligne « statut » ci-dessous,
// puis enregistrer sur GitHub. Vercel republie automatiquement.

export type Statut = "brouillon" | "a-relire" | "a-valider" | "testeurs" | "public";

export const STATUTS: Record<Statut, { libelle: string; ordre: number }> = {
  brouillon: { libelle: "Brouillon", ordre: 1 },
  "a-relire": { libelle: "À relire", ordre: 2 },
  "a-valider": { libelle: "À valider (déontologie / juridique)", ordre: 3 },
  testeurs: { libelle: "Ouvert aux testeurs", ordre: 4 },
  public: { libelle: "Prêt pour le public", ordre: 5 },
};

export type Rubrique = "prescripteurs" | "successions" | "associes" | "construction" | "contenus" | "pilotage";

export const RUBRIQUES: Record<Rubrique, { titre: string; destination: string }> = {
  prescripteurs: { titre: "Outils prescripteurs", destination: "Publics au lancement" },
  successions: { titre: "Outils successions", destination: "Publics au lancement" },
  associes: { titre: "Outils associés", destination: "Publics au lancement" },
  construction: { titre: "Construction et litiges techniques", destination: "Publics au lancement" },
  contenus: { titre: "Contenus", destination: "Publics après relecture" },
  pilotage: { titre: "Pilotage interne", destination: "Toujours privés" },
};

export type Outil = {
  id: string;
  titre: string;
  rubrique: Rubrique;
  statut: Statut;
  resume: string;
  /** Chemin de la page si l'outil est développé. */
  chemin?: string;
};

export const OUTILS: Outil[] = [
  // ---------- Outils prescripteurs ----------
  {
    id: "mediabilite",
    titre: "Test de médiabilité",
    rubrique: "prescripteurs",
    statut: "a-relire",
    resume:
      "En quelques minutes, évaluer si un dossier se prête à la médiation, repérer les contre-indications et préparer l'échange avec le client.",
    chemin: "/outils/mediabilite",
  },
  {
    id: "simulateur-cout",
    titre: "Simulateur de coût",
    rubrique: "prescripteurs",
    statut: "a-relire",
    resume: "Comparer l'ordre de grandeur du coût et de la durée d'une médiation et d'une procédure, avec vos propres hypothèses.",
    chemin: "/outils/simulateur-cout",
  },
  {
    id: "fiche-preparation",
    titre: "Fiche de préparation client",
    rubrique: "prescripteurs",
    statut: "a-relire",
    resume: "Une fiche à remettre au client pour préparer sa première séance : intérêts, priorités, options et solution de repli.",
    chemin: "/outils/fiche-preparation",
  },
  {
    id: "carnet-clauses",
    titre: "Carnet de clauses",
    rubrique: "prescripteurs",
    statut: "a-relire",
    resume: "Modèles de clauses de médiation commentés, à adapter et copier : contrats, statuts, baux, construction, indivision.",
    chemin: "/outils/carnet-clauses",
  },
  {
    id: "preparer-negociation",
    titre: "Préparer une négociation",
    rubrique: "prescripteurs",
    statut: "a-relire",
    resume: "Solution de repli, seuil, objectif, zone d'accord possible et monnaies d'échange : un plan de négociation en une page.",
    chemin: "/outils/preparer-negociation",
  },
  {
    id: "portefeuille-sinistres",
    titre: "Portefeuille de sinistres",
    rubrique: "prescripteurs",
    statut: "a-relire",
    resume: "Pour les assureurs et les courtiers : estimer ce que représente, sur une année, l'orientation d'une partie des dossiers litigieux vers la médiation.",
    chemin: "/outils/portefeuille-sinistres",
  },
  // ---------- Outils successions ----------
  {
    id: "inventaire-attachements",
    titre: "Inventaire des attachements",
    rubrique: "successions",
    statut: "a-relire",
    resume: "Distinguer la valeur affective et la valeur financière des biens, et repérer ceux auxquels plusieurs héritiers tiennent.",
    chemin: "/outils/inventaire-attachements",
  },
  {
    id: "schema-indivision",
    titre: "Schéma de l'indivision",
    rubrique: "successions",
    statut: "a-relire",
    resume: "Visualiser les indivisaires, leurs quotes-parts et leurs souhaits pour situer les points de blocage.",
    chemin: "/outils/schema-indivision",
  },
  {
    id: "kit-reunion-familiale",
    titre: "Kit de réunion familiale",
    rubrique: "successions",
    statut: "a-relire",
    resume: "Préparer, animer et conclure une réunion de famille autour d'une succession, avec un ordre du jour à imprimer.",
    chemin: "/outils/kit-reunion-familiale",
  },
  // ---------- Outils associés ----------
  {
    id: "bilan-association",
    titre: "Bilan de santé de l'association",
    rubrique: "associes",
    statut: "a-relire",
    resume: "Repérer les tensions naissantes entre associés, dimension par dimension, avant qu'elles ne deviennent un litige.",
    chemin: "/outils/bilan-association",
  },
  {
    id: "pacte-desaccord",
    titre: "Pacte de désaccord",
    rubrique: "associes",
    statut: "a-relire",
    resume: "Convenir à l'avance, entre associés, de la manière de traiter un désaccord : étapes, délais, règles de conduite.",
    chemin: "/outils/pacte-desaccord",
  },
  // ---------- Construction et litiges techniques ----------
  {
    id: "diagnostic-construction",
    titre: "Diagnostic d'un litige de construction",
    rubrique: "construction",
    statut: "a-relire",
    resume: "Retard, supplément, réception, malfaçon, piscine ou façade : situer le litige, les intervenants et les délais, et savoir quelle voie privilégier.",
    chemin: "/outils/diagnostic-construction",
  },
  {
    id: "expertise-judiciaire",
    titre: "Comprendre l'expertise judiciaire",
    rubrique: "construction",
    statut: "a-relire",
    resume: "Ce que fait réellement l'expert judiciaire, ce qu'il ne fait pas, combien de temps et d'argent cela représente, et comment la médiation peut s'y articuler.",
    chemin: "/outils/expertise-judiciaire",
  },
  {
    id: "budget-technique",
    titre: "Budget de résolution technique",
    rubrique: "construction",
    statut: "a-relire",
    resume: "Comparer une résolution amiable avec expert commun et sapiteurs à une expertise judiciaire suivie d'une procédure.",
    chemin: "/outils/budget-technique",
  },
  {
    id: "desordres",
    titre: "Désordres fréquents",
    rubrique: "construction",
    statut: "a-relire",
    resume: "Chantier, gros œuvre, techniques, finitions, extérieurs, piscines et bassins : les questions à poser, les preuves à conserver et les analyses utiles.",
    chemin: "/outils/desordres",
  },
  {
    id: "constat-conjoint",
    titre: "Protocole de constat technique conjoint",
    rubrique: "construction",
    statut: "a-relire",
    resume: "Convenir ensemble d'un expert, de sa mission, des sapiteurs et du partage des frais, avant ou pendant une médiation.",
    chemin: "/outils/constat-conjoint",
  },
  // ---------- Contenus ----------
  {
    id: "cas-du-mois",
    titre: "Cas du mois",
    rubrique: "contenus",
    statut: "a-relire",
    resume: "Un cas fictif et commenté : comment une médiation a permis de sortir d'une impasse.",
    chemin: "/contenus/cas-du-mois",
  },
  {
    id: "faq",
    titre: "Questions fréquentes",
    rubrique: "contenus",
    statut: "a-relire",
    resume: "Les réponses aux questions que se posent clients et prescripteurs sur la médiation en Belgique.",
    chemin: "/contenus/faq",
  },
  {
    id: "offres",
    titre: "Offres et biographies",
    rubrique: "contenus",
    statut: "brouillon",
    resume: "Présentation des offres Resolvia et des médiateurs.",
    chemin: "/contenus/offres",
  },
  // ---------- Pilotage interne (toujours privé) ----------
  {
    id: "tableau-de-bord",
    titre: "Tableau de bord",
    rubrique: "pilotage",
    statut: "a-relire",
    resume: "Avancement des outils, calendrier de la formation et vérifications avant lancement.",
    chemin: "/pilotage/tableau-de-bord",
  },
  {
    id: "registre",
    titre: "Registre faits / hypothèses / décisions",
    rubrique: "pilotage",
    statut: "a-relire",
    resume: "Ce que l'on sait, ce que l'on suppose et ce que l'on a décidé, daté et sourcé.",
    chemin: "/pilotage/registre",
  },
];

export function outilParId(id: string) {
  return OUTILS.find((o) => o.id === id);
}

/** Liste des vérifications avant lancement (cochées à la main ici). */
export const VERIFICATIONS: { libelle: string; fait: boolean }[] = [
  { libelle: "Agrément de médiateur obtenu", fait: false },
  { libelle: "Règles de communication du barreau vérifiées", fait: false },
  { libelle: "Titularité du nom Resolvia confirmée", fait: false },
  { libelle: "Compatibilité des activités d'expert judiciaire et de médiateur vérifiée", fait: false },
  { libelle: "Mentions légales et politique de protection des données rédigées", fait: false },
  { libelle: "Tests sur téléphone", fait: false },
  { libelle: "Plans payants Vercel et Supabase activés", fait: false },
];
