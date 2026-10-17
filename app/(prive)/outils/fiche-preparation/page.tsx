import CadreOutil from "@/components/CadreOutil";
import Fiche from "./Fiche";

export const metadata = { title: "Fiche de préparation client" };

export default function Page() {
  return (
    <CadreOutil
      aVerifier={[
        "Description de la première séance, à ajuster à votre propre pratique.",
      ]}
      id="fiche-preparation"
      chapeau="Une fiche à transmettre à votre client pour l'aider à préparer sa première séance de médiation : ce qui compte pour lui, ses marges de manœuvre, ses pistes de solution et sa solution de repli."
    >
      <Fiche />
    </CadreOutil>
  );
}
