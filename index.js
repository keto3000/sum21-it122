"use strict";

import * as medPlant from "./data.js";
import express from "express";
import exphbs from "express-handlebars";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static("./public")); // set location for static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.engine("hbs", exphbs({ defaultLayout: "main.hbs" }));
app.set("view engine", "hbs");

// send home.hbs file as response
app.get("/", (req, res) => {
  res.render("home", { medPlants: medPlant.getAll()});
});

// send detail.hbs file based on item query as response
app.get("/detail", (req, res) => {
  console.log(req.query);
  let result = medPlant.getItem(req.query.commonName);
  res.render("detail", {commonName: req.query.commonName, result});
});

// send plain text response
app.get("/about", (req, res) => {
  res.type("text/plain");
  res.send("About page");
});

// define 404 handler
app.use((req, res) => {
  res.type("text/plain");
  res.status(404);
  res.send("404 - Not found");
});

app.listen(app.get("port"), () => {
  console.log("Express started");
});

// test these delete routes for hw4

//  app.delete('/user', (req, res) => {
//   res.send('Got a DELETE request at /user')
// })

// app.delete('/ser', function (req, res) {
//   // First read existing users.
//   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//      data = JSON.parse( data );
//      delete data["user" + 2];

//      console.log( data );
//      res.end( JSON.stringify(data));
//   });
// })
