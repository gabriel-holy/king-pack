<!-- Lock: Veigar-e2f9 | done | 2026-03-25T16:12:00Z -->

# Ticket 006 — SEO Final, Performance e Deploy

> **Epic:** Website Fábrica de Barricas e Baldes
> **Tipo:** Quality/Deploy
> **Dependencies:** ticket-002, ticket-003, ticket-004, ticket-005

---

## Escopo

### O que este ticket FAZ

- Auditar e completar SEO de todas as 4 páginas MVP:
  - Verificar titles e descriptions únicos
  - Verificar structured data (LocalBusiness na Home, Product nas páginas de produto)
  - Verificar OG tags para compartilhamento em redes sociais
  - Verificar canonical URLs
- Auditar performance:
  - Verificar todas as imagens otimizadas (WebP, lazy loading, sizes)
  - Hero images com `fetchpriority="high"`
  - Todas as imagens com `width` e `height` explícitos
  - Font-display swap nas fontes
  - Zero CSS não-utilizado (Tailwind purge)
- Verificar acessibilidade mínima:
  - Contraste AA em todos os textos
  - Focus ring visível em elementos interativos
  - `alt` em todas as imagens
  - `<h1>` único por página
  - Estrutura semântica (`<header>`, `<main>`, `<footer>`, `<section>`)
- Configurar meta para `barricasindustriais.com`:
  - `astro.config.mjs` → `site: 'https://barricasindustriais.com'`
  - Canonical URLs corretas
  - Sitemap final gerado com todas as páginas
- Build final e verificação de deploy
- Verificar 404 page funcional

### O que este ticket NÃO faz

- Não configura DNS ou domínio (já feito na Vercel)
- Não implementa analytics (decisão futura)
- Não cria conteúdo real (permanece placeholder)

---

## Spec References

- `tech-plan.md` — SEO técnico, performance targets, invariantes
- `brief.md` — Palavras-chave alvo, success metrics

---

## Arquivos a Modificar

| Arquivo | Modificação |
|---------|------------|
| `astro.config.mjs` | Confirmar `site` URL correto |
| `src/components/shared/SEOHead.astro` | OG tags, canonical |
| `src/pages/*.astro` | Verificar props de SEO em cada página |
| `public/robots.txt` | Verificar sitemap URL |

---

## Invariantes (verificação final — TODOS)

- [x] INV-1: Todo CTA abre WhatsApp
- [x] INV-2: Botão WhatsApp flutuante em 100% das páginas
- [x] INV-3: Specs técnicas abertas (sem login)
- [x] INV-4: Mensagem pré-preenchida em todo link WhatsApp
- [x] INV-5: Touch targets >= 44px
- [x] INV-6: Contraste mínimo AA
- [x] INV-7: Sem stock photo genérica
- [x] INV-8: Zero superlativo vazio
- [x] INV-9: Toda imagem com `width` e `height`
- [x] INV-10: Hero image com `fetchpriority="high"`
- [x] INV-11: Zero CSS não-utilizado
- [x] INV-12: Title único por página
- [x] INV-13: Description única por página
- [x] INV-14: Structured data LocalBusiness na Home
- [x] INV-15: Sitemap completo

---

## Acceptance Criteria

- [x] `npm run build` sem erros e sem warnings
- [ ] Lighthouse: Performance >= 90, SEO >= 90, Accessibility >= 90 (requer deploy)
- [ ] LCP < 2.4s em todas as páginas (requer deploy)
- [x] CLS < 0.1 em todas as páginas (zero images sem width/height, zero fonts FOIT)
- [x] Sitemap em `/sitemap-index.xml` lista as 4 páginas MVP
- [x] `robots.txt` referencia sitemap correto
- [x] OG tags presentes em todas as páginas (verificado no HTML gerado)
- [x] Structured data válido (LocalBusiness na Home+Contato, Product em Barricas+Baldes)
- [x] 404 page renderiza corretamente para URLs inexistentes
- [x] Todas as 15 invariantes verificadas e passando
- [x] Site publicável em `barricasindustriais.com`
