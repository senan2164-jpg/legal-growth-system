# Legal Growth System

Site de prospection de Legal Growth System, conçu par HOUNTONDJI AMOS.
Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion. Déploiement Vercel.

## Démarrer

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # vérification avant mise en ligne
```

## Variables d'environnement

| Variable | Rôle | Obligatoire |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL publique (canonical, sitemap, Open Graph, Schema.org) | Oui |
| `GOOGLE_SCRIPT_URL` | URL de l'application web Apps Script (finit par `/exec`) | Oui, pour le formulaire |
| `LEAD_SHARED_SECRET` | Secret partagé entre le site et le script | Oui, pour le formulaire |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Adresse affichée publiquement | Non : vide, aucune adresse n'est affichée |

Sur Vercel : **Settings → Environment Variables**, puis **Deployments → ⋯ → Redeploy**.

## Formulaire « Demander mon analyse »

```
Formulaire (navigateur)
  → /api/contact (serveur Vercel : validation, anti-spam, limite par IP)
    → Google Apps Script (vérifie le secret)
      → ligne dans Google Sheets, statut « Nouveau »
      → email de notification à Amos
      → email de confirmation au prospect
```

Si une étape échoue, le visiteur voit une erreur et garde sa saisie. La demande est aussi écrite dans les logs Vercel, pour ne pas être perdue.

### Connecter Google Sheets (une seule fois)

1. Sur https://sheets.google.com, créer une feuille vide nommée `Legal Growth System — Demandes`.
2. Menu **Extensions → Apps Script**.
3. Supprimer le contenu de `Code.gs` et coller celui de `google-apps-script/Code.gs`. Enregistrer.
4. **Paramètres du projet** (roue dentée) → **Propriétés du script** → ajouter :
   - `LEAD_SHARED_SECRET` = une longue chaîne aléatoire (voir plus bas) ;
   - `NOTIFICATION_EMAIL` = l'adresse qui doit recevoir les demandes.
5. Revenir dans l'éditeur, choisir la fonction `setup` et cliquer sur **Exécuter**. Accepter les autorisations (« Paramètres avancés → Accéder au projet » si Google affiche un avertissement). Un onglet `Demandes` apparaît et un email de test arrive.
6. **Déployer → Nouveau déploiement** → type **Application Web** :
   - Exécuter en tant que : **Moi** ;
   - Qui a accès : **Tout le monde**.
7. Copier l'URL de l'application Web (elle finit par `/exec`).
8. Sur Vercel, ajouter `GOOGLE_SCRIPT_URL` (cette URL) et `LEAD_SHARED_SECRET` (la même chaîne qu'à l'étape 4), puis redéployer.

Générer un secret (PowerShell) :

```powershell
[guid]::NewGuid().ToString("N") + [guid]::NewGuid().ToString("N")
```

Après toute modification de `Code.gs` : **Déployer → Gérer les déploiements → modifier → Nouvelle version**. L'URL reste la même.

### Tester une vraie demande

1. Ouvrir le site en ligne, remplir le formulaire avec de vraies coordonnées de test.
2. Vérifier : message « C'est noté », nouvelle ligne dans la feuille, email de notification reçu, email de confirmation reçu à l'adresse saisie.
3. En cas d'erreur : Vercel → projet → **Logs** (lignes `[demande-analyse]`), et Apps Script → **Exécutions**.

## Structure

```
app/                     pages, métadonnées, sitemap, robots, image Open Graph, /api/contact
components/sections/     une section par fichier, dans l'ordre de la page :
                         Hero, Awareness, Problem, Approach, LookFor, Demo, System, Founder, Contact
components/visuals/      animations du parcours (rail du hero, téléphone, résultats comparés)
components/ui/           éléments partagés (Cta, Reveal)
lib/content.ts           quatre volets du système, spécialités du formulaire
lib/useSequence.ts       animation par étapes, active seulement quand elle est à l'écran
lib/lead.ts              validation des demandes (partagée navigateur / serveur)
lib/site.ts              identité, navigation, configuration
google-apps-script/      script à coller dans Google Sheets
```

## Règles de contenu

Toute donnée affichée en démonstration est marquée « Exemple fictif » ou « Illustration, cabinets fictifs ». Aucun client, témoignage, chiffre de résultat, logo ou partenaire n'est présenté. Les données structurées ne contiennent que des informations vraies.

## Défilement et animations

Le défilement est celui du navigateur : aucune bibliothèque de smooth-scroll, aucune animation liée au scroll appliquée à la page ou à une section entière, aucune section épinglée. Les animations sont locales (une ligne, une carte, un point) et ne démarrent que lorsque l'élément est visible. Elles sont désactivées si le système demande moins d'animations.
