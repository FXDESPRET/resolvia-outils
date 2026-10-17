// Professions des testeurs et profils fictifs pour le mode « voir en tant que ».

export const PROFESSIONS: Record<string, string> = {
  avocat: "Avocat",
  notaire: "Notaire",
  administrateur: "Administrateur de société",
  "gestionnaire-fonds": "Gestionnaire de fonds d'investissement",
  "expert-comptable": "Expert-comptable",
  assureur: "Compagnie d'assurance (gestion des sinistres)",
  courtier: "Courtier en assurances",
  entrepreneur: "Entrepreneur ou architecte",
  syndic: "Syndic de copropriété",
  autre: "Autre profession",
};

export function libelleProfession(id?: string) {
  return id ? PROFESSIONS[id] ?? id : "";
}

export const PROFILS_FICTIFS = [
  { id: "avocat-type", libelle: "Avocat type", profession: "avocat" },
  { id: "notaire-type", libelle: "Notaire type", profession: "notaire" },
  { id: "administrateur-type", libelle: "Administrateur de société type", profession: "administrateur" },
  { id: "gestionnaire-type", libelle: "Gestionnaire de fonds type", profession: "gestionnaire-fonds" },
  { id: "assureur-type", libelle: "Gestionnaire de sinistres type", profession: "assureur" },
  { id: "courtier-type", libelle: "Courtier type", profession: "courtier" },
  { id: "expert-comptable-type", libelle: "Expert-comptable type", profession: "expert-comptable" },
  { id: "entrepreneur-type", libelle: "Entrepreneur type", profession: "entrepreneur" },
  { id: "syndic-type", libelle: "Syndic type", profession: "syndic" },
];
