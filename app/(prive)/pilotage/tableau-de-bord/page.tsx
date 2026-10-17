import Link from "next/link";
import CadreOutil from "@/components/CadreOutil";
import { listeAcces } from "@/lib/acces";
import { OUTILS, RUBRIQUES, STATUTS, VERIFICATIONS, type Rubrique, type Statut } from "@/lib/outils";
import { JALONS, REGISTRE } from "@/lib/registre";

export const metadata = { title: "Tableau de bord" };

const mois = (d: string) => new Date(d + "T12:00").toLocaleDateString("fr-BE", { month: "long", year: "numeric" });

export default function Page() {
  const outils = OUTILS.filter((o) => o.rubrique !== "pilotage");
  const statuts = Object.keys(STATUTS) as Statut[];
  const testeurs = listeAcces().filter((a) => a.role === "testeur").length;
  const faites = VERIFICATIONS.filter((v) => v.fait).length;
  const hypothesesOuvertes = REGISTRE.filter((e) => e.type === "hypothese" && e.statut !== "confirmee" && e.statut !== "infirmee").length;

  // Frise : position de chaque jalon et d'aujourd'hui.
  const t = (d: string) => new Date(d + "T12:00").getTime();
  const debut = t(JALONS[0].date);
  const fin = t(JALONS[JALONS.length - 1].date);
  const pos = (ms: number) => Math.min(100, Math.max(0, ((ms - debut) / (fin - debut)) * 100));
  const aujourdhui = pos(Date.now());

  return (
    <CadreOutil
      id="tableau-de-bord"
      etroit={false}
      confidentialite={false}
      chapeau="L'avancement du projet en un coup d'œil : outils, testeurs, calendrier et vérifications avant lancement."
    >
      <div className="grille-3" style={{ marginBottom: 20 }}>
        <Indicateur valeur={outils.length} libelle="outils et contenus" />
        <Indicateur valeur={outils.filter((o) => o.statut === "testeurs" || o.statut === "public").length} libelle="ouverts aux testeurs" />
        <Indicateur valeur={testeurs} libelle="testeurs invités" />
        <Indicateur valeur={`${faites}/${VERIFICATIONS.length}`} libelle="vérifications faites" />
        <Indicateur valeur={hypothesesOuvertes} libelle="hypothèses à vérifier" lien="/pilotage/registre" />
      </div>

      <section className="carte" style={{ marginBottom: 16 }}>
        <h2>Calendrier</h2>
        <div className="frise" aria-hidden>
          <div className="frise-ligne" />
          <div className="frise-avance" style={{ width: `${aujourdhui}%` }} />
          {JALONS.map((j) => (
            <span key={j.date} className={`frise-point ${t(j.date) <= Date.now() ? "passe" : ""}`} style={{ left: `${pos(t(j.date))}%` }} />
          ))}
        </div>
        <ol className="liste" style={{ marginTop: 16 }}>
          {JALONS.map((j) => (
            <li key={j.date}>
              <strong style={{ textTransform: "capitalize" }}>{mois(j.date)}</strong> — {j.libelle}
              {j.propose && <span className="note"> (date proposée, à confirmer)</span>}
            </li>
          ))}
        </ol>
      </section>

      <section className="carte" style={{ marginBottom: 16 }}>
        <h2>Avancement par rubrique</h2>
        <div className="defile">
          <table className="tableau">
            <thead>
              <tr><th>Rubrique</th>{statuts.map((s) => <th key={s}>{STATUTS[s].libelle.split(" (")[0]}</th>)}</tr>
            </thead>
            <tbody>
              {(Object.keys(RUBRIQUES) as Rubrique[]).filter((r) => r !== "pilotage").map((r) => (
                <tr key={r}>
                  <td><strong>{RUBRIQUES[r].titre}</strong></td>
                  {statuts.map((s) => {
                    const n = outils.filter((o) => o.rubrique === r && o.statut === s).length;
                    return <td key={s}>{n ? <span className={`pastille st-${s}`}>{n}</span> : <span className="note">—</span>}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note" style={{ marginBottom: 0 }}>Détail et liste des testeurs dans <Link href="/admin">Administration</Link>.</p>
      </section>
    </CadreOutil>
  );
}

function Indicateur({ valeur, libelle, lien }: { valeur: number | string; libelle: string; lien?: string }) {
  const contenu = (
    <>
      <p className="chiffre" style={{ margin: 0 }}>{valeur}</p>
      <p className="note" style={{ margin: 0 }}>{libelle}</p>
    </>
  );
  return lien ? <Link href={lien} className="carte carte-outil">{contenu}</Link> : <div className="carte">{contenu}</div>;
}
