<!-- Lock: Jinx-a3f7 | done | 2026-03-25T15:50:00Z -->

# Ticket 001 — Setup do Projeto Astro + Tailwind + Identidade Visual

> **Epic:** Website Fábrica de Barricas e Baldes
> **Tipo:** Infra/Setup
> **Dependencies:** Nenhuma (primeiro ticket)

---

## Escopo

### O que este ticket FAZ

- Inicializar projeto Astro v4+ com TypeScript
- Configurar Tailwind CSS com a identidade "Grafite Técnico" (cores, tipografia, espaçamento)
- Criar `src/styles/global.css` com CSS vars e imports de fontes (Space Grotesk + Inter)
- Criar `src/data/company.ts` com dados placeholder da empresa
- Criar `src/data/products.ts` com specs placeholder dos 2 produtos
- Criar `src/data/testimonials.ts` com depoimentos placeholder
- Criar `src/layouts/BaseLayout.astro` com Header + Footer + WhatsApp flutuante
- Criar `src/components/layout/Header.astro` — navegação com 4 itens + botão WhatsApp
- Criar `src/components/layout/Footer.astro` — dados da empresa, links, créditos
- Criar `src/components/layout/WhatsAppButton.astro` — botão flutuante global
- Criar `src/components/shared/SEOHead.astro` — meta tags + structured data
- Criar `src/components/shared/WhatsAppCTA.astro` — bloco CTA reutilizável
- Criar `src/pages/404.astro` — página de erro com CTA WhatsApp
- Configurar `public/robots.txt`
- Instalar e configurar `@astrojs/sitemap`
- Configurar `astro.config.mjs` com site URL `https://barricasindustriais.com`

### O que este ticket NÃO faz

- Não cria nenhuma página de conteúdo (Home, Barricas, Baldes, Contato)
- Não adiciona imagens placeholder (responsabilidade dos tickets de página)

---

## Spec References

- `brief.md` — Constraints, stack
- `tech-plan.md` — Estrutura de pastas, data layer, SEO técnico
- `visual-guide.md` — Paleta completa, Tailwind config (§6), tipografia, espaçamento

---

## Arquivos a Criar

| Arquivo | Descrição |
|---------|-----------|
| `package.json` | Dependências do projeto |
| `astro.config.mjs` | Config Astro + Tailwind + Sitemap |
| `tailwind.config.mjs` | Identidade Grafite Técnico (cores, fontes, espaçamento) |
| `tsconfig.json` | TypeScript config |
| `src/styles/global.css` | Tailwind directives + CSS vars + font imports |
| `src/data/company.ts` | Dados da empresa (placeholder) |
| `src/data/products.ts` | Specs dos produtos (placeholder) |
| `src/data/testimonials.ts` | Depoimentos (placeholder) |
| `src/layouts/BaseLayout.astro` | Layout base |
| `src/components/layout/Header.astro` | Navegação |
| `src/components/layout/Footer.astro` | Rodapé |
| `src/components/layout/WhatsAppButton.astro` | Botão flutuante |
| `src/components/shared/SEOHead.astro` | Meta tags |
| `src/components/shared/WhatsAppCTA.astro` | CTA WhatsApp reutilizável |
| `src/pages/404.astro` | Página de erro |
| `public/robots.txt` | Robots |

---

## Invariantes (do tech-plan.md)

- [x] INV-1: Todo CTA abre WhatsApp
- [x] INV-2: Botão WhatsApp flutuante em 100% das páginas
- [x] INV-5: Touch targets >= 44px em mobile
- [x] INV-6: Contraste mínimo AA
- [x] INV-9: Toda imagem com `width` e `height` explícitos
- [x] INV-11: Zero CSS não-utilizado (Tailwind purge)
- [x] INV-12-15: SEO base (title, description, structured data, sitemap)

---

## Acceptance Criteria

- [x] `npm run build` completa sem erros
- [x] `npm run dev` serve o projeto com hot reload
- [x] BaseLayout renderiza Header + Footer + WhatsApp flutuante
- [x] 404 page renderiza com CTAs de WhatsApp e links internos
- [x] `robots.txt` acessível em `/robots.txt`
- [x] Sitemap gerado automaticamente
- [x] `company.ts` exporta `buildWhatsAppUrl()` funcional
- [x] Tailwind config usa todas as cores da identidade Grafite Técnico
- [x] Fontes Space Grotesk e Inter carregam corretamente
- [x] Header sticky com z-index adequado
- [x] WhatsApp button: fixed, bottom-right, z-index 9999, pulse animation
- [x] SEOHead aceita props de title, description, OG image
- [x] Typecheck passa (`astro check`)
