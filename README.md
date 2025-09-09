# GreenRoots

GreenRoots est déployé depuis un autre répertoire, à cette adresse:
https://greenroots.website/

## Présentation

GreenRoots est une plateforme e-commerce dédiée à la vente d'arbres dans le cadre de projets de reforestation.
Les utilisateurs, clients particuliers ou collectivités, peuvent acheter des arbres qui sont liés à des projets de reforestation. Ces zones de plantation sont situées partout dans le monde.

![mockup](./conception/UI/mockup/jpg/greenroots_mockup.jpg)

## Technologies et outils utilisée

- Backend: Express, Node.js
- Base de données: PostgreSQL
- Front: React, React Router, CSS
- Test: Vitest, Jest, Playwright
- Tooling: Vite
- Paiement: Stripe
- Déploiement: Digital Ocean

## Commandes Docker

Ce projet utilise Docker Compose avec différentes configurations pour les environnements de développement et de production.

### Environnement de développement

Pour lancer le projet:

- cloner le répertoire en local
- `pnpm install` à la racine du projet et dans les packages `@front` et `@back` pour installer les dépendances
- créer une base de données PostgreSQL selon les variables d'environnement
- `pnpm run dev` à la racine du projet, et c'est parti!

#### Commandes principales

```bash
npm run dev                    # Lance l'application en mode développement
npm run dev:build             # Lance l'application en reconstruisant les images
npm run dev:build:fresh       # Reconstruit complètement (sans cache) et lance
npm run dev:down              # Arrête tous les services de développement
npm run dev:logs              # Affiche les logs en temps réel
```

### Environnement de production

#### Commandes principales

```bash
npm run prod                  # Lance l'application en mode production
npm run prod:build           # Lance l'application en reconstruisant les images
npm run prod:build:fresh     # Reconstruit complètement (sans cache) et lance
npm run prod:down            # Arrête tous les services de production
```

### Gestion Docker

#### Nettoyage et maintenance

```bash
npm run docker:clean         # Arrête et supprime les conteneurs, volumes et réseaux
npm run docker:reset         # Nettoyage complet + suppression des images inutilisées
npm run docker:rebuild       # Arrête et reconstruit toutes les images sans cache
```

### Services individuels

#### Backend

```bash
npm run backend              # Lance uniquement le backend et la base de données
npm run backend:fresh        # Reconstruit et lance le backend avec la base de données
```

#### Frontend

```bash
npm run frontend             # Lance uniquement le frontend
npm run frontend:fresh       # Reconstruit et lance le frontend
```

#### Base de données

```bash
npm run database             # Lance uniquement la base de données
```

### Logs des services

#### Consultation des logs

```bash
npm run logs:backend         # Affiche les logs du backend en temps réel
npm run logs:frontend        # Affiche les logs du frontend en temps réel
npm run logs:database        # Affiche les logs de la base de données en temps réel
```

### Accès aux conteneurs

### Shell interactif

```bash
npm run shell:backend        # Ouvre un shell dans le conteneur backend
npm run shell:frontend       # Ouvre un shell dans le conteneur frontend
npm run shell:database       # Ouvre un shell dans le conteneur de base de données
```

### Structure des fichiers Docker Compose

Le projet utilise une approche multi-fichiers :

- `docker-compose.yml` : Configuration de base partagée
- `docker-compose.dev.yml` : Surcharges pour le développement
- `docker-compose.prod.yml` : Surcharges pour la production

Les commandes combinent automatiquement ces fichiers selon l'environnement ciblé.
