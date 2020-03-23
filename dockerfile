FROM node:12

WORKDIR /app
COPY package*.json ./
RUN npm i -g @nestjs/cli --loglevel=error
RUN npm install --loglevel=error
COPY tsconfig*.json ./
COPY src ./src
RUN npm run build