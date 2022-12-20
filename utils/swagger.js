const swaggerDocs = require("swagger-jsdoc");
const m2s = require("mongoose-to-swagger");
const { version } = require("../package.json");
const User = require("../models/User");
const Note = require("../models/Note");

const m2sOptions = {
  omitFields: [
    "_id",
    "createdAt",
    "updatedAt",
    "notesDeleted",
    "notesFavorited",
  ],
};

const UserSwaggerSchema = m2s(User, m2sOptions);
const NoteSwaggerSchema = m2s(Note, m2sOptions);

const swaggerOptions = swaggerDocs({
  definition: {
    info: {
      title: "Notes API Docs with Swagger",
      description:
        "Node Express Mongoose MongoDB Main Project: Notes API,docs built with swagger-ui-express and swagger-jsdoc",
      contact: {
        name: "axense234",
        url: "https://github.com/axense234",
        email: "andreicomanescuonline@gmail.com",
      },
      version,
    },
    components: {
      schemas: {
        User: UserSwaggerSchema,
        Note: NoteSwaggerSchema,
        Authorization: {
          properties: {
            username: {
              type: "string",
            },
            email: {
              type: "string",
            },
            password: {
              type: "string",
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        scheme: "bearer",
        in: "header",
        name: "Authorization",
      },
    },
    // Servers for development/production
    servers: [
      { url: "http://localhost:4000" },
      { url: "https://notes-api-nem-ca.onrender.com" },
    ],
  },
  apis: ["./routes/*.js"],
});

module.exports = { swaggerOptions };
