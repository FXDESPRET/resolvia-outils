import CadreOutil from "@/components/CadreOutil";
import { REGISTRE, TYPES_ENTREE, type TypeEntree } from "@/lib/registre";

export const metadata = { title: "Registre" };

const date = (d: string) => new Date(d + "T12:00").toLocaleDateString("fr-BE", { day: "numeric", month: "short", year: "numeric" });

export default function Page() {
  const ordre: TypeEntree[] = ["decision", "fait", "hypothese"];
  return (
    <CadreOutil
      id="registre"
      etroit={false}
      confidentialite="Page strictement interne : elle n'est jamais visible des testeurs. Pour ajouter une entrée, modifier le fichier lib/registre.ts sur GitHub (ou demander à Claude)."
      chapeau="Ce que l'on sait, ce que l'on suppose et ce que l'on a décidé. Séparer les trois évite de prendre une hypothèse pour un fait, et garde la trace du pourquoi de chaque choix."
    >
      <div className="grille-3" style={{ marginBottom: 20 }}>
        {ordre.map((t) => (
          <div key={t} className="carte">
            <p className="etiquette" style={{ margin: 0 }}>{TYPES_ENTREE[t].libelle}s</p>
            <p className="chiffre" style={{ margin: 0 }}>{REGISTRE.filter((e) => e.type === t).length}</p>
          </div>
        ))}
      </div>

      {ordre.map((t) => (
        <section key={t} className="carte" style={{ marginBottom: 16 }}>
          <h2>{TYPES_ENTREE[t].libelle}s</h2>
          <div className="defile">
            <table className="tableau">
              <thead>
                <tr>
                  <th style={{ width: 110 }}>Date</th>
                  <th>{t === "hypothese" ? "Hypothèse" : "Énoncé"}</th>
                  <th>{t === "hypothese" ? "Comment la vérifier" : "Source"}</th>
                  {t === "hypothese" && <th>Statut</th>}
                </tr>
              </thead>
              <tbody>
                {REGISTRE.filter((e) => e.type === t).map((e) => (
                  <tr key={e.texte}>
                    <td className="note">{date(e.date)}</td>
                    <td>{e.texte}</td>
                    <td className="note">{t === "hypothese" ? e.verification : e.source}</td>
                    {t === "hypothese" && (
                      <td>
                        <span className={`pastille ${e.statut === "confirmee" ? "st-public" : e.statut === "infirmee" ? "st-brouillon" : "st-a-relire"}`}>
                          {e.statut === "confirmee" ? "Confirmée" : e.statut === "infirmee" ? "Infirmée" : "Ouverte"}
                        </span>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </CadreOutil>
  );
}
