export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  city: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Trocamos de fornecedor há 3 anos. Resultado: zero barricas danificadas no transporte e entrega no prazo em 100% dos pedidos. Qualidade idêntica lote a lote — isso não tem preço.",
    author: "Carlos Mendes",
    role: "Gerente de Compras",
    company: "Tintas Progresso",
    city: "Campinas, SP",
  },
  {
    id: "t2",
    quote:
      "Testamos a amostra grátis numa segunda-feira. Na sexta já tínhamos fechado um pedido de 2.000 baldes. Grafiato pesado, zero deformação. Exatamente o que a gente precisava.",
    author: "Fernanda Oliveira",
    role: "Gerente de Produção",
    company: "Revestimentos MaxTex",
    city: "Sumaré, SP",
  },
];
