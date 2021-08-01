"use strict";

import { MedPlant } from "./models/medPlant.js";
import express from "express";
import exphbs from "express-handlebars";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static("./public")); // set location for static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.engine("hbs", exphbs({ defaultLayout: "main.hbs" }));
app.set("view engine", "hbs");

// respond to browser only after mongodb query completes
app.get("/", (req, res) => {
  MedPlant.find({})
    .lean()
    .then((medPlants) => {
      res.render("home", { medPlants });
    })
    .catch((err) => next(err));
});

// send plain text response
app.get("/about", (req, res) => {
  res.type("text/plain");
  res.send("About page");
});

// db query can use request parameters
app.get("/detail", (req, res) => {
  MedPlant.findOne({ commonName: req.query.commonName })
    .lean()
    .then((medPlant) => {
      res.render("detail", { result: medPlant });
    })
    .catch((err) => next(err));
});

app.get("/delete", (req, res) => {
  MedPlant.remove({ commonName: req.query.commonName }, (err, result) => {
    if (err) return next(err);
    let deleted = result.result.n !== 0; // n will be 0 if no docs deleted
    MedPlant.count((err, total) => {
      res.type("text/html");
      res.render("delete", {
        commonName: req.query.commonName,
        deleted: result.result.n !== 0,
        total: total,
      });
    });
  });
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
