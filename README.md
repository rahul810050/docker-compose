## Mannual Installation
 - install nodejs locally
 - clone the repo
 - install all the dependencies by 
  - CMD -> npm install
 - start the DB locally
  - docker run -e POSTGRES_PASSWORD=<yourpassword> -d -p 5432:5432 postgres
  - Or Go to neon.tech and get yourself a new DB
 - change the db .env file with your new db url
 - npx prisma migrate dev --name init
 - npx prisma generate 
 - npm run build 
 - npm run start

## Docker installation
 - install docker 
 - create a network
  - run `docker network create <networkname>`
 - start postgres
  - run -> `docker run --network <networkname> -e POSTGRES_PASSWORD=mypass -d -p 5432:5432 postgres`
 - Build the project
  - `docker build -t <imagename> .`
  - `docker run -p 3000:3000 <imagename>`

## Docker Compose Installation
 - docker-compose -f docker-compose.yml up