import Link from "next/link";
import { exigerVue, outilsVisibles } from "@/lib/acces";
import { RUBRIQUES, STATUTS, type Rubrique } from "@/lib/outils";

export default async function Accueil() {
  const vue = await exigerVue();
  const outils = outilsVisibles(vue);
  const admin = vue.role === "admin";
  const rubriques = (Object.keys(RUBRIQUES) as Rubrique[]).filter((r) =>
    outils.some((o) => o.rubrique === r),
  );

  return (
    <div className="conteneur">
      <h1>{admin ? "Tous les outils" : "Vos outils"}</h1>
      <p className="chapeau">
        {admin
          ? "Vue administrateur : tous les outils apparaissent, avec leur statut. Les testeurs ne voient que les outils ouverts qui leur sont attribués."
          : "Merci de tester ces outils. Ils fonctionnent entièrement dans votre navigateur : rien de ce que vous saisissez n'est enregistré. Un bouton vous permet de donner votre avis sur chacun."}
      </p>

      {outils.length === 0 && (
        <div className="encadre info section">
          Aucun outil ne vous est encore ouvert. Nous vous préviendrons dès qu&apos;un outil sera prêt à être testé.
        </div>
      )}

      {rubriques.map((r) => (
        <section key={r} className="section">
          <div className="section-titre">
            <h2>{RUBRIQUES[r].titre}</h2>
            {admin && <small>{RUBRIQUES[r].destination}</small>}
          </div>
          <div className="grille">
            {outils
              .filter((o) => o.rubrique === r)
              .map((o) => {
                const contenu = (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "start" }}>
                      <h3 style={{ margin: 0 }}>{o.titre}</h3>
                      {admin && <span className={`pastille st-${o.statut}`}>{STATUTS[o.statut].libelle}</span>}
                    </div>
                    <p>{o.resume}</p>
                    <span className="note">{o.chemin ? "Ouvrir l'outil →" : "En préparation"}</span>
                  </>
                );
                return o.chemin ? (
                  <Link key={o.id} href={o.chemin} className="carte carte-outil">
                    {contenu}
                  </Link>
                ) : (
                  <div key={o.id} className="carte carte-outil inactif">
                    {contenu}
                  </div>
                );
              })}
          </div>
        </section>
      ))}
    </div>
  );
}
