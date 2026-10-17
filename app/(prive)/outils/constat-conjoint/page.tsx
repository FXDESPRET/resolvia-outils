import CadreOutil from "@/components/CadreOutil";
import Protocole from "./Protocole";

export const metadata = { title: "Protocole de constat technique conjoint" };

export default function Page() {
  return (
    <CadreOutil
      id="constat-conjoint"
      aVerifier={[
        "Amandine : portée juridique des deux options (avis non contraignant, constatations de fait acceptées) ; option d'un avis liant volontairement écartée à ce stade.",
        "Amandine : articulation avec la confidentialité de la médiation (le rapport est-il couvert ou non ?).",
        "FX : mission type de l'expert et délai de rapport réalistes.",
        "Règle d'incompatibilité : l'expert du constat n'est pas le médiateur du même dossier.",
      ]}
      chapeau="Plutôt que deux expertises unilatérales qui s'opposent, les parties choisissent ensemble un expert, fixent sa mission, les sapiteurs autorisés et le partage des frais. Le protocole se génère ici et s'imprime pour être signé."
    >
      <Protocole />
    </CadreOutil>
  );
}
