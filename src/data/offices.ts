export interface LocalizedText {
  es: string;
  en: string;
}

export interface Office {
  id: string;
  city: string;
  name: string;
  address: LocalizedText;
  email: string;
  lat: number;
  lng: number;
  website?: string;
  mapsUrl: string;
}

export const offices: Office[] = [
  {
    id: "flamingo",
    city: "Flamingo",
    name: "GM Attorneys — Flamingo",
    address: {
      en: "Commercial Center Arenas, Office #3, Playa Flamingo, Cabo Velas, Santa Cruz, Guanacaste 50308, Costa Rica",
      es: "Centro Comercial Arenas, Oficina #3, Playa Flamingo, Cabo Velas, Santa Cruz, Guanacaste 50308, Costa Rica",
    },
    email: "flamingo@gmattorneyscr.com",
    lat: 10.4313605,
    lng: -85.7824175,
    mapsUrl: "https://goo.gl/maps/ifoBBBhZe2AVNBPE9",
  },
  {
    id: "tamarindo",
    city: "Tamarindo",
    name: "GM Attorneys — Tamarindo",
    address: {
      en: "Russell E. Wenrich Building, 2nd Floor, Office #1, Tamarindo, Santa Cruz, Guanacaste 50309, Costa Rica",
      es: "Edificio Russell E. Wenrich, 2do Piso, Oficina #1, Tamarindo, Santa Cruz, Guanacaste 50309, Costa Rica",
    },
    email: "tamarindo@gmattorneyscr.com",
    lat: 10.2968537,
    lng: -85.8421561,
    mapsUrl: "https://goo.gl/maps/ydDSP6n1aTDaz1NS6",
  },
  {
    id: "nosara",
    city: "Nosara",
    name: "GM Attorneys — Nosara",
    address: {
      en: "Next to Safari Vet, Nosara, Nicoya, Guanacaste 50406, Costa Rica",
      es: "Junto a Safari Vet, Nosara, Nicoya, Guanacaste 50406, Costa Rica",
    },
    email: "nosara@gmattorneyscr.com",
    lat: 9.9336847,
    lng: -85.6511889,
    mapsUrl: "https://goo.gl/maps/CScHZW2Z7nDBnZPB8",
  },
  {
    id: "los-yoses",
    city: "San José",
    name: "GM Attorneys — Los Yoses",
    address: {
      en: "Casa Jorgran, Ave. 2 & 8, Calle 37, Los Yoses, San Pedro, Montes de Oca, San José 10800, Costa Rica",
      es: "Casa Jorgran, Avenida 2 y 8, Calle 37, Los Yoses, San Pedro, Montes de Oca, San José 10800, Costa Rica",
    },
    email: "info@gmattorneyscr.com",
    lat: 9.931275,
    lng: -84.0622075,
    mapsUrl: "https://goo.gl/maps/NX8TmLMA4Jow3h2j7",
  },
];
