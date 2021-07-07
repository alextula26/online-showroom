FROM node
WORKDIR /online-showroom
COPY . .
RUN npm install --production
CMD ["npm", "start"]