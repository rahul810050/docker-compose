FROM node:22-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma migrate dev --name init

RUN npx prisma generate

RUN npm run build

ENV DATABASE_URL=postgresql://postgres:mypass@localhost:5432/postgres

EXPOSE 3000

CMD ["npm", "run", "start"]