export const company = {
  name: "King Pack",
  tagline: "Sua produção não para. Sua embalagem também não.",
  city: "Americana, SP",
  address: {
    street: "R. do Poliester, 109",
    neighborhood: "Lot. Industrial Salto Grande II",
    city: "Americana",
    state: "SP",
    zip: "13474-764",
    country: "BR",
  },
  phone: "(19) 99258-0247",
  whatsapp: "5519992580247",
  whatsappMessage:
    "Olá! Vi o site da King Pack e quero receber uma amostra grátis.",
  email: "contato@barricasindustriais.com.br",
  hours: "Segunda a Sexta, 8h às 18h",
  foundedYear: 2004,
  socialLinks: {} as Record<string, string>,
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
