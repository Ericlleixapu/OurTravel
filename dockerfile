FROM node:20 AS build 
WORKDIR /
COPY package.json package-lock.json ./ 
RUN npm install 
COPY . . 
EXPOSE 3000
CMD ["node", "app.js"]