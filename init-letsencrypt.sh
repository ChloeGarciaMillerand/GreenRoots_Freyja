#!/bin/bash

# Configuration
DOMAIN="greenroots.website"
EMAIL="contact@greenroots.website" # Remplacez par votre email

# Chemin vers les données certbot
DATA_PATH="./data/certbot"

# Création des dossiers
mkdir -p "$DATA_PATH/conf"
mkdir -p "$DATA_PATH/www"

echo "### Création d'un certificat temporaire pour $DOMAIN..."
mkdir -p "$DATA_PATH/conf/live/$DOMAIN"
docker compose -f docker-compose.prod.yml run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:4096 -days 1\
    -keyout '/etc/letsencrypt/live/$DOMAIN/privkey.pem' \
    -out '/etc/letsencrypt/live/$DOMAIN/fullchain.pem' \
    -subj '/CN=localhost'" certbot

echo "### Nginx doit déjà être démarré par le workflow..."

echo "### Demande du vrai certificat Let's Encrypt..."
docker compose -f docker-compose.prod.yml run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    --email $EMAIL \
    -d $DOMAIN \
    -d www.$DOMAIN \
    --rsa-key-size 4096 \
    --agree-tos \
    --force-renewal" certbot

echo "### Vérification que le certificat a été créé..."
if [ ! -f "$DATA_PATH/conf/live/$DOMAIN/fullchain.pem" ]; then
  echo "ERREUR: Le certificat Let's Encrypt n'a pas été créé !"
  echo "Vérifiez que le domaine $DOMAIN pointe bien vers ce serveur"
  exit 1
fi

echo "### Le workflow va redémarrer nginx avec la vraie config SSL..."

echo "### Configuration SSL terminée pour $DOMAIN !"
