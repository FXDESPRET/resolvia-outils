import { notFound } from "next/navigation";
import BoutonAvis from "@/components/BoutonAvis";
import { exigerVue, peutVoir } from "@/lib/acces";
import { RUBRIQUES, STATUTS, outilParId } from "@/lib/outils";
import { libelleProfession } from "@/lib/profils";
import { GROUPES, REGARDS, groupeDe, type Groupe } from "@/lib/regards";

type Props = {
  id: string;
  chapeau: React.ReactNode;
  /** Encadré de confidentialité (par défaut : rien n'est enregistré). */
  confidentialite?: React.ReactNode | false;
  etroit?: boolean;
  /** Points à vérifier, visibles uniquement des administrateurs. */
  aVerifier?: string[];
  children: React.ReactNode;
};

/** Cadre commun à tous les outils : contrôle d'accès, en-tête, statut, avis. */
export default async function CadreOutil({ id, chapeau, confidentialite, etroit = true, aVerifier, children }: Props) {
  const vue = await exigerVue();
  const outil = outilParId(id);
  if (!outil || !peutVoir(vue, outil)) notFound();

  return (
    <div className={`conteneur ${etroit ? "etroit" : ""}`}>
      <div className="entete-outil">
        <p className="surtitre" style={{ margin: 0 }}>{RUBRIQUES[outil.rubrique].titre}</p>
        {vue.role === "admin" && <span className={`pastille st-${outil.statut}`}>{STATUTS[outil.statut].libelle}</span>}
      </div>
      <h1>{outil.titre}</h1>
      <p className="chapeau">{chapeau}</p>
      {vue.role === "admin" && aVerifier && aVerifier.length > 0 && (
        <details className="encadre attention non-imprime" style={{ marginBottom: 20 }}>
          <summary style={{ cursor: "pointer", fontWeight: 600 }}>À vérifier avant ouverture ({aVerifier.length})</summary>
          <ul className="liste" style={{ marginTop: 8 }}>{aVerifier.map((v) => <li key={v}>{v}</li>)}</ul>
        </details>
      )}
      <Regards id={id} admin={vue.role === "admin"} profession={vue.profession} />
      {confidentialite !== false && (
        <div className="encadre info non-imprime" style={{ marginBottom: 24 }}>
          {confidentialite ??
            "Confidentiel par conception : cet outil fonctionne entièrement dans votre navigateur. Rien de ce que vous saisissez n'est transmis ni enregistré ; pensez à imprimer ou copier le résultat avant de fermer la page."}
        </div>
      )}

      {children}

      {outil.rubrique !== "pilotage" && (
        <BoutonAvis
          outil={outil.titre}
          email={process.env.RESOLVIA_AVIS_EMAIL ?? ""}
          nom={vue.utilisateur.nom}
          profession={vue.simulation ?? libelleProfession(vue.profession)}
        />
      )}
    </div>
  );
}

/** « Ce que cet outil vous apporte » : selon la profession, ou toutes les lectures pour l'administrateur. */
function Regards({ id, admin, profession }: { id: string; admin: boolean; profession?: string }) {
  const regards = REGARDS[id];
  if (!regards) return null;
  if (admin) {
    const entrees = (Object.keys(regards) as Groupe[]).filter((g) => regards[g]);
    return (
      <details className="encadre regards non-imprime" style={{ marginBottom: 16 }}>
        <summary style={{ cursor: "pointer", fontWeight: 600 }}>Ce que cet outil apporte à chaque cible ({entrees.length})</summary>
        <dl className="regards-liste">
          {entrees.map((g) => (
            <div key={g}><dt>{GROUPES[g].titre}</dt><dd>{regards[g]}</dd></div>
          ))}
        </dl>
      </details>
    );
  }
  const g = groupeDe(profession);
  const texte = g ? regards[g] : undefined;
  if (!texte) return null;
  return (
    <div className="encadre regards non-imprime" style={{ marginBottom: 16 }}>
      <strong>Pour vous, {libelleProfession(profession).toLowerCase()} :</strong> {texte}
    </div>
  );
}
