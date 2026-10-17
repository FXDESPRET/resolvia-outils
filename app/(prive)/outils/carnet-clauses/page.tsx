import CadreOutil from "@/components/CadreOutil";
import Carnet from "./Carnet";

export const metadata = { title: "Carnet de clauses" };

export default function Page() {
  return (
    <CadreOutil
      aVerifier={[
        "Portée actuelle de la clause de médiation devant le juge saisi (disposition du Code judiciaire à citer ou non).",
        "Bail : compatibilité avec les règles régionales, en particulier pour la résidence principale.",
        "Validité des clauses dans les contrats avec des consommateurs (exclus à ce stade).",
        "Indivision : formulation du principe selon lequel nul n'est tenu de rester en indivision.",
      ]}
      id="carnet-clauses"
      chapeau="Des modèles de clauses de médiation commentés, à personnaliser puis copier dans vos contrats, statuts, baux ou conventions d'indivision."
      confidentialite={false}
    >
      <Carnet />
    </CadreOutil>
  );
}
