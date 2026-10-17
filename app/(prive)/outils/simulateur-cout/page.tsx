import CadreOutil from "@/components/CadreOutil";
import Simulateur from "./Simulateur";

export const metadata = { title: "Simulateur de coût" };

export default function Page() {
  return (
    <CadreOutil
      aVerifier={[
        "Valeurs d'exemple : taux horaires, nombre et durée des séances, durées de procédure.",
        "Prise en compte éventuelle de l'indemnité de procédure et des frais de mise au rôle de manière distincte.",
        "Formulation de l'avertissement « ni devis ni engagement d'honoraires ».",
      ]}
      id="simulateur-cout"
      etroit={false}
      chapeau="Comparez, avec vos propres hypothèses, l'ordre de grandeur du coût et de la durée d'une médiation et d'une procédure. Un support concret pour en parler avec votre client."
    >
      <Simulateur />
    </CadreOutil>
  );
}
