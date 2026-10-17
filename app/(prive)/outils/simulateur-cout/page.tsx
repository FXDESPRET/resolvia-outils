import CadreOutil from "@/components/CadreOutil";
import Simulateur from "./Simulateur";

export const metadata = { title: "Simulateur de coût" };

export default function Page() {
  return (
    <CadreOutil
      aVerifier={[
        "Valeurs d'exemple : taux horaires, nombre et durée des séances, durées de procédure.",
        "Délais d'attente d'audience : remplacer les valeurs d'exemple par des ordres de grandeur réalistes selon les juridictions (sources à citer si affichées au public).",
        "Coût du temps : formulation du « taux annuel de référence » (rendement, crédit ou trésorerie).",
        "Prise en compte éventuelle de l'indemnité de procédure et des frais de mise au rôle de manière distincte.",
        "Formulation de l'avertissement « ni devis ni engagement d'honoraires ».",
      ]}
      id="simulateur-cout"
      etroit={false}
      chapeau="Comparez, avec vos propres hypothèses, le temps nécessaire pour obtenir une solution et le coût d'une médiation et d'une procédure, y compris l'attente liée à l'engorgement des juridictions et le coût d'une somme bloquée pendant le litige."
    >
      <Simulateur />
    </CadreOutil>
  );
}
