# Le Dockerfile c'est le fichier qui va nous permettre de créer une sorte d'image customisée

# On part d'une image existante et on va modifié des choses
FROM node:22-alpine

# Définir un espace de travail
# /app est le dossier commun par convention pour les projet nodejs
WORKDIR /app

# On copie le fichier package.json dans le futur conteneur
COPY package.json .

# On installe les dépendances Node
RUN npm install

# On copie tout le reste
COPY . .

# Créer la base de donnée
RUN npm run db:generate

# Créer le dossuer dist contenant le code JS compilé que l'on executera
RUN npm run build

# On expose le port 3000
EXPOSE 3000

# CMD = commande qui sera lancé lorsqu'on génère le CONTENEUR à partir de l'image
CMD ["npm", "run", "start"]