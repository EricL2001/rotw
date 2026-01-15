export const venueMaps = [
  {
    name: "Heist Brewery - NoDa",
    city: "Charlotte, NC",
    mapsUrl: "https://maps.app.goo.gl/NhCDkcmRAihom6mt5"
  },
  {
    name: "The Rabbit Hole",
    city: "Charlotte, NC",
    mapsUrl: "https://maps.app.goo.gl/tfe67yXm6ZoiDgbJ6"
  },
  {
    name: "Heist Barrel Arts",
    city: "Charlotte, NC",
    mapsUrl: "https://maps.app.goo.gl/Sbser9fELVP5nW9V9"
  },
  {
    name: "Divine Barrel Brewing",
    city: "Charlotte, NC",
    mapsUrl: "https://maps.app.goo.gl/EwBGbpByBakCKeYz6"
  },
  {
    name: "Cactus Jacks",
    city: "Evergreen, CO",
    mapsUrl: "https://maps.app.goo.gl/ZxxtG3iLnmkhFKz57"
  },
  {
    name: "French Broad River Brewery",
    city: "Asheville, NC",
    mapsUrl: "https://maps.app.goo.gl/LyAi9axCX37UUbqc9"
  },
];

// helper function to find venue by name
export const findVenueByName = (venueName: string) => {
  return venueMaps.find((v) => v.name === venueName);
};