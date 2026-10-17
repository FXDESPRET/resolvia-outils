// Modèles de clauses. STATUT : À VALIDER (déontologie / juridique) avant toute ouverture.
// Les variables entre accolades sont remplacées par les choix de l'utilisateur.

export type Clause = {
  id: string;
  categorie: "contrats" | "societes" | "immobilier" | "famille";
  titre: string;
  usage: string;
  texte: string;
  commentaires: string[];
};

export const CATEGORIES: Record<Clause["categorie"], string> = {
  contrats: "Contrats commerciaux",
  societes: "Sociétés et associés",
  immobilier: "Immobilier et construction",
  famille: "Patrimoine familial",
};

export const CLAUSES: Clause[] = [
  {
    id: "simple",
    categorie: "contrats",
    titre: "Clause de médiation simple",
    usage: "Contrat de fourniture, de distribution, de prestation de services entre professionnels.",
    texte:
      "En cas de différend relatif à la conclusion, à l'interprétation, à l'exécution ou à la fin du présent contrat, les parties s'engagent, avant toute procédure judiciaire ou arbitrale, à recourir à la médiation.\n\nLa partie la plus diligente notifie à l'autre, par écrit, sa volonté d'entamer une médiation. Les parties désignent {mediateur} dans les {delaiDesignation} jours de cette notification.\n\nLa médiation se tient à {lieu}, en langue {langue}. Les honoraires et frais du médiateur sont supportés {frais}.\n\nSi aucun accord n'est intervenu dans les {delaiMediation} jours de la première réunion de médiation, ou si l'une des parties met fin à la médiation, chaque partie retrouve la liberté de saisir la juridiction compétente.",
    commentaires: [
      "Le délai de fin de médiation évite qu'une partie utilise la clause pour retarder le règlement du litige.",
      "En droit belge, une clause de médiation peut conduire le juge saisi à suspendre l'examen de la cause à la demande d'une partie : vérifier la disposition applicable du Code judiciaire et sa portée actuelle.",
      "Prévoir que la clause n'empêche pas de demander des mesures urgentes ou conservatoires.",
    ],
  },
  {
    id: "echelonnee",
    categorie: "contrats",
    titre: "Clause échelonnée : négociation, médiation, juge",
    usage: "Relations commerciales durables, contrats à forte valeur, partenariats.",
    texte:
      "Les parties s'efforcent de régler à l'amiable tout différend né du présent contrat selon les étapes suivantes :\n\n1. Négociation directe : les responsables désignés par chaque partie se rencontrent dans les 15 jours de la notification écrite du différend.\n\n2. Médiation : à défaut d'accord dans les 30 jours de cette notification, les parties recourent à la médiation et désignent {mediateur} dans les {delaiDesignation} jours. La médiation se tient à {lieu}, en langue {langue}, et ses frais sont supportés {frais}.\n\n3. Juridiction : à défaut d'accord dans les {delaiMediation} jours de la première réunion de médiation, chaque partie peut saisir la juridiction compétente.\n\nLe recours à ces étapes ne fait pas obstacle à l'introduction d'une demande de mesures urgentes ou conservatoires.",
    commentaires: [
      "Désigner nommément les fonctions qui négocient (par exemple, directeurs généraux) donne du poids à la première étape.",
      "Les délais doivent rester courts : une clause trop longue décourage son application.",
    ],
  },
  {
    id: "associes",
    categorie: "societes",
    titre: "Clause de médiation entre associés",
    usage: "Statuts ou convention d'actionnaires, notamment dans les sociétés familiales ou à petit nombre d'associés.",
    texte:
      "Tout différend entre associés, ou entre un ou plusieurs associés et la société, relatif aux présents statuts, à la gestion de la société ou aux relations entre associés, est soumis à la médiation avant toute action judiciaire, sauf urgence.\n\nLe médiateur est {mediateur}, désigné dans les {delaiDesignation} jours de la demande écrite d'un associé. Ses honoraires sont supportés {frais}.\n\nPendant la médiation, les associés s'engagent à assurer la continuité de la gestion courante de la société et à s'abstenir de toute communication publique relative au différend.\n\nÀ défaut d'accord dans les {delaiMediation} jours de la première réunion, chaque partie recouvre sa liberté d'action.",
    commentaires: [
      "L'engagement de continuité de gestion protège la société pendant le conflit : c'est souvent l'argument décisif pour les associés.",
      "À articuler avec les clauses de sortie existantes (préemption, exclusion, retrait) et avec le droit des sociétés applicable.",
      "Pour aller plus loin, voir l'outil « Pacte de désaccord ».",
    ],
  },
  {
    id: "bail",
    categorie: "immobilier",
    titre: "Clause de médiation dans un bail",
    usage: "Bail commercial ou bail entre professionnels. Pour un bail de résidence principale, vérifier les règles régionales applicables.",
    texte:
      "En cas de différend relatif au présent bail, notamment quant aux travaux, aux charges, à l'état des lieux ou à la révision du loyer, les parties s'engagent à tenter une médiation avant toute procédure, sauf urgence.\n\nLe médiateur est {mediateur}, désigné dans les {delaiDesignation} jours de la demande écrite de l'une des parties. Ses honoraires sont supportés {frais}. À défaut d'accord dans les {delaiMediation} jours de la première réunion, chaque partie retrouve la liberté de saisir le juge compétent.",
    commentaires: [
      "Le bail relève de règles régionales en Belgique : vérifier la compatibilité de la clause avec la réglementation de la Région concernée.",
      "Utile pour les baux longs, où la relation doit se poursuivre après le différend.",
    ],
  },
  {
    id: "construction",
    categorie: "immobilier",
    titre: "Clause de médiation pour un contrat d'entreprise",
    usage: "Contrat d'entreprise, de construction ou de rénovation, construction de piscine ou de bassin, entre professionnels.",
    texte:
      "Tout différend relatif à l'exécution des travaux, aux délais, aux suppléments ou à la réception est soumis à la médiation avant toute procédure, sauf urgence.\n\nLe médiateur est {mediateur}, désigné dans les {delaiDesignation} jours de la demande écrite de l'une des parties. Les parties peuvent convenir, dans le cadre de la médiation, de désigner ensemble un expert technique, assisté au besoin de sapiteurs pour les analyses spécialisées, dont elles partagent les frais selon un budget convenu à l'avance. Les honoraires du médiateur sont supportés {frais}.\n\nÀ défaut d'accord dans les {delaiMediation} jours de la première réunion, chaque partie retrouve la liberté de saisir le juge compétent.",
    commentaires: [
      "La possibilité d'un expert commun évite la bataille d'expertises, souvent coûteuse en construction.",
      "Une médiation rapide permet parfois de poursuivre le chantier pendant la discussion.",
      "Pour organiser le constat commun, voir l'outil « Protocole de constat technique conjoint ».",
    ],
  },
  {
    id: "indivision",
    categorie: "famille",
    titre: "Clause de médiation dans une convention d'indivision",
    usage: "Convention d'indivision entre héritiers ou co-indivisaires (immeuble familial, seconde résidence).",
    texte:
      "En cas de désaccord entre indivisaires sur la gestion, l'occupation, l'entretien ou la sortie de l'indivision, les indivisaires s'engagent à recourir à la médiation avant toute action en justice, sauf urgence.\n\nLe médiateur est {mediateur}, désigné dans les {delaiDesignation} jours de la demande écrite d'un indivisaire. Ses honoraires sont supportés {frais}. À défaut d'accord dans les {delaiMediation} jours de la première réunion, chaque indivisaire recouvre sa liberté d'action.",
    commentaires: [
      "Le principe selon lequel nul n'est tenu de rester dans l'indivision s'applique : la clause organise le dialogue, elle ne peut pas l'empêcher indéfiniment.",
      "À coordonner avec le notaire qui rédige ou détient la convention.",
    ],
  },
];

export const OPTIONS_MEDIATEUR = [
  "un médiateur agréé par la Commission fédérale de médiation, choisi de commun accord",
  "un médiateur agréé par la Commission fédérale de médiation, choisi de commun accord ou, à défaut d'accord, désigné par [à compléter]",
  "[nom du médiateur], médiateur agréé, ou à défaut un médiateur agréé choisi de commun accord",
];

export const OPTIONS_FRAIS = [
  "à parts égales par les parties",
  "à parts égales par les parties, chacune supportant les frais de son propre conseil",
  "selon la répartition convenue dans le protocole de médiation",
];
