FROM ubuntu:18.04

RUN apt update && \
    apt install curl -y && curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
    apt install -y nodejs python3

WORKDIR /opt/app

COPY ./  ./

RUN npm install

# Incompatibility between node_modules compiled on OSX and linux FIX so that volumes still works properly
RUN npm install bcrypt

CMD [ "npm", "run", "dev" ]