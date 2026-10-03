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
      → email de notification
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
2. Vérifier : message « Votre demande a bien été transmise », nouvelle ligne dans la feuille, email reçu.
3. En cas d'erreur : Vercel → projet → **Logs** (lignes `[demande-analyse]`), et Apps Script → **Exécutions**.

## Structure

```
app/                     pages, métadonnées, sitemap, robots, image Open Graph, /api/contact
components/sections/     une section par fichier (ClientJourney, LegalGrowthSystem, OpportunityMap…)
components/viz/          visualisations (hero, cinq modules)
components/ui/           éléments partagés
lib/content.ts           modules, spécialités, FAQ (réutilisés par Schema.org)
lib/lead.ts              validation des demandes (partagée navigateur / serveur)
lib/site.ts              identité, navigation, configuration
google-apps-script/      script à coller dans Google Sheets
```

## Règles de contenu

Toute donnée affichée en démonstration est marquée « Démonstration — données fictives » ou « Simulation visuelle — exemple fictif ». Aucun client, témoignage, chiffre de résultat, logo ou partenaire n'est présenté. Les données structurées ne contiennent que des informations vraies.
