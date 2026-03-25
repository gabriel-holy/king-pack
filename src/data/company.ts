export const company = {
  name: "Fábrica de Barricas e Baldes",
  tagline: "Embalagens industriais que sua produção exige",
  city: "Americana, SP",
  address: {
    street: "Rua Exemplo, 123",
    neighborhood: "Distrito Industrial",
    city: "Americana",
    state: "SP",
    zip: "13465-000",
    country: "BR",
  },
  cnpj: "XX.XXX.XXX/XXXX-XX",
  phone: "(19) 99258-0247",
  whatsapp: "5519992580247",
  whatsappMessage:
    "Olá! Vi o site e gostaria de saber mais sobre as embalagens.",
  email: "contato@barricasindustriais.com.br",
  hours: "Segunda a Sexta, 8h às 18h",
  foundedYear: 2004,
  metrics: {
    yearsInMarket: 22,
    activeClients: 500,
    deliveryHours: 48,
    defectRate: "0%",
  },
} as const;

export function buildWhatsAppUrl(message?: string): string {
  const text = encodeURIComponent(message ?? company.whatsappMessage);
  return `https://wa.me/${company.whatsapp}?text=${text}`;
}
