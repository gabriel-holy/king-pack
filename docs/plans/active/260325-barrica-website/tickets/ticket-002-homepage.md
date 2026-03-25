<!-- Lock: Thresh-b4e2 | done | 2026-03-25T19:01:00Z -->

# Ticket 002 — Homepage

> **Epic:** Website Fábrica de Barricas e Baldes
> **Tipo:** Feature/Page
> **Dependencies:** ticket-001

---

## Escopo

### O que este ticket FAZ

- Criar `src/pages/index.astro` usando BaseLayout
- Criar 7 componentes de seção da homepage:

| Componente | Seção | Fundo |
|-----------|-------|-------|
| `Hero.astro` | Tagline + sub + 2 CTAs WhatsApp + imagem placeholder | `bg-deep` |
| `TrustBar.astro` | Faixa "Atendemos: Tintas / Grafiato / Químicos / Agro / Construção" | `bg` |
| `MetricsStrip.astro` | 4 métricas numéricas (anos, clientes, prazo, ocorrências) | `bg` |
| `ProductCards.astro` | 2 cards (Barricas + Baldes) com link para /barricas e /baldes | `surface` |
| `HowItWorks.astro` | 3 passos: solicitar amostra → entrega → pedido | `bg` |
| `Testimonials.astro` | 1-2 cards de depoimento (placeholder) | `surface` |
| `FinalCTA.astro` | "Pronto para trocar de fornecedor?" + botão WhatsApp | `bg-deep` |

- Criar `src/components/shared/TestimonialCard.astro`
- Criar `src/components/shared/SectionHeader.astro`
- SEO: title, description, structured data LocalBusiness (JSON-LD)
- Hero image placeholder (contexto industrial — não stock genérica)

### O que este ticket NÃO faz

- Não cria páginas de produto (tickets 003 e 004)
- Não implementa lógica dinâmica (site é 100% estático)

---

## Spec References

- `core-flows.md` — Hierarquia de informação da Home (wireframe ASCII)
- `tech-plan.md` — Componentes da homepage, data layer
- `visual-guide.md` — Alternância de seções, tipografia, espaçamento

---

## Arquivos a Criar

| Arquivo | Descrição |
|---------|-----------|
| `src/pages/index.astro` | Homepage |
| `src/components/home/Hero.astro` | Hero section |
| `src/components/home/TrustBar.astro` | Faixa de setores |
| `src/components/home/MetricsStrip.astro` | Métricas numéricas |
| `src/components/home/ProductCards.astro` | Cards de produtos |
| `src/components/home/HowItWorks.astro` | 3 passos |
| `src/components/home/Testimonials.astro` | Depoimentos |
| `src/components/home/FinalCTA.astro` | CTA final |
| `src/components/shared/TestimonialCard.astro` | Card reutilizável |
| `src/components/shared/SectionHeader.astro` | Header de seção |

---

## Invariantes

- [x] INV-1: Todo CTA abre WhatsApp (hero primário, hero secundário fica como scroll/link interno)
- [x] INV-4: Mensagem pré-preenchida via `buildWhatsAppUrl()`
- [x] INV-5: Touch targets >= 44px
- [x] INV-7: Sem stock photo genérica (placeholder industrial)
- [x] INV-8: Zero superlativo vazio — métricas usam números concretos (placeholder)
- [x] INV-9: Toda imagem com `width` e `height`
- [x] INV-10: Hero image com `fetchpriority="high"`
- [x] INV-12: Title único para a Home
- [x] INV-13: Description única para a Home
- [x] INV-14: Structured data LocalBusiness na Home

---

## Acceptance Criteria

- [x] Homepage renderiza corretamente em `npm run dev`
- [x] 7 seções visíveis na ordem definida no core-flows
- [x] Alternância de fundos (deep → bg → surface → bg → ...) cria ritmo visual
- [x] Hero tem tagline legível em < 8 segundos de scanning
- [x] CTA primário do hero é botão WhatsApp funcional
- [x] Métricas exibem 4 números com Space Grotesk 700
- [x] Cards de produto linkam para `/barricas` e `/baldes`
- [x] "Como funciona" tem 3 passos numerados
- [x] Depoimento tem nome + cargo + empresa + resultado
- [x] CTA final é botão WhatsApp funcional
- [x] JSON-LD LocalBusiness presente no `<head>`
- [x] Mobile: todas as seções responsivas, CTAs acessíveis com thumb
- [x] `astro check` sem erros
- [x] Build sem erros
