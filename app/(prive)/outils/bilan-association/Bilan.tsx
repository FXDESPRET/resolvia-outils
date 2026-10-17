"use client";

import { useState } from "react";
import ActionsResultat from "@/components/ActionsResultat";

// Textes à relire. Échelle de 1 (pas du tout d'accord) à 5 (tout à fait d'accord).
const DIMENSIONS = [
  {
    id: "vision",
    titre: "Vision commune",
    affirmations: [
      "Nous partageons la même idée de ce que la société doit devenir dans cinq ans.",
      "Nous sommes d'accord sur le rythme de croissance et le niveau de risque acceptable.",
      "Les valeurs qui guident nos décisions sont les mêmes pour chacun de nous.",
    ],
    conseil: "Prendre une demi-journée pour reformuler ensemble la vision et les priorités, en distinguant ce qui est partagé de ce qui ne l'est plus.",
  },
  {
    id: "roles",
    titre: "Rôles et pouvoirs",
    affirmations: [
      "Le rôle de chaque associé est clair et reconnu par les autres.",
      "Chacun sait qui décide de quoi, et dans quelles limites.",
      "L'investissement de chacun dans la société me paraît équilibré.",
    ],
    conseil: "Écrire noir sur blanc les responsabilités et les délégations de chacun, et revoir la question de l'équilibre des contributions.",
  },
  {
    id: "argent",
    titre: "Argent",
    affirmations: [
      "La rémunération de chaque associé me paraît juste.",
      "Nous sommes d'accord sur la politique de dividendes et de réinvestissement.",
      "Les questions d'argent se discutent ouvertement entre nous.",
    ],
    conseil: "Mettre à plat, chiffres à l'appui, la rémunération, les dividendes et les besoins de chacun : c'est souvent là que les tensions se cristallisent.",
  },
  {
    id: "communication",
    titre: "Communication",
    affirmations: [
      "Je peux exprimer un désaccord sans craindre de nuire à la relation.",
      "Les informations importantes circulent entre associés sans retard.",
      "Quand un problème surgit, nous en parlons rapidement entre nous.",
    ],
    conseil: "Instaurer un point régulier entre associés, distinct des réunions opérationnelles, pour parler de la relation elle-même.",
  },
  {
    id: "gouvernance",
    titre: "Gouvernance",
    affirmations: [
      "Nos statuts et conventions reflètent la réalité actuelle de notre association.",
      "Nous savons comment trancher si nous ne sommes pas d'accord.",
      "Les décisions importantes sont prises dans les formes et au bon niveau.",
    ],
    conseil: "Relire statuts et convention d'actionnaires avec votre conseil, et prévoir un mécanisme de traitement des désaccords (voir le « Pacte de désaccord »).",
  },
  {
    id: "avenir",
    titre: "Avenir et sortie",
    affirmations: [
      "Nous avons parlé de ce qui se passerait si l'un de nous voulait partir.",
      "Les règles de valorisation et de cession des parts sont connues de tous.",
      "Nous avons envisagé les situations imprévues (maladie, décès, séparation).",
    ],
    conseil: "Aborder les scénarios de sortie à froid, tant que la relation est bonne : c'est beaucoup plus difficile une fois le conflit installé.",
  },
];

const ECHELLE = ["Pas du tout", "Plutôt pas", "Mitigé", "Plutôt", "Tout à fait"];
type Reponses = Record<string, number>; // clé "dimension-index" -> 1..5

const cle = (d: string, i: number) => `${d}-${i}`;

export default function Bilan() {
  const [associes, setAssocies] = useState(["Associé 1"]);
  const [actif, setActif] = useState(0);
  const [reps, setReps] = useState<Reponses[]>([{}]);

  const total = DIMENSIONS.reduce((a, d) => a + d.affirmations.length, 0);
  const complet = (r: Reponses) => Object.keys(r).length === total;
  const remplis = reps.map((r, i) => ({ i, r })).filter((x) => complet(x.r));

  const scoreDim = (r: Reponses, d: (typeof DIMENSIONS)[number]) => {
    const v = d.affirmations.map((_, i) => r[cle(d.id, i)]).filter(Boolean) as number[];
    return v.length ? v.reduce((a, c) => a + c, 0) / v.length : 0;
  };

  function ajouterAssocie() {
    if (associes.length >= 4) return;
    setAssocies((a) => [...a, `Associé ${a.length + 1}`]);
    setReps((r) => [...r, {}]);
    setActif(associes.length);
  }

  const lignes = DIMENSIONS.map((d) => {
    const scores = remplis.map((x) => scoreDim(x.r, d));
    const moyenne = scores.length ? scores.reduce((a, c) => a + c, 0) / scores.length : 0;
    const ecart = scores.length > 1 ? Math.max(...scores) - Math.min(...scores) : 0;
    return { d, scores, moyenne, ecart };
  });
  const fragiles = lignes.filter((l) => l.moyenne > 0 && l.moyenne < 3.5);
  const divergentes = lignes.filter((l) => l.ecart >= 1.5);
  const couleur = (s: number) => (s >= 4 ? "var(--vert)" : s >= 3 ? "var(--ambre)" : "var(--rouge)");
  const f1 = (n: number) => n.toFixed(1).replace(".", ",");

  const texte = [
    "BILAN DE SANTÉ DE L'ASSOCIATION — Resolvia",
    `Réponses : ${remplis.map((x) => associes[x.i]).join(", ") || "aucune"}`,
    "",
    ...lignes.map((l) => `- ${l.d.titre} : ${f1(l.moyenne)} / 5${l.ecart >= 1.5 ? " (perceptions divergentes)" : ""}`),
    "",
    "À TRAVAILLER",
    ...(fragiles.length ? fragiles.map((l) => `- ${l.d.titre} : ${l.d.conseil}`) : ["- aucune dimension fragile"]),
  ].join("\n");

  const r = reps[actif];

  return (
    <div>
      <div className="encadre info" style={{ marginBottom: 16 }}>
        L&apos;idéal : chaque associé répond seul, sans voir les réponses des autres, puis vous comparez. Les écarts de
        perception sont souvent plus parlants que les scores eux-mêmes.
      </div>

      <div className="onglets non-imprime">
        {associes.map((a, i) => (
          <button key={i} className={`onglet ${actif === i ? "actif" : ""}`} onClick={() => setActif(i)}>
            {a}{complet(reps[i]) ? " ✓" : ""}
          </button>
        ))}
        {associes.length < 4 && <button className="onglet" onClick={ajouterAssocie}>+ Ajouter un associé</button>}
      </div>

      <div className="carte non-imprime">
        <div className="champ" style={{ maxWidth: 300 }}>
          <label htmlFor="nom-associe">Nom ou initiales</label>
          <input id="nom-associe" type="text" maxLength={20} value={associes[actif]} onChange={(e) => setAssocies((a) => a.map((x, i) => (i === actif ? e.target.value : x)))} />
        </div>
        {DIMENSIONS.map((d) => (
          <div key={d.id} style={{ marginTop: 22 }}>
            <h3>{d.titre}</h3>
            {d.affirmations.map((t, i) => (
              <div key={t} className="affirmation">
                <p>{t}</p>
                <div className="echelle" role="group" aria-label={t}>
                  {ECHELLE.map((e, k) => (
                    <button key={e} className={r[cle(d.id, i)] === k + 1 ? "actif" : ""} onClick={() => setReps((all) => all.map((x, j) => (j === actif ? { ...x, [cle(d.id, i)]: k + 1 } : x)))}>
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
        <p className="note" style={{ marginTop: 16, marginBottom: 0 }}>
          {Object.keys(r).length} / {total} réponses pour {associes[actif]}.
        </p>
      </div>

      {remplis.length > 0 ? (
        <div className="carte section resultat">
          <p className="surtitre">Résultat</p>
          <h2>{fragiles.length === 0 ? "Une association en bonne santé" : `${fragiles.length} dimension${fragiles.length > 1 ? "s" : ""} à travailler`}</h2>
          <div className="defile">
            <table className="tableau">
              <thead>
                <tr><th>Dimension</th>{remplis.map((x) => <th key={x.i}>{associes[x.i]}</th>)}{remplis.length > 1 && <th>Moyenne</th>}</tr>
              </thead>
              <tbody>
                {lignes.map((l) => (
                  <tr key={l.d.id}>
                    <td><strong>{l.d.titre}</strong>{l.ecart >= 1.5 && <div className="note" style={{ color: "var(--ambre)" }}>Perceptions divergentes</div>}</td>
                    {l.scores.map((s, k) => <td key={k} style={{ color: couleur(s), fontWeight: 700 }}>{f1(s)}</td>)}
                    {remplis.length > 1 && <td style={{ color: couleur(l.moyenne), fontWeight: 700 }}>{f1(l.moyenne)}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {divergentes.length > 0 && (
            <div className="encadre attention" style={{ marginTop: 14 }}>
              <h3>Vous ne voyez pas les choses de la même manière</h3>
              <p style={{ margin: 0 }}>
                Sur {divergentes.map((l) => l.d.titre.toLowerCase()).join(", ")}, vos perceptions diffèrent nettement.
                C&apos;est un bon point de départ pour une discussion : demandez à chacun ce qui explique sa réponse.
              </p>
            </div>
          )}
          {fragiles.length > 0 && (
            <div className="encadre info" style={{ marginTop: 14 }}>
              <h3>Pistes</h3>
              <ul className="liste">{fragiles.map((l) => <li key={l.d.id}><strong>{l.d.titre} :</strong> {l.d.conseil}</li>)}</ul>
            </div>
          )}
          <p className="note" style={{ marginTop: 14, marginBottom: 0 }}>
            Si les tensions sont déjà vives, un médiateur peut aider à rouvrir le dialogue avant que le désaccord ne
            devienne un litige.
          </p>
        </div>
      ) : (
        <p className="note section">Le résultat s&apos;affiche dès qu&apos;un associé a répondu à toutes les affirmations.</p>
      )}

      <ActionsResultat texte={texte} libelleCopie="Copier le bilan" />
    </div>
  );
}
