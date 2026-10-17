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

export type Rubrique = "prescripteurs" | "successions" | "associes" | "contenus" | "pilotage";

export const RUBRIQUES: Record<Rubrique, { titre: string; destination: string }> = {
  prescripteurs: { titre: "Outils prescripteurs", destination: "Publics au lancement" },
  successions: { titre: "Outils successions", destination: "Publics au lancement" },
  associes: { titre: "Outils associés", destination: "Publics au lancement" },
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
    statut: "brouillon",
    resume: "Comparer l'ordre de grandeur du coût et de la durée d'une médiation et d'une procédure.",
  },
  {
    id: "fiche-preparation",
    titre: "Fiche de préparation client",
    rubrique: "prescripteurs",
    statut: "brouillon",
    resume: "Aider le client à préparer sa première séance de médiation.",
  },
  {
    id: "carnet-clauses",
    titre: "Carnet de clauses",
    rubrique: "prescripteurs",
    statut: "brouillon",
    resume: "Modèles de clauses de médiation commentées pour contrats et statuts.",
  },
  {
    id: "inventaire-attachements",
    titre: "Inventaire des attachements",
    rubrique: "successions",
    statut: "brouillon",
    resume: "Distinguer la valeur affective et la valeur financière des biens d'une succession.",
  },
  {
    id: "schema-indivision",
    titre: "Schéma de l'indivision",
    rubrique: "successions",
    statut: "brouillon",
    resume: "Visualiser les indivisaires, leurs quotes-parts et les points de blocage.",
  },
  {
    id: "kit-reunion-familiale",
    titre: "Kit de réunion familiale",
    rubrique: "successions",
    statut: "brouillon",
    resume: "Préparer une réunion de famille autour d'une succession.",
  },
  {
    id: "bilan-association",
    titre: "Bilan de santé de l'association",
    rubrique: "associes",
    statut: "brouillon",
    resume: "Repérer les tensions naissantes entre associés avant qu'elles ne deviennent un litige.",
  },
  {
    id: "pacte-desaccord",
    titre: "Pacte de désaccord",
    rubrique: "associes",
    statut: "brouillon",
    resume: "Convenir à l'avance de la manière de gérer un désaccord entre associés.",
  },
  {
    id: "cas-du-mois",
    titre: "Cas du mois",
    rubrique: "contenus",
    statut: "brouillon",
    resume: "Un cas anonymisé et commenté, chaque mois.",
  },
  {
    id: "faq",
    titre: "FAQ et fiches d'offres",
    rubrique: "contenus",
    statut: "brouillon",
    resume: "Questions fréquentes, offres et biographies.",
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
  { libelle: "Mentions légales et politique de protection des données rédigées", fait: false },
  { libelle: "Tests sur téléphone", fait: false },
  { libelle: "Plans payants Vercel et Supabase activés", fait: false },
];
