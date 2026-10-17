// Psychologie des cibles : ce qu'elles vivent, ce qui les retient, ce qui peut les motiver,
// et pourquoi Resolvia est la réponse la plus adaptée. Document interne de positionnement.
// STATUT : à confronter aux retours des testeurs de chaque profession.

export const POSITIONNEMENT = "Le droit pour sécuriser l'accord, la négociation pour l'obtenir.";

export const ENJEUX = ["Délai", "Coût", "Risque", "Discrétion", "Relation", "Cadre et déontologie", "Provisions", "Valeur"] as const;

export type Cible = {
  nom: string;
  /** Niveau de chaque enjeu : 2 central, 1 secondaire, 0 peu présent. */
  enjeux: number[];
  vivent: string;
  objection: string;
  motivations: string[];
  faceAvocatMediateur: string;
  pourquoiNous: string;
  message: string;
  outils: { titre: string; lien: string }[];
  vigilance: string;
};

export const CIBLES: Cible[] = [
  {
    nom: "Avocats",
    enjeux: [2, 1, 2, 1, 2, 2, 0, 0],
    vivent: "La procédure rapporte à court terme, mais elle use : clients épuisés qui contestent les honoraires, dossiers longs à porter, issue incertaine, agenda saturé.",
    objection: "« Je perds des honoraires, et peut-être mon client si le médiateur est un confrère. »",
    motivations: [
      "L'avocat facture pendant la médiation : préparation, assistance aux séances, rédaction et vérification de l'accord.",
      "Un dossier clos vite, c'est un client qui paie, revient et recommande.",
      "Du temps libéré pour des dossiers plus rentables.",
      "L'image d'un avocat qui trouve des solutions, recherchée par les entreprises.",
    ],
    faceAvocatMediateur: "Un avocat-médiateur d'un autre cabinet reste un concurrent possible pour le client. Le négociateur de Resolvia ne plaide pas et ne conseille pas : l'avocat garde son client.",
    pourquoiNous: "Une consœur pour parler le même langage, un négociateur qui n'est pas un concurrent, et des outils pour préparer le client.",
    message: "Vous restez l'avocat de votre client du début à la fin ; nous débloquons ce qui ne se débloque pas entre avocats.",
    outils: [{ titre: "Test de médiabilité", lien: "/outils/mediabilite" }, { titre: "Simulateur de coût", lien: "/outils/simulateur-cout" }, { titre: "Carnet de clauses", lien: "/outils/carnet-clauses" }],
    vigilance: "Ne jamais donner l'impression de concurrencer l'avocat ; Amandine est la meilleure porte d'entrée.",
  },
  {
    nom: "Notaires",
    enjeux: [2, 1, 1, 2, 2, 2, 0, 1],
    vivent: "Ils se voient souvent comme les conciliateurs naturels des familles, et le sont en partie. Mais les successions bloquées dévorent leur temps, et l'acte n'est signé qu'au bout du chemin.",
    objection: "« Concilier, c'est mon métier ; faire appel à un médiateur, c'est avouer un échec. »",
    motivations: [
      "Protéger leur impartialité : un notaire trop impliqué dans le conflit finit souvent par être perçu comme du côté d'un héritier.",
      "Récupérer le temps passé en réunions de famille houleuses.",
      "Arriver à la signature de l'acte, leur véritable objectif.",
    ],
    faceAvocatMediateur: "Le notaire est déjà le juriste de la table : un second regard juridique ne l'aide pas. Il a besoin de quelqu'un qui traite la relation, la valeur affective et la créativité du partage.",
    pourquoiNous: "Nous ne faisons pas un second travail juridique : nous préparons la famille, le notaire garde la maîtrise de la succession et de l'acte.",
    message: "Vous gardez la maîtrise de la succession et de l'acte ; nous apaisons la famille pour que vous puissiez le signer.",
    outils: [{ titre: "Inventaire des attachements", lien: "/outils/inventaire-attachements" }, { titre: "Schéma de l'indivision", lien: "/outils/schema-indivision" }, { titre: "Kit de réunion familiale", lien: "/outils/kit-reunion-familiale" }],
    vigilance: "Présenter la médiation comme un service aux familles, jamais comme une prescription commerciale.",
  },
  {
    nom: "Juges et juridictions",
    enjeux: [2, 0, 1, 0, 1, 2, 0, 0],
    vivent: "Des rôles surchargés, des dossiers techniques lourds, et parfois la tentative de concilier eux-mêmes, qui prend du temps d'audience.",
    objection: "« Je ne connais pas ces médiateurs. »",
    motivations: [
      "Désengorger le rôle avec des médiateurs fiables et rapides, qui rendent compte.",
      "Confier les dossiers qu'ils redoutent : construction, plusieurs parties, enjeux techniques.",
    ],
    faceAvocatMediateur: "Les listes comptent beaucoup d'avocats-médiateurs généralistes ; peu de duos capables de mener une médiation technique à plusieurs parties.",
    pourquoiNous: "La spécialisation dans les dossiers les plus difficiles à juger.",
    message: "Des médiateurs fiables pour les dossiers techniques et à plusieurs parties, ceux que l'on redoute le plus.",
    outils: [{ titre: "Comprendre l'expertise judiciaire", lien: "/outils/expertise-judiciaire" }],
    vigilance: "Pas de démarchage direct : le message passe par la réputation — agrément, recommandation des avocats, qualité des premières médiations.",
  },
  {
    nom: "Assureurs et courtiers",
    enjeux: [2, 2, 2, 1, 2, 1, 2, 0],
    vivent: "Ils sont pilotés par des indicateurs : coût des sinistres, délai de clôture, réserves, satisfaction et plaintes des assurés.",
    objection: "« Notre gestion amiable interne suffit, et je devrai justifier une dépense nouvelle. »",
    motivations: [
      "Agir sur leurs propres indicateurs, preuves chiffrées à l'appui.",
      "Traiter les dossiers à plusieurs intervenants qu'aucun assureur ne peut animer seul.",
      "Remplacer des expertises croisées par un constat commun.",
    ],
    faceAvocatMediateur: "Honoraires à l'heure et logique de dossier juridique ; Resolvia propose forfait, délai cible, compte rendu et lecture technique des sinistres de construction.",
    pourquoiNous: "Le deuxième niveau après la gestion amiable, avant que l'avocat et l'expert ne coûtent cher.",
    message: "Nous intervenons quand votre gestion amiable s'arrête, et avant que l'avocat et l'expert ne coûtent cher.",
    outils: [{ titre: "Portefeuille de sinistres", lien: "/outils/portefeuille-sinistres" }, { titre: "Programme pilote", lien: "/contenus/programme-pilote-assureurs" }, { titre: "Budget de résolution technique", lien: "/outils/budget-technique" }],
    vigilance: "Si l'assureur oriente et paie, la neutralité doit être garantie à l'autre partie : charte d'indépendance, transparence sur qui paie, aucun objectif de résultat.",
  },
  {
    nom: "Dirigeants et conseils d'administration",
    enjeux: [2, 2, 2, 2, 2, 1, 1, 2],
    vivent: "Le litige distrait la direction de son métier ; l'ego pousse à vouloir gagner ; la responsabilité d'administrateur et l'image inquiètent.",
    objection: "« Proposer une médiation, c'est montrer qu'on doute de son bon droit. »",
    motivations: [
      "Reprendre le contrôle plutôt que subir la décision d'un juge.",
      "La discrétion et la vitesse.",
      "Sortir du conflit sans perdre la face, et préserver une relation d'affaires.",
    ],
    faceAvocatMediateur: "Une approche centrée sur les droits de chacun ; Resolvia parle coût total, délai, valeur et relation commerciale.",
    pourquoiNous: "Un négociateur qui parle affaires, et une avocate qui sécurise l'accord.",
    message: "Ne laissez pas un juge décider à votre place de l'avenir d'une relation d'affaires.",
    outils: [{ titre: "Litige et valeur de l'entreprise", lien: "/outils/valeur-entreprise" }, { titre: "Bilan de santé de l'association", lien: "/outils/bilan-association" }, { titre: "Préparer une négociation", lien: "/outils/preparer-negociation" }],
    vigilance: "S'assurer que l'interlocuteur peut décider, ou saura convaincre son conseil.",
  },
  {
    nom: "Investisseurs et gestionnaires de fonds",
    enjeux: [2, 1, 2, 2, 1, 1, 1, 2],
    vivent: "Ils détestent l'incertitude et redoutent les conflits entre fondateurs.",
    objection: "« Ce n'est pas mon litige, c'est celui de la société. »",
    motivations: [
      "Préserver la valeur de la participation.",
      "Arriver à une cession ou une levée avec un dossier propre.",
      "Rassurer leurs propres investisseurs.",
    ],
    faceAvocatMediateur: "Peu d'avocats-médiateurs abordent la valeur et le calendrier d'une opération ; c'est le cœur de notre discours.",
    pourquoiNous: "Le pacte de désaccord dès l'entrée au capital, et la médiation rapide si un conflit survient.",
    message: "Un litige clos avant l'opération, c'est de la valeur préservée.",
    outils: [{ titre: "Litige et valeur de l'entreprise", lien: "/outils/valeur-entreprise" }, { titre: "Pacte de désaccord", lien: "/outils/pacte-desaccord" }],
    vigilance: "L'investisseur n'est pas toujours partie : respecter la confidentialité vis-à-vis des parties.",
  },
  {
    nom: "Experts-comptables et réviseurs",
    enjeux: [1, 1, 2, 1, 2, 1, 2, 1],
    vivent: "Conseillers de confiance, ils voient naître les conflits avant tout le monde : entre associés, avec un client qui ne paie pas.",
    objection: "« Ce n'est pas mon rôle de me mêler des conflits de mes clients. »",
    motivations: [
      "Apporter une solution de plus sans sortir de leur rôle.",
      "Garder des clients en bonne santé, et qui paient.",
      "Simplifier la question des provisions.",
    ],
    faceAvocatMediateur: "Peu de dialogue sur les chiffres avec un avocat-médiateur ; avec Resolvia, on parle trésorerie et provisions.",
    pourquoiNous: "Un relais qui parle chiffres et ne conseille pas à leur place.",
    message: "Vous voyez le conflit venir ; nous le traitons avant qu'il ne coûte.",
    outils: [{ titre: "Litige et valeur de l'entreprise", lien: "/outils/valeur-entreprise" }, { titre: "Bilan de santé de l'association", lien: "/outils/bilan-association" }],
    vigilance: "Rester sur le terrain du conflit, sans empiéter sur leur conseil.",
  },
  {
    nom: "Entrepreneurs et architectes",
    enjeux: [2, 2, 2, 1, 2, 0, 0, 1],
    vivent: "Trésorerie, réputation, peur de l'avocat et de l'expert, crainte de voir grimper leur prime d'assurance.",
    objection: "« Si je propose une médiation, le client croira que j'ai quelque chose à me reprocher. »",
    motivations: [
      "Être payé vite.",
      "Garder le client et la réputation.",
      "Éviter le tribunal, l'expertise et la déclaration de sinistre.",
    ],
    faceAvocatMediateur: "Un avocat peut paraître adverse ou intimidant à un entrepreneur ; un négociateur qui connaît le chantier parle son langage.",
    pourquoiNous: "Des médiateurs qui connaissent le chantier et ne font pas peur.",
    message: "Réglons-le entre gens du métier, avant que les avocats ne s'en mêlent.",
    outils: [{ titre: "Diagnostic d'un litige de construction", lien: "/outils/diagnostic-construction" }, { titre: "Constat technique conjoint", lien: "/outils/constat-conjoint" }, { titre: "Carnet de clauses", lien: "/outils/carnet-clauses" }],
    vigilance: "Ne pas apparaître comme le conseil de l'entreprise : la médiation est neutre.",
  },
  {
    nom: "Syndics et copropriétés",
    enjeux: [2, 1, 1, 1, 2, 1, 0, 1],
    vivent: "Des assemblées générales tendues, des plaintes à répétition, une responsabilité exposée.",
    objection: "« Les conflits entre copropriétaires ne sont pas mon problème. »",
    motivations: [
      "Retrouver la paix dans l'immeuble et des assemblées sereines.",
      "Moins de temps perdu en conflits.",
      "Un mode de règlement prévu à l'avance, qui protège le budget.",
    ],
    faceAvocatMediateur: "Peu d'avocats-médiateurs connaissent la vie d'un immeuble et les prestataires techniques.",
    pourquoiNous: "Une approche à la fois relationnelle et technique des conflits d'immeuble.",
    message: "Un conflit réglé avant l'assemblée, c'est une assemblée qui avance.",
    outils: [{ titre: "Carnet de clauses", lien: "/outils/carnet-clauses" }, { titre: "Diagnostic d'un litige de construction", lien: "/outils/diagnostic-construction" }],
    vigilance: "Démarche déjà tentée sans relais : à reprendre après l'agrément, avec des cas concrets.",
  },
];

export const LEVIERS = [
  { titre: "Donner avant de demander", texte: "Les outils gratuits créent de la réciprocité et prouvent la méthode avant toute demande." },
  { titre: "La crédibilité", texte: "L'agrément d'abord, puis la preuve sociale : premiers dossiers et prescripteurs satisfaits, avec leur accord." },
  { titre: "Le petit pas", texte: "Un premier dossier test ou un pilote plutôt qu'un engagement." },
  { titre: "La peur de perdre", texte: "Le temps et l'argent perdus à attendre pèsent plus que ce qu'on gagne à régler : le montrer, chiffres à l'appui." },
  { titre: "Garder son rôle", texte: "Toujours rassurer le prescripteur : il garde son client, son dossier, son acte ou sa décision." },
];

export const DISTINCTION = [
  { titre: "Une avocate et un négociateur", texte: "La sécurité juridique de l'accord, et la pratique de la négociation commerciale pour l'obtenir." },
  { titre: "L'économie du dossier", texte: "Coût total, délai, valeur, relation : la langue des entreprises et des assureurs." },
  { titre: "Une lecture technique", texte: "Le bâtiment et la pratique de l'expertise judiciaire : un regard lucide sur l'alternative." },
  { titre: "Le prescripteur garde son rôle", texte: "Le négociateur ne plaide pas et ne conseille pas ; l'avocat garde son client, le notaire son acte." },
  { titre: "Des engagements concrets", texte: "Délai de première séance, forfait ou fourchette annoncée, compte rendu au prescripteur." },
];

/** Profession d'un testeur → nom de la cible correspondante. */
const CIBLE_PAR_PROFESSION: Record<string, string> = {
  avocat: "Avocats",
  notaire: "Notaires",
  assureur: "Assureurs et courtiers",
  courtier: "Assureurs et courtiers",
  administrateur: "Dirigeants et conseils d'administration",
  "gestionnaire-fonds": "Investisseurs et gestionnaires de fonds",
  "expert-comptable": "Experts-comptables et réviseurs",
  entrepreneur: "Entrepreneurs et architectes",
  syndic: "Syndics et copropriétés",
};

export function cibleDe(profession?: string) {
  const nom = profession ? CIBLE_PAR_PROFESSION[profession] : undefined;
  return nom ? CIBLES.find((c) => c.nom === nom) : undefined;
}
