
# AssignmentApp

AssignmentApp est une application Angular conçue pour la gestion des devoirs,  développé en binôme par Jonathan SAMUEL et Amina MOUCHTAHI. Elle offre une interface conviviale permettant de visualiser, ajouter, modifier et supprimer des assignments. L'application est hébergée sur Render.com pour une disponibilité en ligne.

## Lancement du projet AssignmentApp

https://assignmentapp-frontend.onrender.com

(Il faut attendre quelques secondes pour que les assignments s'affichent)

username : user
password : userpass

username : admin
password : adminpass

## Demo

Lien de la video

## Fonctionnalités

### Toolbar 

**La page d'accueil**
- La page d'accueil permet de consulter la liste des assignments grace à une table Angular Material (La base de données contient 1000 assignments). On peut trier cette liste via:
    - Le champ de recherche: Pour faire une recherche en filtrant sur le nom de l'assignment précis qu'on veut. (Le filtrage se fait en temps réel au fur et à mesure que l'on rajoute des lettres) 
    - La checkbox: Pour afficher uniquement les assignments rendus ou non rendus
    - Le filtre sur le champs "Nom du devoir" de la ligne des headers pour trier par ordre croissant ou décroissant

- Lorsqu'on sélectionne un devoir, on est redirigé vers les détails du devoir qui comprennent les éléments suivants:

        - Titre du devoir
        - Image représentative de chaque matière
        - Date limite de rendu
        - Matière concernée (Fonctionnement des SGBD, Outils mathématiques pour le Big Data, JavaScript et HTML5, Programmation Avancée et Outils pour ingénierie des besoins)
        - Photo du professeur en charge
        - Nom du professeur 
        - Note sur 20
        - Checkbox pour rendre le devoir
        - Commentaire relatif à l'assignment
        - Options pour modifier et supprimer le devoir

Lorsqu'on supprime ou modifie un devoir. L'application demande une confirmation à l'utilisateur.

- On a également incorporé la pagination en utilisant Paginator d'Angular Material, on peut afficher sur le tableau 10, 25, ou 50 assignments parmis 1000 et paginer à chaque fois.

**Authentification**

Un mécanisme de connexion avec identifiant et mot de passe a été mis en place. Pour accéder à ce système, il suffit de cliquer sur l'icône de connexion située à droite de la barre d'outils, ce qui ouvrira le formulaire d'authentification. L'authentification a été réalisé avec Json Web Token. Lorsque l'utilisateur se connecte, il possède un token qui est nécessaires pour accéder à certaines routes. Lorsqu'on rafraichit la page, l'utilisateur reste connecté.

**Pour se connecter**

Pour se connecter, il faut entrer le nom d'utilisateur et le mot de passe. Une fois authentifié, le formulaire disparaît, laissant uniquement visible un bouton de déconnexion.

**Pour s'inscrire**

Si l'utilisateur ne possède pas de compte, il peut cliquer sur le lien "Créer un compte". En remplissant les champs du formulaire d'inscription, comprenant le nom d'utilisateur, le mot de passe (minimum 8 caractères), et le rôle (Utilisateur, qui peut ajouter/modifier des devoirs ; et Administrateur, qui peut en plus supprimer des devoirs), l'utilisateur peut ensuite s'inscrire. Lorsqu'on crée un compte, le mot de passe est hashé pour crypter le mot de passe en base de données. L'algorithme de cryptage utilisé est "bcrypt".

**Peupler la base de données**

Ajoute 1000 devoirs


### Sidenav

**Liste des devoirs**

Un lien vers la page d'accueil où les utilisateurs peuvent consulter le tableau des devoirs.

**Ajout d'un devoir**

Un lien vers le formulaire d'ajout d'un nouvel assignment destiné aux utilisateurs autorisés. Ce formulaire adopte la forme d'un Stepper, présentant une progression en deux étapes :
   
    1. Première étape :

    - Nom du devoir
    - Date de rendu (à l'aide d'un mat-datepicker)

    2. Deuxième étape :

    - Matière (sélection parmi les 5 matières prédéfinies via mat-select)
    - Étudiant (également à travers une mat-select)
    - Note (sélection d'une note dans la plage de 0 à 20 via mat-select)
    - Commentaire (zone de texte)
    - Boutons Ajouter (pour confirmer l'ajout) et Retour (pour retourner à la première étape). 
    
    L'application demande une confirmation à l'utilisateur avant d'ajouter.


**Suppression d'un devoir**


**Génération de données test**

### Notifications

Nous avons ajouté un système de notification.

**Ajout d'un devoir**
- Message d'erreur si tous les champs ne sont pas remplis à part commentaire
- Message de validation lorsqu'on ajoute un devoir

**Création d'un compte**
- Message d'erreur si tous les champs ne sont pas remplis, si un compte avec le même nom d'utilisateur existe déjà, si le mot de passe n'est pas identique et si le mot de passe ne fait pas minimum 8 caractères
- Message de validation lorsqu'on crée un compte

**Authentification**
- Message d'erreur si tous les champs ne sont pas remplis 
- Message d'erreur si le nom d'utilisateur et le mot de passe ne correspondent pas
- Message de validation lorsqu'on se connecte

**Détail d'un assignment**
- Message de validation lorsqu'on supprime un devoir

### Base de données

La base de données contient plusieurs collections : 
- assignments : _id, id, nom, dateDeRendu, rendu, studentId, subjectId, note, comment
- students : _id, first_name, id, last_name
- subjects : _id, name, teacher, id, imgSubject, imgTeacher
- users : _id, username, password, role

## Tech Stack

**Frontend:** Angular, Angular Material

**Backend:** Node.js

**Base de données:** MongoDB

**Hébergement:** Render

**Gestionnaire de Paquets:** Node.js, npm

**Système de Contrôle de Version:** Git

## Color Reference
La palette de couleurs utilisée dans l'interface graphique s'est basée sur le code de couleur de la MIAGE avec les références suivantes:
| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| PANTONE 446 | ![#3B3B39](https://via.placeholder.com/10/3B3B39?text=+) #3B3B39 |
| PANTONE 446 | ![#217B8A](https://via.placeholder.com/10/217B8A?text=+) #217B8A |

## Authors

- [@Samuel-Jonathan
](https://github.com/Samuel-Jonathan)
- [@AminaM123456789
](https://github.com/AminaM123456789)

