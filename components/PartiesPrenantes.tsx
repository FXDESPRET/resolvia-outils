import { IMPLICATIONS, PARTIES_PRENANTES, type Contexte } from "@/lib/partiesPrenantes";

/** Carte des parties prenantes d'un litige, au-delà des deux parties principales. */
export default function PartiesPrenantes({ contexte, ouvert = false }: { contexte: Contexte; ouvert?: boolean }) {
  const liste = PARTIES_PRENANTES[contexte];
  return (
    <details className="carte section parties-prenantes" open={ouvert}>
      <summary>
        <span>
          <strong>Au-delà des deux parties : qui d&apos;autre est concerné ?</strong>
          <small>{liste.length} parties prenantes à garder en tête</small>
        </span>
      </summary>
      <p className="note" style={{ marginTop: 12 }}>
        Un accord tient d&apos;autant mieux qu&apos;il tient compte de ceux qui le financeront, l&apos;appliqueront ou
        en subiront les effets.
      </p>
      <div className="pp-grille">
        {liste.map((p) => (
          <div key={p.nom} className="pp-carte">
            <div className="pp-tete">
              <strong>{p.nom}</strong>
              <span className={`pastille pp-${p.implication}`}>{IMPLICATIONS[p.implication]}</span>
            </div>
            <p><span className="etiquette">Ce qui compte pour elle</span><br />{p.interet}</p>
            <p style={{ margin: 0 }}><span className="etiquette">Si on l&apos;oublie</span><br />{p.risque}</p>
          </div>
        ))}
      </div>
    </details>
  );
}
