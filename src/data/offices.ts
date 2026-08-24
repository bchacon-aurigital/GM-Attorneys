export interface Office {
  id: string;
  city: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  website?: string;
  mapsUrl: string;
}

export const offices: Office[] = [
  {
    id: "los-yoses",
    city: "San José",
    name: "GM Attorneys — Los Yoses",
    address: "Los Yoses, San José, Costa Rica",
    lat: 9.931275,
    lng: -84.0622075,
    mapsUrl: "https://goo.gl/maps/NX8TmLMA4Jow3h2j7",
  },
  {
    id: "flamingo",
    city: "Flamingo",
    name: "GM Attorneys — Flamingo",
    address: "Playa Flamingo, Guanacaste, Costa Rica",
    lat: 10.4313605,
    lng: -85.7824175,
    mapsUrl: "https://goo.gl/maps/ifoBBBhZe2AVNBPE9",
  },
  {
    id: "tamarindo",
    city: "Tamarindo",
    name: "GM Attorneys — Tamarindo",
    address: "Tamarindo, Guanacaste, Costa Rica",
    lat: 10.2968537,
    lng: -85.8421561,
    mapsUrl: "https://goo.gl/maps/ydDSP6n1aTDaz1NS6",
  },
  {
    id: "nosara",
    city: "Nosara",
    name: "GM Attorneys — Nosara",
    address: "Nosara, Guanacaste, Costa Rica",
    lat: 9.9336847,
    lng: -85.6511889,
    mapsUrl: "https://goo.gl/maps/CScHZW2Z7nDBnZPB8",
  },
];
