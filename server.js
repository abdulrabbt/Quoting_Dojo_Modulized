var express = require("express");
var app = express();
var mongoose = require("mongoose");
var session = require("express-session");
var flash = require("express-flash");

app.use(flash());
app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: "QWERT!@#$%^&*(",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/quoting_dojo", {useNewUrlParser: true, useUnifiedTopology: true});
require("./server/config/mongoose.js");

require("./server/config/routes.js")(app);

app.listen(8000, function(){
    console.log("Listening on port: 8000");
})