// Contenu du test de médiabilité.
// Tout le texte de l'outil est ici : on peut le relire et l'ajuster sans toucher à la logique.
// Statut : À RELIRE — formulations et pondérations à valider (déontologie / juridique).

export type Drapeau = "vigilance" | "contre";

export type Option = {
  libelle: string;
  points: 0 | 1 | 2 | 3;
  drapeau?: Drapeau;
  /** Phrase reprise dans le résultat (atout si 3 points, sinon point d'attention). */
  note?: string;
};

export type Question = {
  id: string;
  bloc: BlocId;
  texte: string;
  aide: string;
  options: Option[];
};

export type BlocId = "relation" | "volonte" | "litige" | "cadre";

export const BLOCS: { id: BlocId; titre: string; intro: string }[] = [
  { id: "relation", titre: "La relation", intro: "Ce qui lie les parties et la manière dont elles se parlent." },
  { id: "volonte", titre: "La volonté", intro: "La disposition de chacun à chercher une solution ensemble." },
  { id: "litige", titre: "Le litige", intro: "La nature du désaccord et ce qu'il faudrait pour le régler." },
  { id: "cadre", titre: "Le cadre", intro: "Le coût, la discrétion et le stade du dossier." },
];

export const QUESTIONS: Question[] = [
  // ---------- La relation ----------
  {
    id: "relation",
    bloc: "relation",
    texte: "Les parties devront-elles continuer à se côtoyer après le litige ?",
    aide: "Plus la relation doit durer, plus une solution construite ensemble a de valeur.",
    options: [
      {
        libelle: "Oui, durablement (famille, associés, partenaires commerciaux, voisins)",
        points: 3,
        note: "Relation à préserver : la médiation protège ce qu'une procédure abîme souvent.",
      },
      { libelle: "Probablement, de temps en temps", points: 2 },
      { libelle: "Non, la relation est terminée", points: 1 },
    ],
  },
  {
    id: "communication",
    bloc: "relation",
    texte: "Où en est la communication entre les parties ?",
    aide: "Une communication difficile n'empêche pas la médiation : c'est souvent sa raison d'être.",
    options: [
      { libelle: "Elles se parlent encore, même difficilement", points: 3 },
      { libelle: "Elles ne communiquent plus que par écrit ou par leurs conseils", points: 2 },
      {
        libelle: "Toute communication est rompue depuis longtemps",
        points: 1,
        drapeau: "vigilance",
        note: "Communication rompue : prévoir des entretiens individuels avec le médiateur avant la première réunion commune.",
      },
    ],
  },
  {
    id: "equilibre",
    bloc: "relation",
    texte: "Observe-t-on un déséquilibre marqué entre les parties ?",
    aide: "La médiation suppose que chacun puisse s'exprimer et décider librement.",
    options: [
      { libelle: "Non, le rapport est globalement équilibré", points: 3 },
      {
        libelle: "Un déséquilibre existe (information, moyens, dépendance économique), mais chacun est conseillé",
        points: 2,
        drapeau: "vigilance",
        note: "Déséquilibre : veiller à ce que chaque partie soit conseillée et dispose des mêmes informations.",
      },
      {
        libelle: "Il y a des indices de violence, d'intimidation ou d'emprise",
        points: 0,
        drapeau: "contre",
        note: "Violence, intimidation ou emprise : contre-indication à examiner avec le médiateur avant toute démarche. La sécurité et la liberté du consentement passent avant tout.",
      },
    ],
  },

  // ---------- La volonté ----------
  {
    id: "client",
    bloc: "volonte",
    texte: "Votre client est-il prêt à envisager une solution négociée ?",
    aide: "Une hésitation est normale au départ ; elle se travaille souvent en première séance.",
    options: [
      { libelle: "Oui, il le souhaite", points: 3, note: "Client demandeur d'une solution négociée." },
      { libelle: "Il hésite, mais n'exclut rien", points: 2 },
      {
        libelle: "Il veut avant tout « gagner » ou obtenir une reconnaissance",
        points: 1,
        drapeau: "vigilance",
        note: "Besoin de reconnaissance : la médiation peut y répondre autrement qu'un jugement ; à expliquer au client.",
      },
    ],
  },
  {
    id: "autre-partie",
    bloc: "volonte",
    texte: "Comment l'autre partie réagirait-elle, selon vous, à une proposition de médiation ?",
    aide: "La médiation est volontaire : l'accord des deux parties est nécessaire pour la commencer.",
    options: [
      { libelle: "Plutôt favorablement", points: 3 },
      { libelle: "Je ne sais pas", points: 2 },
      {
        libelle: "Probablement par un refus",
        points: 1,
        drapeau: "vigilance",
        note: "Refus probable : une proposition présentée par le médiateur, ou suggérée par le juge, est parfois mieux reçue.",
      },
    ],
  },
  {
    id: "bonne-foi",
    bloc: "volonte",
    texte: "Une partie pourrait-elle chercher surtout à gagner du temps ?",
    aide: "Une médiation utilisée comme manœuvre retardatrice dessert tout le monde.",
    options: [
      { libelle: "Non", points: 3 },
      {
        libelle: "C'est possible",
        points: 1,
        drapeau: "vigilance",
        note: "Risque de manœuvre retardatrice : encadrer la médiation dans un calendrier court et convenu par écrit.",
      },
      {
        libelle: "Oui, clairement",
        points: 0,
        drapeau: "contre",
        note: "Stratégie retardatrice probable : la médiation risque de servir à gagner du temps ; envisager d'abord les mesures nécessaires pour protéger votre client.",
      },
    ],
  },
  {
    id: "decideurs",
    bloc: "volonte",
    texte: "Les personnes qui peuvent réellement décider pourront-elles participer ?",
    aide: "Un accord n'a de valeur que si ceux qui le signent peuvent engager les parties.",
    options: [
      { libelle: "Oui (personnes concernées ou dirigeants dûment mandatés)", points: 3 },
      {
        libelle: "Il faudra un mandat ou l'accord d'autres personnes (conseil d'administration, assureur, co-indivisaires)",
        points: 2,
        drapeau: "vigilance",
        note: "Pouvoir de décision : identifier dès le départ qui doit approuver l'accord (mandat, assureur, autres indivisaires).",
      },
      {
        libelle: "Une partie ne peut pas décider seule et cela ne peut pas être organisé",
        points: 0,
        drapeau: "contre",
        note: "Pouvoir de décision non organisable : à régler avant d'entamer une médiation.",
      },
    ],
  },

  // ---------- Le litige ----------
  {
    id: "enjeu",
    bloc: "litige",
    texte: "Sur quoi porte essentiellement le désaccord ?",
    aide: "La médiation excelle sur les intérêts ; une pure question de principe se prête moins à la négociation.",
    options: [
      {
        libelle: "Des intérêts négociables : argent, partage, délais, organisation",
        points: 3,
        note: "Enjeux négociables : terrain naturel de la médiation.",
      },
      { libelle: "Un mélange d'intérêts et de questions de principe", points: 2 },
      {
        libelle: "Une question de droit qui appelle une décision de principe d'un juge",
        points: 0,
        drapeau: "vigilance",
        note: "Besoin d'une décision de principe : la médiation peut traiter le reste du différend, le juge tranchant le point de droit.",
      },
    ],
  },
  {
    id: "creativite",
    bloc: "litige",
    texte: "Une bonne solution pourrait-elle aller au-delà de ce qu'un juge peut ordonner ?",
    aide: "Par exemple : un échelonnement, la poursuite d'une collaboration, l'attribution d'un bien affectif, des excuses.",
    options: [
      {
        libelle: "Oui, clairement",
        points: 3,
        note: "Solutions sur mesure possibles, hors de portée d'un jugement.",
      },
      { libelle: "Peut-être", points: 2 },
      { libelle: "Non, seule une somme ou un « oui ou non » est en jeu", points: 1 },
    ],
  },
  {
    id: "urgence",
    bloc: "litige",
    texte: "Une mesure urgente est-elle nécessaire (mesure conservatoire, référé) ?",
    aide: "L'urgence ne ferme pas la porte à la médiation, mais elle doit être traitée.",
    options: [
      { libelle: "Non", points: 3 },
      {
        libelle: "Oui, mais elle peut être demandée en parallèle",
        points: 2,
        drapeau: "vigilance",
        note: "Urgence : vérifier comment articuler la médiation avec les mesures urgentes ou conservatoires nécessaires.",
      },
      {
        libelle: "Oui, et elle conditionne tout le reste",
        points: 1,
        drapeau: "vigilance",
        note: "Urgence prioritaire : obtenir d'abord la mesure urgente, puis proposer la médiation pour le fond.",
      },
    ],
  },
  {
    id: "faits",
    bloc: "litige",
    texte: "Les faits essentiels sont-ils connus, ou peuvent-ils être échangés ?",
    aide: "On négocie mieux sur une base d'informations partagée.",
    options: [
      { libelle: "Oui", points: 3 },
      {
        libelle: "Il manque des éléments, qui peuvent être obtenus (pièces, chiffres, évaluation)",
        points: 2,
        drapeau: "vigilance",
        note: "Informations manquantes : prévoir un échange de pièces ou une évaluation commune pendant la médiation.",
      },
      {
        libelle: "Les faits sont fortement contestés et demandent une expertise",
        points: 1,
        drapeau: "vigilance",
        note: "Faits contestés : envisager un expert désigné d'un commun accord dans le cadre de la médiation.",
      },
    ],
  },

  // ---------- Le cadre ----------
  {
    id: "cout",
    bloc: "cadre",
    texte: "Le coût et la durée d'une procédure sont-ils proportionnés à l'enjeu ?",
    aide: "Frais, honoraires, expertises, années de procédure et temps perdu.",
    options: [
      {
        libelle: "Non, une procédure coûterait trop cher par rapport à l'enjeu",
        points: 3,
        note: "Économie de temps et de coûts par rapport à une procédure.",
      },
      { libelle: "Ils sont comparables", points: 2 },
      { libelle: "Oui, l'enjeu justifie largement une procédure", points: 1 },
    ],
  },
  {
    id: "discretion",
    bloc: "cadre",
    texte: "La discrétion est-elle importante pour les parties ?",
    aide: "Réputation, vie de famille, secret des affaires, relations avec des tiers.",
    options: [
      {
        libelle: "Oui, essentielle",
        points: 3,
        note: "Confidentialité : ce qui se dit en médiation reste confidentiel.",
      },
      { libelle: "Plutôt", points: 2 },
      { libelle: "Indifférent", points: 1 },
    ],
  },
  {
    id: "stade",
    bloc: "cadre",
    texte: "Où en est le dossier ?",
    aide: "La médiation peut intervenir à tout moment, avant ou pendant une procédure.",
    options: [
      { libelle: "Aucune procédure n'est engagée", points: 3 },
      {
        libelle: "Une procédure est engagée, pas encore plaidée",
        points: 2,
        note: "Procédure en cours : une médiation reste possible, y compris à l'initiative ou sur proposition du juge.",
      },
      {
        libelle: "La procédure est avancée ou en appel",
        points: 2,
        note: "Procédure avancée : une médiation reste possible et peut éviter une nouvelle étape coûteuse.",
      },
    ],
  },
];

// ---------- Type de dossier ----------
export type TypeDossier = "commercial" | "associes" | "succession" | "immobilier" | "autre";

export const TYPES: { id: TypeDossier; libelle: string; exemple: string; questionsClient: string[] }[] = [
  {
    id: "commercial",
    libelle: "Relation commerciale",
    exemple: "Fournisseur, client, sous-traitant, distribution, prestation de services",
    questionsClient: [
      "Le contrat contient-il une clause de médiation ou de règlement amiable ?",
      "Souhaitez-vous poursuivre la relation commerciale, et à quelles conditions ?",
      "Quel serait pour vous un délai de règlement acceptable ?",
    ],
  },
  {
    id: "associes",
    libelle: "Conflit entre associés",
    exemple: "Associés, actionnaires, administrateurs, sortie d'un associé",
    questionsClient: [
      "Les statuts ou une convention d'actionnaires prévoient-ils un mode de règlement des différends ?",
      "Souhaitez-vous rester dans la société, en sortir, ou faire sortir l'autre associé ?",
      "Comment l'activité de la société est-elle affectée par le conflit aujourd'hui ?",
    ],
  },
  {
    id: "succession",
    libelle: "Succession ou indivision",
    exemple: "Partage, sortie d'indivision, donation, entreprise familiale",
    questionsClient: [
      "Quels biens ont pour vous une valeur affective, au-delà de leur valeur financière ?",
      "Tous les héritiers ou indivisaires pourraient-ils être associés à la démarche ?",
      "Qu'est-ce qui compterait le plus pour vous dans dix ans, au sein de la famille ?",
    ],
  },
  {
    id: "immobilier",
    libelle: "Immobilier et voisinage",
    exemple: "Bail, copropriété, construction, servitude, voisinage",
    questionsClient: [
      "Allez-vous continuer à occuper les lieux ou à y côtoyer l'autre partie ?",
      "Des travaux, des délais ou une expertise pourraient-ils faire partie de la solution ?",
      "Un syndic, un assureur ou un entrepreneur devrait-il être associé ?",
    ],
  },
  {
    id: "autre",
    libelle: "Autre litige civil",
    exemple: "Tout autre différend civil ou commercial",
    questionsClient: [
      "Qu'attendez-vous concrètement de la résolution de ce litige ?",
      "Qu'est-ce qui vous empêcherait d'accepter une solution négociée ?",
      "Quelle place ce litige occupe-t-il dans votre quotidien ?",
    ],
  },
];

export const QUESTIONS_COMMUNES = [
  "Que se passerait-il, selon vous, si aucun accord n'était trouvé ?",
  "Qu'est-ce que l'autre partie dirait de la situation, si on lui posait la question ?",
];

// ---------- Verdicts ----------
export type Verdict = { niveau: "tres-favorable" | "favorable" | "prudence" | "peu-indiquee" | "contre"; titre: string; texte: string; etape: string };

/** Au-delà de ce nombre de points d'attention, le verdict ne peut pas être « très favorable ». */
export const SEUIL_VIGILANCE = 3;

export function verdict(pourcentage: number, contreIndication: boolean, nbVigilances = 0): Verdict {
  if (contreIndication) {
    return {
      niveau: "contre",
      titre: "Contre-indication à examiner",
      texte:
        "Au moins une de vos réponses signale une situation qui doit être examinée avant d'envisager une médiation. Cela ne ferme pas nécessairement la porte, mais un échange préalable avec un médiateur est indispensable.",
      etape:
        "Prendre contact avec un médiateur agréé pour un échange confidentiel sur la faisabilité, avant d'en parler à l'autre partie.",
    };
  }
  if (pourcentage >= 75 && nbVigilances < SEUIL_VIGILANCE) {
    return {
      niveau: "tres-favorable",
      titre: "Dossier très favorable à la médiation",
      texte:
        "Les principaux ingrédients d'une médiation réussie sont réunis : relation, volonté, enjeux négociables et intérêt à un règlement rapide et discret.",
      etape:
        "Présenter la médiation au client, puis la proposer à l'autre partie ou à son conseil, en suggérant un médiateur agréé.",
    };
  }
  if (pourcentage >= 55) {
    return {
      niveau: "favorable",
      titre: "Favorable, sous conditions",
      texte:
        "Le dossier se prête à la médiation, à condition de traiter les points d'attention ci-dessous dès le départ.",
      etape:
        "Préparer le client sur les points d'attention, puis proposer la médiation en précisant le cadre (calendrier, informations à échanger, personnes à associer).",
    };
  }
  if (pourcentage >= 35) {
    return {
      niveau: "prudence",
      titre: "À examiner avec prudence",
      texte:
        "Plusieurs éléments freinent la médiation à ce stade. Elle reste envisageable, éventuellement plus tard ou sur une partie du litige.",
      etape:
        "Approfondir avec le client les points d'attention ; un échange exploratoire avec un médiateur peut aider à décider.",
    };
  }
  return {
    niveau: "peu-indiquee",
    titre: "Peu indiquée à ce stade",
    texte:
      "Les conditions d'une médiation ne semblent pas réunies aujourd'hui. La situation peut toutefois évoluer : il peut être utile de refaire ce test plus tard.",
    etape: "Garder la médiation en réserve et la reproposer si la situation évolue (nouvelle étape de procédure, changement d'interlocuteur).",
  };
}
