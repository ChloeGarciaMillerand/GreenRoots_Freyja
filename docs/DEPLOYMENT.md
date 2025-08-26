# Déploiement GreenRoots avec GitHub Actions

Ce guide explique comment déployer l'application GreenRoots automatiquement via GitHub Actions avec Docker.

## 📋 Prérequis

### Sur le serveur de production :
- Ubuntu/Debian avec Docker et docker-compose installés
- Accès SSH configuré
- Git installé
- Ports 3000 (frontend) et 3001 (backend) ouverts

### Sur GitHub :
- Repository avec les bonnes permissions
- Secrets configurés (voir ci-dessous)

## 🚀 Configuration du déploiement

### 1. Cloner le repository sur le serveur

Connectez-vous à votre serveur et clonez le repository :

```bash
cd /home/ubuntu  # ou le dossier de votre choix
git clone https://github.com/votre-username/greenroots.git
cd greenroots
```

### 2. Configurer les secrets GitHub

Allez dans `Settings > Secrets and variables > Actions` de votre repository GitHub et ajoutez ces secrets :

#### 🔐 Secrets SSH (Obligatoires)

| Secret | Description | Exemple |
|--------|-------------|---------|
| `HOST` | Adresse IP du serveur | `192.168.1.100` ou `votre-domaine.com` |
| `USERNAME` | Utilisateur SSH | `ubuntu`, `root`, etc. |
| `PRIVATE_KEY` | Clé SSH privée complète | Contenu de `~/.ssh/id_rsa` |
| `PORT` | Port SSH | `22` (par défaut) |

#### 🗄️ Secrets Base de Données (Obligatoires)

| Secret | Description | Exemple |
|--------|-------------|---------|
| `POSTGRES_DB` | Nom de la base de données | `greenroots_prod` |
| `POSTGRES_USER` | Utilisateur PostgreSQL | `admin` |
| `POSTGRES_PASSWORD` | Mot de passe PostgreSQL | `mot_de_passe_securise` |

#### 🌐 Secrets URLs (Obligatoires)

| Secret | Description | Exemple |
|--------|-------------|---------|
| `FRONTEND_URL` | URL du frontend | `https://greenroots.votre-domaine.com` ou `http://192.168.1.100:3000` |
| `VITE_API_URL` | URL du backend pour le front | `https://api.greenroots.votre-domaine.com` ou `http://192.168.1.100:3001` |

#### 💳 Secrets Stripe (Obligatoires)

| Secret | Description |
|--------|-------------|
| `STRIPE_PUBLIC_KEY` | Clé publique Stripe (pk_...) |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe (sk_...) |
| `STRIPE_WEBHOOK_SECRET` | Secret webhook Stripe (whsec_...) |

#### 🔒 Secrets JWT (Optionnels - utilise les valeurs par défaut sinon)

| Secret | Description | Valeur par défaut |
|--------|-------------|-------------------|
| `JWT_SECRET` | Secret pour signer les tokens JWT | Valeur du .env.example |
| `JWT_EXPIRES_IN` | Durée de validité des tokens | `7d` |
| `JWT_ISSUER` | Émetteur des tokens | `greenroots-app` |

### 3. Configurer le chemin de déploiement

Dans le fichier `.github/workflows/deploy.yml`, modifiez la ligne :

```yaml
cd /home/ubuntu/greenroots  # Remplacez par votre chemin réel
```

### 4. Configuration des branches

Pour tester sur une branche spécifique, modifiez :

```yaml
on:
  push:
    branches: [ main, votre-branche ]  # Ajoutez votre branche de test
```

## 🔄 Processus de déploiement

Le workflow GitHub Actions se déclenche automatiquement lors d'un push sur les branches configurées et suit ces étapes :

### 1. **Tests** 
- Installation des dépendances backend et frontend
- Exécution des tests backend
- Build du frontend pour vérification

### 2. **Build et Push des images Docker**
- Construction des images Docker backend et frontend
- Publication sur GitHub Container Registry (GHCR)

### 3. **Déploiement sur le serveur**
- Connexion SSH au serveur
- Pull du code le plus récent
- Mise à jour du fichier `.env`
- Arrêt des services backend/frontend (préservation de la DB)
- Rebuild des images Docker
- Redémarrage de tous les services
- Nettoyage des anciennes images

## 🗃️ Gestion de la base de données

⚠️ **Important** : La base de données est préservée lors des déploiements !

- **Premier déploiement** : La DB est créée avec les scripts d'initialisation
- **Déploiements suivants** : Seuls backend et frontend sont redémarrés
- **Volume persistant** : `db_data` conserve toutes les données

## 📁 Structure des fichiers

```
greenroots/
├── .github/workflows/deploy.yml    # Workflow GitHub Actions
├── docker-compose.prod.yml         # Configuration Docker production
├── @back/                          # Backend Node.js
│   └── Dockerfile
├── @front/                         # Frontend React
│   └── Dockerfile
└── docs/DEPLOYMENT.md              # Ce fichier
```

## 🔍 Surveillance et logs

### Vérifier le statut des containers :
```bash
docker-compose -f docker-compose.prod.yml ps
```

### Consulter les logs :
```bash
# Backend
docker-compose -f docker-compose.prod.yml logs backend

# Frontend  
docker-compose -f docker-compose.prod.yml logs frontend

# Base de données
docker-compose -f docker-compose.prod.yml logs database
```

## 🛠️ Dépannage

### Erreur de connexion SSH
- Vérifiez les secrets `HOST`, `USERNAME`, `PORT`
- Testez la connexion SSH manuellement : `ssh username@host -p port`

### Erreur de clé SSH
- Copiez le contenu **complet** de votre clé privée dans `PRIVATE_KEY`
- Incluez les lignes `-----BEGIN` et `-----END`

### Problèmes Docker
- Vérifiez que Docker est installé : `docker --version`
- Vérifiez que l'utilisateur peut utiliser Docker : `docker ps`

### Base de données
- Si la DB ne démarre pas, vérifiez les variables `POSTGRES_*`
- Pour reset complet : `docker-compose -f docker-compose.prod.yml down -v`

## 🔄 Mise à jour

Pour déployer une nouvelle version :
1. Pushez vos changements sur la branche configurée
2. GitHub Actions se déclenche automatiquement
3. Surveillez les logs dans l'onglet "Actions" du repository

## 📝 Variables d'environnement complètes

Si vous avez besoin de toutes les variables, référez-vous au fichier `.env.example` et ajoutez les secrets manquants selon vos besoins.

---

**🎉 Une fois configuré, vos déploiements sont automatiques !** Chaque push déclenche le processus complet de test → build → déploiement.