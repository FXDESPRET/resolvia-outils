import CadreOutil from "@/components/CadreOutil";
import Diagnostic from "./Diagnostic";

export const metadata = { title: "Diagnostic d'un litige de construction" };

export default function Page() {
  return (
    <CadreOutil
      id="diagnostic-construction"
      aVerifier={[
        "FX : questions techniques, preuves et sapiteurs proposés pour chaque désordre (fichier lib/construction.ts).",
        "Amandine : formulation des points de vigilance sur les délais, la réception et les garanties (aucun délai chiffré n'est donné volontairement).",
        "Amandine : mention éventuelle de l'assurance de responsabilité obligatoire des entrepreneurs, après vérification de son champ d'application.",
      ]}
      chapeau="Retard, supplément, réception, solde impayé, malfaçon, piscine ou façade : en quelques minutes, situer le litige, les intervenants et le calendrier, et savoir quelle voie privilégier — médiation, constat conjoint, médiation à plusieurs parties."
    >
      <Diagnostic />
    </CadreOutil>
  );
}
