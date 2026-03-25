export const company = {
  name: "Barricas & Baldes",
  description:
    "Fábrica de barricas de papelão e baldes plásticos em Americana-SP. Mais de 20 anos atendendo indústrias de tintas, vernizes, químicos e agroquímicos.",
  address: {
    street: "Rua Exemplo, 123", // TODO: endereço real
    neighborhood: "Distrito Industrial",
    city: "Americana",
    state: "SP",
    zip: "13465-000",
    country: "BR",
  },
  phone: "(19) 99258-0247",
  whatsapp: "5519992580247",
  whatsappMessage: "Olá! Vim pelo site e gostaria de solicitar um orçamento de barricas.",
  email: "contato@barricas.com.br", // TODO: e-mail real
  hours: "Segunda a Sexta, 8h às 17h",
};

export function buildWhatsAppUrl(message?: string): string {
  const text = encodeURIComponent(message ?? company.whatsappMessage);
  return `https://wa.me/${company.whatsapp}?text=${text}`;
}
