FROM node:16.15.1-alpine

WORKDIR /src/app

COPY package.json /src/app/
RUN npm install

COPY . /src/app
RUN npm run build

# start app
CMD ["npm", "start"]
#CMD ["npm", "run", "dev"]
