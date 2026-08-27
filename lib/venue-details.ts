// this list is used to provide venue name, address, city, State and map URL link on the shows/[slug]/page.tsx and passed to resend emails via the EmailTemplate component

export const venueMaps = [
  {
    name: "Heist Brewery - NoDa",
    address: "2909 N Davidson St STE 200",
    city: "Charlotte, NC",
    mapsUrl: "https://maps.app.goo.gl/NhCDkcmRAihom6mt5"
  },
  {
    name: "The Rabbit Hole",
    address: "1801 Commonwealth Ave",
    city: "Charlotte, NC",
    mapsUrl: "https://maps.app.goo.gl/tfe67yXm6ZoiDgbJ6"
  },
  {
    name: "Heist Barrel Arts",
    address: "1030 Woodward Ave",
    city: "Charlotte, NC",
    mapsUrl: "https://maps.app.goo.gl/Sbser9fELVP5nW9V9"
  },
  {
    name: "Divine Barrel Brewing",
    address: "3701 N Davidson St STE 203",
    city: "Charlotte, NC",
    mapsUrl: "https://maps.app.goo.gl/EwBGbpByBakCKeYz6"
  },
  {
    name: "Cactus Jacks",
    address: "4651 County Hwy 73",
    city: "Evergreen, CO",
    mapsUrl: "https://maps.app.goo.gl/ZxxtG3iLnmkhFKz57"
  },
  {
    name: "Bar 404",
    address: "404 North Broadway",
    city: "Denver, CO",
    mapsUrl: "https://maps.app.goo.gl/V47CNJBs3ney1syc7"
  },
  {
    name: "The Hunt House",
    address: "1127 White Cir NW",
    city: "Marietta, GA",
    mapsUrl: "https://maps.app.goo.gl/ECEiZWkQ3RaWsjdB8"
  },
];

// helper function to find venue by name
export const findVenueByName = (venueName: string) => {
  return venueMaps.find((v) => v.name === venueName);
};