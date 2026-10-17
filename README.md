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

## Modifier les textes du test de médiabilité

Tous les textes (questions, réponses, pondérations, verdicts, questions à poser au client) sont dans
`app/(prive)/outils/mediabilite/contenu.ts`.

## Charte graphique

Couleurs et polices sont regroupées en haut de `app/globals.css` (version neutre provisoire, à aligner sur resolvia.be).

## Travailler en local

```bash
cp .env.example .env.local   # puis remplir les valeurs
npm install
npm run dev                  # http://localhost:3000
```
