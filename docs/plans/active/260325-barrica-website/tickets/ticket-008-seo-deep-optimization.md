# Ticket 008 — SEO Deep Optimization (Auditoria Tecnica Avancada)

> **Epic:** Website Fabrica de Barricas e Baldes
> **Tipo:** SEO/Quality
> **Dependencies:** ticket-006, ticket-007

---

## Escopo

### O que este ticket FAZ

Implementa otimizacoes tecnicas de SEO que nao foram cobertas pelo ticket-006 (SEO basico) nem pelo ticket-007 (copy). Foco em structured data avancado, meta tags sociais, e sinais tecnicos que melhoram visibilidade no Google e aparencia em compartilhamentos sociais.

### O que este ticket NAO faz

- Nao altera copy/textos (responsabilidade do ticket-007)
- Nao altera layout ou componentes visuais
- Nao configura analytics ou tracking

---

## Achados da Auditoria

### CRITICO — Afeta diretamente ranking e aparencia nos resultados

| # | Issue | Arquivo(s) | Impacto |
|---|-------|-----------|---------|
| C1 | **Twitter Card meta tags ausentes** | `SEOHead.astro` | Compartilhamentos no Twitter/X nao geram card visual. Perda de CTR social. |
| C2 | **Nenhuma pagina tem OG Image** | `SEOHead.astro`, todas as pages | Compartilhamentos em WhatsApp, LinkedIn, Facebook mostram preview sem imagem. Critico para B2B (LinkedIn e WhatsApp sao canais principais). |
| C3 | **404 page sem `noindex`** | `404.astro` | Google pode indexar a pagina 404 e desperdicar crawl budget. |
| C4 | **BreadcrumbList structured data ausente** | `barricas.astro`, `baldes.astro`, `contato.astro` | Sem breadcrumbs nos resultados de busca. Google mostra URL crua em vez de "Home > Barricas de Papelao". |
| C5 | **FAQ structured data nao aproveitado** | `barricas.astro`, `baldes.astro` | ObjectionEliminator tem conteudo perfeito para FAQ schema — gera rich snippets expandidos no Google (mais espaco na SERP). |
| C6 | **WebSite schema ausente na Home** | `index.astro` | Sem WebSite schema, Google nao exibe sitelinks search box. LocalBusiness esta presente mas WebSite e complementar. |

### IMPORTANTE — Melhora mobile, social e crawling

| # | Issue | Arquivo(s) | Impacto |
|---|-------|-----------|---------|
| I1 | **`<meta name="theme-color">` ausente** | `BaseLayout.astro` ou `SEOHead.astro` | Barra do navegador mobile nao assume cor da marca. Perde branding. |
| I2 | **Apple Touch Icon ausente** | `public/` | Quando usuario salva site na home do iPhone, aparece icone generico em vez do logo. |
| I3 | **`hreflang` tag ausente** | `SEOHead.astro` | Site e pt-BR only, mas declarar `hreflang="pt-BR"` ajuda crawlers a classificar idioma corretamente. |
| I4 | **Contato sem ContactPage structured data** | `contato.astro` | Pagina de contato usa LocalBusiness generico. ContactPage schema melhora entendimento do Google sobre a pagina. |
| I5 | **`sameAs` ausente no LocalBusiness** | `index.astro`, `SEOHead.astro` | Structured data nao conecta a empresa a perfis sociais/externos. Perde sinais de autoridade. |
| I6 | **Product structured data sem `offers`** | `barricas.astro`, `baldes.astro` | Schema de produto sem `offers` e considerado incompleto pelo Google. Mesmo sem preco, pode usar `priceSpecification` com "Sob consulta". |

### NICE TO HAVE — Melhorias incrementais

| # | Issue | Arquivo(s) | Impacto |
|---|-------|-----------|---------|
| N1 | **Font preloading** | `BaseLayout.astro` | Preload das fontes criticas (Space Grotesk 700, Inter 400) reduz FCP. |
| N2 | **Web App Manifest ausente** | `public/` | Sem manifest.json, site nao e instalavel como PWA e perde pontos no Lighthouse PWA. |
| N3 | **Favicon apenas SVG** | `public/` | Navegadores antigos e social crawlers podem nao reconhecer favicon SVG. Adicionar PNG 32x32 como fallback. |

---

## Implementacao por Arquivo

### 1. `src/components/shared/SEOHead.astro`

**Adicionar Twitter Card tags:**
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
{ogImageUrl && <meta name="twitter:image" content={ogImageUrl} />}
```

**Adicionar hreflang:**
```html
<link rel="alternate" hreflang="pt-BR" href={canonicalUrl} />
<link rel="alternate" hreflang="x-default" href={canonicalUrl} />
```

**Adicionar theme-color:**
```html
<meta name="theme-color" content="#1a1a1a" />
```

**Aceitar nova prop `noindex`:**
```html
{noindex && <meta name="robots" content="noindex, nofollow" />}
```

### 2. `src/layouts/BaseLayout.astro`

**Adicionar Apple Touch Icon e favicon PNG:**
```html
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
```

**Adicionar font preload (antes do Google Fonts link):**
```html
<link rel="preload" href="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoQDjQSkFtoMM3T6r8E7mPb54C_k3HqUtEw.woff2" as="font" type="font/woff2" crossorigin />
```

### 3. `src/pages/index.astro`

**Adicionar WebSite schema (complementar ao LocalBusiness):**
```javascript
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": company.name,
  "url": "https://barricasindustriais.com",
};
```

**Combinar com LocalBusiness em array `@graph`:**
```javascript
const combinedStructuredData = {
  "@context": "https://schema.org",
  "@graph": [structuredData, websiteSchema]
};
```

**Adicionar `sameAs` no LocalBusiness** (requer dados de redes sociais em `company.ts`).

### 4. `src/pages/barricas.astro`

**Adicionar BreadcrumbList structured data:**
```javascript
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://barricasindustriais.com" },
    { "@type": "ListItem", "position": 2, "name": "Barricas de Papelao" },
  ],
};
```

**Adicionar FAQPage schema a partir das objections:**
```javascript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": objections.map(o => ({
    "@type": "Question",
    "name": o.title,
    "acceptedAnswer": { "@type": "Answer", "text": o.description },
  })),
};
```

**Adicionar `offers` ao Product schema:**
```javascript
offers: {
  "@type": "Offer",
  "availability": "https://schema.org/InStock",
  "priceSpecification": {
    "@type": "PriceSpecification",
    "priceCurrency": "BRL",
  },
  "areaServed": {
    "@type": "State",
    "name": "Sao Paulo",
  },
},
```

**Combinar todos os schemas em `@graph`.**

### 5. `src/pages/baldes.astro`

Mesmas adicoes de barricas:
- BreadcrumbList
- FAQPage
- Offers no Product schema
- Combinar em `@graph`

### 6. `src/pages/contato.astro`

**Adicionar ContactPage structured data:**
```javascript
const contactStructuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contato — King Pack",
  "description": "Fale com a fabrica via WhatsApp",
  "mainEntity": {
    "@type": "LocalBusiness",
    "name": company.name,
    "telephone": company.phone,
    "email": company.email,
    "address": { ... },
  },
};
```

**Adicionar BreadcrumbList.**

### 7. `src/pages/404.astro`

**Passar `noindex={true}` para BaseLayout/SEOHead.**

### 8. `public/`

**Criar arquivos:**
- `apple-touch-icon.png` (180x180, fundo #0059a2 com "B" branco — derivado do favicon.svg)
- `favicon-32x32.png` (32x32, mesmo design)
- `og-default.jpg` (1200x630, imagem default para OG — fundo escuro com logo King Pack e tagline)

### 9. `src/data/company.ts`

**Adicionar campo `socialLinks` (mesmo que vazio por enquanto):**
```typescript
socialLinks: {
  // Preencher quando existirem perfis reais
} as Record<string, string>,
```

---

## Acceptance Criteria

- [x] Twitter Card tags presentes em todas as paginas (verificar com Twitter Card Validator ou meta inspector)
- [x] OG Image default renderiza em compartilhamentos (WhatsApp, LinkedIn)
- [x] 404 page tem `noindex` no HTML gerado
- [x] BreadcrumbList schema valido em `/barricas`, `/baldes`, `/contato` (testar com Google Rich Results Test)
- [x] FAQPage schema valido em `/barricas` e `/baldes`
- [x] WebSite schema presente na Home
- [x] Product schema inclui `offers` em `/barricas` e `/baldes`
- [x] ContactPage schema em `/contato`
- [x] `theme-color` meta tag presente
- [x] Apple Touch Icon e favicon PNG em `public/`
- [x] `hreflang` tag em todas as paginas
- [x] `npm run build` sem erros
- [x] Structured data valido (testar com https://validator.schema.org ou Google Rich Results Test)

---

## Prioridade de Execucao

1. SEOHead.astro (Twitter Cards + hreflang + theme-color + noindex prop)
2. 404.astro (noindex)
3. index.astro (WebSite schema + @graph)
4. barricas.astro (BreadcrumbList + FAQ + offers + @graph)
5. baldes.astro (mesmas mudancas)
6. contato.astro (ContactPage + BreadcrumbList)
7. BaseLayout.astro (font preload + apple-touch-icon links)
8. public/ (gerar apple-touch-icon.png, favicon-32x32.png, og-default.jpg)
9. Build + validacao de structured data

---

## Impacto Esperado

| Metrica | Antes | Depois |
|---------|-------|--------|
| Rich Snippets no Google | Basico (titulo + desc) | FAQ expandido + breadcrumbs + sitelinks |
| Social sharing (WhatsApp/LinkedIn) | Sem imagem, sem card | Card completo com imagem e descricao |
| Lighthouse SEO score | ~90 | 95-100 |
| Structured data warnings | Multiplos | Zero |
| Mobile branding | Generico | Cor da marca na barra do browser |

---

<!-- Lock: Varus-e4b8 | done | 2026-03-25T16:45:00Z -->

*Ticket criado em: 2026-03-25*
*Auditoria realizada por: Claude (Roier SEO)*
