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
    tagline: "Embalagem industrial de papelão kraft multicamadas",
    capacities: ["20L", "50L", "100L", "200L"],
    material: "Papelão kraft multicamadas com tampa prensada e fundo reforçado",
    stackingResistance: "até 500kg",
    moistureResistance: "Revestimento interno PE ou alumínio opcional",
    minOrder: "500 unidades",
    leadTime: "10 dias úteis",
    applications: [
      "Tintas e Vernizes",
      "Grafiato e Texturas",
      "Produtos Químicos",
      "Agroquímicos",
      "Construção Civil",
    ],
    chemicalCompatibility:
      "Compatível com produtos à base de água e solvente. Revestimento de alumínio para pH extremo.",
  },
  {
    id: "baldes",
    name: "Baldes Plásticos",
    slug: "baldes",
    tagline: "Baldes industriais em polipropileno e polietileno",
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
      "PEAD resistente a ácidos, bases e solventes. PP para produtos à base de água.",
  },
];
