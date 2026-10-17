import CadreOutil from "@/components/CadreOutil";
import Schema from "./Schema";

export const metadata = { title: "Schéma de l'indivision" };

export default function Page() {
  return (
    <CadreOutil
      aVerifier={[
        "Observations sur l'indemnité d'occupation et sur l'usufruit.",
        "Rappel du principe de sortie d'indivision.",
      ]}
      id="schema-indivision"
      etroit={false}
      chapeau="Qui détient quoi, qui veut quoi ? Ce schéma rassemble sur une seule page les quotes-parts et les souhaits de chaque indivisaire, pour faire apparaître les convergences et les points de blocage."
    >
      <Schema />
    </CadreOutil>
  );
}
