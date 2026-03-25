<!-- Lock: - | pending | - -->

# Ticket 004 — Página Baldes Plásticos

> **Epic:** Website Fábrica de Barricas e Baldes
> **Tipo:** Feature/Page
> **Dependencies:** ticket-001, ticket-003

---

## Escopo

### O que este ticket FAZ

- Criar `src/pages/baldes.astro` usando BaseLayout
- Reutilizar os 4 componentes de `src/components/product/` criados no ticket-003:
  - `ProductHero.astro` com dados de baldes
  - `SpecsTable.astro` com specs de baldes plásticos
  - `ApplicationCards.astro` com setores (químicos, agroquímicos, construção)
  - `ObjectionEliminator.astro` (mesmo conteúdo)
- Dados de specs vindos de `src/data/products.ts` (filtro por `slug: "baldes"`)
- SEO: title e description únicos, structured data Product (JSON-LD)
- Mensagem WhatsApp contextual ("interesse em baldes plásticos...")

### O que este ticket NÃO faz

- Não modifica componentes do ticket-003 (apenas reutiliza)
- Se o ticket-003 criou componentes inflexíveis, este ticket pode ajustá-los

---

## Spec References

- `core-flows.md` — Wireframe de Baldes (estrutura idêntica a Barricas)
- `tech-plan.md` — Data layer, specs de baldes

---

## Arquivos a Criar

| Arquivo | Descrição |
|---------|-----------|
| `src/pages/baldes.astro` | Página de Baldes |

**Nenhum componente novo** — reutiliza `product/*.astro` do ticket-003.

---

## Invariantes

- [x] INV-1: Todo CTA abre WhatsApp
- [x] INV-3: Specs técnicas abertas
- [x] INV-4: Mensagem pré-preenchida contextual ("interesse em baldes plásticos...")
- [x] INV-12: Title único (diferente de /barricas)
- [x] INV-13: Description única (diferente de /barricas)

---

## Acceptance Criteria

- [ ] Página `/baldes` renderiza corretamente
- [ ] Dados de specs são de baldes (não barricas) — vindos de `products.ts`
- [ ] Aplicações mostram setores adequados (químicos, agro, construção)
- [ ] WhatsApp abre com mensagem sobre baldes (não genérica)
- [ ] Title e description são únicos e diferentes de `/barricas`
- [ ] Structured data Product no `<head>` com dados de baldes
- [ ] Mobile responsivo
- [ ] `astro check` sem erros
- [ ] Build sem erros
