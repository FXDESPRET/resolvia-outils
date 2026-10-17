import Link from "next/link";
import CadreOutil from "@/components/CadreOutil";
import { CIBLES, DISTINCTION, ENJEUX, LEVIERS, POSITIONNEMENT } from "@/lib/cibles";

export const metadata = { title: "Cibles et enjeux" };

const point = (n: number) => <span className={`pt pt-${n}`} aria-label={n === 2 ? "central" : n === 1 ? "secondaire" : "peu présent"} />;

export default function Page() {
  return (
    <CadreOutil
      id="cibles"
      etroit={false}
      confidentialite="Page strictement interne, réservée aux administrateurs."
      chapeau="Ce que vit chaque cible, ce qui la retient, ce qui peut la motiver, et pourquoi Resolvia est non seulement une réponse, mais la réponse la plus adaptée. À enrichir avec les retours des testeurs de chaque profession."
    >
      <div className="carte resultat">
        <p className="surtitre">Notre positionnement</p>
        <h2 style={{ fontSize: "1.6rem" }}>{POSITIONNEMENT}</h2>
        <p style={{ marginBottom: 0 }}>
          La plupart des médiateurs agréés sont des avocats : leur force, c&apos;est le droit. Resolvia réunit une avocate
          et un négociateur. Règle de ton : jamais « pas des avocats », toujours « une avocate <strong>et</strong> un
          négociateur ». Les avocats restent nos premiers prescripteurs.
        </p>
      </div>

      <section className="section">
        <h2>Le principe : trois niveaux de motivation</h2>
        <div className="grille-3">
          <div className="carte"><h3>L&apos;intérêt</h3><p style={{ margin: 0 }}>Argent, temps, charge de travail.</p></div>
          <div className="carte"><h3>Le statut</h3><p style={{ margin: 0 }}>Son rôle, son image, son expertise. C&apos;est là que se cache presque toujours l&apos;objection.</p></div>
          <div className="carte"><h3>La tranquillité</h3><p style={{ margin: 0 }}>Moins de risques, de clients mécontents, de dossiers qui pourrissent.</p></div>
        </div>
        <div className="encadre info" style={{ marginTop: 14 }}>
          <strong>La réponse à l&apos;objection cachée :</strong> vous gardez votre rôle, nous prenons ce qui vous pèse.
        </div>
      </section>

      <section className="section">
        <h2>Ce qui nous distingue</h2>
        <div className="grille-3">
          {DISTINCTION.map((d) => (
            <div key={d.titre} className="carte"><h3>{d.titre}</h3><p style={{ margin: 0 }}>{d.texte}</p></div>
          ))}
        </div>
      </section>

      <section className="carte section">
        <h2>Les enjeux par cible</h2>
        <p className="note"><span className="pt pt-2" /> enjeu central · <span className="pt pt-1" /> enjeu secondaire · <span className="pt pt-0" /> peu présent</p>
        <div className="defile">
          <table className="tableau grille-enjeux">
            <thead><tr><th>Cible</th>{ENJEUX.map((e) => <th key={e}>{e}</th>)}</tr></thead>
            <tbody>
              {CIBLES.map((c) => (
                <tr key={c.nom}><td><a href={`#${ancre(c.nom)}`}><strong>{c.nom}</strong></a></td>{c.enjeux.map((n, i) => <td key={i} className={`niveau-${n}`}>{point(n)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {CIBLES.map((c) => (
        <article key={c.nom} id={ancre(c.nom)} className="carte section fiche-cible">
          <h2>{c.nom}</h2>
          <div className="grille-2">
            <div>
              <p className="etiquette">Ce qu&apos;ils vivent</p>
              <p>{c.vivent}</p>
              <p className="etiquette">L&apos;objection cachée</p>
              <p className="objection">{c.objection}</p>
            </div>
            <div>
              <p className="etiquette">Ce qui peut les motiver</p>
              <ul className="liste">{c.motivations.map((m) => <li key={m}>{m}</li>)}</ul>
            </div>
          </div>
          <div className="grille-2" style={{ marginTop: 10 }}>
            <div className="encadre info">
              <p className="etiquette" style={{ marginTop: 0 }}>Pourquoi Resolvia est la réponse la plus adaptée</p>
              <p style={{ margin: 0 }}>{c.pourquoiNous}</p>
            </div>
            <div className="encadre" style={{ background: "var(--fond)" }}>
              <p className="etiquette" style={{ marginTop: 0 }}>Face à un avocat-médiateur</p>
              <p style={{ margin: 0 }}>{c.faceAvocatMediateur}</p>
            </div>
          </div>
          <p className="message-cible">{"«\u00a0" + c.message + "\u00a0»"}</p>
          <p style={{ margin: "0 0 6px" }}>
            <span className="etiquette">Outils à montrer :</span>{" "}
            {c.outils.map((o, i) => <span key={o.lien}>{i > 0 && " · "}<Link href={o.lien}>{o.titre}</Link></span>)}
          </p>
          <p className="note" style={{ margin: 0 }}><strong>Vigilance :</strong> {c.vigilance}</p>
        </article>
      ))}

      <section className="section">
        <h2>Les leviers communs</h2>
        <div className="grille-3">
          {LEVIERS.map((l) => (
            <div key={l.titre} className="carte"><h3>{l.titre}</h3><p style={{ margin: 0 }}>{l.texte}</p></div>
          ))}
        </div>
      </section>
    </CadreOutil>
  );
}

function ancre(nom: string) {
  return nom.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z]+/g, "-");
}
