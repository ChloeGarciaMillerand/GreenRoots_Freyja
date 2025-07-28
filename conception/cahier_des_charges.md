# Cahier des charges

## Présentation du projet:
Plateforme e-commerce dédiée à la vente de certains arbres, en vue de l’aide à la lutte contre la déforestation. L’application est destinée aux particuliers et institutions qui souhaitent apporter leur contribution.

## Public cible
Public éco-conscient, entreprises responsables, associations engagées, etc.

## Vision d’ensemble
Une attention particulière sera apportée au respect des normes d’écoconception.
L’accessibilité est un enjeu du développement de l’application en proposant une navigation du site “droit au but”, réduire le nombre de pages naviguées pour accéder aux produits et au panier.

Traçabilité et transparence des produits, peut être avec un exemple des émissions carbones absorbées.

Secure by design, notamment pour les données à caractère personnel.

## Vision par feature

_Côté client_

Informer les visiteurs sur la raison-d’être de GreenRoots
Possibilité d’acheter des arbres au détail, en masse, via des bundle ? (achète en 10 => une ristourne).
Consulter le catalogue
Consulter un arbre au détail
Connexion et création de compte, se déconnecter
Suivi de commande
Contacter l’équipe du site par mail

_Côté GreenRoots (admin)_:

Gestion des arbres à l’achat: création, édition, suppression

## Vision technologique

### Front
- React/Preact (NextJS pour le SEO ?)
- CSS Vanilla -> Refactoring Sass après

### Back
 - NodeJs
 - Express

### DB
- Postgres

### Déploiement
- Docker
- Herbergement partagé, hébergeur “vert” ?

### CI/CD
- GitHub Action

### Architecture
- Monolithique
- Mi statique, mi reactive (via NextJS ?)

## Propositions d’évolution
Gamification de site pour le client, club GreenRoots, achievements et badges.

Calcul de l'empreinte carbone des produits et l’intégrer également à la gamification.
 
Donner la possibilité aux clients de contacter l’entreprise par mail (peut-être via un back-office support type Zendesk).
