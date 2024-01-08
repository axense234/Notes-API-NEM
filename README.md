# **Notes API NEM**

A node express mongodb mongoose project that i built for practice purposes.

## **Description**

A node express mongodb mongoose project that i built for practice purposes.The project is all about users and notes,
with added security using jwt and bcryptjs.

## **Getting Started**

### Dependencies

- Git installed on your machine
- Docker installed on your machine(optional)
- A Mongo DB(atlas, local or container)
- Check package.json for other dependencies

### Installing

- run the following commands:

```
git clone  https://github.com/axense234/Notes-API-NEM.git
cd Notes-API-NEM
npm install
```

- rename **.env.sample** to **.env** and add your own environment variables corespondly:
  - **JWT_SECRET_KEY** = the jwt secret key for authorization purposes
  - **MONGO_USERNAME** = the mongo db username
  - **MONGO_PASSWORD** = the mongo db password
  - **MONGO_SERVER** = the mongo db server
  - **PORT** = the port which your server listens on
  - **MONGO_URI** = the connection string to your db(composed of other mongo db related env variables)

### Executing program

- Test the server using nodemon

```
npm test
```

- Test the server using docker-compose

```
docker build -t notes-api-nem .
docker compose up
```

## **Authors**

- axense234(me)

## **Version History**

- 1.0.0
  - current version after upgrade the README.md file through refactoring; see [**commit history**](https://github.com/axense234/Notes-API-NEM/commits/master) and [**release history**](https://github.com/axense234/Notes-API-NEM/releases)

## **License**

This project is licensed under the GNU License - see the LICENSE.md file for details
