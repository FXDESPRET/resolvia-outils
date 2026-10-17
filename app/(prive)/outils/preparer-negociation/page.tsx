import CadreOutil from "@/components/CadreOutil";
import Negociation from "./Negociation";

export const metadata = { title: "Préparer une négociation" };

export default function Page() {
  return (
    <CadreOutil
      id="preparer-negociation"
      aVerifier={[
        "FX : méthode et vocabulaire, à aligner sur ta pratique de la négociation commerciale et sur les formations Resolvia.",
        "Neutralité : outil destiné à une partie ; préciser qu'un médiateur Resolvia ne conseille jamais une partie dans un dossier qu'il médie.",
      ]}
      chapeau="Un plan de négociation en une page : votre objectif, votre seuil, votre solution de repli sans accord, celle de l'autre partie, la zone d'accord possible et les monnaies d'échange. Pour préparer une négociation commerciale, un règlement de litige ou une séance de médiation."
    >
      <Negociation />
    </CadreOutil>
  );
}
