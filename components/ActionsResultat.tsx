"use client";

import { useState } from "react";

/** Boutons « Copier » et « Imprimer » communs aux outils. */
export default function ActionsResultat({
  texte,
  libelleCopie = "Copier le texte",
  children,
}: {
  texte?: string;
  libelleCopie?: string;
  children?: React.ReactNode;
}) {
  const [copie, setCopie] = useState(false);

  async function copier() {
    if (!texte) return;
    try {
      await navigator.clipboard.writeText(texte);
      setCopie(true);
      setTimeout(() => setCopie(false), 2500);
    } catch {
      /* presse-papiers indisponible */
    }
  }

  return (
    <div className="actions non-imprime">
      <div>{children}</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {texte !== undefined && (
          <button type="button" className="bouton secondaire" onClick={copier}>
            {copie ? "Copié ✓" : libelleCopie}
          </button>
        )}
        <button type="button" className="bouton" onClick={() => window.print()}>
          Imprimer ou enregistrer en PDF
        </button>
      </div>
    </div>
  );
}
