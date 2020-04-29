### URL

detail xxx.com/game/slug
list xxx.com/games
xxx.com/developer/slug
xxx.com/tag/slug
etc

### template

pageList => gameList
pageDetail => gameDetail

### Search

by key word, goes to list, not detail

### List

by default, the games that WILL RELEASE THIS YEAR

by platform

Le nombre maximal de jeux affichés est de 9. Un bouton "Show more" est disponble pour en afficher 9 de plus. Au bout de 2 clics dessus, donc 27 images, celui-ci disparait.

Au hover de la card, on peut voir

- la date de sortie,
- l'éditeur,
- le(s) genre(s) du jeu,
- la note et le nombre de votes
- trailer
  (à la place de l'image).

### detail

ONLY SHOW EXISTING CATEGORY
jeux ressemblants

### Liens internes

les liens internes soulignés au hover en suivant le premier exemple
(https://codepen.io/mburnette/pen/YXPggg)

### visuel

2 mixins libre choix
1 mixin pour portable
https://masonry.desandro.com/
animation en page change sur tous les liens interns
slider pour screenshots

### layout

search fonctionne
bar gauche(release de la semaine)

### cleanup

- const
- separate js
- separate css
- class and id