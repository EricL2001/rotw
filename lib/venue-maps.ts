// this list is used to provide venue name, city and map URL link on the shows/[slug]/page.tsx

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
    name: "Bar 404",
    city: "Denver, CO",
    mapsUrl: "https://maps.app.goo.gl/V47CNJBs3ney1syc7"
  },
  {
    name: "The Hunt House",
    city: "Marietta, GA",
    mapsUrl: "https://maps.app.goo.gl/ECEiZWkQ3RaWsjdB8"
  },
];

// helper function to find venue by name
export const findVenueByName = (venueName: string) => {
  return venueMaps.find((v) => v.name === venueName);
};