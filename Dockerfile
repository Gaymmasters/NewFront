FROM node
WORKDIR /server/front
COPY . .
RUN npm install 
EXPOSE 3000
CMD [ "npm", "start" ]