import CadreOutil from "@/components/CadreOutil";
import PartiesPrenantes from "@/components/PartiesPrenantes";
import Kit from "./Kit";

export const metadata = { title: "Kit de réunion familiale" };

export default function Page() {
  return (
    <CadreOutil
      id="kit-reunion-familiale"
      chapeau="Tout pour préparer, animer et conclure une réunion de famille autour d'une succession : liste de préparation, déroulé, règles de parole, ordre du jour à imprimer et signaux qui indiquent qu'un tiers serait utile."
    >
      <Kit />
      <PartiesPrenantes contexte="succession" />
    </CadreOutil>
  );
}
