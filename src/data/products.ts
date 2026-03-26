export type ProductModel = {
  model: string;
  label: string;
  capacity: string;
  diameter: number;
  height: number;
  wall: string;
  lining: string;
  stackingMax: number;
};

export const barricaModels: ProductModel[] = [
  {
    model: "BP-14",
    label: "Barrica 14L",
    capacity: "14L",
    diameter: 260,
    height: 320,
    wall: "3mm dupla",
    lining: "Opcional (PE)",
    stackingMax: 3,
  },
  {
    model: "BP-16",
    label: "Barrica 16L",
    capacity: "16L",
    diameter: 270,
    height: 340,
    wall: "3mm dupla",
    lining: "Opcional (PE)",
    stackingMax: 3,
  },
  {
    model: "BP-18",
    label: "Barrica 18L",
    capacity: "18L",
    diameter: 280,
    height: 360,
    wall: "3mm dupla",
    lining: "Opcional (PE)",
    stackingMax: 3,
  },
  {
    model: "BP-20",
    label: "Barrica 20L",
    capacity: "20L",
    diameter: 290,
    height: 380,
    wall: "3mm dupla",
    lining: "Opcional (PE)",
    stackingMax: 3,
  },
];

export const baldeModels: ProductModel[] = [
  {
    model: "BL-3.6",
    label: "Balde 3,6L",
    capacity: "3,6L",
    diameter: 190,
    height: 170,
    wall: "1.2mm PP",
    lining: "Natural",
    stackingMax: 3,
  },
  {
    model: "BL-5",
    label: "Balde 5L",
    capacity: "5L",
    diameter: 210,
    height: 190,
    wall: "1.2mm PP",
    lining: "Natural",
    stackingMax: 3,
  },
  {
    model: "BL-10",
    label: "Balde 10L",
    capacity: "10L",
    diameter: 260,
    height: 250,
    wall: "1.5mm PEAD",
    lining: "Natural / Colorido",
    stackingMax: 3,
  },
  {
    model: "BL-18",
    label: "Balde 18L",
    capacity: "18L",
    diameter: 310,
    height: 340,
    wall: "1.8mm PEAD",
    lining: "Natural / Colorido",
    stackingMax: 3,
  },
  {
    model: "BL-20",
    label: "Balde 20L",
    capacity: "20L",
    diameter: 320,
    height: 360,
    wall: "2.0mm PEAD",
    lining: "Natural / Colorido",
    stackingMax: 3,
  },
];

export type ProductSpec = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  capacities: string[];
  material: string;
  stackingResistance: string;
  moistureResistance: string;
  minOrder: string;
  leadTime: string;
  applications: string[];
  chemicalCompatibility: string;
};

export const products: ProductSpec[] = [
  {
    id: "barricas",
    name: "Barricas de Papelão",
    slug: "barricas",
    tagline: "A barrica que 500+ indústrias escolheram para não parar",
    capacities: ["14L", "16L", "18L", "20L"],
    material: "Papelão maculatura com capa semi kraft, tampa e fundo plásticos com grampos industriais de alta resistência",
    stackingResistance: "Máximo 3 barricas",
    moistureResistance: "Revestimento interno PE ou alumínio opcional",
    minOrder: "A combinar",
    leadTime: "10 dias úteis",
    applications: [
      "Tintas à Base de Água",
      "Grafiato e Texturas",
      "Construção Civil",
      "Produtos Secos e Granulares",
    ],
    chemicalCompatibility:
      "Compatível com produtos à base de água. Solventes apenas em embalagem de lata.",
  },
  {
    id: "baldes",
    name: "Baldes Plásticos",
    slug: "baldes",
    tagline: "Vedação total, resistência comprovada, entrega em 7 dias",
    capacities: ["3,6L", "5L", "10L", "18L", "20L"],
    material: "Polipropileno (PP) e Polietileno de Alta Densidade (PEAD)",
    stackingResistance: "até 300kg",
    moistureResistance: "Totalmente impermeável",
    minOrder: "200 unidades",
    leadTime: "7 dias úteis",
    applications: [
      "Tintas e Massas",
      "Grafiato e Texturas",
      "Químicos Industriais",
      "Agroquímicos",
      "Produtos para Construção",
    ],
    chemicalCompatibility:
      "PEAD resistente a ácidos, bases e álcoois. Incompatível com solventes aromáticos (tolueno, xileno). PP para produtos à base de água.",
  },
];
