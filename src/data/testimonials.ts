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
      "Trocamos de fornecedor há 3 anos e desde então zero ocorrências de barrica danificada no transporte. A fábrica entrega no prazo e a qualidade é consistente lote a lote.",
    author: "Carlos Mendes",
    role: "Gerente de Compras",
    company: "Tintas Progresso",
    city: "Campinas, SP",
  },
  {
    id: "t2",
    quote:
      "Precisávamos de baldes que aguentassem o grafiato sem deformar. Testamos a amostra grátis e em 1 semana já fizemos o primeiro pedido de 2.000 unidades.",
    author: "Fernanda Oliveira",
    role: "Gerente de Produção",
    company: "Revestimentos MaxTex",
    city: "Sumaré, SP",
  },
];
