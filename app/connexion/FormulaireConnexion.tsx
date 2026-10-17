"use client";

import { useActionState } from "react";
import { seConnecter, type EtatConnexion } from "@/lib/actions";

export default function FormulaireConnexion() {
  const [etat, action, enCours] = useActionState<EtatConnexion, FormData>(seConnecter, {});
  return (
    <form action={action}>
      <div className="champ">
        <label htmlFor="code">Code d&apos;accès</label>
        <input id="code" name="code" type="password" autoComplete="off" required autoFocus />
      </div>
      {etat.erreur && <p className="erreur" role="alert">{etat.erreur}</p>}
      <button className="bouton" type="submit" disabled={enCours} style={{ width: "100%" }}>
        {enCours ? "Vérification…" : "Entrer"}
      </button>
    </form>
  );
}
