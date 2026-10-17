import CadreOutil from "@/components/CadreOutil";
import PartiesPrenantes from "@/components/PartiesPrenantes";
import Bilan from "./Bilan";

export const metadata = { title: "Bilan de santé de l'association" };

export default function Page() {
  return (
    <CadreOutil
      id="bilan-association"
      chapeau="Dix-huit affirmations, six dimensions : vision, rôles, argent, communication, gouvernance et avenir. Chaque associé peut répondre séparément pour comparer les perceptions et repérer les tensions avant qu'elles ne s'installent."
    >
      <Bilan />
      <PartiesPrenantes contexte="associes" />
    </CadreOutil>
  );
}
