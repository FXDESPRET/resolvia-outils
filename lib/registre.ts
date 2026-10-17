// Registre faits / hypothèses / décisions du projet Resolvia.
// Ajouter une ligne en tête de liste à chaque nouvel élément.
// fait : constaté et vérifiable · hypothese : à confirmer · decision : arrêtée entre administrateurs

export type TypeEntree = "fait" | "hypothese" | "decision";

export type Entree = {
  date: string; // AAAA-MM-JJ
  type: TypeEntree;
  texte: string;
  source?: string;
  /** Pour une hypothèse : comment la vérifier. */
  verification?: string;
  statut?: "ouverte" | "confirmee" | "infirmee";
};

export const REGISTRE: Entree[] = [
  // ---------- Décisions ----------
  { date: "2026-10-17", type: "decision", texte: "Les outils sont développés dans une application séparée (GitHub + Vercel) ; le site WordPress resolvia.be reste la vitrine publique et n'est pas modifié.", source: "Cadrage du projet" },
  { date: "2026-10-17", type: "decision", texte: "Phase 1 sans base de données : accès par codes personnels, statuts dans le code, avis des testeurs par e-mail.", source: "Cadrage du projet" },
  { date: "2026-10-17", type: "decision", texte: "Supabase (organisation payante existante, région européenne) sera ajouté au lancement ; la base MySQL de l'hébergement OVH est écartée.", source: "Cadrage du projet" },
  { date: "2026-10-17", type: "decision", texte: "Aucune réponse saisie dans les outils n'est enregistrée, pour qu'aucun élément d'un vrai dossier ne puisse y rester.", source: "Règles de confidentialité" },
  { date: "2026-10-17", type: "decision", texte: "Les retours des testeurs sont des retours d'utilisateurs, jamais des témoignages publiables.", source: "Règles de confidentialité" },
  { date: "2026-10-17", type: "decision", texte: "Ouverture au public seulement après l'agrément et la liste de vérifications complète.", source: "Cadrage du projet" },
  { date: "2026-10-17", type: "decision", texte: "Charte graphique reprise du logo Resolvia : vert sauge, typographie Alegreya.", source: "Logo fourni" },

  { date: "2026-10-17", type: "decision", texte: "Ajout d'une rubrique « Construction, piscines et eau » fondée sur les spécialités d'expert de FX, avec les sapiteurs intégrés aux budgets.", source: "Demande de FX" },

  { date: "2026-10-17", type: "decision", texte: "La rubrique technique couvre toute la construction (contrat de chantier, gros œuvre, techniques, finitions), et pas seulement les piscines, bassins et extérieurs.", source: "FX" },
  { date: "2026-10-17", type: "decision", texte: "La compétence d'expert judiciaire de FX est présentée comme une connaissance de ce qu'une expertise apporte, coûte et dure, jamais comme une intervention d'expert dans les médiations.", source: "FX" },
  { date: "2026-10-17", type: "decision", texte: "Les compagnies d'assurance et les courtiers font partie des cibles.", source: "FX" },
  { date: "2026-10-17", type: "decision", texte: "L'expérience de FX en négociation commerciale est valorisée dans la médiation commerciale et les formations.", source: "FX" },

  // ---------- Faits ----------
  { date: "2026-10-17", type: "fait", texte: "Amandine a travaillé dans un cabinet d'avocats qui traitait des litiges de construction.", source: "FX" },
  { date: "2026-10-17", type: "fait", texte: "Spécialités d'expert de FX : piscines et traitement de l'eau, étangs et bassins, dégâts aux bâtiments extérieurs.", source: "FX" },
  { date: "2026-10-17", type: "fait", texte: "Formation HEC de médiation de novembre 2026 à juin 2027.", source: "Cadrage du projet" },
  { date: "2026-10-17", type: "fait", texte: "Le site resolvia.be est un site WordPress (constructeur Kubio) hébergé chez OVH.", source: "Analyse du site" },
  { date: "2026-10-17", type: "fait", texte: "Le dépôt GitHub FXDESPRET/resolvia-outils contient l'application.", source: "GitHub" },

  // ---------- Hypothèses ----------
  { date: "2026-10-17", type: "hypothese", texte: "Les prescripteurs (avocats, notaires, conseils d'entreprise) seront le principal canal d'accès aux dossiers de médiation.", verification: "Retours des testeurs prescripteurs ; origine des premiers dossiers.", statut: "ouverte" },
  { date: "2026-10-17", type: "hypothese", texte: "Des outils gratuits et utiles sont un bon moyen de se faire connaître des prescripteurs.", verification: "Taux d'utilisation et avis des testeurs ; demandes de contact générées.", statut: "ouverte" },
  { date: "2026-10-17", type: "hypothese", texte: "Les successions et les conflits entre associés sont des créneaux porteurs.", verification: "Échanges avec des notaires et des conseils d'entreprise pendant la phase de test.", statut: "ouverte" },
  { date: "2026-10-17", type: "hypothese", texte: "Une co-médiation juriste (Amandine) et technicien (FX) est une offre distinctive pour les litiges de construction, de piscines et de bassins.", verification: "Réaction des avocats, assureurs et entrepreneurs testeurs ; premiers dossiers.", statut: "ouverte" },
  { date: "2026-10-17", type: "hypothese", texte: "Les activités d'expert judiciaire et de médiateur peuvent être exercées en parallèle, à condition de ne jamais cumuler les deux rôles dans un même dossier.", verification: "Code de bonne conduite de la Commission fédérale de médiation, règles applicables aux experts judiciaires.", statut: "ouverte" },
  { date: "2026-10-17", type: "hypothese", texte: "Les assureurs (responsabilité civile construction, protection juridique, recours) peuvent orienter une part significative de leurs dossiers litigieux vers la médiation.",
    verification: "Entretiens avec quelques gestionnaires de sinistres et courtiers ; test de l'outil « Portefeuille de sinistres ».", statut: "ouverte" },
  { date: "2026-10-17", type: "hypothese", texte: "Les entrepreneurs et architectes peuvent être des prescripteurs de médiation en construction.", verification: "Échanges avec quelques assureurs et entreprises pendant la phase de test.", statut: "ouverte" },
  { date: "2026-10-17", type: "hypothese", texte: "Le plan gratuit de Vercel ne convient pas à un usage commercial.", verification: "Relire les conditions actuelles de Vercel avant le lancement.", statut: "ouverte" },
];

export const TYPES_ENTREE: Record<TypeEntree, { libelle: string; classe: string }> = {
  fait: { libelle: "Fait", classe: "st-public" },
  hypothese: { libelle: "Hypothèse", classe: "st-a-relire" },
  decision: { libelle: "Décision", classe: "st-testeurs" },
};

/** Calendrier de référence (affiché au mois). « propose » : date suggérée, à confirmer. */
export const JALONS: { date: string; libelle: string; propose?: boolean }[] = [
  { date: "2026-10-17", libelle: "Cadrage et première version de l'espace outils" },
  { date: "2026-11-01", libelle: "Début de la formation HEC" },
  { date: "2027-01-15", libelle: "Relecture de l'ensemble des outils par Amandine", propose: true },
  { date: "2027-03-01", libelle: "Ouverture aux premiers testeurs", propose: true },
  { date: "2027-06-30", libelle: "Fin de la formation, puis demande d'agrément" },
];
