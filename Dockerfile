
FROM node:20


WORKDIR /app


COPY package*.json ./


RUN npm install --omit=dev  # 🛠 Avoid installing devDependencies in production


COPY . .


EXPOSE 5050


CMD ["node", "server.js"]
