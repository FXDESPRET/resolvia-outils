# Resolvia — Espace outils

Espace privé des outils Resolvia (médiation civile et commerciale).
Phase 1 : **sans base de données**. Supabase sera ajouté au moment du lancement.

## Principes

- Rien n'est accessible sans code d'accès personnel.
- Les outils fonctionnent entièrement dans le navigateur : **aucune réponse n'est enregistrée ni transmise**.
- Les avis des testeurs sont envoyés par e-mail (rien n'est stocké).
- Pages non indexées par les moteurs de recherche.

## Mise en ligne sur Vercel

1. Sur vercel.com : **Add New → Project**, importer le dépôt `resolvia-outils`.
2. Dans **Settings → Environment Variables**, créer les trois variables décrites dans `.env.example` :
   - `RESOLVIA_SECRET` : longue chaîne aléatoire (par exemple via `openssl rand -hex 32`).
   - `RESOLVIA_ACCES` : la liste des accès, au format JSON, sur une seule ligne.
   - `RESOLVIA_AVIS_EMAIL` : l'adresse qui reçoit les avis.
3. Déployer. Le sous-domaine (`outils.resolvia.be` ou `espace.resolvia.be`) se configure ensuite dans **Settings → Domains**, avec un enregistrement CNAME chez OVH.

## Gérer les accès

Tout se fait dans la variable `RESOLVIA_ACCES` sur Vercel, puis **Redeploy** :

```json
[
  {"code":"ADMIN-FX-7Q2M","nom":"FX","role":"admin"},
  {"code":"NOTAIRE-DUPONT-K8P3","nom":"Me Dupont","role":"testeur","profession":"notaire","outils":["mediabilite"],"expire":"2027-06-30"}
]
```

- `role` : `admin` (tout voir, page Administration) ou `testeur`.
- `profession` : `avocat`, `notaire`, `administrateur`, `gestionnaire-fonds`, `expert-comptable`, `autre`.
- `outils` : identifiants des outils accessibles, ou `["*"]` pour tous les outils ouverts aux testeurs.
- `expire` (facultatif) : date de fin de validité.
- Supprimer une ligne révoque l'accès immédiatement.
- Choisir des codes longs et difficiles à deviner.

## Changer le statut d'un outil

Dans `lib/outils.ts`, modifier `statut` :
`brouillon` → `a-relire` → `a-valider` → `testeurs` → `public`.

Un testeur ne voit un outil que s'il est au statut `testeurs` ou `public` **et** qu'il lui est attribué.
Les administrateurs voient tout ; le mode « Voir en tant que » (page Administration) montre l'espace d'un testeur type.

## Les outils

| Rubrique | Outil | Fichier principal |
|---|---|---|
| Prescripteurs | Test de médiabilité | `app/(prive)/outils/mediabilite/contenu.ts` |
| Prescripteurs | Simulateur de coût | `app/(prive)/outils/simulateur-cout/Simulateur.tsx` (valeurs d'exemple en tête) |
| Prescripteurs | Fiche de préparation client | `app/(prive)/outils/fiche-preparation/Fiche.tsx` |
| Prescripteurs | Carnet de clauses | `app/(prive)/outils/carnet-clauses/clauses.ts` |
| Prescripteurs | Médiation, conciliation, expertise : repères | `app/(prive)/outils/reperes-modes/page.tsx` |
| Prescripteurs | Préparer une négociation | `app/(prive)/outils/preparer-negociation/Negociation.tsx` |
| Prescripteurs | Portefeuille de sinistres (assureurs) | `app/(prive)/outils/portefeuille-sinistres/Portefeuille.tsx` |
| Successions | Inventaire des attachements | `app/(prive)/outils/inventaire-attachements/Inventaire.tsx` |
| Successions | Schéma de l'indivision | `app/(prive)/outils/schema-indivision/Schema.tsx` |
| Successions | Kit de réunion familiale | `app/(prive)/outils/kit-reunion-familiale/Kit.tsx` |
| Associés | Bilan de santé de l'association | `app/(prive)/outils/bilan-association/Bilan.tsx` |
| Associés | Pacte de désaccord | `app/(prive)/outils/pacte-desaccord/Pacte.tsx` |
| Associés et investisseurs | Litige et valeur de l'entreprise | `app/(prive)/outils/valeur-entreprise/Valeur.tsx` |
| Construction | Comprendre l'expertise judiciaire | `app/(prive)/outils/expertise-judiciaire/page.tsx` |
| Construction | Diagnostic d'un litige de construction | `app/(prive)/outils/diagnostic-construction/Diagnostic.tsx` |
| Construction | Budget de résolution technique (sapiteurs) | `app/(prive)/outils/budget-technique/Budget.tsx` |
| Construction | Désordres fréquents | `lib/construction.ts` (données partagées : désordres, sapiteurs et leurs coûts d'exemple) |
| Construction | Protocole de constat technique conjoint | `app/(prive)/outils/constat-conjoint/Protocole.tsx` |
| Contenus | Cas du mois, FAQ, offres et biographies | `app/(prive)/contenus/…/page.tsx` |
| Pilotage (admin) | Tableau de bord, registre (dont questions à étudier), cibles et enjeux | `lib/registre.ts`, `app/(prive)/pilotage/cibles/page.tsx` |

Chaque page d'outil affiche aux administrateurs un encadré « À vérifier avant ouverture » listant les points juridiques ou déontologiques à contrôler.

## Points de vue

- `lib/regards.ts` : ce que chaque outil apporte à chaque cible (avocats, notaires, assureurs, entreprises et investisseurs, construction et copropriétés). Un testeur voit le texte de sa profession ; un administrateur les voit tous.
- `lib/partiesPrenantes.ts` : les parties prenantes d'un litige au-delà des deux parties, par contexte, affichées dans les résultats.

## Modifier les textes du test de médiabilité

Tous les textes (questions, réponses, pondérations, verdicts, questions à poser au client) sont dans
`app/(prive)/outils/mediabilite/contenu.ts`.

Le test peut être rempli par une partie (résultat provisoire) ou par les deux. Pour combiner deux tests remplis
séparément, chaque partie obtient un code de réponse (`RM1-…`, uniquement des chiffres) à transmettre à l'autre.
L'indice retenu est celui de la partie la moins disposée.

## Charte graphique

Couleurs (vert sauge tiré du logo) et polices (Alegreya) sont regroupées en haut de `app/globals.css`. Le logo est dans `public/logo.png`.

## Travailler en local

```bash
cp .env.example .env.local   # puis remplir les valeurs
npm install
npm run dev                  # http://localhost:3000
```
