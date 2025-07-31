# MLD

- Arbre (<u>CodeArbre</u>, Nom, Description ,Prix ,Miniature )


- Utilisateur (<u>CodeUtilisateur</u>, Nom, Prénom, E-mail, Mot de passe, Téléphone, Rôle  )


- Localisation (<u>CodeLocalisation</u>, Pays, Continent )


- Panier (<u>CodePanier</u>, Date de création, Statut )


- Commande (<u>CodeCommande</u>, Statut, date, Total )

- Projet (<u>CodeProjet</u>, Nom, Description, Miniature)


- Arbre Planté (<u>CodeArbrePlanté</u>, Date, Nom de l'arbre, Nom du projet, Description de l'arbre, Miniature, Continent, Pays)

- CONTENIR (<u>#CodeArbre</u>, <u>#CodePanier</u>, Quantité)

- INCLURE (<u>#CodeArbre</u>, <u>#CodeCommande</u>, Quantité, Prix unitaire)


- ACHETER (<u>#CodeArbre</u>, <u>#CodeUtilisateur</u>)

- APPARTENIR (<u>#Codeprojet</u>, <u>#CodeArbre</u>)

- POSSÉDER (<u>#CodeCommande</u>, <u>#CodeArbrePlanté</u>)

- DÉPENDRE (<u>#CodeProjet</u>, <u>#CodeArbrePlanté</u>)