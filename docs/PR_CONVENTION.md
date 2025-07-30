# Convention des Pull Request

### Lors de la création de la PR, sélectionnez et remplissez le template associé :

Pour utiliser un template spécifique, utilisez une URL de la forme :
```
https://github.com/O-clock-Freyja/greenroots/compare/main...VOTRE_BRANCHE?quick_pull=1&template=TEMPLATE.md
```

Remplacez `VOTRE_BRANCHE` par le nom de votre branche et `TEMPLATE.md` par l'un des templates disponibles :
- **feature.md** : Pour les nouvelles fonctionnalités
- **docs.md** : Pour les améliorations de documentation
- **fix.md** : Pour les corrections de bugs
- **style.md** : Pour les modifications de style/design

**Exemple :**
```
https://github.com/O-clock-Freyja/greenroots/compare/main...docs-improve-pr-convention?quick_pull=1&template=docs.md
```

### Ajoutez ou moins 2 reviewers.

### Rattachez la PR à une issue avec le mot clé associé
Si une issue existe, utilisez un mot clé suivi de son numéro pour qu'elle se ferme après le merge de la PR (resolves #1234)

*liste des mots clés*
```
close
closes
closed
fix
fixes
fixed
resolve
resolves
resolved
```
