# Epic — Website Fábrica de Barricas e Baldes

## Intent Lock

> Construir um site institucional B2B em Astro + Tailwind que posiciona a fábrica de Americana-SP como fornecedor industrial confiável e converte visitantes que pesquisam embalagens online em leads qualificados — onde todo ponto de conversão é um botão de WhatsApp direto para o dono da fábrica, sem login, sem formulário complexo.

**Domínio:** `barricasindustriais.com` (Vercel)

---

## Ticket Status

| # | Ticket | Status | Dependencies |
|---|--------|--------|-------------|
| 001 | Setup Projeto Astro + Tailwind + Identidade | `done` | nenhuma |
| 002 | Homepage | `done` | 001 |
| 003 | Página Barricas de Papelão | `done` | 001 |
| 004 | Página Baldes Plásticos | `done` | 001, 003 |
| 005 | Página de Contato | `done` | 001 |
| 006 | SEO Final, Performance e Deploy | `done` | 002, 003, 004, 005 |
| 007 | Otimização de Copy com Marketing Psychology | `done` | 002, 003, 004, 005 |
| 008 | SEO Deep Optimization (Auditoria Avançada) | `done` | 006, 007 |
| 009 | Refinamentos de Copy pós-Revisão Copywriting | `done` | 007 |
| 010 | Animações e Transições (CSS + Vanilla JS) | `done` | 002, 003, 004, 005 |
| 011 | SEO & Performance Advanced | `done` | 006, 007, 008, 010 |
| 012 | Blog: Setup Técnico (Content Collection + Template) | `done` | nenhuma |
| 013 | Auditoria de Compatibilidade: Correções de Conteúdo | `done` | nenhuma |
| 014 | Post 1: Barrica de Papelão ou Lata | `done` | 012 |
| 015 | Post 2: Mercado de Tintas no Brasil | `done` | 012 |
| 016 | Post 3: Guia de Compatibilidade Química | `done` | 012 |
| 017 | Post 4: Embalagem Homologada INMETRO/ABNT/ANTT | `done` | 012 |
| 018 | Post 5: Embalagem Sustentável na Indústria | `done` | 012 |
| 019 | Post 6: Grafiato e Massa Corrida | `done` | 012 |
| 020 | Post 7: Embalagem de Agroquímico | `done` | 012 |
| 021 | SEO Blog & Structured Data Optimization | `done` | 012, 014, 015 |
| 022 | Data Layer: ProductModel com Dimensões Numéricas | `done` | nenhuma |
| 023 | SVG Barrica: Desenho Técnico Unitário com Cotas | `done` | 022 |
| 024 | SVGs de Empilhamento (Barrica + Balde) | `done` | 023, 026 |
| 025 | ProductSpec: Container Principal + Lógica Interativa | `done` | 022, 023, 024, 026 |
| 026 | SVG Balde: Desenho Técnico Unitário com Cotas | `done` | 022 |
| 027 | Animação Draw-On + Reduced Motion | `done` | 023, 025, 026 |

---

## Dependency Graph

### Site (concluído)

```text
001 ──┬── 002 ──────────┐
      ├── 003 ── 004 ───┤
      └── 005 ──────────┴── 006 ── 008 ── 011
                         ├── 007 ── 009
                         └── 010
```

### Blog + Auditoria (pendente)

```text
012 (setup blog) ──┬── 014 (Post 1) ──┐
                   ├── 015 (Post 2) ──┼── 021 (SEO Blog Optimization)
                   ├── 016 (Post 3)   │
                   ├── 017 (Post 4)   │   ← 7 posts em PARALELO
                   ├── 018 (Post 5)   │
                   ├── 019 (Post 6)   │
                   └── 020 (Post 7)   │

013 (auditoria compatibilidade) ← independente, paralelo com 012
```

### Componente SVG Interativo (pendente)

```text
022 (data layer) ──┬── 023 (SVG barrica) ──┬── 024 (SVGs empilhamento) ──┐
                   │                        │                              │
                   └── 026 (SVG balde) ─────┘                              │
                                                                           │
                   022 + 023 + 024 + 026 ── 025 (container + lógica)      │
                                                                           │
                   023 + 025 + 026 ── 027 (draw-on animation)
```

**Paralelismo:**
1. Layer 1: 022 (data layer) — sem dependências
2. Layer 2: 023 + 026 em PARALELO (SVGs unitários, ambos dependem de 022)
3. Layer 3: 024 (SVGs empilhamento, depende de 023 + 026)
4. Layer 4: 025 (container + lógica, depende de 022 + 023 + 024 + 026)
5. Layer 5: 027 (draw-on, depende de 023 + 025 + 026)

---

## Execution Control

| Ticket | Description | Depends On | Agent | Status | Started | Finished |
|--------|-------------|------------|-------|--------|---------|----------|
| 001 | Setup Projeto Astro + Tailwind + Identidade | - | Jinx-a3f7 | `done` | 2026-03-25 | 2026-03-25 |
| 002 | Homepage | 001 | Thresh-b4e2 | `done` | 2026-03-25 | 2026-03-25 |
| 003 | Página Barricas de Papelão | 001 | Draven-c7e1 | `done` | 2026-03-25 | 2026-03-25 |
| 004 | Página Baldes Plásticos | 001, 003 | Yasuo-d8a1 | `done` | 2026-03-25 | 2026-03-25 |
| 005 | Página de Contato | 001 | Leona-b4e2 | `done` | 2026-03-25 | 2026-03-25 |
| 006 | SEO Final + Performance + Deploy | 002, 003, 004, 005 | Veigar-e2f9 | `done` | 2026-03-25 | 2026-03-25 |
| 007 | Copy Marketing Psychology | 002, 003, 004, 005 | Morgana-f1c3 | `done` | 2026-03-25 | 2026-03-25 |
| 008 | SEO Deep Optimization | 006, 007 | Varus-e4b8 | `done` | 2026-03-25 | 2026-03-25 |
| 009 | Copy Refinements (Revisao Copywriting) | 007 | Senna-f2a9 | `done` | 2026-03-25 | 2026-03-25 |
| 010 | Animacoes e Transicoes (CSS + Vanilla JS) | 002, 003, 004, 005 | Warwick-c9d2 | `done` | 2026-03-25 | 2026-03-25 |
| 011 | SEO & Performance Advanced | 006, 007, 008, 010 | Viego-8c4f | `done` | 2026-03-25 | 2026-03-25 |
| 012 | Blog: Setup Técnico (Content Collection + Template) | nenhuma | Vex-7d3a | `done` | 2026-03-25 | 2026-03-25 |
| 013 | Auditoria de Compatibilidade: Correções de Conteúdo | nenhuma | Mundo-e5b2 | `done` | 2026-03-25 | 2026-03-25 |
| 014 | Post 1: Barrica de Papelão ou Lata | 012 | Kayn-2e7b | `done` | 2026-03-25 | 2026-03-25 |
| 015 | Post 2: Mercado de Tintas no Brasil | 012 | Rengar-4f8c | `done` | 2026-03-25 | 2026-03-25 |
| 016 | Post 3: Guia de Compatibilidade Química | 012 | Zyra-4c8e | `done` | 2026-03-25 | 2026-03-25 |
| 017 | Post 4: Embalagem Homologada INMETRO/ABNT/ANTT | 012 | Mordekaiser-b1d6 | `done` | 2026-03-25 | 2026-03-25 |
| 018 | Post 5: Embalagem Sustentável na Indústria | 012 | Nautilus-3a9f | `done` | 2026-03-25 | 2026-03-25 |
| 019 | Post 6: Grafiato e Massa Corrida | 012 | Aatrox-5e2c | `done` | 2026-03-25 | 2026-03-25 |
| 020 | Post 7: Embalagem de Agroquímico | 012 | Darius-9f3b | `done` | 2026-03-25 | 2026-03-25 |
| 021 | SEO Blog & Structured Data Optimization | 012, 014, 015 | Braum-a7c2 | `done` | 2026-03-25 | 2026-03-25 |
| 022 | Data Layer: ProductModel com Dimensões Numéricas | - | Ornn-7f2a | `done` | 2026-03-25 | 2026-03-25 |
| 023 | SVG Barrica: Desenho Técnico Unitário com Cotas | 022 | Zed-4b7e | `done` | 2026-03-25 | 2026-03-25 |
| 024 | SVGs de Empilhamento (Barrica + Balde) | 023, 026 | Teemo-9c4d | `done` | 2026-03-25 | 2026-03-25 |
| 025 | ProductSpec: Container Principal + Lógica Interativa | 022, 023, 024, 026 | Singed-7e3b | `done` | 2026-03-26 | 2026-03-26 |
| 026 | SVG Balde: Desenho Técnico Unitário com Cotas | 022 | Renata-8c3f | `done` | 2026-03-25 | 2026-03-25 |
| 027 | Animação Draw-On + Reduced Motion | 023, 025, 026 | Urgot-6a2c | `done` | 2026-03-26 | 2026-03-26 |

---

## Execution Summary

- **Total tickets:** 27
- **Concluídos:** 27
- **Pendentes:** 0
- **Status:** EPIC COMPLETO
- **Invariantes identificadas:** 15

---

## Artefatos do Epic

| Arquivo | Conteúdo |
|---------|---------|
| `brief.md` | Problema, escopo MVP, personas, constraints, success metrics |
| `core-flows.md` | Fluxos de usuário, wireframes ASCII, decisões de UX |
| `tech-plan.md` | Arquitetura, estrutura de pastas, data layer, invariantes |
| `visual-guide.md` | Identidade "Grafite Técnico", paleta, tipografia, Tailwind config |
| `tickets/ticket-001-*.md` | Setup do projeto |
| `tickets/ticket-002-*.md` | Homepage |
| `tickets/ticket-003-*.md` | Página Barricas |
| `tickets/ticket-004-*.md` | Página Baldes |
| `tickets/ticket-005-*.md` | Página Contato |
| `tickets/ticket-006-*.md` | SEO, Performance, Deploy |
| `tickets/ticket-007-copy-marketing-optimization.md` | Otimização de copy com marketing psychology |
| `tickets/ticket-008-seo-deep-optimization.md` | SEO deep optimization (auditoria técnica avançada) |
| `tickets/ticket-009-copy-refinements.md` | Refinamentos de copy pos-revisao copywriting |
| `tickets/ticket-010-animacoes-transicoes.md` | Animações e transições (CSS + Vanilla JS) |
| `tickets/ticket-011-seo-performance-advanced.md` | SEO & Performance Advanced |
| `tickets/ticket-012-blog-setup-tecnico.md` | Blog: Setup Técnico (Content Collection + Template) |
| `tickets/ticket-013-auditoria-compatibilidade-conteudo.md` | Auditoria de Compatibilidade: Correções de Conteúdo |
| `tickets/ticket-014-post-barrica-ou-lata.md` | Post 1: Barrica de Papelão ou Lata |
| `tickets/ticket-015-post-mercado-tintas.md` | Post 2: Mercado de Tintas no Brasil |
| `tickets/ticket-016-post-compatibilidade-quimica.md` | Post 3: Guia de Compatibilidade Química |
| `tickets/ticket-017-post-embalagem-homologada.md` | Post 4: Embalagem Homologada |
| `tickets/ticket-018-post-sustentabilidade.md` | Post 5: Embalagem Sustentável |
| `tickets/ticket-019-post-grafiato-massa.md` | Post 6: Grafiato e Massa Corrida |
| `tickets/ticket-020-post-agroquimico.md` | Post 7: Embalagem de Agroquímico |
| `tickets/ticket-021-seo-blog-optimization.md` | SEO Blog & Structured Data Optimization |
| `content/blog/*.md` | 7 posts completos prontos para implementação |
| `tickets/ticket-022-product-model-data-layer.md` | Data Layer: ProductModel com Dimensões Numéricas |
| `tickets/ticket-023-svg-barrica-unitaria.md` | SVG Barrica: Desenho Técnico Unitário com Cotas |
| `tickets/ticket-024-svg-empilhamento.md` | SVGs de Empilhamento (Barrica + Balde) |
| `tickets/ticket-025-product-spec-container.md` | ProductSpec: Container Principal + Lógica Interativa |
| `tickets/ticket-026-svg-balde-unitario.md` | SVG Balde: Desenho Técnico Unitário com Cotas |
| `tickets/ticket-027-draw-on-animation.md` | Animação Draw-On + Reduced Motion |

---

*Epic criado em: 2026-03-25*
*Última atualização: 2026-03-25*
*Status: IN PROGRESS (21/27 concluídos)*
