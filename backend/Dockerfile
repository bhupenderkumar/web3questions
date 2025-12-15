FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN apk add --no-cache openssl=1.1.1n-r7

EXPOSE 3001

CMD ["npm", "run", "dev"]
