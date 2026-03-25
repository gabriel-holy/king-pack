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
    material: "Papelão maculatura com capa kraft, tampa e fundo de plástico",
    stackingResistance: "Máximo 3 barricas",
    moistureResistance: "Revestimento interno PE ou alumínio opcional",
    minOrder: "A combinar",
    leadTime: "10 dias úteis",
    applications: [
      "Tintas e Vernizes",
      "Grafiato e Texturas",
      "Produtos Químicos",
      "Agroquímicos",
      "Construção Civil",
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
      "PEAD resistente a ácidos, bases e solventes. PP para produtos à base de água.",
  },
];
