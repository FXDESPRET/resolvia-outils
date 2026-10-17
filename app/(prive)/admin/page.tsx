import { exigerAdmin, listeAcces } from "@/lib/acces";
import { voirEnTantQue } from "@/lib/actions";
import { OUTILS, RUBRIQUES, STATUTS, VERIFICATIONS } from "@/lib/outils";
import { PROFILS_FICTIFS, libelleProfession } from "@/lib/profils";

export const metadata = { title: "Administration" };

export default async function Admin() {
  await exigerAdmin();
  const acces = listeAcces();
  const testeurs = acces.filter((a) => a.role === "testeur");
  const faites = VERIFICATIONS.filter((v) => v.fait).length;
  const pret = faites === VERIFICATIONS.length;

  return (
    <div className="conteneur">
      <h1>Administration</h1>
      <p className="chapeau">
        Phase sans base de données : les statuts se changent dans <code>lib/outils.ts</code>, les accès dans la
        variable Vercel <code>RESOLVIA_ACCES</code>. Les avis des testeurs arrivent par e-mail.
      </p>

      <section className="section">
        <h2>Voir en tant que</h2>
        <form action={voirEnTantQue} className="carte" style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "end" }}>
          <div className="champ" style={{ flex: "1 1 240px", margin: 0 }}>
            <label htmlFor="profil">Profil fictif</label>
            <select id="profil" name="profil" defaultValue={PROFILS_FICTIFS[0].id}>
              {PROFILS_FICTIFS.map((p) => (
                <option key={p.id} value={p.id}>{p.libelle}</option>
              ))}
            </select>
          </div>
          <button className="bouton" type="submit">Afficher l&apos;espace</button>
          <p className="note" style={{ flexBasis: "100%", margin: 0 }}>
            Vous verrez exactement ce qu&apos;un testeur de cette profession voit : uniquement les outils au statut
            « Ouvert aux testeurs » ou « Prêt pour le public ».
          </p>
        </form>
      </section>

      <section className="section">
        <h2>Statut des outils</h2>
        <div className="carte defile">
          <table className="tableau">
            <thead>
              <tr><th>Outil</th><th>Rubrique</th><th>Statut</th><th>Développé</th></tr>
            </thead>
            <tbody>
              {OUTILS.map((o) => (
                <tr key={o.id}>
                  <td><strong>{o.titre}</strong><br /><span className="note">{o.id}</span></td>
                  <td>{RUBRIQUES[o.rubrique].titre}</td>
                  <td><span className={`pastille st-${o.statut}`}>{STATUTS[o.statut].libelle}</span></td>
                  <td>{o.chemin ? "Oui" : "Non"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <h2>Testeurs ({testeurs.length})</h2>
        <div className="carte defile">
          {testeurs.length === 0 ? (
            <p className="note" style={{ margin: 0 }}>Aucun testeur déclaré dans RESOLVIA_ACCES.</p>
          ) : (
            <table className="tableau">
              <thead>
                <tr><th>Nom</th><th>Profession</th><th>Outils</th><th>Expire</th></tr>
              </thead>
              <tbody>
                {testeurs.map((t) => (
                  <tr key={t.code}>
                    <td>{t.nom}</td>
                    <td>{libelleProfession(t.profession)}</td>
                    <td>{(t.outils ?? []).join(", ") || "—"}</td>
                    <td>{t.expire ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <section className="section">
        <div className="section-titre">
          <h2>Vérifications avant lancement</h2>
          <small>{faites} / {VERIFICATIONS.length}</small>
        </div>
        <div className="carte">
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {VERIFICATIONS.map((v) => (
              <li key={v.libelle} style={{ padding: "6px 0" }}>
                <span aria-hidden style={{ color: v.fait ? "var(--vert)" : "var(--encre-douce)", marginRight: 8 }}>
                  {v.fait ? "✓" : "○"}
                </span>
                {v.libelle}
              </li>
            ))}
          </ul>
          <div className={`encadre ${pret ? "info" : "attention"}`} style={{ marginTop: 12 }}>
            {pret
              ? "Toutes les vérifications sont faites : l'ouverture au public peut être décidée."
              : "Ouverture au public bloquée tant que la liste n'est pas complète."}
          </div>
        </div>
      </section>
    </div>
  );
}
