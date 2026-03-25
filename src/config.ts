export const SITE = {
  name: "Barricas & Baldes",
  description:
    "Fábrica de barricas de papelão e baldes plásticos em Americana-SP. Mais de 20 anos atendendo indústrias de tintas, vernizes, químicos e agroquímicos.",
  url: "https://barrica.vercel.app",
};

export const WHATSAPP = {
  number: "5519992580247",
  defaultMessage: "Olá! Vim pelo site e gostaria de solicitar um orçamento.",
  url(message?: string) {
    const text = encodeURIComponent(message ?? this.defaultMessage);
    return `https://wa.me/${this.number}?text=${text}`;
  },
};
