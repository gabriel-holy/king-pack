<!-- Lock: Vex-7d3a | done | 2026-03-25T18:18:00Z -->
# Ticket 012 — Blog: Setup Técnico (Infra)

## Objetivo

Configurar a infraestrutura do blog no Astro: Content Collection, template de post, página de listagem, rotas dinâmicas e links de navegação. Os 7 posts serão implementados em paralelo nos tickets 014-020.

## Escopo

### 1. Content Collection

Criar `src/content/config.ts` com schema para blog posts:

```typescript
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    author: z.string(),
    tags: z.array(z.string()),
    readingTime: z.number(),
  }),
});

export const collections = { blog };
```

### 2. Diretório de conteúdo

```
src/content/blog/   ← os tickets 014-020 colocam os .md aqui
```

### 3. Template de post — `src/pages/blog/[...slug].astro`

- Breadcrumb: Home > Blog > Título do Post
- H1 = título do post
- Data de publicação + tempo de leitura
- Autor (King Pack)
- Conteúdo renderizado do markdown
- CTA WhatsApp no final (fixo)
- Cross-links para /barricas e /baldes
- Article schema (JSON-LD) com headline, author, datePublished, publisher
- Open Graph e Twitter Card específicos por post
- Meta description do frontmatter

### 4. Página de listagem — `src/pages/blog/index.astro`

- H1: "Blog King Pack — Embalagens Industriais"
- Grid de cards com: título, descrição, data, tempo de leitura, tags
- Ordenação por data (mais recente primeiro)
- Meta tags da página de listagem

### 5. Navegação

- Adicionar link "Blog" no Header (`src/components/layout/Header.astro`)
- Adicionar link "Blog" no Footer (`src/components/layout/Footer.astro`)

### 6. Sitemap

Verificar que `@astrojs/sitemap` inclui automaticamente as novas rotas `/blog/*`.

## Conteúdo dos posts

Os textos completos já estão prontos em:
```
docs/plans/active/260325-barrica-website/content/blog/*.md
```

Cada ticket 014-020 copia seu respectivo .md para `src/content/blog/`.

## Acceptance Criteria

- [x] Content Collection configurada com schema
- [x] Template de post renderizando markdown com Article schema
- [x] Página /blog com listagem de posts
- [x] Rota /blog/[slug] funcionando
- [x] Link "Blog" no header e footer
- [x] Breadcrumb em cada post
- [x] CTA WhatsApp no final de cada post
- [x] Build passando com 0 posts (collection vazia aceita)
- [x] Sitemap incluindo /blog

## Dependências

- Nenhuma (pode rodar em paralelo com ticket 013)
- Tickets 014-020 dependem deste ticket
