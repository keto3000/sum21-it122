import { MedPlant } from "./models/medPlant.js";

// find all documents

MedPlant.find({}, (err, result) => {
  // output error if one occurred
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
  return;
});

// count of docs
console.log("step 1");
MedPlant.countDocuments((err, result) => {
  console.log("step 2");
  console.log(result + "db entries");
});
console.log("step 3");
