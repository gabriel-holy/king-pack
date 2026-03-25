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
| 012 | Blog: Setup Técnico (Content Collection + Template) | `pending` | nenhuma |
| 013 | Auditoria de Compatibilidade: Correções de Conteúdo | `done` | nenhuma |
| 014 | Post 1: Barrica de Papelão ou Lata | `pending` | 012 |
| 015 | Post 2: Mercado de Tintas no Brasil | `pending` | 012 |
| 016 | Post 3: Guia de Compatibilidade Química | `pending` | 012 |
| 017 | Post 4: Embalagem Homologada INMETRO/ABNT/ANTT | `pending` | 012 |
| 018 | Post 5: Embalagem Sustentável na Indústria | `pending` | 012 |
| 019 | Post 6: Grafiato e Massa Corrida | `pending` | 012 |
| 020 | Post 7: Embalagem de Agroquímico | `pending` | 012 |

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
012 (setup blog) ──┬── 014 (Post 1)
                   ├── 015 (Post 2)
                   ├── 016 (Post 3)
                   ├── 017 (Post 4)    ← 7 posts em PARALELO
                   ├── 018 (Post 5)
                   ├── 019 (Post 6)
                   └── 020 (Post 7)

013 (auditoria compatibilidade) ← independente, paralelo com 012
```

**Próxima execução:**
1. Layer 1: 012 + 013 em paralelo
2. Layer 2: 014-020 em paralelo (após 012 concluir)

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
| 012 | Blog: Setup Técnico (Content Collection + Template) | nenhuma | Vex-7d3a | `in_progress` | 2026-03-25 | - |
| 013 | Auditoria de Compatibilidade: Correções de Conteúdo | nenhuma | Mundo-e5b2 | `done` | 2026-03-25 | 2026-03-25 |
| 014 | Post 1: Barrica de Papelão ou Lata | 012 | - | `pending` | - | - |
| 015 | Post 2: Mercado de Tintas no Brasil | 012 | - | `pending` | - | - |
| 016 | Post 3: Guia de Compatibilidade Química | 012 | - | `pending` | - | - |
| 017 | Post 4: Embalagem Homologada INMETRO/ABNT/ANTT | 012 | - | `pending` | - | - |
| 018 | Post 5: Embalagem Sustentável na Indústria | 012 | - | `pending` | - | - |
| 019 | Post 6: Grafiato e Massa Corrida | 012 | - | `pending` | - | - |
| 020 | Post 7: Embalagem de Agroquímico | 012 | - | `pending` | - | - |

---

## Execution Summary

- **Total tickets:** 20
- **Concluídos:** 11
- **Pendentes:** 9 (012 setup blog, 013 auditoria, 014-020 posts)
- **Próximo passo:** Executar 012 (setup) e 013 (auditoria) em paralelo, depois 014-020 (7 posts) em paralelo
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
| `content/blog/*.md` | 7 posts completos prontos para implementação |

---

*Epic criado em: 2026-03-25*
*Última atualização: 2026-03-25*
*Status: IN PROGRESS (11/13 concluídos)*
