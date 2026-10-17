import Link from "next/link";
import Marque from "@/components/Marque";
import { exigerVue } from "@/lib/acces";
import { seDeconnecter, voirEnTantQue } from "@/lib/actions";
import { libelleProfession } from "@/lib/profils";

export default async function LayoutPrive({ children }: { children: React.ReactNode }) {
  const vue = await exigerVue();
  const estAdmin = vue.utilisateur.role === "admin";

  return (
    <>
      {vue.simulation && (
        <div className="bandeau-simulation">
          <div className="conteneur">
            <span>
              Vous voyez l&apos;espace comme : <strong>{vue.simulation}</strong>
            </span>
            <form action={voirEnTantQue}>
              <input type="hidden" name="profil" value="" />
              <button className="bouton discret" type="submit" style={{ minHeight: 34, padding: "4px 12px" }}>
                Revenir à ma vue
              </button>
            </form>
          </div>
        </div>
      )}
      <header className="entete">
        <div className="conteneur">
          <Marque />
          <nav className="nav">
            <Link href="/">Outils</Link>
            {estAdmin && <Link href="/admin">Administration</Link>}
            <span className="qui">
              {vue.utilisateur.nom}
              {vue.utilisateur.role === "testeur" && vue.profession
                ? ` · ${libelleProfession(vue.profession)}`
                : ""}
            </span>
            <form action={seDeconnecter}>
              <button className="bouton discret" type="submit" style={{ minHeight: 34, padding: "4px 12px" }}>
                Se déconnecter
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="pied">
        <div className="conteneur">
          Espace privé en phase de test. Aucune réponse saisie dans les outils n&apos;est enregistrée.
        </div>
      </footer>
    </>
  );
}
