import mongoose from "mongoose";
const { Schema } = mongoose;
import { connectionString } from "../lib/credentials.js";

mongoose.connect(connectionString, {
  dbName: "database1",
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("open", () => {
  console.log("Mongoose connected.");
});

// define MedPlant model as JSON key/value pairs
// values indicate the data type of each key
const medPlantSchema = new Schema({
  commonName: String,
  latinName: String,
  habitat: String,
  harvestTime: String
});

export const MedPlant = mongoose.model("MedPlant", medPlantSchema, );
