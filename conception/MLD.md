# MLD

- Arbre (<u>CodeArbre</u>, Nom, Description ,Prix ,Miniature )


- Utilisateur (<u>CodeUtilisateur</u>, Nom, Prénom, E-mail, Téléphone, Rôle  )


- Region (<u>CodeRégion</u>, Pays, Continent )


- Panier (<u>CodePanier</u>, Date de création, Statut )


- Commande (<u>CodeCommande</u>, Statut, date, Total )

- Projet (<u>CodeProjet</u>, Nom, Description, Miniature)


- Arbre Planté (<u>CodeArbrePlanté</u>, Date, Nom, Type, Miniature, Continent, Pays)


- SE SITUER (<u>#CodeRégion</u>, <u>#CodeArbre</u>)


- CONTENIR (<u>#CodeArbre</u>, <u>#CodePanier</u>, Quantité)

- INCLURE (<u>#CodeArbre</u>, <u>#CodeCommande</u>, Quantité, Prix unitaire)


- ACHETER (<u>#CodeArbre</u>, <u>#CodeUtilisateur</u>)

- APPARTENIR (<u>#Codeprojet</u>, <u>#CodeArbre</u>)

- POSSÉDER (<u>#CodeCommande</u>, <u>#CodeArbrePlanté</u>)