// An array w/5 objects & 4 attributes per object- Medicinal Herbs of the Pac NW-

let medPlants = [
  {
    commonName: "Devil's Club",
    latinName: "Oplopanax horridus",
    habitat: "Moist woods",
    harvestTime: "Late Spring, early Summer",
  },

  {
    commonName: "Foxglove",
    latinName: "Digitalis Purpurea",
    habitat: "Roadsides, fields",
    harvestTime: "Late Spring, early Summer",
  },

  {
    commonName: "Kinnikinnick",
    latinName: "Arctostaphylos uva-ursi",
    habitat: "Sandy, dry rocky slopes",
    harvestTime: "Late Spring, early Summer",
  },

  {
    commonName: "Oregon Grape",
    latinName: "Mahonia nervosa",
    habitat: "Low-middle elevations",
    harvestTime: "Early Spring, late Autumn",
  },

  {
    commonName: "Pacific Yew",
    latinName: "Taxus brevifolia",
    habitat: "Moist–mature Douglas Fir and Western Hemlock forests",
    harvestTime: "Year-round",
  }
];

//+++ start comments for hw2 assignment +++++

// getAll method that returns all array items
const getAll = () => {
  return medPlants};

console.log(getAll(medPlants));


// getItem method that returns a single item
const getItem = (commonName) => {
  return medPlants.find((medPlant) => {
    return medPlant.commonName === "Devil's Club";
  });
};

console.log(getItem("Devil's Club"));

// export both getAll and getitem methods

export {getAll, getItem};