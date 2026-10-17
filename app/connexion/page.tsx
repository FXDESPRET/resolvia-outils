import { redirect } from "next/navigation";
import { utilisateurCourant } from "@/lib/acces";
import FormulaireConnexion from "./FormulaireConnexion";

export const metadata = { title: "Connexion" };

export default async function PageConnexion() {
  if (await utilisateurCourant()) redirect("/");
  return (
    <main>
      <div className="conteneur" style={{ maxWidth: 440 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Resolvia — Service de résolution amiable de conflits" className="logo-grand" width={132} height={132} />
        <div className="carte">
          <h1 style={{ fontSize: "1.6rem" }}>Espace outils</h1>
          <p className="note">
            Accès réservé. Saisissez le code personnel qui vous a été communiqué.
          </p>
          <FormulaireConnexion />
        </div>
      </div>
    </main>
  );
}
