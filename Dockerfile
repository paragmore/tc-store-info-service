FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i --save-dev @types/node

COPY . .

EXPOSE 8005

ENV PORT=8005

CMD ["npm", "start"]