"use strict";

import { MedPlant } from "./models/medPlant.js";
import express from "express";
import exphbs from "express-handlebars";
import cors from "cors";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static("./public")); // set location for static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.engine("hbs", exphbs({ defaultLayout: "main.hbs" }));
app.set("view engine", "hbs");
app.use("/api", cors()); // set Access-Control-Allow-Origin header for api route

// respond to browser only after mongodb query completes
app.get("/", (req, res) => {
  MedPlant.find({}).lean()
    .then((medPlants) => {
      // res.render("home", { medPlants });

      res.render("home", {medPlants: JSON.stringify(medPlants)});
    });
    // .catch((err) => next(err));
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

// post an db entry to the details page using field 'commonName' as parameter

app.post("/detail", (req,res, next) => {
  MedPlant.findOne({ commonName:req.body.commonName }).lean()
      .then((medPlant) => {
          res.render("detail", {result: medPlant} );
      })
      .catch(err => next(err));
});

// delete a db entry using field 'commonName' as parameter
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

            // TEST: use UPSERT method to insert/update single doc to collection

// const newMedPlant = {
//   'commonName':'testSample',
//   'latinName':'testus sampleus',
//   'habitat': 'testSample area',
//   'harvestTime': 'testSample time'
//  }
// MedPlant.updateOne({'commonName':'testSample'}, newMedPlant, {upsert:true}, (err, result) => {
//   if (err) return next(err);
//   console.log(result);
// });

          //++++++  REST APIs routes  +++++

// GET find - route to return all data
app.get("/api/medPlants", (req, res) => {
  MedPlant.find({}).lean()
    .then((medPlants) => {
      if (medPlants.length > 0) {
        res.status(200).json({success: true, data: medPlants});
      }
      else {
      res.status(404).send('Database not found');
      }
    })
    .catch((err) => next(err));
});

// GET findOne - API route to return 1 doc   req can use  paramemters
app.get("/api/medPlants/:commonName", (req, res) => {
  MedPlant.findOne({ commonName: req.params.commonName })
  .lean().then((medPlant) => {
      res.status(200).json({success:true, data: medPlant});
    })
    .catch((err) => next(err));
});

// POST updateOne - API route using UPSERT to ADD/UPDATE 1 doc  req can use body
app.post("/api/medPlants/add", (req,res) => {
  if(!req.body) {
    res.status(400).json({success: false, msg: "URL parameter: commonName is missing"})
  }
  MedPlant.updateOne({ commonName:req.body.commonName },
    req.body, { upsert: true },(_err, result) => {
      res.status(200).json({success:true, data: medPlant})
      console.log(result);
  });
});

// DELETE remove -  API route  using field 'commonName' as key
app.delete("/api/medPlants/delete", (req, res) => {
  if(!req.body) {
  res.status(400).json({success: false, msg: "URL parameter: commonName is missing"})
  }
  MedPlant.findOneAndRemove({ commonName: req.body.commonName },
     req.body, (_err, result) => {
   res.status(200).json({success:true, data: medPlant})
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
