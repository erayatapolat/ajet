export interface Airport {
  code: string;
  name: string;
  city: string;
}

export const airports: Airport[] = [
  { code: "IST", name: "İstanbul Havalimanı", city: "İstanbul" },
  { code: "SAW", name: "Sabiha Gökçen", city: "İstanbul" },
  { code: "ESB", name: "Esenboğa", city: "Ankara" },
  { code: "ADB", name: "Adnan Menderes", city: "İzmir" },
  { code: "CDG", name: "Charles de Gaulle", city: "Paris" },
  { code: "LHR", name: "Heathrow", city: "Londra" },
  { code: "JFK", name: "John F. Kennedy", city: "New York" },
  { code: "AMS", name: "Amsterdam Schiphol", city: "Amsterdam" },
];
