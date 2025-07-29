# Cahier des charges

## Présentation du projet:
Plateforme e-commerce dédiée à la vente d'arbres dans le cadre de projets de reforestation. Les utilisateurs pourront donc contribuer à ces projets en achetant des arbres qui seront plantés par Greenroots qui fournira en retour un suivi de l'évolution des arbres aux clients. 

## Public cible
Public éco-conscient, entreprises responsables, associations engagées, etc.

## Vision d’ensemble
Une attention particulière sera apportée au respect des normes d’écoconception.
L’accessibilité est un enjeu du développement de l’application en proposant une navigation “droit au but” afin de réduire le nombre de pages visitées pour accéder aux produits et au panier.

Traçabilité et transparence des produits seront des critères de conceptionn et de développement (peut être avec un exemple des émissions carbones absorbées).

Le développement sera secure by design notamment pour les données à caractère personnel.

## Vision par feature

_Côté client_

- Informer les visiteurs sur la raison-d’être de GreenRoots.
- Possibilité d’acheter des arbres au détail ou par lot selon les projets proposés (possbilité de d'opérations promotionnelles).
- Consulter le catalogue.
- Consulter la fiche spécifique d'un arbre. 
- Connexion,création de compte et déconnexion. 
- Suivi de commande.
- Contacter l’équipe du site par mail.

_Côté GreenRoots (admin)_:

- Gestion CRUD des arbres à l’achat.
- Gestion CRUD des comptes utilisateurs. 

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
