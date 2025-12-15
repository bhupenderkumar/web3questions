FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN apk add --no-cache openssl1.1-compat

EXPOSE 3001

CMD ["npm", "run", "dev"]
