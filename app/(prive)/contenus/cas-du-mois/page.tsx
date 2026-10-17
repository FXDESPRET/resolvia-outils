import Link from "next/link";
import CadreOutil from "@/components/CadreOutil";

export const metadata = { title: "Cas du mois" };

export default function Page() {
  return (
    <CadreOutil
      id="cas-du-mois"
      chapeau="Chaque mois, un cas commenté pour montrer concrètement ce que la médiation peut apporter. Les cas sont fictifs ou entièrement anonymisés."
      confidentialite={false}
      aVerifier={[
        "Ce premier cas est entièrement fictif : le mentionner clairement en cas de publication.",
        "Pour les cas suivants inspirés de dossiers réels : accord écrit des parties et anonymisation complète, conformément à la confidentialité de la médiation.",
        "Vérifier la conformité avec les règles de communication du barreau.",
      ]}
    >
      <article className="carte document">
        <p className="etiquette" style={{ margin: 0 }}>Succession · Cas fictif</p>
        <h2 style={{ marginTop: 6 }}>La maison du jardin aux pommiers</h2>

        <h3>La situation</h3>
        <p>
          Trois frère et sœurs héritent de la maison familiale de leur mère. L&apos;aînée, qui habite à proximité,
          s&apos;en occupe depuis des années et souhaite la garder. Les deux cadets, installés loin, veulent vendre.
          Les échanges passent désormais par les avocats et les positions se figent : la sortie d&apos;indivision par
          voie judiciaire est envisagée.
        </p>

        <h3>Ce qui bloquait</h3>
        <p>
          Officiellement, le désaccord portait sur le prix. En réalité, l&apos;aînée vivait la vente comme un abandon de
          leur mère, tandis que les cadets avaient le sentiment que leur sœur s&apos;était approprié la maison, et avec
          elle les souvenirs de toute la famille.
        </p>

        <h3>La médiation</h3>
        <p>
          Le médiateur a d&apos;abord rencontré chacun séparément, puis réuni la fratrie avec leurs avocats. Chacun a
          rempli un inventaire des attachements : il est apparu que les cadets tenaient moins à la maison qu&apos;au
          piano et à quelques objets du grenier, et qu&apos;ils redoutaient surtout de ne plus jamais revenir dans le
          jardin de leur enfance.
        </p>

        <h3>L&apos;accord</h3>
        <ul>
          <li>L&apos;aînée rachète les parts de ses cadets, sur la base d&apos;une estimation commandée en commun.</li>
          <li>Le paiement est échelonné sur trois ans, garanti devant notaire.</li>
          <li>Le piano et les objets choisis sont attribués aux cadets, hors de la valeur de la maison.</li>
          <li>La fratrie se retrouve chaque année dans la maison, le week-end de l&apos;anniversaire de leur mère.</li>
        </ul>
        <p>Quatre séances en deux mois ont suffi, là où une procédure aurait pris plusieurs années.</p>

        <h3>Ce qu&apos;il faut en retenir</h3>
        <ul>
          <li>Derrière un désaccord sur le prix se cache souvent une question de reconnaissance ou de souvenir.</li>
          <li>Un juge n&apos;aurait pas pu ordonner le rendez-vous annuel, qui a pourtant débloqué l&apos;accord.</li>
          <li>Les avocats ont gardé un rôle central : conseil, vérification de l&apos;estimation, rédaction de l&apos;accord.</li>
        </ul>
      </article>

      <div className="encadre info section">
        Un dossier similaire ? Le <Link href="/outils/mediabilite">test de médiabilité</Link> et l&apos;
        <Link href="/outils/inventaire-attachements">inventaire des attachements</Link> peuvent vous aider à préparer
        la discussion.
      </div>
    </CadreOutil>
  );
}
