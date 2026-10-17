import { notFound } from "next/navigation";
import BoutonAvis from "@/components/BoutonAvis";
import { exigerVue, peutVoir } from "@/lib/acces";
import { STATUTS, outilParId } from "@/lib/outils";
import { libelleProfession } from "@/lib/profils";
import TestMediabilite from "./TestMediabilite";

export const metadata = { title: "Test de médiabilité" };

export default async function PageMediabilite() {
  const vue = await exigerVue();
  const outil = outilParId("mediabilite")!;
  if (!peutVoir(vue, outil)) notFound();

  return (
    <div className="conteneur etroit">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap", alignItems: "baseline" }}>
        <p className="surtitre" style={{ margin: 0 }}>Outil prescripteurs</p>
        {vue.role === "admin" && <span className={`pastille st-${outil.statut}`}>{STATUTS[outil.statut].libelle}</span>}
      </div>
      <h1>Test de médiabilité</h1>
      <p className="chapeau">
        Quatorze questions, environ cinq minutes, pour savoir si un dossier se prête à la médiation, repérer les
        contre-indications et préparer l&apos;échange avec votre client.
      </p>
      <div className="encadre info" style={{ marginBottom: 24 }}>
        Confidentiel par conception : le test ne demande aucun nom et fonctionne entièrement dans votre navigateur.
        Vos réponses ne sont ni transmises ni enregistrées.
      </div>

      <TestMediabilite />

      <BoutonAvis
        outil={outil.titre}
        email={process.env.RESOLVIA_AVIS_EMAIL ?? ""}
        nom={vue.utilisateur.nom}
        profession={vue.simulation ?? libelleProfession(vue.profession)}
      />
    </div>
  );
}
