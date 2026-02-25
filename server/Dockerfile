FROM node:20-alpine

WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build
RUN cp -r src/generated dist/generated


CMD [ "npm" ,"run","dev"]

