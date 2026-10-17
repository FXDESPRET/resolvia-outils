import CadreOutil from "@/components/CadreOutil";
import Fiches from "./Fiches";

export const metadata = { title: "Désordres fréquents" };

export default function Page() {
  return (
    <CadreOutil
      id="desordres"
      confidentialite={false}
      aVerifier={[
        "FX : exactitude technique de chaque fiche, désordres à ajouter (par exemple abris de piscine, chauffage, pompes à chaleur, couvertures automatiques).",
        "Ton : rester descriptif, sans désigner de responsable type.",
      ]}
      chapeau="Pour les piscines et le traitement de l'eau, les étangs et bassins, et les extérieurs : les désordres les plus fréquents, les questions à poser, les preuves à conserver et les analyses qui permettent de trancher les débats techniques."
    >
      <Fiches />
    </CadreOutil>
  );
}
