"use client";

import { useState } from "react";
import ActionsResultat from "@/components/ActionsResultat";
import ZoneTexte from "@/components/ZoneTexte";

// Fiche destinée au CLIENT (vouvoiement). Textes à relire.
const RUBRIQUES = [
  {
    id: "situation",
    titre: "La situation, en quelques mots",
    invite: "Décrivez le désaccord comme vous le raconteriez à un proche. Inutile d'être complet : l'essentiel suffit.",
  },
  {
    id: "important",
    titre: "Ce qui compte vraiment pour vous",
    invite:
      "Au-delà de ce que vous réclamez, qu'est-ce qui est important ? (sécurité financière, reconnaissance, tranquillité, préserver une relation, tourner la page, délai…)",
  },
  {
    id: "autre",
    titre: "Ce que l'autre partie pourrait ressentir ou souhaiter",
    invite:
      "Sans lui donner raison, comment l'autre partie verrait-elle la situation ? Qu'est-ce qui pourrait compter pour elle ?",
  },
  {
    id: "negociable",
    titre: "Ce qui est négociable, ce qui ne l'est pas",
    invite: "Sur quels points pourriez-vous bouger ? Lesquels sont, pour vous, vraiment essentiels ?",
  },
  {
    id: "pistes",
    titre: "Les pistes de solution imaginables",
    invite:
      "Notez au moins trois idées, même imparfaites. En médiation, les solutions peuvent aller au-delà d'une somme d'argent : délais, échanges, engagements, excuses…",
  },
  {
    id: "repli",
    titre: "Si aucun accord n'est trouvé",
    invite:
      "Que se passerait-il concrètement ? Combien de temps, quels coûts, quels risques, quel impact sur vous et vos proches ? (Votre avocat peut vous aider à y répondre.)",
  },
  {
    id: "questions",
    titre: "Vos questions pour le médiateur",
    invite: "Ce que vous aimeriez savoir avant de commencer : déroulement, confidentialité, durée, coût…",
  },
];

const DOCUMENTS = [
  "Le contrat, les statuts ou l'acte concerné",
  "Les échanges importants (courriers, e-mails)",
  "Les factures, décomptes ou chiffres utiles",
  "Les rapports d'expertise ou évaluations éventuels",
  "La liste des personnes qui devront approuver un accord",
  "Votre agenda des disponibilités pour les prochaines semaines",
];

export default function Fiche() {
  const [rep, setRep] = useState<Record<string, string>>({});
  const [docs, setDocs] = useState<Record<string, boolean>>({});

  const texte = [
    "MA PRÉPARATION À LA MÉDIATION",
    "",
    ...RUBRIQUES.flatMap((r) => [r.titre.toUpperCase(), rep[r.id]?.trim() || "—", ""]),
    "DOCUMENTS À RASSEMBLER",
    ...DOCUMENTS.map((d) => `[${docs[d] ? "x" : " "}] ${d}`),
  ].join("\n");

  return (
    <div>
      <div className="carte" style={{ marginBottom: 20 }}>
        <h2>Pour vous, avant la première séance</h2>
        <p>
          La médiation est un espace confidentiel où vous cherchez, avec l&apos;autre partie et l&apos;aide d&apos;un
          médiateur neutre, une solution qui vous convienne à tous les deux. Personne ne vous imposera de décision.
        </p>
        <p style={{ marginBottom: 0 }}>
          Cette fiche vous aide à clarifier vos idées. Elle est <strong>pour vous seul</strong> : vous n&apos;êtes pas
          obligé de la montrer. Remplissez-la ici puis imprimez-la, ou imprimez-la vierge pour l&apos;écrire à la main.
        </p>
      </div>

      {RUBRIQUES.map((r, i) => (
        <div key={r.id} className="carte" style={{ marginBottom: 14, breakInside: "avoid" }}>
          <h3>
            <span className="num-rubrique">{i + 1}</span> {r.titre}
          </h3>
          <p className="note">{r.invite}</p>
          <ZoneTexte value={rep[r.id] ?? ""} onChange={(v) => setRep((x) => ({ ...x, [r.id]: v }))} lignes={4} />
        </div>
      ))}

      <div className="carte" style={{ marginBottom: 14, breakInside: "avoid" }}>
        <h3>
          <span className="num-rubrique">{RUBRIQUES.length + 1}</span> Les documents utiles à rassembler
        </h3>
        <div className="choix">
          {DOCUMENTS.map((d) => (
            <label key={d} className={`choix-option ${docs[d] ? "choisi" : ""}`}>
              <input type="checkbox" checked={!!docs[d]} onChange={(e) => setDocs((x) => ({ ...x, [d]: e.target.checked }))} />
              <span>{d}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="encadre info section">
        <h3>Comment se passe la première séance ?</h3>
        <p style={{ margin: 0 }}>
          Le médiateur rappelle les règles (confidentialité, respect, liberté de chacun), puis chaque partie expose sa
          vision de la situation sans être interrompue. On identifie ensemble les sujets à traiter et l&apos;on convient
          de la suite. Votre avocat peut vous accompagner.
        </p>
      </div>

      <ActionsResultat texte={texte} libelleCopie="Copier mes réponses">
        <button type="button" className="bouton discret" onClick={() => { setRep({}); setDocs({}); }}>
          Tout effacer
        </button>
      </ActionsResultat>
    </div>
  );
}
