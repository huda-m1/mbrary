if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const moongoose = require("mongoose");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout","layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));


const indexRouter = require("./routes/index.js");

moongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true});

const db = moongoose.connection;

db.on("error",(error)=> console.error(error));
db.once("open",()=> console.log("connected to moongoose"));

app.use("/", indexRouter);

app.listen(process.env.PORT || 3000);




