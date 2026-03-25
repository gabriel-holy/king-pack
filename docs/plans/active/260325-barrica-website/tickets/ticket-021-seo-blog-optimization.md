# Ticket 021 — SEO Blog & Structured Data Optimization

> **Epic:** Website Fabrica de Barricas e Baldes
> **Tipo:** SEO/Quality
> **Dependencies:** ticket-012, ticket-014, ticket-015

---

## Escopo

### O que este ticket FAZ

Corrige problemas de SEO identificados na auditoria pos-implementacao do blog e refina structured data em paginas de produto. Foco em: hero image LCP conflict, blog structured data incompleto, Article schema enrichment, sitemap lastmod, e Product schema image.

### O que este ticket NAO faz

- Nao altera copy/textos dos posts ou paginas
- Nao altera layout ou design visual
- Nao cria novos posts de blog
- Nao configura analytics ou tracking

---

## Achados da Auditoria

### CRITICO — Impacto direto em Core Web Vitals e rich snippets

| # | Issue | Arquivo(s) | Impacto |
|---|-------|-----------|---------|
| C1 | **Hero image com `loading="lazy"` + `fetchpriority="high"` simultaneo** | `Hero.astro`, `ProductHero.astro` | O componente `<Image>` do Astro aplica `loading="lazy"` por padrao. Nos heros, `fetchpriority="high"` e passado explicitamente, mas `loading="lazy"` contradiz essa instrucao. No HTML gerado, a tag fica: `fetchpriority="high" loading="lazy"`. Resultado: navegador adia carregamento da imagem principal → LCP inflado. Precisa de `loading="eager"` explicito nos heros. |
| C2 | **Blog posts sem BreadcrumbList structured data** | `src/pages/blog/[...slug].astro` | Template tem breadcrumb visual (HTML `<nav aria-label="Breadcrumb">`) mas ZERO JSON-LD BreadcrumbList. Google usa structured data, nao HTML visual, para exibir breadcrumbs nos resultados. Cada post perde rich snippet de navegacao. |
| C3 | **Blog posts usam `og:type="website"` em vez de `og:type="article"`** | `src/pages/blog/[...slug].astro:43` | Passa `type="website"` para BaseLayout. Posts de blog devem usar `og:type="article"` para que plataformas sociais renderizem card de artigo (com data, autor) e Google classifique o conteudo corretamente. |

### IMPORTANTE — Melhora rich snippets, social sharing e crawling

| # | Issue | Arquivo(s) | Impacto |
|---|-------|-----------|---------|
| I1 | **Article schema sem `image`** | `src/pages/blog/[...slug].astro` | Google recomenda `image` no Article schema para elegibilidade de rich results. Sem imagem, o artigo perde prioridade no carrossel de noticias/artigos. Usar `og-default.jpg` como fallback. |
| I2 | **Article schema sem `dateModified`** | `src/pages/blog/[...slug].astro` | Google usa `dateModified` como sinal de freshness. Sem ele, o crawler nao sabe se o conteudo foi atualizado. Adicionar campo `dateModified` no content schema (pode ser igual a `date` inicialmente). |
| I3 | **Blog posts sem meta tags `og:article:*`** | `src/components/shared/SEOHead.astro` | Para `og:type="article"`, plataformas sociais esperam tags adicionais: `og:article:published_time`, `og:article:author`, `og:article:tag`. Melhora a renderizacao do card em LinkedIn e Facebook (canais B2B). |
| I4 | **Blog index sem BreadcrumbList** | `src/pages/blog/index.astro` | Pagina do blog tem Blog schema mas sem BreadcrumbList (Home > Blog). Todas as outras paginas de nivel 2 ja tem breadcrumbs. |
| I5 | **Sitemap sem `<lastmod>`** | `astro.config.mjs` | URLs no sitemap nao tem datas `<lastmod>`. Google usa isso para priorizar recrawl. O plugin `@astrojs/sitemap` suporta opcao `serialize` para adicionar datas. |
| I6 | **Product schema sem `image`** | `src/pages/barricas.astro`, `src/pages/baldes.astro` | Product structured data nao inclui `image`. Google considera Product schema sem imagem como incompleto — pode perder elegibilidade para rich results de produto. |
| I7 | **Header nav principal sem `aria-label`** | `src/components/layout/Header.astro` | Footer tem `<nav aria-label="Produtos">` mas o nav principal do header nao tem `aria-label`. Acessibilidade e crawlers semanticos se beneficiam de `aria-label="Navegacao principal"`. |

### NICE TO HAVE — Melhorias incrementais

| # | Issue | Arquivo(s) | Impacto |
|---|-------|-----------|---------|
| N1 | **Content schema de blog sem campo `image`** | `src/content.config.ts` | Schema do content collection nao tem campo para featured image. Todos os posts usam OG default. Adicionar campo opcional `image` permite OG images especificas por post (melhora CTR social). |
| N2 | **Blog posts sem `article:section` meta tag** | `SEOHead.astro` | A tag `og:article:section` (ex: "Embalagens Industriais") ajuda plataformas sociais a categorizar o conteudo. |

---

## Implementacao por Arquivo

### 1. `src/components/home/Hero.astro` (C1)

**Adicionar `loading="eager"` ao Image do hero:**
```astro
<Image
  src={factoryImg}
  alt="Chao de fabrica industrial..."
  width={1200}
  height={800}
  format="webp"
  quality={80}
  fetchpriority="high"
  loading="eager"
  class="h-auto w-full rounded-lg object-cover"
  id="hero-parallax-img"
/>
```

### 2. `src/components/product/ProductHero.astro` (C1)

**Mesma correcao — adicionar `loading="eager"`:**
```astro
<Image
  src={image}
  alt={imageAlt}
  width={1200}
  height={800}
  format="webp"
  quality={80}
  fetchpriority="high"
  loading="eager"
  class="product-hero-img h-auto w-full rounded-lg object-cover"
/>
```

### 3. `src/pages/blog/[...slug].astro` (C2, C3, I1, I2)

**Mudar type para "article":**
```diff
- type="website"
+ type="article"
```

**Adicionar BreadcrumbList schema:**
```javascript
const breadcrumbSchema = {
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://barricasindustriais.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://barricasindustriais.com/blog" },
    { "@type": "ListItem", position: 3, name: post.data.title },
  ],
};
```

**Enriquecer Article schema:**
```javascript
const articleSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: post.data.title,
      description: post.data.description,
      datePublished: post.data.date,
      dateModified: post.data.dateModified ?? post.data.date,
      image: `https://barricasindustriais.com${post.data.image ?? "/og-default.jpg"}`,
      author: {
        "@type": "Organization",
        name: post.data.author,
      },
      publisher: {
        "@type": "Organization",
        name: company.name,
        url: "https://barricasindustriais.com",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://barricasindustriais.com/blog/${post.data.slug}`,
      },
    },
    breadcrumbSchema,
  ],
};
```

### 4. `src/components/shared/SEOHead.astro` (I3)

**Aceitar novas props para article meta tags:**
```typescript
interface Props {
  title: string;
  description: string;
  ogImage?: string;
  type?: "website" | "product" | "article";
  structuredData?: Record<string, unknown>;
  noindex?: boolean;
  articleMeta?: {
    publishedTime: string;
    modifiedTime?: string;
    author: string;
    tags?: string[];
    section?: string;
  };
}
```

**Adicionar tags condicionais:**
```html
{type === "article" && articleMeta && (
  <>
    <meta property="article:published_time" content={articleMeta.publishedTime} />
    {articleMeta.modifiedTime && <meta property="article:modified_time" content={articleMeta.modifiedTime} />}
    <meta property="article:author" content={articleMeta.author} />
    {articleMeta.section && <meta property="article:section" content={articleMeta.section} />}
    {articleMeta.tags?.map(tag => <meta property="article:tag" content={tag} />)}
  </>
)}
```

### 5. `src/pages/blog/index.astro` (I4)

**Adicionar BreadcrumbList ao schema:**
```javascript
const breadcrumbSchema = {
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://barricasindustriais.com" },
    { "@type": "ListItem", position: 2, name: "Blog" },
  ],
};

const blogSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      name: `Blog ${company.name}`,
      description: "Conteudo tecnico sobre embalagens industriais...",
      url: "https://barricasindustriais.com/blog",
      publisher: { "@type": "Organization", name: company.name },
    },
    breadcrumbSchema,
  ],
};
```

### 6. `astro.config.mjs` (I5)

**Adicionar `lastmod` ao sitemap:**
```javascript
export default defineConfig({
  integrations: [
    tailwind(),
    sitemap({
      serialize(item) {
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
  output: "static",
  site: "https://barricasindustriais.com",
});
```

### 7. `src/pages/barricas.astro` e `baldes.astro` (I6)

**Adicionar `image` ao Product schema:**
```javascript
const productSchema = {
  "@type": "Product",
  name: product.name,
  description: `...`,
  image: `https://barricasindustriais.com/images/og/og-barricas.jpg`,
  // ... rest
};
```

### 8. `src/components/layout/Header.astro` (I7)

**Adicionar `aria-label` ao nav principal:**
```diff
- <nav class="mx-auto flex max-w-content...">
+ <nav aria-label="Navegacao principal" class="mx-auto flex max-w-content...">
```

### 9. `src/content.config.ts` (N1)

**Adicionar campos opcionais ao schema:**
```typescript
const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    date: z.string(),
    dateModified: z.string().optional(),
    author: z.string(),
    tags: z.array(z.string()),
    readingTime: z.number(),
    image: z.string().optional(),
  }),
});
```

---

## Acceptance Criteria

- [x] Hero images (Home + paginas de produto) com `loading="eager"` no HTML gerado (zero conflito com `fetchpriority="high"`)
- [x] BreadcrumbList JSON-LD valido em todos os blog posts (verificar com Rich Results Test)
- [x] BreadcrumbList JSON-LD valido na pagina `/blog`
- [x] Blog posts com `og:type="article"` no HTML gerado
- [x] Article schema com `dateModified` e `image` em todos os posts
- [x] Meta tags `og:article:published_time`, `og:article:author`, `og:article:tag` nos posts
- [x] Sitemap com `<lastmod>` em todas as URLs
- [x] Product schema com `image` em `/barricas` e `/baldes`
- [x] Header nav com `aria-label="Navegacao principal"`
- [x] `npm run build` sem erros
- [x] Structured data valido em todas as paginas (Rich Results Test)

---

## Prioridade de Execucao

1. **C1** — Hero `loading="eager"` (impacto direto em LCP / Core Web Vitals)
2. **C3** — Blog `og:type="article"` (correcao rapida, impacto alto)
3. **C2** — BreadcrumbList nos blog posts (rich snippets)
4. **I3** — Article meta tags (`og:article:*`)
5. **I1/I2** — Article schema enrichment (image + dateModified)
6. **I4** — BreadcrumbList no blog index
7. **I6** — Product schema image
8. **I5** — Sitemap lastmod
9. **I7** — Header nav aria-label
10. **N1** — Content schema image field

---

## Impacto Esperado

| Metrica | Antes | Depois |
|---------|-------|--------|
| LCP (hero image) | Degradado por `loading="lazy"` conflitante | Carregamento prioritario correto |
| Blog rich snippets | Basico (titulo + desc) | + breadcrumbs + article enrichment |
| Social sharing (blog) | Card generico `website` | Card de artigo com data, autor e tags |
| Product rich results | Schema incompleto (sem image) | Schema completo — elegivel para rich results |
| Sitemap freshness | Sem lastmod (Google nao sabe quando atualizado) | Lastmod em todas as URLs |
| Lighthouse SEO score | ~95 | 98-100 |

---

<!-- Lock: Braum-a7c2 | done | 2026-03-25T21:31:00Z -->

*Ticket criado em: 2026-03-25*
*Auditoria realizada por: Claude (SEO Full Site Audit)*
