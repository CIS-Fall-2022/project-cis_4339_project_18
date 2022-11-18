# Backend

This implementation is for NodeJS based on [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/) and uses [mongoose](https://mongoosejs.com/) as the ODM.

## Project setup
```
npm install
```

### Before startup 
Setup a .env file with the following variables, e.g.:

```
MONGO_URL = mongodb+srv://admin:group18@cis4339.cjnkdxa.mongodb.net/project
PORT = 3000
ORG =  c2531510-62b9-11ed-be5b-bf06747dc832

#Organizations
# orgName: Org1
# _id: c2531510-62b9-11ed-be5b-bf06747dc832


# orgName: Org2
# _id: 423ad600-62dd-11ed-bd1f-797e2f674e61


# orgName: Org3
# _id: 51d4e280-6789-11ed-a3a1-a7f24c6c516c

```

### Compiles and hot-reloads for development
```
npm start
```
