import { redirect } from "next/navigation";
import { utilisateurCourant } from "@/lib/acces";
import FormulaireConnexion from "./FormulaireConnexion";

export const metadata = { title: "Connexion" };

export default async function PageConnexion() {
  if (await utilisateurCourant()) redirect("/");
  return (
    <main>
      <div className="conteneur" style={{ maxWidth: 440 }}>
        <p className="marque" style={{ marginBottom: 24 }}>
          RESOLV<span>IA</span>
        </p>
        <div className="carte">
          <h1 style={{ fontSize: "1.5rem" }}>Espace outils</h1>
          <p className="note">
            Accès réservé. Saisissez le code personnel qui vous a été communiqué.
          </p>
          <FormulaireConnexion />
        </div>
      </div>
    </main>
  );
}
