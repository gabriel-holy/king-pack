# Tech Plan — Website Fábrica de Barricas e Baldes

> **Intent Lock:** Site B2B em Astro + Tailwind onde todo ponto de conversão é um botão de WhatsApp direto para o dono da fábrica.

---

## Stack e Decisões Técnicas

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Framework | Astro v4+ | SSG nativo, zero JS por padrão, SEO excelente, deploy estático |
| Styling | Tailwind CSS v3+ | Utility-first, sem conflito com Astro, fácil manutenção pelo dev/dono |
| Deploy | Vercel ou Netlify (estático) | Zero backend, free tier suficiente para site institucional |
| Imagens | Astro `<Image>` nativo | Otimização automática (WebP, lazy loading, sizes) |
| Ícones | `astro-icon` + Heroicons/Phosphor | SVGs inline, zero HTTP request extra |
| Fontes | Variable font via Google Fonts / CDN | Inter ou Geist — leitura técnica excelente |
| Analytics | Fathom ou Plausible (opcional) | Privacy-first, sem cookie banner |

**Sem backend. Sem banco de dados. Sem autenticação. Sem formulário com processamento.**

---

## Estrutura de Pastas

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.astro          # Navegação principal
│   │   ├── Footer.astro          # Rodapé com dados da empresa
│   │   └── WhatsAppButton.astro  # Botão flutuante global
│   ├── home/
│   │   ├── Hero.astro            # Hero da homepage
│   │   ├── TrustBar.astro        # Faixa de setores atendidos
│   │   ├── MetricsStrip.astro    # 4 métricas numéricas
│   │   ├── ProductCards.astro    # Cards de Barricas e Baldes
│   │   ├── HowItWorks.astro      # 3 passos para começar
│   │   ├── Testimonials.astro    # Depoimentos
│   │   └── FinalCTA.astro        # CTA final da homepage
│   ├── product/
│   │   ├── ProductHero.astro     # Hero da página de produto
│   │   ├── SpecsTable.astro      # Tabela de especificações técnicas
│   │   ├── ApplicationCards.astro# Cards de aplicação por setor
│   │   └── ObjectionEliminator.astro # Seção elimina objeções
│   └── shared/
│       ├── SectionHeader.astro   # Título + subtítulo de seção
│       ├── WhatsAppCTA.astro     # Bloco CTA WhatsApp reutilizável
│       ├── TestimonialCard.astro  # Card de depoimento
│       └── SEOHead.astro         # Meta tags, OG, structured data
├── layouts/
│   └── BaseLayout.astro          # Layout base com Header + Footer + WhatsApp flutuante
├── pages/
│   ├── index.astro               # Home (/)
│   ├── barricas.astro            # Barricas de Papelão (/barricas)
│   ├── baldes.astro              # Baldes Plásticos (/baldes)
│   ├── contato.astro             # Contato (/contato)
│   └── 404.astro                 # Página de erro customizada
├── data/
│   ├── company.ts                # Dados da empresa (nome, WhatsApp, endereço, CNPJ)
│   ├── products.ts               # Specs de produtos (capacidades, materiais, dimensões)
│   └── testimonials.ts           # Depoimentos placeholder
└── styles/
    └── global.css                # Tailwind base + custom CSS vars
public/
├── images/
│   ├── products/                 # Fotos de produtos (placeholders)
│   ├── factory/                  # Fotos da fábrica (placeholders)
│   └── og/                       # Open Graph images por página
├── robots.txt
└── sitemap.xml                   # Gerado pelo @astrojs/sitemap
```

---

## Data Layer

Toda informação da empresa e produtos fica em arquivos TypeScript tipados em `src/data/`. Nenhum CMS, nenhuma API. Edição direta nos arquivos.

### `src/data/company.ts`

```typescript
export const company = {
  name: "Fábrica de Barricas [NOME REAL]",
  tagline: "[Tagline 4-6 palavras]",
  city: "Americana, SP",
  address: "[Endereço completo]",
  cep: "XXXXX-XXX",
  cnpj: "XX.XXX.XXX/XXXX-XX",
  phone: "(19) XXXXX-XXXX",
  whatsapp: "5519XXXXXXXXX",           // Formato internacional sem símbolos
  whatsappMessage: "Olá! Vi o site e gostaria de saber mais sobre as embalagens.",
  email: "[email@empresa.com.br]",
  hours: "Segunda a Sexta, 8h às 18h",
  foundedYear: XXXX,
  metrics: {
    yearsInMarket: XX,
    activeClients: XXX,
    deliveryHours: XX,
    defectRate: "0%",
  },
} as const
```

### `src/data/products.ts`

```typescript
export type ProductSpec = {
  id: string
  name: string
  slug: string
  tagline: string
  capacities: string[]       // ["50L", "100L", "200L"]
  material: string
  stackingResistance: string // "até 500kg"
  moistureResistance: string
  minOrder: string           // "500 unidades"
  leadTime: string           // "10 dias úteis"
  applications: string[]     // setores que usam o produto
  chemicalCompatibility: string
}

export const products: ProductSpec[] = [
  {
    id: "barricas",
    name: "Barricas de Papelão",
    slug: "barricas",
    // ... dados reais a preencher
  },
  {
    id: "baldes",
    name: "Baldes Plásticos",
    slug: "baldes",
    // ... dados reais a preencher
  },
]
```

---

## SEO Técnico

### Meta Tags por Página

Cada página recebe meta tags únicas via `SEOHead.astro`:

| Página | Title | Description |
|--------|-------|-------------|
| Home | `Barricas de Papelão e Baldes Plásticos — [Empresa], Americana SP` | Fabricante industrial de barricas de papelão e baldes plásticos para indústrias de tintas, grafiato e químicos. Americana, SP. |
| Barricas | `Barricas de Papelão Industrial — Specs Técnicas e Orçamento` | Barricas de papelão para indústria: capacidades Xaa-XL, resistência X kg, prazo X dias. Fale via WhatsApp. |
| Baldes | `Baldes Plásticos Industriais — Specs Técnicas e Orçamento` | Baldes plásticos para tintas, químicos e agroquímicos: capacidades X-XL, lote mínimo XXX unidades. |
| Contato | `Contato — Fábrica de Barricas e Baldes, Americana SP` | Fale com a fábrica via WhatsApp: (XX) XXXXX-XXXX. Americana, SP. |

### Structured Data (JSON-LD)

- `LocalBusiness` na Home: nome, endereço, telefone, horário, geo coordinates
- `Product` nas páginas de produto: nome, descrição, material, fabricante

### Sitemap e Robots

- `@astrojs/sitemap` gera sitemap automático
- `robots.txt` permite indexação completa (sem `/admin`, sem `/_astro`)

### Palavras-chave Alvo (Long Tail)

```
barrica papelão industrial SP
barrica papelão 200L Americana
balde plástico industrial SP
fornecedor embalagem industrial Americana
barrica papelão grafiato
balde plástico tinta industrial
embalagem industrial papelão SP
```

---

## WhatsApp Integration

### Utilitário central (`src/data/company.ts`)

```typescript
export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${company.whatsapp}`
  if (!message) return `${base}?text=${encodeURIComponent(company.whatsappMessage)}`
  return `${base}?text=${encodeURIComponent(message)}`
}
```

### Mensagens pré-preenchidas por contexto

| Origem do clique | Mensagem pré-preenchida |
|-----------------|------------------------|
| Hero da Home | "Olá! Vi o site e gostaria de saber mais sobre as embalagens." |
| Página de Barricas | "Olá! Tenho interesse em barricas de papelão. Pode me enviar mais informações?" |
| Página de Baldes | "Olá! Tenho interesse em baldes plásticos industriais. Pode me ajudar?" |
| Botão técnico | "Olá! Tenho uma dúvida técnica sobre compatibilidade dos produtos." |
| Página de Contato | "Olá! Gostaria de falar com a fábrica." |
| Botão flutuante | mensagem padrão da empresa |

### Botão flutuante (`WhatsAppButton.astro`)

- `position: fixed; bottom: 24px; right: 24px; z-index: 9999`
- Animação: pulse suave a cada 3s para chamar atenção no mobile
- Abre WhatsApp em nova aba (`target="_blank" rel="noopener"`)
- Acessível: `aria-label="Falar no WhatsApp"`

---

## Performance Targets

| Métrica | Target | Técnica |
|---------|--------|---------|
| LCP | < 2.4s | Hero image com `fetchpriority="high"`, sem JS bloqueante |
| CLS | < 0.1 | Dimensões explícitas em todas as imagens |
| FID/INP | < 100ms | Astro zero JS por padrão; interatividade mínima |
| TTFB | < 600ms | CDN estático (Vercel Edge) |
| Imagens | WebP + lazy | `<Image>` nativo do Astro |
| Fontes | Font-display swap | Previne FOIT |

---

## Invariantes de Design e Comportamento

Estas regras são **não-negociáveis** em todos os tickets de implementação:

### Conversão

1. **Todo CTA abre WhatsApp** — nenhum botão leva a formulário de cadastro, login ou página de espera
2. **Botão WhatsApp flutuante presente em 100% das páginas** — sem exceção, sem scroll necessário
3. **Specs técnicas abertas** — nenhuma informação técnica exige login, cadastro ou e-mail
4. **Mensagem pré-preenchida** — todo link de WhatsApp usa `buildWhatsAppUrl()` com mensagem contextual

### Visual

5. **Touch targets ≥ 44px** em mobile — botões, links e ícones interativos
6. **Contraste mínimo AA** — texto sobre fundo deve passar WCAG 2.1 AA (4.5:1 para texto normal)
7. **Sem stock photo genérica** — imagens placeholder devem ser de contexto industrial (não aperto de mão de escritório)
8. **Zero superlativo vazio** — nenhum bloco de copy usa "melhor", "líder", "referência" sem dado concreto ao lado

### Performance

9. **Toda imagem tem `width` e `height` explícitos** — previne CLS
10. **Hero image com `fetchpriority="high"`** — LCP garantido
11. **Zero CSS não-utilizado** — Tailwind purge habilitado em produção

### SEO

12. **Cada página tem title único** — não duplicar title entre páginas
13. **Cada página tem description única** — não duplicar description
14. **Structured data LocalBusiness na Home** — obrigatório para busca local
15. **Sitemap inclui todas as páginas MVP** — gerado automaticamente

---

## Arquivos a Criar

| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| `astro.config.mjs` | Config | Astro + Tailwind + Sitemap config |
| `tailwind.config.mjs` | Config | Cores da marca, tipografia, extensões |
| `src/data/company.ts` | Data | Dados da empresa (placeholders) |
| `src/data/products.ts` | Data | Specs dos produtos (placeholders) |
| `src/data/testimonials.ts` | Data | Depoimentos (placeholders) |
| `src/layouts/BaseLayout.astro` | Layout | Header + Footer + WhatsApp flutuante |
| `src/components/layout/Header.astro` | Component | Navegação principal |
| `src/components/layout/Footer.astro` | Component | Rodapé |
| `src/components/layout/WhatsAppButton.astro` | Component | Botão flutuante global |
| `src/components/shared/SEOHead.astro` | Component | Meta tags + structured data |
| `src/components/shared/WhatsAppCTA.astro` | Component | Bloco CTA WhatsApp reutilizável |
| `src/components/shared/TestimonialCard.astro` | Component | Card de depoimento |
| `src/components/home/*.astro` | Components | Seções da homepage (7 componentes) |
| `src/components/product/*.astro` | Components | Seções das páginas de produto (4 componentes) |
| `src/pages/index.astro` | Page | Homepage |
| `src/pages/barricas.astro` | Page | Página de Barricas |
| `src/pages/baldes.astro` | Page | Página de Baldes |
| `src/pages/contato.astro` | Page | Página de Contato |
| `src/pages/404.astro` | Page | Página de erro customizada |
| `public/robots.txt` | Static | Robots |
| `src/styles/global.css` | Style | Tailwind base + CSS vars |

---

## Reuso — Padrões Existentes

Projeto começa do zero. Nenhum código a reutilizar. Seguir padrões oficiais:

- Astro docs: componentes `.astro`, layouts, pages
- Tailwind docs: utility classes, dark mode (não necessário no MVP), responsive breakpoints
- `@astrojs/sitemap` para sitemap automático
- `astro-icon` para ícones SVG inline

---

*Gerado em: 2026-03-25*
