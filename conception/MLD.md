# MLD

- Arbre (<u>CodeArbre</u>, Nom, Description ,Prix ,Miniature )


- Utilisateur (<u>CodeUtilisateur</u>, Nom, Prénom, E-mail, Téléphone, Rôle  )


- Region (<u>CodeRégion</u>, Pays, Continent )


- Panier (<u>CodePanier</u>, Date de création, Statut )


- Commande (<u>CodeCommande</u>, Statut, date, Total )

- Projet (<u>CodeProjet</u>, Nom, Description, Miniature)


- Arbre Planté (<u>CodeArbrePlanté</u>, Date, Nom, Type, Miniature, Continent, Pays)


- SE SITUER (<u>#CodeRégion</u>, #CodeArbre)


- CONTENIR (<u>#CodeArbre</u>, #CodePanier)


- ACHETER (<u>#CodeArbre</u>, #CodeUtilisateur)

- APPARTENIR (<u>#Codeprojet</u>, #CodeArbre)