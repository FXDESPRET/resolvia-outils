import CadreOutil from "@/components/CadreOutil";
import Budget from "./Budget";

export const metadata = { title: "Budget de résolution technique" };

export default function Page() {
  return (
    <CadreOutil
      id="budget-technique"
      etroit={false}
      aVerifier={[
        "FX : fourchettes de coût des sapiteurs et taux horaire d'expert (valeurs d'exemple dans lib/construction.ts et en tête de Budget.tsx).",
        "Amandine : présentation de la charge de la provision d'expertise et des frais en voie judiciaire.",
        "Tarifs de médiation et de co-médiation à définir.",
      ]}
      chapeau="Comparez le coût d'une résolution amiable — médiation ou co-médiation, expert commun et sapiteurs choisis ensemble — à celui d'une expertise judiciaire suivie d'une procédure."
    >
      <Budget />
    </CadreOutil>
  );
}
