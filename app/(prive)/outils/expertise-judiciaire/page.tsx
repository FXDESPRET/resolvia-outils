import Link from "next/link";
import CadreOutil from "@/components/CadreOutil";
import ActionsResultat from "@/components/ActionsResultat";

export const metadata = { title: "Comprendre l'expertise judiciaire" };

const FAIT = [
  "Il répond aux questions techniques que le juge lui a posées dans sa mission, et à elles seules.",
  "Il constate, décrit et mesure les désordres, en présence des parties.",
  "Il recherche leurs causes techniques et donne son avis sur les travaux nécessaires et leur coût.",
  "Il conduit ses travaux de manière contradictoire : chaque partie est convoquée, reçoit les pièces et peut faire valoir ses observations.",
  "Il peut faire appel à des sapiteurs pour des analyses qui sortent de sa spécialité.",
  "Il tente de concilier les parties ; si elles s'accordent, il constate la conciliation et sa mission prend fin.",
  "Il remet un rapport motivé, qui éclaire le juge.",
];

const FAIT_PAS = [
  "Il ne détermine pas les responsabilités au sens juridique : c'est le rôle du juge.",
  "Il ne dit pas le droit : il n'interprète pas le contrat et ne qualifie pas juridiquement les faits.",
  "Il ne condamne personne et ne fixe pas les indemnités.",
  "Il ne sort pas de sa mission, même si une autre question lui paraît utile.",
  "Il ne prend parti pour personne, y compris pour la partie qui a demandé l'expertise.",
  "Son avis ne lie pas le juge, qui reste libre de l'apprécier.",
];

const ETAPES = [
  { titre: "Désignation", texte: "Le juge désigne l'expert et fixe sa mission, c'est-à-dire la liste des questions techniques." },
  { titre: "Provision", texte: "Une provision est versée pour couvrir ses honoraires et frais, en général par la partie qui demande l'expertise." },
  { titre: "Installation", texte: "Première réunion avec toutes les parties et leurs conseils : calendrier, pièces à fournir, visite des lieux." },
  { titre: "Investigations", texte: "Visites, réunions, analyses et sapiteurs. Chaque partie peut se faire assister de son propre conseiller technique." },
  { titre: "Avis provisoire", texte: "L'expert communique ses premières conclusions ; les parties disposent d'un délai pour formuler leurs observations." },
  { titre: "Rapport final", texte: "L'expert répond aux observations et dépose son rapport définitif." },
  { titre: "Retour au juge", texte: "L'affaire revient devant le juge, qui statue sur les responsabilités et les montants, après de nouvelles plaidoiries. Un appel reste possible." },
];

const COUTS = [
  "Les honoraires et frais de l'expert, au temps passé",
  "Les sapiteurs éventuels (laboratoire, recherche de fuite, stabilité…)",
  "Les honoraires d'avocat de chaque partie, pour chaque réunion et chaque note",
  "Souvent, un conseiller technique pour chaque partie, qui assiste aux réunions",
  "Le temps des parties elles-mêmes, et parfois l'impossibilité d'utiliser ou de réparer le bien pendant l'expertise",
];

const TEXTE = [
  "COMPRENDRE L'EXPERTISE JUDICIAIRE — Resolvia",
  "",
  "CE QUE FAIT L'EXPERT",
  ...FAIT.map((x) => `- ${x}`),
  "",
  "CE QU'IL NE FAIT PAS",
  ...FAIT_PAS.map((x) => `- ${x}`),
  "",
  "LES ÉTAPES",
  ...ETAPES.map((e, i) => `${i + 1}. ${e.titre} : ${e.texte}`),
  "",
  "CE QUE CELA COÛTE",
  ...COUTS.map((x) => `- ${x}`),
].join("\n");

export default function Page() {
  return (
    <CadreOutil
      id="expertise-judiciaire"
      confidentialite={false}
      aVerifier={[
        "Amandine : rôle de l'expert, caractère contradictoire, liberté d'appréciation du juge — vérifier les dispositions du Code judiciaire et décider s'il faut les citer.",
        "À VÉRIFIER EN PRIORITÉ : disposition exacte imposant à l'expert de tenter la conciliation, et effet de la conciliation sur sa mission.",
        "FX : déroulement pratique, postes de coût, ordres de grandeur des délais vus de l'intérieur.",
        "Présenter l'expérience d'expert judiciaire de FX sans laisser croire qu'il interviendra comme expert dans les médiations.",
      ]}
      chapeau="Beaucoup de parties engagent une expertise judiciaire en pensant qu'elle dira « qui a raison ». Ce n'est pas son rôle. Comprendre ce que l'expert fait réellement, combien de temps et d'argent cela représente, aide à choisir la bonne voie."
    >
      <div className="grille-2">
        <div className="carte">
          <h2>Ce que fait l&apos;expert</h2>
          <ul className="liste">{FAIT.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div className="carte">
          <h2>Ce qu&apos;il ne fait pas</h2>
          <ul className="liste">{FAIT_PAS.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      </div>

      <div className="encadre info section">
        <strong>En une phrase :</strong> l&apos;expert éclaire les faits techniques ; c&apos;est le juge qui en tire les
        conséquences juridiques. Un excellent rapport d&apos;expertise ne met donc pas fin au litige : il ouvre la phase
        où l&apos;on discute des responsabilités et des montants.
      </div>

      <section className="carte section">
        <h2>Le déroulement</h2>
        <ol className="etapes-expertise">
          {ETAPES.map((e) => (
            <li key={e.titre}>
              <strong>{e.titre}</strong>
              <span>{e.texte}</span>
            </li>
          ))}
        </ol>
        <p className="note" style={{ marginBottom: 0 }}>
          L&apos;expertise à elle seule dure fréquemment de nombreux mois, et l&apos;affaire doit ensuite revenir devant le
          juge. Le <Link href="/outils/budget-technique">budget de résolution technique</Link> permet d&apos;en estimer la
          durée et le coût avec vos propres hypothèses.
        </p>
      </section>

      <section className="carte section">
        <h2>Ce que cela coûte vraiment</h2>
        <ul className="cases">{COUTS.map((x) => <li key={x}>{x}</li>)}</ul>
      </section>

      <section className="carte section">
        <h2>La tentative de conciliation de l&apos;expert</h2>
        <p>
          L&apos;expert judiciaire a l&apos;obligation de tenter de concilier les parties. C&apos;est souvent à ce moment
          que le litige se dénoue : une fois les faits techniques établis, chacun voit plus clairement ce qu&apos;il
          risque de gagner ou de perdre.
        </p>
        <p style={{ marginBottom: 0 }}>
          Mais cette tentative arrive tard, quand l&apos;essentiel des frais d&apos;expertise, des honoraires et des mois
          d&apos;attente est déjà engagé. <strong>Pourquoi attendre l&apos;expertise pour faire ce qu&apos;une médiation
          permet dès aujourd&apos;hui ?</strong> Et si un constat technique reste nécessaire, il peut être confié à un
          expert choisi ensemble, dans un cadre amiable.
        </p>
      </section>

      <section className="carte section">
        <h2>Expertise et médiation : trois moments pour s&apos;articuler</h2>
        <div className="grille-3">
          <div>
            <h3>Avant</h3>
            <p>Plutôt qu&apos;une expertise judiciaire, les parties désignent ensemble un expert dans le cadre d&apos;un{" "}
              <Link href="/outils/constat-conjoint">constat technique conjoint</Link>, avec un budget et un délai convenus.</p>
          </div>
          <div>
            <h3>Pendant</h3>
            <p>Les premières constatations de l&apos;expert suffisent souvent à rapprocher les points de vue : une
              médiation peut alors régler le litige sans attendre la fin de l&apos;expertise.</p>
          </div>
          <div>
            <h3>Après</h3>
            <p>Le rapport a établi les faits ; reste à s&apos;accorder sur les responsabilités, les montants et le
              calendrier des travaux. La médiation évite une nouvelle phase de procédure.</p>
          </div>
        </div>
      </section>

      <section className="encadre attention section">
        <h3>Le regard de Resolvia</h3>
        <p style={{ margin: 0 }}>
          L&apos;un des médiateurs de Resolvia pratique l&apos;expertise judiciaire. Il ne l&apos;exerce jamais dans les
          dossiers qu&apos;il médie, mais il sait, de l&apos;intérieur, ce qu&apos;une expertise peut apporter, ce
          qu&apos;elle ne tranchera pas, combien elle coûte et combien de temps elle prend. Cette lucidité aide les
          parties à évaluer sereinement leur alternative à un accord.
        </p>
      </section>

      <ActionsResultat texte={TEXTE} libelleCopie="Copier l'essentiel" />
    </CadreOutil>
  );
}
