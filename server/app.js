const express = require("express");
const dotenv = require("dotenv")
const mongoose = require("mongoose");

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGODB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", console.log.bind(console, "Successfully opened connection to Mongo!"));

const logging = (request,response, next) => {
  console.log(`${request.method} ${request.url} ${Date.now()}`);
  next();
};

const cors = (request, response, next) => {
  response.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  response.setHeader("Access-Control-Allow-Credentials", true);
  next();
}

app.use(logging);
app.use(cors);
app.use(express.json());

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get("/status", (request, response) =>{
  response.status(200).json({message: "Service healthy."});
});
