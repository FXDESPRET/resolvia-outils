"use client";

import { useState } from "react";

type Props = {
  outil: string;
  email: string;
  nom: string;
  profession: string;
};

/** Avis du testeur : préparé dans le navigateur et envoyé par e-mail. Rien n'est stocké. */
export default function BoutonAvis({ outil, email, nom, profession }: Props) {
  const [ouvert, setOuvert] = useState(false);
  const [utile, setUtile] = useState("");
  const [commentaire, setCommentaire] = useState("");

  const sujet = `Avis testeur — ${outil}`;
  const corps = [
    `Outil : ${outil}`,
    `Testeur : ${nom}${profession ? ` (${profession})` : ""}`,
    `Utilité pour ma pratique : ${utile || "non précisé"}`,
    "",
    "Commentaire :",
    commentaire || "(aucun)",
    "",
    "— Retour d'utilisateur, non destiné à publication.",
  ].join("\n");
  const lien = `mailto:${email}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;

  if (!ouvert) {
    return (
      <div className="avis non-imprime">
        <button className="bouton secondaire" onClick={() => setOuvert(true)}>
          Donner mon avis sur cet outil
        </button>
      </div>
    );
  }

  return (
    <div className="avis carte non-imprime">
      <h3>Votre avis sur « {outil} »</h3>
      <p className="note">
        Votre retour nous aide à améliorer l&apos;outil. Il sera utilisé en interne uniquement, jamais publié comme
        témoignage. Ne mentionnez aucun élément d&apos;un dossier réel.
      </p>
      <div className="champ">
        <label htmlFor="utile">Cet outil vous serait-il utile en pratique ?</label>
        <select id="utile" value={utile} onChange={(e) => setUtile(e.target.value)}>
          <option value="">— Choisir —</option>
          <option>Oui, je l&apos;utiliserais</option>
          <option>Peut-être, avec des améliorations</option>
          <option>Non, pas dans ma pratique</option>
        </select>
      </div>
      <div className="champ">
        <label htmlFor="commentaire">Ce qui vous a plu, gêné, manqué</label>
        <textarea id="commentaire" rows={5} value={commentaire} onChange={(e) => setCommentaire(e.target.value)} />
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <a className="bouton" href={lien}>Préparer l&apos;e-mail</a>
        <button className="bouton discret" onClick={() => setOuvert(false)}>Annuler</button>
      </div>
      <p className="note" style={{ marginTop: 10, marginBottom: 0 }}>
        Votre messagerie s&apos;ouvre avec le message prérempli ; il vous suffit de l&apos;envoyer.
      </p>
    </div>
  );
}
