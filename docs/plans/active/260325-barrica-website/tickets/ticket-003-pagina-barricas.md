<!-- Lock: - | pending | - -->

# Ticket 003 — Página Barricas de Papelão

> **Epic:** Website Fábrica de Barricas e Baldes
> **Tipo:** Feature/Page
> **Dependencies:** ticket-001

---

## Escopo

### O que este ticket FAZ

- Criar `src/pages/barricas.astro` usando BaseLayout
- Criar 4 componentes de seção (reutilizáveis para ticket-004):

| Componente | Seção | Fundo |
|-----------|-------|-------|
| `ProductHero.astro` | Nome + tagline + CTAs WhatsApp + foto placeholder | `bg-deep` |
| `SpecsTable.astro` | Tabela de specs técnicas (capacidades, material, resistência, lote, prazo) | `bg` |
| `ApplicationCards.astro` | Cards de aplicação por setor (tintas, grafiato, construção) | `surface` |
| `ObjectionEliminator.astro` | "Medo de trocar?" → amostra grátis + 3 passos + garantia prazo | `bg` |

- CTA final com 2 botões WhatsApp (solicitar amostra + dúvida técnica)
- SEO: title e description únicos, structured data Product (JSON-LD)
- Specs técnicas 100% visíveis sem login ou cadastro

### O que este ticket NÃO faz

- Não cria a página de Baldes (ticket-004 usa os mesmos componentes)
- Não cria páginas de setor (epic futuro)

---

## Spec References

- `core-flows.md` — Wireframe da página de Barricas, fluxo do Gerente de Produção
- `tech-plan.md` — Componentes product/*, data layer de produtos
- `visual-guide.md` — Cards, tabelas, espaçamento

---

## Arquivos a Criar

| Arquivo | Descrição |
|---------|-----------|
| `src/pages/barricas.astro` | Página de Barricas |
| `src/components/product/ProductHero.astro` | Hero de produto (reutilizável) |
| `src/components/product/SpecsTable.astro` | Tabela de specs (reutilizável) |
| `src/components/product/ApplicationCards.astro` | Cards de aplicação (reutilizável) |
| `src/components/product/ObjectionEliminator.astro` | Seção elimina objeções (reutilizável) |

---

## Invariantes

- [x] INV-1: Todo CTA abre WhatsApp
- [x] INV-3: Specs técnicas abertas — nenhuma informação exige login
- [x] INV-4: Mensagem pré-preenchida contextual ("interesse em barricas...")
- [x] INV-5: Touch targets >= 44px
- [x] INV-7: Sem stock photo genérica
- [x] INV-8: Zero superlativo vazio
- [x] INV-9: Toda imagem com `width` e `height`
- [x] INV-10: Hero image com `fetchpriority="high"`
- [x] INV-12: Title único
- [x] INV-13: Description única

---

## Acceptance Criteria

- [ ] Página `/barricas` renderiza corretamente
- [ ] Hero com tagline e 2 CTAs WhatsApp (amostra + dúvida técnica)
- [ ] Tabela de specs visível sem scroll horizontal em desktop
- [ ] Specs incluem: capacidades, material, resistência empilhamento, umidade, lote mínimo, prazo
- [ ] Cards de aplicação mostram 3 setores (tintas, grafiato, construção)
- [ ] Seção "Medo de trocar?" com 3 argumentos concretos
- [ ] CTA final com WhatsApp funcional
- [ ] Structured data Product no `<head>`
- [ ] Mobile: tabela de specs scrollável horizontalmente ou em layout de cards
- [ ] Componentes são genéricos o suficiente para reutilizar em `/baldes`
- [ ] `astro check` sem erros
- [ ] Build sem erros
