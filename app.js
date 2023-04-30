var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");

var indexRouter = require("./routes/index");
var charactersRouter = require("./routes/characters");
var skillsRouter = require("./routes/skills");

var app = express();

// Intégration de la bdd
var connectionString =
  "mongodb+srv://alexandre:pcVjSvrbpXeCVCnc@iut.cebss47.mongodb.net/projet";
var mongoDB = process.env.MONGODB_URI || connectionString;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/characters", charactersRouter);
app.use("/skills", skillsRouter);

module.exports = app;
