import CadreOutil from "@/components/CadreOutil";
import Portefeuille from "./Portefeuille";

export const metadata = { title: "Portefeuille de sinistres" };

export default function Page() {
  return (
    <CadreOutil
      id="portefeuille-sinistres"
      etroit={false}
      aVerifier={[
        "Valeurs d'exemple (nombre de dossiers, taux d'accord, coûts, durées) : à remplacer par des ordres de grandeur réalistes avant toute présentation à un assureur.",
        "Amandine : conditions de prise en charge des frais de médiation dans les contrats de protection juridique, à vérifier avant d'en parler aux assureurs.",
        "Vocabulaire assurance (réserves, recours, frais de gestion externe) : à faire relire par un gestionnaire de sinistres testeur.",
      ]}
      chapeau="Pour les compagnies d'assurance et les courtiers : estimer, sur une année, ce que représente l'orientation d'une partie des dossiers litigieux vers la médiation — frais évités, dossiers clôturés plus tôt, réserves libérées."
    >
      <Portefeuille />
    </CadreOutil>
  );
}
