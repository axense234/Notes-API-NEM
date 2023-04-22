# **Notes API NEM**

A node express mongodb mongoose project that i built for practice purposes.

## **Description**

A node express mongodb mongoose project that i built for practice purposes.The project is all about users and notes,
with added security using jwt and bcryptjs.

## **Getting Started**

### Dependencies

- check package.json for details
- you might want your own mongodb database(preferably through mongodb atlas)

### Installing

- run the following commands:

```
git clone  https://github.com/axense234/Notes-API-NEM.git
cd Notes-API-NEM
npm install
```

- rename **.env.sample** to **.env** and add your own environment variables corespondly:
  - **MONGO_URI** = the uri for your mongodb database
  - **JWT_SECRET_KEY** = your secret jwt key

### Executing program

- test the server locally using nodemon:

```
npm test
```

## **Authors**

- axense234(me)

## **Version History**

- 1.0.0
  - current version after upgrade the README.md file through refactoring; see [**commit history**](https://github.com/axense234/Notes-API-NEM/commits/master) and [**release history**](https://github.com/axense234/Notes-API-NEM/releases)

## **License**

This project is licensed under the GNU License - see the LICENSE.md file for details
