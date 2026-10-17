import CadreOutil from "@/components/CadreOutil";
import PartiesPrenantes from "@/components/PartiesPrenantes";
import Portefeuille from "./Portefeuille";

export const metadata = { title: "Portefeuille de sinistres" };

export default function Page() {
  return (
    <CadreOutil
      id="portefeuille-sinistres"
      etroit={false}
      aVerifier={[
        "Valeurs d'exemple (nombre de dossiers, taux d'accord, coûts, durées) : à remplacer par des ordres de grandeur réalistes avant toute présentation à un assureur.",
        "Selon FX : en Belgique, la médiation et la conciliation ne sont pas un poste défini des contrats de protection juridique (contrairement à la France) ; la prise en charge relève de chaque compagnie. À vérifier sur quelques conditions générales avant d'en parler aux assureurs.",
        "Vocabulaire assurance (réserves, recours, frais de gestion externe) : à faire relire par un gestionnaire de sinistres testeur.",
      ]}
      chapeau="Pour les compagnies d'assurance et les courtiers : estimer, sur une année, ce que représente l'orientation d'une partie des dossiers litigieux vers la médiation — frais évités, dossiers clôturés plus tôt, réserves libérées."
    >
      <Portefeuille />
      <PartiesPrenantes contexte="construction" />
    </CadreOutil>
  );
}
