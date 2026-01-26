# SC02E01 - Conteneurisation Docker

## Menu du jour

- Théorie : Docker
  - Installation de Docker Engine
  - Motivation et intérêt
  - Rappels : images & conteneurs
  - Rappels : DockerHub
  - Rappels : Dockerfile
  - Rappels : Docker compose

- Pratique : Docker
  - CLI : démarrer un conteneur local
  - Dockerfile : créer un Dockerfile (API)
  - Compose : orchestrer des services

- Challenge : Docker
  - Dockerfile : créer un Dockerfile (Client)
  - Compose : ajouter un service

## Résumé du client
Vite = bundler + live serveur

- **bundler** = ```npm run build``` --> prend les sources et génère un dossier ```dist``` que l'on peut ensuite héberger sur un serveur de fichier statique
- **live serveur** = ```npm run dev``` --> lance un serveur de développement avec ```hot reload```
Svelte = Framework = syntaxe pour écrire du front sous forme de composant :

- template
- script
- style

## Révision sécurité (CORS)

Par défaut, les navigateurs appliquent une règle de sécurité appelée la **Same Origin Policy** (SOP).

Un `domaine A` (ex : `http://oclock.io`) ne peut pas effectuer des requêtes vers un `domaine B` (ex : `http://oquiz.io`) sans l'autorisation explicite du `domaine B`.

Pour autoriser ce type de requêtes, dites **cross-origin**, le domaine B doit ajouter un en-tête HTTP `Access-Control-Allow-Origin`, en précisant les domaines autorisés à accéder à ses ressources.

`CORS` (pour **Cross-Origin Resource Sharing**, ou *partage de ressources entre origines différentes*) est un mécanisme qui vient **assouplir la politique SOP**, celle-ci étant très restrictive par défaut.

📝 **Remarque** : cette restriction est imposée par les **navigateurs web**. Un appel entre deux backends, ou depuis un outil comme Postman, Bruno ou Insomnia, **ne sera pas bloqué par CORS**. Pour véritablement restreindre l'accès à une API, il faut mettre en place un système d'**authentification**, comme par exemple avec des tokens **JWT**.

Pour installer cors dans notre api, il faut installer le packet node ```cors``` :
```npm install cors```
Avec typescript il faut ajouter : ```npm install @types/cors```