export interface CarBrand {
  name: string;
  models: string[];
}

export const carDatabase: CarBrand[] = [
  {
    name: "Audi",
    models: ["A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q5", "Q7", "Q8", "TT", "R8", "e-tron"]
  },
  {
    name: "BMW",
    models: ["1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "6 Series", "7 Series", "8 Series", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4", "i3", "i4", "iX"]
  },
  {
    name: "Mercedes-Benz",
    models: ["A-Class", "B-Class", "C-Class", "CLA", "CLS", "E-Class", "S-Class", "GLA", "GLB", "GLC", "GLE", "GLS", "G-Class", "V-Class", "EQC", "EQS"]
  },
  {
    name: "Toyota",
    models: ["Corolla", "Camry", "RAV4", "Highlander", "Land Cruiser", "Prado", "4Runner", "Tacoma", "Tundra", "Sienna", "Yaris", "Prius", "C-HR", "Venza", "Supra", "86"]
  },
  {
    name: "Volkswagen",
    models: ["Polo", "Golf", "Jetta", "Passat", "Arteon", "Tiguan", "Touareg", "Atlas", "T-Roc", "T-Cross", "ID.3", "ID.4", "Multivan"]
  },
  {
    name: "Ford",
    models: ["Fiesta", "Focus", "Mondeo", "Mustang", "EcoSport", "Kuga", "Edge", "Explorer", "Ranger", "F-150", "Transit", "Bronco"]
  },
  {
    name: "Chevrolet",
    models: ["Spark", "Aveo", "Cruze", "Malibu", "Camaro", "Corvette", "Trax", "Equinox", "Traverse", "Tahoe", "Suburban", "Silverado", "Colorado"]
  },
  {
    name: "Nissan",
    models: ["Micra", "Note", "Sentra", "Altima", "Maxima", "370Z", "GT-R", "Juke", "Qashqai", "X-Trail", "Murano", "Pathfinder", "Patrol", "Armada", "Leaf"]
  },
  {
    name: "Honda",
    models: ["Fit", "City", "Civic", "Accord", "Insight", "CR-V", "HR-V", "Pilot", "Passport", "Odyssey", "Ridgeline"]
  },
  {
    name: "Mazda",
    models: ["Mazda2", "Mazda3", "Mazda6", "CX-3", "CX-30", "CX-5", "CX-50", "CX-9", "MX-5", "MX-30"]
  },
  {
    name: "Hyundai",
    models: ["i10", "i20", "i30", "Elantra", "Sonata", "Tucson", "Santa Fe", "Palisade", "Kona", "Venue", "Creta", "Ioniq", "Nexo"]
  },
  {
    name: "Kia",
    models: ["Picanto", "Rio", "Ceed", "Cerato", "Optima", "Stinger", "Seltos", "Sportage", "Sorento", "Telluride", "Soul", "Niro", "EV6"]
  },
  {
    name: "Lexus",
    models: ["IS", "ES", "GS", "LS", "RC", "LC", "UX", "NX", "RX", "GX", "LX", "LM"]
  },
  {
    name: "Volvo",
    models: ["S60", "S90", "V60", "V90", "XC40", "XC60", "XC90", "C40", "EX30", "EX90"]
  },
  {
    name: "Subaru",
    models: ["Impreza", "Legacy", "Outback", "Forester", "Crosstrek", "Ascent", "WRX", "BRZ"]
  },
  {
    name: "Mitsubishi",
    models: ["Mirage", "Lancer", "Eclipse Cross", "Outlander", "Pajero", "L200", "ASX"]
  },
  {
    name: "Renault",
    models: ["Clio", "Megane", "Talisman", "Captur", "Kadjar", "Koleos", "Arkana", "Duster", "Logan", "Sandero"]
  },
  {
    name: "Peugeot",
    models: ["208", "308", "508", "2008", "3008", "5008", "Rifter", "Traveller"]
  },
  {
    name: "Citroën",
    models: ["C3", "C4", "C5", "C3 Aircross", "C5 Aircross", "Berlingo", "SpaceTourer"]
  },
  {
    name: "Skoda",
    models: ["Fabia", "Scala", "Octavia", "Superb", "Kamiq", "Karoq", "Kodiaq", "Enyaq"]
  },
  {
    name: "SEAT",
    models: ["Ibiza", "Leon", "Arona", "Ateca", "Tarraco"]
  },
  {
    name: "Opel",
    models: ["Corsa", "Astra", "Insignia", "Crossland", "Grandland", "Mokka", "Combo", "Zafira"]
  },
  {
    name: "Fiat",
    models: ["500", "Panda", "Tipo", "500X", "500L", "Ducato"]
  },
  {
    name: "Jeep",
    models: ["Renegade", "Compass", "Cherokee", "Grand Cherokee", "Wrangler", "Gladiator"]
  },
  {
    name: "Land Rover",
    models: ["Defender", "Discovery", "Discovery Sport", "Range Rover", "Range Rover Sport", "Range Rover Evoque", "Range Rover Velar"]
  },
  {
    name: "Porsche",
    models: ["718", "911", "Taycan", "Panamera", "Macan", "Cayenne"]
  },
  {
    name: "Tesla",
    models: ["Model S", "Model 3", "Model X", "Model Y", "Cybertruck", "Roadster"]
  },
  {
    name: "ВАЗ (Lada)",
    models: ["Granta", "Vesta", "Largus", "Niva", "Niva Travel", "XRAY"]
  },
  {
    name: "ГАЗ",
    models: ["Волга", "Соболь", "ГАЗель", "ГАЗон"]
  },
  {
    name: "УАЗ",
    models: ["Patriot", "Hunter", "Pickup", "Буханка (452)", "Профи"]
  },
  {
    name: "Geely",
    models: ["Emgrand", "Coolray", "Atlas", "Monjaro", "Tugella", "Okavango"]
  },
  {
    name: "Chery",
    models: ["Tiggo 4", "Tiggo 7", "Tiggo 8", "Arrizo 8"]
  },
  {
    name: "Haval",
    models: ["Jolion", "F7", "Dargo", "H9"]
  },
  {
    name: "Changan",
    models: ["CS35", "CS55", "CS75", "CS85", "Uni-K"]
  },
  {
    name: "Dongfeng",
    models: ["AX7", "580", "Shine"]
  },
  {
    name: "FAW",
    models: ["Besturn X80", "Besturn T77"]
  },
  {
    name: "Lifan",
    models: ["X50", "X60", "X70", "Murman"]
  },
  {
    name: "Jaguar",
    models: ["XE", "XF", "XJ", "F-Type", "E-Pace", "F-Pace", "I-Pace"]
  },
  {
    name: "Alfa Romeo",
    models: ["Giulia", "Stelvio", "Tonale"]
  },
  {
    name: "Maserati",
    models: ["Ghibli", "Quattroporte", "Levante", "MC20", "Grecale"]
  },
  {
    name: "Cadillac",
    models: ["CT4", "CT5", "XT4", "XT5", "XT6", "Escalade"]
  },
  {
    name: "Lincoln",
    models: ["Corsair", "Nautilus", "Aviator", "Navigator"]
  },
  {
    name: "Infiniti",
    models: ["Q50", "Q60", "QX50", "QX55", "QX60", "QX80"]
  },
  {
    name: "Acura",
    models: ["ILX", "TLX", "RDX", "MDX", "NSX"]
  },
  {
    name: "Genesis",
    models: ["G70", "G80", "G90", "GV60", "GV70", "GV80"]
  },
  {
    name: "Mini",
    models: ["Cooper", "Clubman", "Countryman"]
  },
  {
    name: "Smart",
    models: ["ForTwo", "ForFour"]
  },
  {
    name: "Suzuki",
    models: ["Swift", "Vitara", "S-Cross", "Jimny"]
  },
  {
    name: "Dacia",
    models: ["Sandero", "Duster", "Logan", "Jogger"]
  },
  {
    name: "SsangYong",
    models: ["Tivoli", "Korando", "Rexton"]
  }
];

export const getAllBrands = (): string[] => {
  return carDatabase.map(brand => brand.name).sort();
};

export const getModelsByBrand = (brandName: string): string[] => {
  const brand = carDatabase.find(b => b.name === brandName);
  return brand ? brand.models : [];
};
