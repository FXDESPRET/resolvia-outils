import CadreOutil from "@/components/CadreOutil";
import PartiesPrenantes from "@/components/PartiesPrenantes";
import Pacte from "./Pacte";

export const metadata = { title: "Pacte de désaccord" };

export default function Page() {
  return (
    <CadreOutil
      aVerifier={[
        "Portée juridique du pacte et articulation avec les statuts et la convention d'actionnaires.",
      ]}
      id="pacte-desaccord"
      chapeau="Convenir à froid, tant que tout va bien, de la manière dont les associés traiteront un désaccord : étapes, délais et règles de conduite. Le pacte se construit en quelques minutes et s'imprime pour être signé."
    >
      <Pacte />
      <PartiesPrenantes contexte="associes" />
    </CadreOutil>
  );
}
