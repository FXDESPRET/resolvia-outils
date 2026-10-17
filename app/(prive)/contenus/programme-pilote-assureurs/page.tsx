import Link from "next/link";
import ActionsResultat from "@/components/ActionsResultat";
import CadreOutil from "@/components/CadreOutil";
import { POSITIONNEMENT } from "@/lib/cibles";

export const metadata = { title: "Programme pilote assureurs" };

const A = ({ children }: { children: React.ReactNode }) => <span className="a-completer">{children}</span>;

export default function Page() {
  return (
    <CadreOutil
      id="programme-pilote-assureurs"
      confidentialite={false}
      aVerifier={[
        "À utiliser seulement après l'agrément : la fiche présente Resolvia comme médiateurs agréés.",
        "Chiffrer les éléments en orange : forfait, délais, durée du pilote.",
        "Amandine : contenu du compte rendu au gestionnaire compatible avec la confidentialité de la médiation (statut, issue, durée, coût — jamais le contenu des échanges).",
        "Charte d'indépendance à rédiger, et vérification au regard du code de bonne conduite des médiateurs agréés (question à étudier pendant la formation).",
        "Faire relire par un gestionnaire de sinistres testeur.",
      ]}
      chapeau="Une fiche à imprimer ou à envoyer avant un rendez-vous avec une compagnie d'assurance ou un courtier. Elle propose un premier pas concret plutôt qu'un engagement."
    >
      <article className="carte document">
        <p className="etiquette" style={{ margin: 0 }}>Resolvia · Proposition</p>
        <h2 style={{ marginTop: 6 }}>Programme pilote : dix dossiers, un bilan chiffré</h2>
        <p><em>{POSITIONNEMENT}</em></p>

        <h3>L&apos;idée</h3>
        <p>
          Vos gestionnaires règlent déjà de nombreux dossiers à l&apos;amiable. Mais lorsque la négociation s&apos;arrête, le
          dossier part chez l&apos;avocat, puis souvent chez l&apos;expert : c&apos;est là que les coûts et les délais
          s&apos;envolent. Resolvia intervient précisément à ce moment, comme <strong>deuxième niveau</strong> de votre
          gestion amiable.
        </p>

        <h3>Le pilote</h3>
        <ul>
          <li><strong>Dix dossiers</strong>, sur une durée de <A>six mois</A>, choisis ensemble.</li>
          <li>Dossiers visés : responsabilité civile construction, recours entre assureurs, protection juridique, sinistres en copropriété.</li>
          <li>Dossiers exclus : contre-indications (urgence majeure, question de principe à faire trancher, violence ou intimidation).</li>
        </ul>

        <h3>Nos engagements</h3>
        <ul>
          <li>Contact de toutes les parties dans les <A>cinq jours ouvrables</A> de la transmission du dossier.</li>
          <li>Première séance dans les <A>quinze jours</A>, si les parties l&apos;acceptent.</li>
          <li>Co-médiation : une avocate et un négociateur, médiateurs agréés.</li>
          <li>Si les faits techniques sont contestés : un constat commun confié à un expert choisi par les parties, avec un budget plafonné.</li>
          <li><strong>Forfait par dossier</strong> : <A>montant à définir</A>, annoncé avant le début.</li>
          <li>Un compte rendu au gestionnaire : statut, issue, durée et coût. Jamais le contenu des échanges, qui reste confidentiel.</li>
        </ul>

        <h3>Vos engagements</h3>
        <ul>
          <li>Un référent pour le pilote.</li>
          <li>La présence aux séances d&apos;un gestionnaire ayant le pouvoir de décider.</li>
          <li>Aucun objectif de résultat imposé aux médiateurs.</li>
        </ul>

        <h3>Ce que nous mesurerons ensemble</h3>
        <ul>
          <li>Le taux d&apos;accord.</li>
          <li>Le délai moyen jusqu&apos;à la clôture du dossier.</li>
          <li>Le coût total, comparé à l&apos;estimation de la voie habituelle.</li>
          <li>Les réserves libérées.</li>
          <li>La satisfaction des assurés, par un court questionnaire.</li>
        </ul>

        <h3>La neutralité, garantie à toutes les parties</h3>
        <p>
          Que la compagnie oriente le dossier ne fait pas de nous ses représentants. Une <strong>charte
          d&apos;indépendance</strong> est remise à chaque partie, qui est informée de la prise en charge des honoraires.
          Chacune peut mettre fin à la médiation à tout moment, et tout ce qui s&apos;y dit reste confidentiel.
        </p>

        <h3>Le calendrier</h3>
        <ul>
          <li><strong>Mois 0</strong> : cadrage, choix des dossiers, désignation du référent.</li>
          <li><strong>Mois 1 à <A>5</A></strong> : médiations.</li>
          <li><strong>Mois <A>6</A></strong> : bilan chiffré et décision sur la suite.</li>
        </ul>

        <p className="note" style={{ marginBottom: 0 }}>
          Contact : <A>nom, téléphone, e-mail</A>
        </p>
      </article>

      <div className="encadre info section non-imprime">
        Pour préparer le rendez-vous, estimez l&apos;intérêt du pilote sur le portefeuille de la compagnie avec l&apos;outil{" "}
        <Link href="/outils/portefeuille-sinistres">Portefeuille de sinistres</Link>.
      </div>

      <ActionsResultat />
    </CadreOutil>
  );
}
