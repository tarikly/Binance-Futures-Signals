FROM node:latest as build

RUN apt-get update && apt-get install python3 make g++ -y

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install


FROM build AS release
# copy production node_modules
COPY --from=build /usr/src/app/node_modules ./node_modules
# copy app sources
COPY . .
# define CMD
CMD ["node", "index.js"]