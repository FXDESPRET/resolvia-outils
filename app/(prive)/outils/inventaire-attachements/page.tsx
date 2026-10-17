import CadreOutil from "@/components/CadreOutil";
import Inventaire from "./Inventaire";

export const metadata = { title: "Inventaire des attachements" };

export default function Page() {
  return (
    <CadreOutil
      id="inventaire-attachements"
      etroit={false}
      chapeau="Dans une succession, les blocages portent souvent moins sur la valeur des biens que sur ce qu'ils représentent. Cet inventaire distingue valeur affective et valeur financière, et met en évidence les biens auxquels plusieurs personnes tiennent."
    >
      <Inventaire />
    </CadreOutil>
  );
}
