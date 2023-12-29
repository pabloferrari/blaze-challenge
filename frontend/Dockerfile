FROM node:18.10.0-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV NODE_ENV production

# Run app when the container launches
CMD ["npm", "start"]
