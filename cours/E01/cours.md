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

## Docker : Command Line Interface (CLI) - Fiche recap'

```bash
# Lister les images
docker images

# Lister les conteneurs
docker ps
docker ps -a  # Lister également les conteneurs qui ne tourne plus

# Créer un conteneur à partir d'une image (téléchargé à la volé depuis le DockerHub)
docker run \                                # Créer un conteneur
--name NOM_POUR_LE_CONTENEUR \              # Choisir le nom du conteneur
--network NOM_NETWORK                       # Choix du network
-p PORT_HOTE:PORT_CONTENEUR \               # Binder un port du conteneur vers notre hôte
-v CHEMIN_DOSSIER_LOCAL:CHEMIN_CONTENEUR \  # Monter un volume dans le conteneur
-d \                                        # DETACH (tâche de fond)
NOM_IMAGE                                   # Image de base

# Créer un conteneur qui tourne en tache de fond
docker run -it -d NOM_IMAGE

# Exécuter une commande à l'intérieur d'un conteneur qui tourne
docker exec -it NOM_OU_ID_CONTENEUR bash

# Lancer un conteneur en exécutant une commande
docker run --it NOM_IMAGE COMMAND

# Supprimer un conteneur
docker rm NOM_OU_ID_CONTENEUR # supprimer un conteneur déjà éteint
docker rm -f NOM_OU_ID_CONTENEUR # supprimer un conteneur qui n'est pas éteint

# Supprimer tous les conteneurs 
docker rm $(docker ps -a -q)
docker rm -f $(docker ps -a -q)

# Éteindre un conteneur
docker stop NOM_OU_ID_CONTENEUR # (arrêter)
docker kill NOM_OU_ID_CONTENEUR # (débrancher)

# Supprimer une image
docker image rm NOM_IMAGE
docker rmi NOM_IMAGE
```

## Démonstration de cours

```bash
# Exemple du Hello-world
docker run hello-world   # qui nous affiche Hello world puis s'éteint car il n'a rien d'autre à faire
docker ps -a             # il est éteint
docker rm ID_CONTENEUR   # on le supprime

# Exemple Ubuntu
docker run -it ubuntu bash # Lancer un conteneur ubuntu et lancer bash dans ce conteneur
uname -a                   # On est bien dans ubuntu
exit                       # On quitte
docker ps -a               # il est éteint également
docker rm ID_CONTENEUR

# Exemple Ubuntu v2
docker run -it -d --name mon-ubuntu ubuntu  # On lance un conteneur Ubuntu en tache de fond, on le nomme
docker exec -it mon-ubuntu bash             # On s'y connecte à posterio !
exit
docker rm mon-ubuntu                        # On essaie de le supprimer mais impossible car il tourne
docker rm -f mon-ubuntu                     # On forme l'extinction

# Supprimer tous mes conteneurs
docker rm -f $(docker ps -a -q)
```

```bash
# Exemple avec Apache
docker run -d -p 8080:80 --name apache httpd  # On bind les ports
curl http://localhost:8080      # On test
docker exec -it apache bash     # On se connecte
cat htdocs/index.html           # On cherche où se trouve le code source ! Dans le dossier htdocs
exit
docker rm -f apache             # On supprime, on va retester

# Bind Mount
npm install --prefix client     # On installe les dependances dans le client
npm run build --prefix client   # On build le client histoire d'avoir des source à monter dans le conteneur
docker run -d -p 8080:80 --name apache -v "$(pwd)/client/dist":/usr/local/apache2/htdocs httpd  # On monte le dossier dist dans Apache !
curl http://localhost:8080      # Incroyable, le client nous est servi par Apache
exit
docker rm -f apache
```