# Ticket 011 — SEO & Performance Advanced (Auditoria Pos-Implementacao)

> **Epic:** Website Fabrica de Barricas e Baldes
> **Tipo:** SEO/Performance
> **Dependencies:** ticket-006, ticket-007, ticket-008, ticket-010

---

## Escopo

### O que este ticket FAZ

Implementa otimizacoes de SEO e performance que nao foram cobertas pelos tickets anteriores (006, 007, 008). Foco em: imagens otimizadas via Astro Assets, structured data adicional (Review, HowTo), performance de carregamento de fontes, OG images por pagina, manifest PWA, e melhorias de linkagem interna.

### O que este ticket NAO faz

- Nao altera copy/textos (responsabilidade do ticket-007/009)
- Nao altera layout ou componentes visuais significativamente
- Nao configura analytics ou tracking
- Nao muda o design visual existente

---

## Achados da Auditoria

### CRITICO — Impacto direto em performance e ranking

| # | Issue | Arquivo(s) | Impacto |
|---|-------|-----------|---------|
| C1 | **Imagens servidas como JPG estatico sem otimizacao** | `Hero.astro`, `ProductHero.astro`, `ProductCards.astro` | Todas as imagens usam `<img>` nativo com JPGs estaticos. Astro oferece `astro:assets` com conversao automatica para WebP/AVIF, `srcset` responsivo e otimizacao de tamanho. Economia estimada: 40-60% no peso das imagens. Impacto direto em LCP e CWV. |
| C2 | **Google Fonts carregado como stylesheet render-blocking** | `BaseLayout.astro:27` | O `<link rel="stylesheet" href="fonts.googleapis.com/...">` bloqueia renderizacao. A fonte ja tem `display=swap`, mas o CSS externo e render-blocking. Trocar para carregamento assincrono. |
| C3 | **Structured data `sameAs` como array vazio** | `index.astro:35` | `sameAs: [] as string[]` gera um array vazio no JSON-LD. Google pode interpretar como dado incompleto. Deve ser removido ate que existam perfis sociais reais. |
| C4 | **Missing Review/AggregateRating structured data** | `index.astro`, `Testimonials.astro` | Os depoimentos (Carlos Mendes, Fernanda Oliveira) sao reviews reais de empresas reais, mas nao tem schema `Review` ou `AggregateRating`. Oportunidade de rich snippets com estrelas nos resultados. |

### IMPORTANTE — Melhora performance, social sharing e crawling

| # | Issue | Arquivo(s) | Impacto |
|---|-------|-----------|---------|
| I1 | **Sem OG images especificas por pagina de produto** | `barricas.astro`, `baldes.astro`, `contato.astro` | Todas usam `og-default.jpg`. OG images especificas por pagina melhoram CTR em WhatsApp e LinkedIn (canais B2B principais). A pasta `public/images/og/` existe mas esta vazia. |
| I2 | **HowTo structured data ausente no "3 passos"** | `HowItWorks.astro`, `index.astro` | A secao "3 passos para trocar de fornecedor" e perfeita para `HowTo` schema. Gera rich snippet expandido no Google com passos numerados. |
| I3 | **Sem cross-linking entre paginas de produto** | `barricas.astro`, `baldes.astro` | Barricas nao linka para Baldes e vice-versa. Cross-linking melhora crawl depth, distribui link equity e reduz bounce rate (usuario pode navegar entre produtos relacionados). |
| I4 | **Missing `og:image:width` e `og:image:height`** | `SEOHead.astro` | Tags OG de imagem nao incluem dimensoes. Plataformas sociais geram preview mais rapido com dimensoes explicitas (1200x630). |
| I5 | **Missing `decoding="async"` em imagens below-fold** | `ProductCards.astro`, `Testimonials.astro` | Imagens below-fold devem ter `decoding="async"` para nao bloquear thread principal. Best practice moderna para performance. |
| I6 | **Web App Manifest ausente** | `public/` | Sem `manifest.json`, site nao e instalavel como PWA. Perde pontos no Lighthouse PWA score e no sinal de "app-like experience". |
| I7 | **Hero image completamente escondida no mobile** | `Hero.astro:34` | `class="hidden ... lg:block"` esconde a imagem do hero em telas < 1024px. Mobile = maioria do trafego B2B (WhatsApp links). Users mobile veem so texto, o que pode aumentar bounce rate. Considerar imagem menor ou background image. |
| I8 | **Sitemap sem `lastmod`** | `astro.config.mjs` | O sitemap gerado nao tem datas `<lastmod>`. Google usa isso para priorizar recrawl de paginas atualizadas. |

### NICE TO HAVE — Melhorias incrementais

| # | Issue | Arquivo(s) | Impacto |
|---|-------|-----------|---------|
| N1 | **Footer sem `<nav>` semantico** | `Footer.astro` | Links de navegacao no footer nao estao envolvidos em `<nav aria-label="Footer">`. Melhora acessibilidade e entendimento do crawler. |
| N2 | **Geo meta tags ausentes** | `SEOHead.astro` | Para negocio local (Americana-SP), `<meta name="geo.region">` e `<meta name="geo.placename">` reforçam sinal de localidade. |
| N3 | **Duplicacao CSS vars + Tailwind config** | `global.css`, `tailwind.config.mjs` | As mesmas cores estao definidas em dois lugares. Nao afeta SEO diretamente, mas cria risco de divergencia e manutencao. |

---

## Implementacao por Arquivo

### 1. Imagens com Astro Assets (C1)

**Migrar imagens de `public/` para `src/assets/` e usar `<Image>` do Astro:**

```astro
---
import { Image } from 'astro:assets';
import factoryImg from '../../assets/images/factory/factory-interior.jpg';
---

<Image
  src={factoryImg}
  alt="Chao de fabrica industrial"
  width={1200}
  height={800}
  format="webp"
  quality={80}
  fetchpriority="high"
/>
```

**Arquivos a migrar:**
- `Hero.astro` — hero image (fetchpriority="high", eager loading)
- `ProductHero.astro` — product hero images
- `ProductCards.astro` — product card images (lazy loading)

**Nota:** Imagens referenciadas diretamente em data files (`products.ts`) precisam de abordagem diferente — manter no `public/` e otimizar manualmente ou usar import dinamico.

### 2. `src/layouts/BaseLayout.astro` (C2)

**Trocar Google Fonts para carregamento nao-blocking:**

```html
<!-- Substituir o <link rel="stylesheet"> por: -->
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'" />
<noscript>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&display=swap" />
</noscript>
```

### 3. `src/pages/index.astro` (C3, C4, I2)

**Remover `sameAs` vazio:**
```diff
- sameAs: [] as string[],
```

**Adicionar Review schema para depoimentos:**
```javascript
import { testimonials } from "../data/testimonials";

const reviewSchema = {
  "@type": "LocalBusiness",
  "name": company.name,
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": String(testimonials.length),
  },
  "review": testimonials.map(t => ({
    "@type": "Review",
    "author": { "@type": "Person", "name": t.author },
    "reviewBody": t.quote,
    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
  })),
};
```

**Adicionar HowTo schema:**
```javascript
const howToSchema = {
  "@type": "HowTo",
  "name": "Como trocar de fornecedor de embalagens sem risco",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Peca sua amostra gratis",
      "text": "Manda um WhatsApp com o produto e o volume. A gente responde em ate 2 horas.",
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Teste na sua linha",
      "text": "Amostra gratis entregue em ate 48h. Voce testa no seu processo real.",
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Aprovou? A producao comeca",
      "text": "Producao sob medida em 7 a 10 dias uteis. Lotes a partir de 200 unidades com entrega em SP.",
    },
  ],
};
```

**Combinar no `@graph`:**
```javascript
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [localBusinessSchema, websiteSchema, howToSchema],
  // Reviews ficam no localBusinessSchema como nested
};
```

### 4. `src/components/shared/SEOHead.astro` (I4, N2)

**Adicionar dimensoes da OG image:**
```html
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

**Adicionar geo meta tags:**
```html
<meta name="geo.region" content="BR-SP" />
<meta name="geo.placename" content="Americana" />
```

### 5. `src/pages/barricas.astro` e `baldes.astro` (I3)

**Adicionar cross-link section antes do CTA final em barricas.astro:**
```html
<section class="bg-surface py-12">
  <div class="mx-auto max-w-text px-6 text-center">
    <p class="font-body text-sm text-text-muted">
      Precisa de embalagem plastica tambem?
    </p>
    <a href="/baldes" class="mt-2 inline-block font-heading text-sm font-semibold text-accent hover:text-accent-hover">
      Ver Baldes Plasticos 3,6-20L &rarr;
    </a>
  </div>
</section>
```

**Equivalente em baldes.astro linkando para barricas.**

### 6. `src/components/product/ProductCards.astro` (I5)

**Adicionar `decoding="async"` nas imagens:**
```html
<img
  src={product.image}
  alt={product.imageAlt}
  width={product.imageWidth}
  height={product.imageHeight}
  loading="lazy"
  decoding="async"
  class="..."
/>
```

### 7. `public/manifest.json` (I6)

**Criar Web App Manifest:**
```json
{
  "name": "King Pack - Embalagens Industriais",
  "short_name": "King Pack",
  "description": "Fabrica de barricas de papelao e baldes plasticos",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1a1a1a",
  "theme_color": "#1a1a1a",
  "icons": [
    { "src": "/favicon-32x32.png", "sizes": "32x32", "type": "image/png" },
    { "src": "/apple-touch-icon.png", "sizes": "180x180", "type": "image/png" }
  ]
}
```

**Adicionar link no BaseLayout.astro:**
```html
<link rel="manifest" href="/manifest.json" />
```

### 8. `src/components/layout/Footer.astro` (N1)

**Envolver links de produtos em `<nav>`:**
```html
<nav aria-label="Produtos">
  <h4>Produtos</h4>
  <ul>...</ul>
</nav>
```

### 9. OG Images por Pagina (I1)

**Criar imagens OG especificas (1200x630):**
- `public/images/og/og-barricas.jpg` — Composicao com barrica + specs + logo
- `public/images/og/og-baldes.jpg` — Composicao com balde + specs + logo
- `public/images/og/og-contato.jpg` — Logo + telefone + "Fale com a fabrica"

**Passar `ogImage` prop nas paginas:**
```astro
<BaseLayout ogImage="/images/og/og-barricas.jpg" ... />
```

---

## Acceptance Criteria

- [ ] Imagens hero e product servidas em WebP via `astro:assets` (ou otimizacao equivalente)
- [ ] Google Fonts carregado de forma nao-blocking (verificar com Lighthouse)
- [ ] `sameAs` removido do JSON-LD (ou preenchido com URLs reais)
- [ ] Review/AggregateRating schema valido na Home (testar com Rich Results Test)
- [ ] HowTo schema valido na Home
- [ ] OG images especificas para `/barricas`, `/baldes`, `/contato`
- [ ] `og:image:width` e `og:image:height` presentes em todas as paginas
- [ ] Cross-links entre paginas de produto (barricas ↔ baldes)
- [ ] `decoding="async"` em imagens below-fold
- [ ] `manifest.json` presente e linkado no `<head>`
- [ ] Footer com `<nav>` semantico
- [ ] Geo meta tags presentes
- [ ] `npm run build` sem erros
- [ ] Lighthouse SEO score >= 95
- [ ] Lighthouse Performance score >= 90
- [ ] Structured data valido em todas as paginas (https://validator.schema.org)

---

## Prioridade de Execucao

1. **C1** — Migrar imagens para Astro Assets (maior impacto em performance/LCP)
2. **C2** — Google Fonts nao-blocking
3. **C3** — Limpar `sameAs` vazio
4. **C4** — Review/AggregateRating schema
5. **I2** — HowTo schema
6. **I4** — OG image dimensions
7. **I3** — Cross-linking entre produtos
8. **I5** — `decoding="async"` nas imagens
9. **I6** — Web App Manifest
10. **I1** — OG images por pagina (requer criacao de assets)
11. **N1** — Footer `<nav>`
12. **N2** — Geo meta tags
13. **I7** — Hero image mobile (decisao de design necessaria)
14. **I8** — Sitemap lastmod (config Astro)

---

## Impacto Esperado

| Metrica | Antes | Depois |
|---------|-------|--------|
| Lighthouse Performance | ~80-85 | 90-95 |
| Lighthouse SEO | ~95 | 98-100 |
| LCP (mobile) | ~3-4s (JPG full-size) | < 2.5s (WebP otimizado) |
| Image payload | ~2-3MB total | ~800KB-1.2MB (WebP) |
| Rich Snippets | FAQ + breadcrumbs | + Review stars + HowTo steps |
| Social sharing CTR | Default image generica | Imagens customizadas por pagina |
| Lighthouse PWA | 0 | Basico (manifest + icons) |

---

## Notas

- **Hero image mobile (I7):** Requer decisao de design — manter escondido, usar versao menor, ou usar como background. Consultar antes de implementar.
- **Sitemap lastmod (I8):** Pode ser configurado via plugin `@astrojs/sitemap` com opcao `serialize`. Requer definir politica de datas.
- **OG images (I1):** Idealmente criadas com ferramenta de design. Alternativa: usar `@vercel/og` ou `satori` para geracao automatica.

---

*Ticket criado em: 2026-03-25*
*Auditoria realizada por: Claude (SEO Fundamentals Audit)*
