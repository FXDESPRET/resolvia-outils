import CadreOutil from "@/components/CadreOutil";
import PartiesPrenantes from "@/components/PartiesPrenantes";
import Valeur from "./Valeur";

export const metadata = { title: "Litige et valeur de l'entreprise" };

export default function Page() {
  return (
    <CadreOutil
      id="valeur-entreprise"
      etroit={false}
      aVerifier={[
        "Expert-comptable testeur : vocabulaire et logique de la provision (exposition = montant × risque, présentée comme un ordre de grandeur seulement).",
        "Gestionnaire de fonds testeur : réalisme de la garantie ou du séquestre lors d'une cession ou d'une levée de fonds.",
        "Valeurs d'exemple à remplacer.",
      ]}
      chapeau="Pour les dirigeants, administrateurs et investisseurs : un litige qui dure ne coûte pas seulement des honoraires. Il immobilise une exposition, mobilise la direction et pèse sur une cession ou une levée de fonds."
    >
      <Valeur />
      <PartiesPrenantes contexte="commercial" />
    </CadreOutil>
  );
}
