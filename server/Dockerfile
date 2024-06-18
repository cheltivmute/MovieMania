FROM node:14

WORKDIR /server

COPY package*.json ./

RUN npm uninstall bcrypt
RUN npm install bcrypt
RUN npm install sequelize sequelize-cli pg
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]