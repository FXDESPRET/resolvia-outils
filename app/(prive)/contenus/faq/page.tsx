import CadreOutil from "@/components/CadreOutil";

export const metadata = { title: "Questions fréquentes" };

// Textes à relire. Les points juridiques sont listés dans « aVerifier ».
const FAQ: { theme: string; questions: { q: string; r: string }[] }[] = [
  {
    theme: "Comprendre la médiation",
    questions: [
      {
        q: "Qu'est-ce que la médiation ?",
        r: "C'est un processus volontaire et confidentiel dans lequel les parties à un différend cherchent elles-mêmes une solution, avec l'aide d'un tiers neutre et indépendant : le médiateur. Le médiateur ne tranche pas ; il facilite le dialogue et aide chacun à exprimer ses besoins.",
      },
      {
        q: "Quelle différence avec la conciliation ou l'arbitrage ?",
        r: "L'arbitre, comme le juge, rend une décision qui s'impose aux parties. Le conciliateur peut proposer une solution ; c'est d'ailleurs ce que tente l'expert judiciaire au cours de sa mission. Le médiateur agréé aide les parties à construire elles-mêmes leur accord, dans un cadre légal qui le protège : confidentialité et possibilité d'homologation.",
      },
      {
        q: "Quels litiges peuvent être soumis à la médiation ?",
        r: "La plupart des différends civils et commerciaux : relations entre entreprises, conflits entre associés, successions et indivisions, baux, construction, voisinage. Une médiation familiale spécifique existe pour les séparations et les questions liées aux enfants.",
      },
    ],
  },
  {
    theme: "Le cadre en Belgique",
    questions: [
      {
        q: "Qu'est-ce qu'un médiateur agréé ?",
        r: "C'est un médiateur reconnu par la Commission fédérale de médiation, après une formation et dans le respect d'un code de bonne conduite. Le recours à un médiateur agréé offre des garanties supplémentaires, notamment la possibilité de faire homologuer l'accord par un juge.",
      },
      {
        q: "La médiation est-elle confidentielle ?",
        r: "Oui. Les documents établis et les communications faites au cours d'une médiation sont confidentiels : ils ne peuvent pas, en principe, être utilisés ensuite dans une procédure. C'est ce qui permet à chacun de parler librement.",
      },
      {
        q: "Peut-on faire une médiation alors qu'une procédure est en cours ?",
        r: "Oui. La médiation peut intervenir à tout moment, avant ou pendant une procédure, et même en appel. Le juge peut d'ailleurs proposer une médiation aux parties.",
      },
      {
        q: "L'accord de médiation a-t-il une valeur juridique ?",
        r: "L'accord écrit et signé engage les parties comme un contrat. Lorsque la médiation a été menée par un médiateur agréé, les parties peuvent en outre demander au juge de l'homologuer, ce qui lui donne la force d'un jugement.",
      },
      {
        q: "La médiation fait-elle perdre du temps si elle échoue ?",
        r: "Le risque est limité : la médiation est en principe courte, et le cours de la prescription peut être suspendu pendant sa durée. Même sans accord complet, elle permet souvent de réduire les points de désaccord soumis au juge.",
      },
    ],
  },
  {
    theme: "Litiges techniques",
    questions: [
      {
        q: "Qu'est-ce qu'une médiation technique ?",
        r: "C'est une médiation consacrée à un litige où les faits techniques comptent : malfaçons, piscine qui fuit, eau de mauvaise qualité, façade dégradée. Le médiateur comprend le langage technique et aide les parties à s'accorder d'abord sur les faits, puis sur la solution.",
      },
      {
        q: "Faut-il une expertise avant de commencer ?",
        r: "Pas forcément. Lorsque les causes sont contestées, les parties peuvent désigner ensemble un expert, dont les constats servent de base commune. C'est en général plus rapide et moins coûteux que deux expertises unilatérales, puis une expertise judiciaire.",
      },
      {
        q: "Qu'est-ce qu'un sapiteur ?",
        r: "C'est un spécialiste auquel l'expert fait appel pour une analyse précise : laboratoire d'analyse d'eau, recherche de fuite, ingénieur en stabilité, géomètre, essais de matériaux. En médiation, les parties choisissent ensemble les analyses utiles et en partagent le coût.",
      },
      {
        q: "Que fait réellement un expert judiciaire ?",
        r: "Il répond aux questions techniques que le juge lui a posées : il constate, recherche les causes et estime les travaux, de manière contradictoire. Il ne détermine pas les responsabilités au sens juridique et ne dit pas le droit : c'est le juge qui tranche ensuite. Une expertise éclaire donc les faits, mais ne met pas fin au litige.",
      },
      {
        q: "Le médiateur peut-il donner son avis technique ?",
        r: "Non. Le médiateur reste neutre et ne tranche pas. Ses connaissances techniques lui permettent de poser les bonnes questions et de proposer les bonnes vérifications ; les constats eux-mêmes sont confiés à un expert distinct, choisi par les parties.",
      },
    ],
  },
  {
    theme: "En pratique",
    questions: [
      {
        q: "Combien de temps dure une médiation ?",
        r: "Cela dépend du dossier. Beaucoup de médiations civiles et commerciales se déroulent en quelques séances, réparties sur quelques semaines à quelques mois.",
      },
      {
        q: "Combien coûte une médiation ?",
        r: "Le médiateur est généralement rémunéré à l'heure, et ses honoraires sont le plus souvent partagés entre les parties. Le coût global reste en général nettement inférieur à celui d'une procédure. Le simulateur de coût permet d'en estimer l'ordre de grandeur.",
      },
      {
        q: "Les avocats ont-ils leur place en médiation ?",
        r: "Oui. L'avocat conseille son client avant, pendant et après la médiation, l'aide à préparer les séances et vérifie l'accord avant signature. Il peut assister aux séances si les parties le souhaitent.",
      },
      {
        q: "Les assureurs peuvent-ils participer à une médiation ?",
        r: "Oui, et c'est souvent souhaitable : lorsqu'un assureur finance tout ou partie de la solution, sa présence permet de conclure un accord qui sera réellement exécuté. Plusieurs assureurs peuvent participer à la même médiation, par exemple dans un litige de construction impliquant plusieurs intervenants.",
      },
      {
        q: "Que se passe-t-il si l'autre partie refuse ?",
        r: "La médiation étant volontaire, elle ne peut pas être imposée. Une proposition présentée par le médiateur lui-même, ou suggérée par le juge, est toutefois souvent mieux reçue qu'une demande venant directement de l'autre partie.",
      },
    ],
  },
];

const A_VERIFIER = [
  "Homologation : vérifier les conditions actuelles d'homologation de l'accord de médiation (médiateur agréé, médiation volontaire ou judiciaire).",
  "Confidentialité : vérifier la portée exacte et les exceptions prévues par le Code judiciaire.",
  "Prescription : vérifier à quelles conditions le cours de la prescription est suspendu (protocole de médiation, durée).",
  "Médiation judiciaire : vérifier les possibilités actuelles pour le juge de proposer ou d'ordonner une médiation.",
  "Conciliation et médiation : formulation de la posture du médiateur à ajuster après la formation HEC (question prioritaire du registre).",
  "Litiges techniques : vérifier la formulation sur le rôle du médiateur à compétence technique et la séparation avec l'expertise.",
  "Ajouter éventuellement l'obligation d'information des avocats sur les modes amiables, après vérification.",
];

export default function Page() {
  return (
    <CadreOutil
      id="faq"
      chapeau="Les réponses aux questions que se posent le plus souvent les clients et leurs conseils sur la médiation civile et commerciale en Belgique."
      confidentialite={false}
      aVerifier={A_VERIFIER}
    >
      {FAQ.map((t) => (
        <section key={t.theme} className="carte" style={{ marginBottom: 16 }}>
          <h2>{t.theme}</h2>
          {t.questions.map((x) => (
            <details key={x.q} className="details">
              <summary>{x.q}</summary>
              <p>{x.r}</p>
            </details>
          ))}
        </section>
      ))}
      <p className="note">Informations générales, qui ne remplacent pas un conseil adapté à une situation particulière.</p>
    </CadreOutil>
  );
}
