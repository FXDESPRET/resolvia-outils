// Parties prenantes d'un litige, au-delà des deux parties principales.
// Pour chacune : ce qui compte pour elle, comment l'associer, et le risque si on l'oublie.
// STATUT : à relire.

export type Implication = "associer" | "consulter" | "informer";

export type PartiePrenante = {
  nom: string;
  interet: string;
  implication: Implication;
  risque: string;
};

export type Contexte = "commercial" | "associes" | "succession" | "construction" | "immobilier";

export const IMPLICATIONS: Record<Implication, string> = {
  associer: "À associer à la médiation",
  consulter: "À consulter avant l'accord",
  informer: "À tenir informé",
};

export const PARTIES_PRENANTES: Record<Contexte, PartiePrenante[]> = {
  commercial: [
    { nom: "Direction et conseil d'administration", interet: "Risque financier, image, continuité de l'activité, temps de la direction.", implication: "consulter", risque: "Un accord négocié par un responsable sans mandat suffisant peut être désavoué." },
    { nom: "Assureur (responsabilité civile, protection juridique)", interet: "Maîtriser le montant indemnisé et les frais de défense.", implication: "associer", risque: "Un accord conclu sans l'assureur peut ne pas être pris en charge." },
    { nom: "Banque ou financeur", interet: "Trésorerie, garanties, respect des engagements de l'entreprise.", implication: "informer", risque: "Un litige non anticipé peut fragiliser la relation de crédit." },
    { nom: "Équipes commerciales et opérationnelles", interet: "Poursuivre la relation au quotidien avec le client ou le fournisseur.", implication: "informer", risque: "Des échanges maladroits pendant le litige peuvent durcir les positions." },
    { nom: "Expert-comptable ou réviseur", interet: "Provisions, présentation du litige dans les comptes.", implication: "informer", risque: "Une provision mal calibrée pèse sur les comptes et la valorisation." },
  ],
  associes: [
    { nom: "Conseil d'administration", interet: "Gouvernance, continuité de la gestion, responsabilité des administrateurs.", implication: "consulter", risque: "Des décisions bloquées ou contestées paralysent la société." },
    { nom: "Investisseurs et actionnaires minoritaires", interet: "Valeur de leur participation, respect du pacte, visibilité.", implication: "informer", risque: "Un conflit découvert tardivement détruit la confiance et peut déclencher des clauses du pacte." },
    { nom: "Personnel et cadres clés", interet: "Stabilité, direction claire, avenir de l'entreprise.", implication: "informer", risque: "Départs de talents et perte de motivation pendant le conflit." },
    { nom: "Banques et partenaires", interet: "Solidité de la direction et de l'actionnariat.", implication: "informer", risque: "Durcissement des conditions de crédit ou des relations commerciales." },
    { nom: "Familles des associés", interet: "Patrimoine, revenus, relations personnelles, en particulier dans une entreprise familiale.", implication: "consulter", risque: "Un accord rejeté à la maison ne tient pas longtemps." },
    { nom: "Expert-comptable et conseils", interet: "Valorisation des parts, fiscalité d'une sortie, continuité des obligations.", implication: "consulter", risque: "Un accord de sortie aux conséquences fiscales mal mesurées." },
  ],
  succession: [
    { nom: "Notaire", interet: "Faire avancer la succession dans les délais et dans le respect des règles.", implication: "associer", risque: "Un accord familial difficile à traduire dans l'acte de partage." },
    { nom: "Conjoint survivant ou usufruitier", interet: "Sécurité, maintien dans le logement, revenus.", implication: "associer", risque: "Un partage qui ignore ses droits ou sa situation." },
    { nom: "Conjoints et partenaires des héritiers", interet: "Patrimoine du ménage, place dans la famille.", implication: "informer", risque: "Des influences extérieures qui rigidifient les positions." },
    { nom: "Petits-enfants et générations suivantes", interet: "Souvenirs, transmission, entreprise familiale.", implication: "informer", risque: "Un conflit qui se transmet à la génération suivante." },
    { nom: "Administration fiscale", interet: "Délais de déclaration et paiement des droits.", implication: "informer", risque: "Intérêts et pénalités en cas de retard." },
    { nom: "Banque et créanciers de la succession", interet: "Remboursement, garanties.", implication: "informer", risque: "Réalisation forcée d'un bien si les échéances ne sont pas tenues." },
  ],
  construction: [
    { nom: "Assureurs des intervenants", interet: "Limiter l'indemnisation et les frais, répartir la charge entre assureurs.", implication: "associer", risque: "Un accord que personne ne finance." },
    { nom: "Architecte et bureaux d'études", interet: "Responsabilité professionnelle, réputation.", implication: "associer", risque: "Un responsable absent vers qui chacun renvoie la faute." },
    { nom: "Sous-traitants et fournisseurs", interet: "Paiement, responsabilité limitée à leur intervention.", implication: "associer", risque: "Une répartition irréaliste si ceux qui ont exécuté ne sont pas présents." },
    { nom: "Banque du maître d'ouvrage", interet: "Libération des tranches du crédit, valeur du bien.", implication: "informer", risque: "Blocage du financement des travaux de réparation." },
    { nom: "Occupants et voisins", interet: "Usage du bien, nuisances, sécurité.", implication: "informer", risque: "Nouvelles réclamations pendant le litige." },
    { nom: "Acquéreur futur", interet: "État du bien, travaux à prévoir.", implication: "informer", risque: "Un litige non réglé qui compromet ou retarde une vente." },
  ],
  immobilier: [
    { nom: "Syndic et conseil de copropriété", interet: "Gestion de l'immeuble, budget, paix entre copropriétaires.", implication: "associer", risque: "Une décision d'assemblée générale qui contredit l'accord." },
    { nom: "Autres copropriétaires", interet: "Charges, travaux, valeur de leur lot.", implication: "informer", risque: "Une contestation de l'accord en assemblée." },
    { nom: "Assureur de l'immeuble", interet: "Prise en charge du sinistre, recours.", implication: "associer", risque: "Un accord sans couverture." },
    { nom: "Locataires ou occupants", interet: "Jouissance des lieux, sécurité, nuisances.", implication: "informer", risque: "Nouveaux conflits avec les occupants." },
    { nom: "Prestataires de l'immeuble", interet: "Paiement, poursuite du contrat.", implication: "consulter", risque: "Interruption de services pendant le conflit." },
  ],
};
