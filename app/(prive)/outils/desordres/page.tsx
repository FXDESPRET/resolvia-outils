import CadreOutil from "@/components/CadreOutil";
import Fiches from "./Fiches";

export const metadata = { title: "Désordres fréquents" };

export default function Page() {
  return (
    <CadreOutil
      id="desordres"
      confidentialite={false}
      aVerifier={[
        "FX : exactitude technique de chaque fiche, désordres à ajouter (abris et couvertures de piscine, toitures plates…).",
        "Amandine : fiches « Déroulement du chantier et contrat » (réception, retenues, suppléments, rupture) au regard de sa pratique en droit de la construction.",
        "Ton : rester descriptif, sans désigner de responsable type.",
      ]}
      chapeau="Du contrat de chantier aux piscines, en passant par le gros œuvre, les techniques, les finitions et les extérieurs : les litiges les plus fréquents, les questions à poser, les preuves à conserver et les analyses qui permettent de dépasser les débats techniques."
    >
      <Fiches />
    </CadreOutil>
  );
}
