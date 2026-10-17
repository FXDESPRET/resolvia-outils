import CadreOutil from "@/components/CadreOutil";
import TestMediabilite from "./TestMediabilite";

export const metadata = { title: "Test de médiabilité" };

export default function PageMediabilite() {
  return (
    <CadreOutil
      aVerifier={[
        "Pondérations des réponses et seuils des verdicts (75 %, 55 %, 35 % ; plafonnement à partir de trois points d'attention).",
        "Formulation des contre-indications (violence ou emprise, stratégie retardatrice, pouvoir de décision).",
        "Mention de la médiation familiale comme hors champ du test.",
      ]}
      id="mediabilite"
      chapeau="Quatorze questions, environ cinq minutes, pour savoir si un dossier se prête à la médiation, repérer les contre-indications et préparer l'échange avec votre client."
      confidentialite="Confidentiel par conception : le test ne demande aucun nom et fonctionne entièrement dans votre navigateur. Vos réponses ne sont ni transmises ni enregistrées."
    >
      <TestMediabilite />
    </CadreOutil>
  );
}
