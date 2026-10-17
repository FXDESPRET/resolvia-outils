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
        "Règle de combinaison à deux parties : indice de la partie la moins disposée, écart signalé à partir de 30 points.",
        "Code de réponse : il ne contient que des chiffres ; vérifier que cette transmission convient aux prescripteurs.",
      ]}
      id="mediabilite"
      chapeau="Quatorze questions, environ cinq minutes par partie, pour savoir si un dossier se prête à la médiation. Le test peut être rempli par une seule partie (résultat provisoire) ou par les deux, pour un résultat fondé sur la partie la moins disposée et une vue des écarts de perception."
      confidentialite="Confidentiel par conception : le test ne demande aucun nom et fonctionne entièrement dans votre navigateur. Vos réponses ne sont ni transmises ni enregistrées."
    >
      <TestMediabilite />
    </CadreOutil>
  );
}
