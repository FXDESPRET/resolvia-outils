import { notFound } from "next/navigation";
import BoutonAvis from "@/components/BoutonAvis";
import { exigerVue, peutVoir } from "@/lib/acces";
import { RUBRIQUES, STATUTS, outilParId } from "@/lib/outils";
import { libelleProfession } from "@/lib/profils";

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
