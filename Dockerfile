
FROM node:20


WORKDIR /app


COPY package*.json ./


RUN npm ci --only=production  


COPY . .


EXPOSE 5050


CMD ["node", "server.js"]
