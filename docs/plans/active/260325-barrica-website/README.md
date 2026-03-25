# Epic — Website Fábrica de Barricas e Baldes

## Intent Lock

> Construir um site institucional B2B em Astro + Tailwind que posiciona a fábrica de Americana-SP como fornecedor industrial confiável e converte visitantes que pesquisam embalagens online em leads qualificados — onde todo ponto de conversão é um botão de WhatsApp direto para o dono da fábrica, sem login, sem formulário complexo.

**Domínio:** `barricasindustriais.com` (Vercel)

---

## Ticket Status

| # | Ticket | Status | Agent | Dependencies |
|---|--------|--------|-------|-------------|
| 001 | Setup Projeto Astro + Tailwind + Identidade | `pending` | - | nenhuma |
| 002 | Homepage | `pending` | - | 001 |
| 003 | Página Barricas de Papelão | `pending` | - | 001 |
| 004 | Página Baldes Plásticos | `pending` | - | 001, 003 |
| 005 | Página de Contato | `pending` | - | 001 |
| 006 | SEO Final, Performance e Deploy | `pending` | - | 002, 003, 004, 005 |

---

## Dependency Graph

```text
Layer 0 (fundação):
  [001 — Setup Projeto]

Layer 1 (páginas — paralelo):
  [002 — Homepage]    [003 — Barricas]    [005 — Contato]

Layer 2 (dependente de 003):
  [004 — Baldes]

Layer 3 (verificação final):
  [006 — SEO + Performance + Deploy]
```

```text
001 ──┬── 002 ──────────┐
      │                  │
      ├── 003 ── 004 ───┤
      │                  │
      └── 005 ──────────┴── 006
```

**Paralelizável:** Após ticket 001, os tickets 002, 003 e 005 podem ser executados em paralelo.

---

## Execution Control

| Ticket | Description | Depends On | Agent | Status | Started | Finished |
|--------|-------------|------------|-------|--------|---------|----------|
| 001 | Setup Projeto Astro + Tailwind + Identidade | - | Jinx-a3f7 | `done` | 2026-03-25 | 2026-03-25 |
| 002 | Homepage | 001 | Thresh-b4e2 | `done` | 2026-03-25 | 2026-03-25 |
| 003 | Página Barricas de Papelão | 001 | Draven-c7e1 | `done` | 2026-03-25 | 2026-03-25 |
| 004 | Página Baldes Plásticos | 001, 003 | Yasuo-d8a1 | `done` | 2026-03-25 | 2026-03-25 |
| 005 | Página de Contato | 001 | Leona-b4e2 | `done` | 2026-03-25 | 2026-03-25 |
| 006 | SEO Final + Performance + Deploy | 002, 003, 004, 005 | - | `pending` | - | - |

---

## Execution Summary

- **Total tickets:** 6
- **Parallelizable:** 3 (tickets 002, 003, 005 — layer 1)
- **Dependency layers:** 4
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

---

*Epic criado em: 2026-03-25*
*Status: PENDING*
