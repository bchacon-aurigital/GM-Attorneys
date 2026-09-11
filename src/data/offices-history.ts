export interface OfficeHistory {
  id: string;
  name: string;
  image: string;
  year: number;
}

export const officesHistory: OfficeHistory[] = [
  { id: "flamingo",  name: "Flamingo",  image: "/assets/about-us/flamingo.avif",  year: 2002 },
  { id: "tamarindo", name: "Tamarindo", image: "/assets/about-us/Tamarindo.avif", year: 2006 },
  { id: "nosara",    name: "Nosara",    image: "/assets/about-us/Nosara.avif",    year: 2018 },
  { id: "sanJose",   name: "San José",  image: "/assets/about-us/sanjose.avif",   year: 1978 },
];
