"use client";

import { useState } from "react";
import ActionsResultat from "@/components/ActionsResultat";

type Onglet = "avant" | "pendant" | "apres" | "ordre" | "mediateur";

const ONGLETS: { id: Onglet; libelle: string }[] = [
  { id: "avant", libelle: "Avant" },
  { id: "pendant", libelle: "Pendant" },
  { id: "apres", libelle: "Après" },
  { id: "ordre", libelle: "Ordre du jour" },
  { id: "mediateur", libelle: "Quand faire appel à un tiers" },
];

const AVANT = [
  "Inviter toutes les personnes concernées, en même temps et par le même moyen",
  "Choisir un lieu neutre, qui ne soit pas « chez » l'une des parties si possible",
  "Fixer une durée (deux heures au maximum) et une heure de fin",
  "Envoyer l'ordre du jour à l'avance, avec les documents utiles (inventaire, estimations)",
  "Préciser qu'aucune décision définitive ne sera prise lors de cette première réunion",
  "Désigner une personne qui anime et une autre qui prend note",
  "Demander à chacun de réfléchir à ce qui compte pour lui (voir l'inventaire des attachements)",
];

const PENDANT = [
  { titre: "Ouvrir", texte: "Rappeler le but de la réunion, la durée et les règles de parole. Évoquer la personne disparue si la famille le souhaite." },
  { titre: "Écouter", texte: "Chacun s'exprime à tour de rôle, sans être interrompu : ce qu'il ressent, ce qui est important pour lui." },
  { titre: "Faire le point", texte: "Lister ensemble ce sur quoi tout le monde est d'accord, puis les questions ouvertes. Ne pas chercher à tout régler." },
  { titre: "Explorer", texte: "Sur une question ouverte, chercher plusieurs pistes avant d'en discuter le pour et le contre." },
  { titre: "Conclure", texte: "Relire les points d'accord, les questions en suspens, qui fait quoi et la date de la prochaine rencontre." },
];

const REGLES = [
  "Une personne parle à la fois",
  "On parle en « je » : ce que je ressens, ce dont j'ai besoin",
  "On ne juge pas les intentions des autres",
  "Chacun peut demander une pause",
  "Ce qui se dit reste dans la famille",
];

const PHRASES = [
  "« Si je comprends bien, ce qui est important pour toi, c'est… »",
  "« Qu'est-ce qui te permettrait d'être à l'aise avec cette solution ? »",
  "« On note ce point et on y revient à la prochaine réunion. »",
  "« Je propose qu'on fasse une pause de dix minutes. »",
];

const APRES = [
  "Envoyer à tous, dans la semaine, un compte rendu factuel : accords, questions ouvertes, prochaines étapes",
  "Laisser à chacun quelques jours pour corriger le compte rendu",
  "Informer le notaire des points d'accord éventuels",
  "Fixer la date de la réunion suivante",
];

const SIGNAUX = [
  "La réunion n'a pas pu avoir lieu, ou une personne refuse d'y participer",
  "Les échanges tournent au reproche ou ravivent d'anciens conflits",
  "Une personne n'ose pas s'exprimer devant les autres",
  "Les mêmes sujets reviennent sans avancer d'une réunion à l'autre",
  "Un bien cristallise les tensions (maison familiale, entreprise, objet de souvenir)",
  "Une procédure est envisagée ou a été annoncée",
];

export default function Kit() {
  const [onglet, setOnglet] = useState<Onglet>("avant");
  const [coches, setCoches] = useState<Record<string, boolean>>({});
  const [od, setOd] = useState({
    titre: "Réunion de famille — succession",
    date: "",
    lieu: "",
    participants: "",
    sujets: "Ce que chacun souhaite dire\nLe point sur la succession (notaire, inventaire, calendrier)\nLa maison familiale : ce qu'elle représente pour chacun\nLes prochaines étapes",
  });

  const liste = (items: string[]) => (
    <div className="choix">
      {items.map((t) => (
        <label key={t} className={`choix-option ${coches[t] ? "choisi" : ""}`}>
          <input type="checkbox" checked={!!coches[t]} onChange={(e) => setCoches((c) => ({ ...c, [t]: e.target.checked }))} />
          <span>{t}</span>
        </label>
      ))}
    </div>
  );

  const sujets = od.sujets.split("\n").map((s) => s.trim()).filter(Boolean);
  const dateLisible = od.date ? new Date(od.date + "T12:00").toLocaleDateString("fr-BE", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "[date]";
  const texteOrdre = [
    od.titre.toUpperCase(),
    `Date : ${dateLisible}`,
    `Lieu : ${od.lieu || "[lieu]"}`,
    `Participants : ${od.participants || "[participants]"}`,
    "",
    "ORDRE DU JOUR",
    ...sujets.map((s, i) => `${i + 1}. ${s}`),
    "",
    "NOS RÈGLES",
    ...REGLES.map((r) => `- ${r}`),
    "",
    "Aucune décision définitive n'est prise lors de cette réunion.",
  ].join("\n");

  return (
    <div>
      <div className="onglets non-imprime">
        {ONGLETS.map((o) => (
          <button key={o.id} className={`onglet ${onglet === o.id ? "actif" : ""}`} onClick={() => setOnglet(o.id)}>{o.libelle}</button>
        ))}
      </div>

      {onglet === "avant" && (
        <div className="carte">
          <h2>Préparer la réunion</h2>
          {liste(AVANT)}
        </div>
      )}

      {onglet === "pendant" && (
        <div>
          <div className="carte" style={{ marginBottom: 16 }}>
            <h2>Le déroulé en cinq temps</h2>
            <ol className="liste">
              {PENDANT.map((p) => <li key={p.titre} style={{ marginBottom: 10 }}><strong>{p.titre}.</strong> {p.texte}</li>)}
            </ol>
          </div>
          <div className="grille-2">
            <div className="encadre info"><h3>Les règles à rappeler</h3><ul className="liste">{REGLES.map((r) => <li key={r}>{r}</li>)}</ul></div>
            <div className="encadre info"><h3>Des phrases qui apaisent</h3><ul className="liste">{PHRASES.map((r) => <li key={r}>{r}</li>)}</ul></div>
          </div>
        </div>
      )}

      {onglet === "apres" && (
        <div className="carte">
          <h2>Après la réunion</h2>
          {liste(APRES)}
        </div>
      )}

      {onglet === "ordre" && (
        <div>
          <div className="carte non-imprime" style={{ marginBottom: 16 }}>
            <h2>Préparer l&apos;ordre du jour</h2>
            <div className="grille-2">
              <div className="champ"><label htmlFor="t">Titre</label><input id="t" type="text" value={od.titre} onChange={(e) => setOd({ ...od, titre: e.target.value })} /></div>
              <div className="champ"><label htmlFor="d">Date</label><input id="d" type="date" value={od.date} onChange={(e) => setOd({ ...od, date: e.target.value })} /></div>
              <div className="champ"><label htmlFor="l">Lieu</label><input id="l" type="text" value={od.lieu} onChange={(e) => setOd({ ...od, lieu: e.target.value })} /></div>
              <div className="champ"><label htmlFor="p">Participants</label><input id="p" type="text" value={od.participants} onChange={(e) => setOd({ ...od, participants: e.target.value })} /></div>
            </div>
            <div className="champ"><label htmlFor="s">Sujets (un par ligne)</label><textarea id="s" rows={5} value={od.sujets} onChange={(e) => setOd({ ...od, sujets: e.target.value })} /></div>
          </div>
          <div className="carte document">
            <h2 style={{ marginTop: 0 }}>{od.titre}</h2>
            <p style={{ margin: 0 }}><strong>Date :</strong> {dateLisible}<br /><strong>Lieu :</strong> {od.lieu || "[lieu]"}<br /><strong>Participants :</strong> {od.participants || "[participants]"}</p>
            <h3>Ordre du jour</h3>
            <ol>{sujets.map((s) => <li key={s}>{s}</li>)}</ol>
            <h3>Nos règles</h3>
            <ul>{REGLES.map((r) => <li key={r}>{r}</li>)}</ul>
            <p className="note">Aucune décision définitive n&apos;est prise lors de cette réunion.</p>
          </div>
          <ActionsResultat texte={texteOrdre} libelleCopie="Copier l'ordre du jour" />
        </div>
      )}

      {onglet === "mediateur" && (
        <div className="carte">
          <h2>Quand faire appel à un tiers ?</h2>
          <p>Une réunion de famille ne suffit pas toujours. Ces signaux indiquent qu&apos;un médiateur, neutre et formé, peut aider :</p>
          {liste(SIGNAUX)}
          <div className="encadre info" style={{ marginTop: 16 }}>
            Le médiateur ne décide pas à la place de la famille : il aide chacun à s&apos;exprimer et à construire une
            solution, dans un cadre confidentiel. Il peut intervenir à tout moment, y compris en parallèle du travail
            du notaire.
          </div>
        </div>
      )}

      {onglet !== "ordre" && <ActionsResultat />}
    </div>
  );
}
