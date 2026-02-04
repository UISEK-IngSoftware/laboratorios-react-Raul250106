FROM node:20-alpine

WORKDIR /app

# Copiar solo package*.json primero
COPY package*.json ./

# Instalar dependencias limpias
RUN npm install

# Luego copiar el resto del código
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]


