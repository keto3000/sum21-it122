// An array w/5 objects & 4 attributes per object- Medicinal Herbs of the Pac NW-

let medPlants = [
  {
    commonName: "Devil's Club",
    latinName: "Oplopanax horridus",
    habitat: "Moist woods",
    harvestTime: "Late spring, early summer",
  },

  {
    commonName: "Foxglove",
    latinName: "Digitalis Purpurea",
    habitat: "Roadsides, fields",
    harvestTime: "Late spring, early summer",
  },

  {
    commonName: "Kinnikinnick",
    latinName: "Arctostaphylos uva-ursi",
    habitat: "Sandy, dry rocky slopes",
    harvestTime: "Late spring, early summer",
  },

  {
    commonName: "Oregon Grape",
    latinName: "Mahonia nervosa",
    habitat: "Low-middle elevations",
    harvestTime: "Early spring, late autumn",
  },

  {
    commonName: "Pacific Yew",
    latinName: "Taxus brevifolia",
    habitat: "Moist – mature Douglas Fir and Western Hemlock forests",
    harvestTime: "Year-round",
  }
];

//+++ start comments for hw2 assignment +++++

// getAll method that returns all array items
const getAll = () => {
  return [
    {
      commonName: "Devil's Club",
      latinName: "Oplopanax horridus",
      habitat: "Moist woods",
      harvestTime: "Late spring, early summer",
    },
  
    {
      commonName: "Foxglove",
      latinName: "Digitalis Purpurea",
      habitat: "Roadsides, fields",
      harvestTime: "Late spring, early summer",
    },
  
    {
      commonName: "Kinnikinnick",
      latinName: "Arctostaphylos uva-ursi",
      habitat: "Sandy, dry rocky slopes",
      harvestTime: "Late spring, early summer",
    },
  
    {
      commonName: "Oregon Grape",
      latinName: "Mahonia nervosa",
      habitat: "Low-middle elevations",
      harvestTime: "Early spring, late autumn",
    },
  
    {
      commonName: "Pacific Yew",
      latinName: "Taxus brevifolia",
      habitat: "Moist – mature Douglas Fir and Western Hemlock forests",
      harvestTime: "Year-round",
    }
  ]
 };

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