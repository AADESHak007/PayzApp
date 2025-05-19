FROM node:20.12.0-alpine3.19 
#update the container image to the latest version

WORKDIR /usr/src/app

COPY package.json package-lock.json turbo.json tsconfig.json ./


COPY apps ./apps
COPY packages ./packages

RUN npm install 

# to generate the clients[prisma] ...

RUN npm run db:generate

RUN npm run build

CMD ["npm", "run", "start-user-app"]