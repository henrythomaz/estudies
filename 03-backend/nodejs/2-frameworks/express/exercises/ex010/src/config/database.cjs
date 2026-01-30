const path = require("path");
const dotenv = require("dotenv");

const envFile = process.env.DOCKER === "true" ? ".env" : ".env.local";

dotenv.config({
  path: path.resolve(process.cwd(), envFile),
});

module.exports = {
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
