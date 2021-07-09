FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /online-showroom
COPY package.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]