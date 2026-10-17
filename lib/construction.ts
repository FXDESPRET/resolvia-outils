// Données techniques communes aux outils « Construction, piscines et eau ».
// STATUT : À VALIDER PAR FX (expertise technique) — contenus volontairement généraux.
// Coûts des sapiteurs : VALEURS D'EXEMPLE à remplacer par des tarifs réels.

export type SapiteurId =
  | "labo-eau"
  | "recherche-fuite"
  | "camera"
  | "thermographie"
  | "essais-materiaux"
  | "stabilite"
  | "geometre"
  | "electricite"
  | "analyse-produits";

export const SAPITEURS: Record<SapiteurId, { titre: string; usage: string; coutMin: number; coutMax: number }> = {
  "labo-eau": {
    titre: "Analyse d'eau en laboratoire",
    usage: "Équilibre de l'eau (pH, TAC, TH), désinfectant et stabilisant, métaux, phosphates, nitrates ; agressivité ou entartrage de l'eau.",
    coutMin: 150,
    coutMax: 400,
  },
  "recherche-fuite": {
    titre: "Recherche de fuite",
    usage: "Test d'étanchéité, colorant, écoute électro-acoustique, gaz traceur, mise en pression des canalisations.",
    coutMin: 300,
    coutMax: 900,
  },
  camera: {
    titre: "Inspection caméra des canalisations",
    usage: "Canalisations de piscine, évacuations, drains ; localisation de casses, contre-pentes, obstructions.",
    coutMin: 250,
    coutMax: 600,
  },
  thermographie: {
    titre: "Thermographie et mesures d'humidité",
    usage: "Infiltrations, ponts thermiques, cheminement de l'humidité dans les murs, toitures et dalles.",
    coutMin: 300,
    coutMax: 800,
  },
  "essais-materiaux": {
    titre: "Prélèvements et essais de matériaux",
    usage: "Carottages, analyses de béton, mortier, enduit, pierre ou revêtement en laboratoire ; adhérence, porosité, résistance.",
    coutMin: 500,
    coutMax: 2000,
  },
  stabilite: {
    titre: "Ingénieur en stabilité",
    usage: "Fissures structurelles, tassements, ouvrages enterrés (bassins, murs de soutènement), dalles et plages.",
    coutMin: 800,
    coutMax: 2500,
  },
  geometre: {
    titre: "Géomètre",
    usage: "Relevés de niveaux et de pentes, implantation, conformité aux plans, mitoyenneté.",
    coutMin: 400,
    coutMax: 1200,
  },
  electricite: {
    titre: "Contrôle électrique",
    usage: "Équipements de piscine et de bassin (pompes, électrolyseur, éclairage), liaisons équipotentielles, conformité.",
    coutMin: 200,
    coutMax: 500,
  },
  "analyse-produits": {
    titre: "Analyse de produits et de résidus",
    usage: "Produits de traitement de l'eau, de nettoyage ou de protection des surfaces ; identification de résidus, de taches ou d'incompatibilités.",
    coutMin: 300,
    coutMax: 1000,
  },
};

export type Desordre = {
  id: string;
  titre: string;
  signes: string;
  questions: string[];
  preuves: string[];
  sapiteurs: SapiteurId[];
  piege?: string;
};

export type Ouvrage = {
  id: "piscine" | "bassin" | "exterieur";
  titre: string;
  intro: string;
  desordres: Desordre[];
};

export const OUVRAGES: Ouvrage[] = [
  {
    id: "piscine",
    titre: "Piscines et traitement de l'eau",
    intro: "Une piscine réunit génie civil, hydraulique, électricité et chimie de l'eau : un désordre a souvent plusieurs causes possibles, et chaque intervenant peut en désigner un autre.",
    desordres: [
      {
        id: "fuite",
        titre: "Perte d'eau anormale",
        signes: "Baisse de niveau supérieure à l'évaporation, sol détrempé autour du bassin, consommation d'eau en hausse.",
        questions: [
          "La perte est-elle la même filtration arrêtée et filtration en marche ?",
          "La baisse s'arrête-t-elle à une hauteur précise (skimmer, pièce à sceller, projecteur) ?",
          "Depuis quand ? Avant ou après la réception, un hivernage, des travaux ?",
        ],
        preuves: [
          "Relevés de niveau datés sur plusieurs jours, avec et sans filtration",
          "Test du seau (comparaison avec l'évaporation)",
          "Relevés du compteur d'eau",
          "Plans d'implantation des canalisations",
        ],
        sapiteurs: ["recherche-fuite", "camera"],
        piege: "Remplir sans cesse le bassin peut aggraver les dégâts au terrain et brouiller la chronologie : documenter avant d'intervenir.",
      },
      {
        id: "revetement",
        titre: "Revêtement dégradé",
        signes: "Liner plissé, décollé ou décoloré ; carrelage qui se décolle ; enduit ou peinture qui farine, se tache ou se fissure.",
        questions: [
          "Quel est l'historique de l'équilibre de l'eau (pH, TAC, TH, désinfectant) depuis la mise en eau ?",
          "Quels produits ont été utilisés, à quelles doses, par qui ?",
          "Le revêtement est-il compatible avec le système de traitement installé ?",
          "La mise en œuvre a-t-elle respecté les prescriptions du fabricant (support, temps de séchage, température) ?",
        ],
        preuves: [
          "Carnet ou relevés d'analyses d'eau",
          "Factures et fiches techniques des produits de traitement",
          "Fiches techniques et conditions de garantie du revêtement",
          "Photos datées, avec repère d'échelle",
        ],
        sapiteurs: ["labo-eau", "essais-materiaux", "analyse-produits"],
        piege: "Une eau agressive ou entartrante peut abîmer un revêtement correctement posé : le débat « pose ou entretien » se tranche souvent par l'analyse de l'eau.",
      },
      {
        id: "eau",
        titre: "Eau de mauvaise qualité persistante",
        signes: "Eau trouble ou verte malgré les traitements, irritations, odeurs, dépôts, consommation excessive de produits.",
        questions: [
          "La filtration est-elle dimensionnée pour le volume et l'usage, et fonctionne-t-elle assez longtemps ?",
          "Le système de traitement (électrolyse, régulation, dosage) est-il adapté et correctement réglé ?",
          "Le taux de stabilisant ou de phosphates est-il élevé ?",
          "L'eau de remplissage a-t-elle été analysée ?",
        ],
        preuves: [
          "Relevés pH et désinfectant, avec les dates",
          "Notice et réglages du système de traitement",
          "Note de dimensionnement de la filtration (débit, temps de recyclage)",
          "Échantillon d'eau prélevé dans un flacon propre, conservé au frais",
        ],
        sapiteurs: ["labo-eau", "analyse-produits"],
      },
      {
        id: "equipements",
        titre: "Équipements défaillants",
        signes: "Pompe, électrolyseur, régulation, chauffage ou éclairage en panne répétée ; disjonctions.",
        questions: [
          "L'équipement est-il adapté à l'installation (puissance, débit, compatibilité) ?",
          "L'installation électrique et les liaisons équipotentielles sont-elles conformes ?",
          "L'entretien prévu par le fabricant a-t-il été suivi ?",
        ],
        preuves: ["Factures et fiches techniques", "Rapports d'intervention", "Photos du local technique"],
        sapiteurs: ["electricite"],
      },
      {
        id: "structure",
        titre: "Fissures et mouvements",
        signes: "Fissures du bassin, plage ou margelles qui bougent, affaissements autour de la piscine.",
        questions: [
          "Les fissures évoluent-elles (témoins posés, mesures datées) ?",
          "Une fuite a-t-elle pu déstabiliser le terrain ?",
          "Une étude de sol a-t-elle été réalisée avant les travaux ?",
        ],
        preuves: ["Témoins de fissures datés", "Photos avec repère", "Étude de sol et plans d'exécution"],
        sapiteurs: ["stabilite", "geometre", "recherche-fuite"],
      },
    ],
  },
  {
    id: "bassin",
    titre: "Étangs et bassins",
    intro: "Un bassin d'agrément est un écosystème : l'ouvrage, la filtration, les plantes et la charge en nutriments interagissent. Le litige oppose souvent l'ouvrage à l'entretien.",
    desordres: [
      {
        id: "etancheite",
        titre: "Fuite de la membrane ou de l'ouvrage",
        signes: "Baisse de niveau, berges détrempées, membrane visible ou tendue, plis.",
        questions: [
          "La perte se situe-t-elle dans le bassin, la cascade ou le circuit de filtration ?",
          "La membrane a-t-elle été protégée (géotextile, sous-couche) et les bords remontés au-dessus du niveau d'eau ?",
          "Des racines, des rongeurs ou des pierres ont-ils pu la percer ?",
        ],
        preuves: ["Relevés de niveau datés, pompe arrêtée et en marche", "Photos des berges et des remontées de membrane", "Fiche technique de la membrane"],
        sapiteurs: ["recherche-fuite"],
        piege: "Une cascade ou un ruisseau mal conçu peut perdre plus d'eau que le bassin lui-même : tester chaque partie séparément.",
      },
      {
        id: "qualite",
        titre: "Algues, eau verte, mortalité",
        signes: "Eau verte ou trouble, algues filamenteuses, lentilles d'eau envahissantes, poissons en difficulté.",
        questions: [
          "La filtration et la zone de plantes sont-elles dimensionnées pour le volume et la population de poissons ?",
          "Quels sont les taux de nitrates, phosphates et d'oxygène ?",
          "Y a-t-il des apports extérieurs (ruissellement, engrais, feuilles) ?",
        ],
        preuves: ["Analyses d'eau datées", "Liste des plantes et des poissons introduits", "Factures du matériel de filtration"],
        sapiteurs: ["labo-eau"],
      },
      {
        id: "ouvrage",
        titre: "Berges, cascade et équipements",
        signes: "Berges qui s'effondrent, cascade qui ne coule pas comme prévu, pompe sous-dimensionnée, bruit.",
        questions: [
          "Le projet décrivait-il précisément l'ouvrage (plans, débits, matériaux) ?",
          "Les pentes et les niveaux correspondent-ils au projet ?",
        ],
        preuves: ["Devis et plans du projet", "Photos et vidéos de fonctionnement", "Fiches techniques des pompes"],
        sapiteurs: ["geometre", "electricite"],
      },
    ],
  },
  {
    id: "exterieur",
    titre: "Dégâts aux bâtiments extérieurs",
    intro: "Façades, toitures, terrasses et abords subissent l'eau, le gel et les traitements de surface. La question centrale est souvent : vice d'exécution, défaut de matériau, entretien ou usure normale ?",
    desordres: [
      {
        id: "infiltration",
        titre: "Infiltrations et humidité",
        signes: "Taches, moisissures, peinture qui cloque, salpêtre, odeurs d'humidité.",
        questions: [
          "L'humidité apparaît-elle après la pluie, en hiver, en permanence ?",
          "Vient-elle d'une infiltration, d'une remontée capillaire ou de condensation ?",
          "Des travaux récents ont-ils modifié l'enveloppe (isolation, rejointoiement, hydrofuge) ?",
        ],
        preuves: ["Photos datées et relevés par temps de pluie", "Relevés d'humidité", "Description des travaux réalisés"],
        sapiteurs: ["thermographie", "essais-materiaux"],
        piege: "Un traitement hydrofuge ou une isolation peut déplacer le problème d'humidité au lieu de le régler.",
      },
      {
        id: "facade",
        titre: "Façades : fissures, efflorescences, gel",
        signes: "Fissures, dépôts blancs, briques ou pierres qui éclatent, enduit qui se décolle.",
        questions: [
          "Les fissures sont-elles stables ou évolutives ?",
          "Le mortier ou l'enduit est-il compatible avec le support ?",
          "Les dégâts sont-ils localisés près des gouttières, appuis de fenêtre ou pieds de mur ?",
        ],
        preuves: ["Témoins de fissures datés", "Fiches techniques des mortiers et enduits", "Photos rapprochées et d'ensemble"],
        sapiteurs: ["essais-materiaux", "stabilite"],
      },
      {
        id: "terrasse",
        titre: "Terrasses et abords",
        signes: "Affaissements, pentes insuffisantes, eau stagnante, joints qui se dégradent, dalles qui bougent.",
        questions: [
          "La fondation (coffre, drainage) correspond-elle au devis et à l'usage ?",
          "Les pentes permettent-elles l'évacuation de l'eau ?",
          "Le matériau convient-il à l'exposition et au gel ?",
        ],
        preuves: ["Devis détaillé", "Relevés de niveau", "Photos après une pluie"],
        sapiteurs: ["geometre", "essais-materiaux"],
      },
      {
        id: "nettoyage",
        titre: "Dégâts après nettoyage ou traitement de surface",
        signes: "Décoloration, érosion, taches, joints creusés ou surface farinée après un nettoyage haute pression ou un traitement.",
        questions: [
          "Quel procédé et quels produits ont été utilisés (pression, buse, distance, dilution, temps de contact) ?",
          "Le support avait-il été identifié et testé sur une zone discrète ?",
          "L'état du support avant intervention était-il documenté ?",
        ],
        preuves: ["Photos avant et après", "Fiches techniques et de sécurité des produits", "Bon d'intervention"],
        sapiteurs: ["analyse-produits", "essais-materiaux"],
        piege: "Sans photos de l'état antérieur, il est difficile de distinguer un dégât causé par l'intervention d'une usure préexistante.",
      },
      {
        id: "toiture",
        titre: "Toitures",
        signes: "Fuites, tuiles ou ardoises déplacées, mousses envahissantes, condensation sous toiture.",
        questions: [
          "La fuite est-elle liée à un détail (noue, solin, fenêtre de toit) ou généralisée ?",
          "La ventilation de la toiture est-elle assurée ?",
        ],
        preuves: ["Photos intérieures et extérieures datées", "Devis et factures des travaux de toiture"],
        sapiteurs: ["thermographie"],
      },
    ],
  },
];

export const ACTEURS = [
  { id: "maitre", libelle: "Maître d'ouvrage (client)" },
  { id: "entrepreneur", libelle: "Entrepreneur ou installateur" },
  { id: "sous-traitant", libelle: "Sous-traitant" },
  { id: "architecte", libelle: "Architecte ou bureau d'études" },
  { id: "fournisseur", libelle: "Fournisseur de matériaux, d'équipements ou de produits" },
  { id: "entretien", libelle: "Société d'entretien" },
  { id: "assureur", libelle: "Assureur(s)" },
  { id: "syndic", libelle: "Copropriété ou syndic" },
] as const;

export const PREUVES_GENERALES = [
  "Photographier et filmer avant toute intervention, avec la date et un repère d'échelle",
  "Conserver le contrat, le devis, les avenants, les plans et le procès-verbal de réception",
  "Garder les factures et les fiches techniques des matériaux, équipements et produits",
  "Tenir un journal des faits : dates, constats, échanges, interventions",
  "Ne pas réparer ni modifier l'état des lieux avant un constat, sauf pour la sécurité ou pour éviter l'aggravation",
  "Prévenir l'autre partie et, le cas échéant, l'assureur, par écrit",
];
