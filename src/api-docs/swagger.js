import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import userRouteDoc from "./user.doc";

dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Farmer Impact Backend",
      description: "APIs of Farmer Impact project",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "Development server",
      },
      {
        url: "https://wsduback.farmerimpact.rw",
        description: "Production server",
      },
    ],
    tags: [
      { name: "Users", description: "User Routes" },
      { name: "Access Control", description: "Product Routes" },
      { name: "Coffee Purchase", description: "Product Review Routes" },
      { name: "station", description: "Station Routes" },
      { name: "Daylots", description: "Daylots Routes" },
      { name: "Harvests", description: "Harvests Routes" },
      { name: "Dryings", description: "Drying Routes" },
      { name: "Parchments", description: "Parchments Routes" },
      { name: "Inspection", description: "Inspection Routes" },
      { name: "Farmers", description: "Farmers Routes" },
      { name: "Groups", description: "Groups Routes" },
      { name: "Household", description: "Households Routes" },
      { name: "Trainings", description: "Trainings Routes" },
      { name: "Attendance", description: "Attendance Routes" },
      { name: "Registrations", description: "Registration Routes" },
      { name: "Translation", description: "Translation Routes" },
      { name: "Trees", description: "Trees Routes" },
      { name: "Buckets", description: "Buckets Routes" },
    ],
    components: {
      securitySchemes: {
        token: {
          type: "apiKey",
          scheme: "bearer",
          bearerFormat: "JWT",
          name: "token",
          in: "header",
        },
      },
    },
    paths: {
        ...userRouteDoc
    },
  },
  apis: ["../routes/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerDocs;
