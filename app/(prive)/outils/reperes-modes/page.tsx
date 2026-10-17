import Link from "next/link";
import CadreOutil from "@/components/CadreOutil";

export const metadata = { title: "Médiation, conciliation, expertise : repères" };

// Principe retenu : ne jamais obliger le prescripteur à choisir entre des modes.
// La réponse par défaut est la médiation agréée ; les autres voies sont présentées pour situer, pas pour arbitrer.

const VOIES = [
  { nom: "Négociation directe", tiers: "Aucun", decide: "Les parties", cadre: "Libre", quand: "La relation permet encore de se parler, les enjeux sont limités." },
  { nom: "Médiation agréée", tiers: "Un médiateur agréé, neutre, qui aide les parties à construire leur solution", decide: "Les parties", cadre: "Code judiciaire : confidentialité, homologation possible, effets sur la prescription", quand: "Par défaut, dès que la négociation directe ne suffit plus." },
  { nom: "Conciliation", tiers: "Un conciliateur, qui peut proposer des solutions", decide: "Les parties", cadre: "Variable selon qu'elle est conventionnelle, judiciaire ou menée par un expert", quand: "Souvent intégrée à une procédure : devant le juge ou par l'expert judiciaire." },
  { nom: "Constat technique conjoint", tiers: "Un expert choisi ensemble", decide: "Les parties, sur une base de faits commune", cadre: "Contractuel", quand: "Les faits techniques sont contestés ; combinable avec une médiation." },
  { nom: "Arbitrage", tiers: "Un ou plusieurs arbitres", decide: "L'arbitre", cadre: "Code judiciaire, convention d'arbitrage", quand: "Les parties veulent une décision obligatoire, rendue par un spécialiste et en toute confidentialité." },
  { nom: "Expertise judiciaire", tiers: "Un expert désigné par le juge", decide: "Le juge, éclairé par l'expert", cadre: "Code judiciaire", quand: "Une procédure est en cours et le juge a besoin d'un éclairage technique." },
  { nom: "Procédure", tiers: "Le juge", decide: "Le juge", cadre: "Code judiciaire, voies de recours", quand: "Question de principe, urgence, refus de tout dialogue, ou besoin d'une décision exécutoire." },
];

export default function Page() {
  return (
    <CadreOutil
      id="reperes-modes"
      etroit={false}
      confidentialite={false}
      aVerifier={[
        "À ÉTUDIER EN PRIORITÉ (formation HEC) : rôle exact du médiateur agréé — peut-il formuler des propositions de solution lorsque les parties le demandent, et jusqu'où ? La formulation de cette page en dépend.",
        "Amandine : effets juridiques de la médiation agréée cités (confidentialité, homologation, prescription), et présentation de la conciliation judiciaire et par l'expert.",
        "Principe : ne pas obliger le prescripteur à choisir entre les modes ; vérifier auprès de testeurs avocats et notaires que la page ne crée pas de doute.",
      ]}
      chapeau="Le client demande : « Et maintenant, que fait-on ? » Voici la réponse simple, puis des repères pour situer les autres voies si la question se pose."
    >
      <div className="carte resultat">
        <p className="surtitre">La réponse simple</p>
        <h2>Proposez une médiation, menée par un médiateur agréé</h2>
        <p>
          Pour un litige civil ou commercial, c&apos;est le cadre le plus protecteur : les échanges sont confidentiels,
          l&apos;accord peut être homologué par le juge, et la démarche laisse toute sa place à la négociation. Les
          juges et les avocats y recourent naturellement.
        </p>
        <p style={{ marginBottom: 0 }}>
          Vous n&apos;avez pas à choisir entre médiation, conciliation ou facilitation : le médiateur adapte sa manière
          de faire au dossier, dans le respect de son cadre. Si les faits techniques sont contestés, un{" "}
          <Link href="/outils/constat-conjoint">constat technique conjoint</Link> peut s&apos;y ajouter.
        </p>
      </div>

      <div className="grille-3 section">
        <div className="carte"><h3>Quand ?</h3><p style={{ margin: 0 }}>Dès que la négociation directe ne suffit plus, avant ou pendant une procédure, y compris en appel.</p></div>
        <div className="carte"><h3>Comment ?</h3><p style={{ margin: 0 }}>Un premier échange avec chaque partie, puis des séances communes, avec les conseils s&apos;ils le souhaitent.</p></div>
        <div className="carte"><h3>Et si cela n&apos;aboutit pas ?</h3><p style={{ margin: 0 }}>Chacun garde ses droits, et le litige est souvent mieux circonscrit pour la suite.</p></div>
      </div>

      <details className="carte section">
        <summary style={{ cursor: "pointer", fontWeight: 600 }}>Pour situer les autres voies</summary>
        <p className="note" style={{ marginTop: 10 }}>
          Ces voies ne s&apos;excluent pas : une médiation peut intervenir pendant une expertise ou une procédure, et
          s&apos;appuyer sur un constat technique commun.
        </p>
        <div className="defile">
          <table className="tableau">
            <thead><tr><th>Voie</th><th>Le tiers</th><th>Qui décide ?</th><th>Cadre</th><th>Quand l&apos;envisager</th></tr></thead>
            <tbody>
              {VOIES.map((v) => (
                <tr key={v.nom} style={v.nom === "Médiation agréée" ? { background: "var(--accent-clair)" } : undefined}>
                  <td><strong>{v.nom}</strong></td>
                  <td>{v.tiers}</td>
                  <td>{v.decide}</td>
                  <td className="note">{v.cadre}</td>
                  <td>{v.quand}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <div className="encadre info section">
        Pour savoir si un dossier précis s&apos;y prête, utilisez le <Link href="/outils/mediabilite">test de médiabilité</Link> ;
        pour en mesurer l&apos;intérêt en temps et en argent, le <Link href="/outils/simulateur-cout">simulateur de coût</Link>.
      </div>
    </CadreOutil>
  );
}
