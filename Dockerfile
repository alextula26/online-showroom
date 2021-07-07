FROM node:14-alpine
WORKDIR /online-showroom
COPY . .
RUN npm install
CMD ["npm", "start"]