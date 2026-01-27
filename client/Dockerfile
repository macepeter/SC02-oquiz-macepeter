# ==== Stage 1: Build the app ====
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Pass environment variables at build time
# Use: docker build --build-arg VITE_API_BASE_URL=https://api.example.com .
ARG API_URL
ENV VITE_API_BASE_URL=$API_URL

RUN npm run build


# ==== Stage 2: Serve with nginx ====
FROM nginx:alpine

# Remove default nginx static assets
# Ce répertoire /usr/share/nginx/html est l'équivalent du répertoire htdocs pour apache
# On supprime tout ce qui est contenu dans notre répertoire html
RUN rm -rf /usr/share/nginx/html/* 

# Copy built app from builder
# On copie depuis le fichier /app/dist tout le contenu et on le déplace vers le répertoire html afin qu'il soit interpreté
# --from=builder indique que la source à copier (/app/dist) provient d'une image, pour le coup, c'est notre stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]