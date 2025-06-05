FROM node:20

RUN ECHO "UTC" > /etc/timezone
RUN DPKG-reconfigure -f tzdata

WORKDIR /usr/src
COPY ["package.json", "package-lock.json", "usr/src/"]
RUN npm install -g sequelize-auto

RUN npm install

COPY . .
EXPOSE 80

CMD ["npm", "start"]