FROM node:20-slim

# Instalamos las herramientas que el bot necesita para procesar stickers y video
RUN apt-get update && apt-get install -y \
    ffmpeg \
    imagemagick \
    webp \
    git \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiamos solo el package.json para instalar dependencias primero (mejor caché)
COPY package.json .
RUN npm install

# Copiamos el resto de los archivos del bot
COPY . .

# Comando para iniciar el bot
CMD ["npm", "start"]
