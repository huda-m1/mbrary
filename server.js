if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const moongoose = require("mongoose");
const bodyParser = require('body-parser');


app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout","layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({limit:'10mb', extended:false}));


const indexRouter = require("./routes/index.js");
const authorRouter = require('./routes/author.js');
moongoose.connect(process.env.DATABASE_URL, {useUnifiedTopology:true});

const db = moongoose.connection;

db.on("error",(error)=> console.error(error));
db.once("open",()=> console.log("connected to moongoose"));

app.use("/", indexRouter);
app.use("/authors", authorRouter);

app.listen(process.env.PORT || 3000);




