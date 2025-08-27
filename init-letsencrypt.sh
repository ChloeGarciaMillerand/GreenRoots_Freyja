#!/bin/bash

# Configuration
DOMAIN="greenroots.website"
EMAIL="contact@greenroots.website" # Remplacez par votre email
DATA_PATH="./data/certbot"

# Création des dossiers
mkdir -p "$DATA_PATH/conf"
mkdir -p "$DATA_PATH/www"

echo "### Demande du certificat Let's Encrypt..."
docker compose -f docker-compose.prod.yml run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    --email $EMAIL \
    -d $DOMAIN \
    -d www.$DOMAIN \
    --rsa-key-size 4096 \
    --agree-tos \
    --cert-name $DOMAIN" certbot

echo "### Vérification que le certificat a été créé..."
if [ ! -f "$DATA_PATH/conf/live/$DOMAIN/fullchain.pem" ]; then
  echo "ERREUR: Le certificat Let's Encrypt n'a pas été créé !"
  echo "Vérifiez que le domaine $DOMAIN pointe bien vers ce serveur"
  exit 1
fi

echo "### Le workflow va redémarrer nginx avec la vraie config SSL..."

echo "### Configuration SSL terminée pour $DOMAIN !"
