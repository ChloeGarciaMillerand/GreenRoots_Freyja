```mermaid
graph LR
    %% Visiteur non connecté
    Visiteur[Visiteur] --> UC1[Accéder à la landing page]
    Visiteur --> UC2[Consulter le catalogue]
    Visiteur --> UC3[Consulter un produit]
    Visiteur --> UC4[Filtrer le catalogue]
    Visiteur --> UC5[Consulter les localisations]
    Visiteur --> UC6[Ajouter au panier]
    Visiteur --> UC7[Consulter le panier]
    Visiteur --> UC[Modifier le panier]
    Visiteur --> UC9[Créer un compte]
    Visiteur --> UC10[Se connecter]
    Visiteur --> UC11[Consulter la page A propos et contact]

    %% Membre (utilisateur connecté)
    Membre[Membre] --> UC8[Valider le panier]
    Membre --> UC12[Valider et payer la commande]
    Membre --> MC1[Accéder à son profil]
    Membre --> MC2[Modifier ses informations]
    Membre --> MC3[Supprimer son compte]
    Membre --> MC4[Consulter historique commandes]

    %% Administrateur
    Admin[Administrateur] --> AC1[Ajouter un produit]
    Admin --> AC2[Modifier un produit]
    Admin --> AC3[Supprimer un produit]
    Admin --> AC4[Modifier stock produit]
    Admin --> AC6[Consulter le catalogue]
```