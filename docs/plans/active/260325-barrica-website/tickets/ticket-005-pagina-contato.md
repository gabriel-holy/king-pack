<!-- Lock: - | pending | - -->

# Ticket 005 — Página de Contato

> **Epic:** Website Fábrica de Barricas e Baldes
> **Tipo:** Feature/Page
> **Dependencies:** ticket-001

---

## Escopo

### O que este ticket FAZ

- Criar `src/pages/contato.astro` usando BaseLayout
- Seções da página:

| Seção | Conteúdo | Fundo |
|-------|---------|-------|
| Hero | "Fale com a gente" + "Resposta em até X horas" | `bg-deep` |
| Card WhatsApp | Ícone grande + número + botão "Abrir WhatsApp agora" | `bg` |
| Endereço + Mapa | Americana-SP + embed Google Maps ou link | `surface` |
| Dados da Empresa | CNPJ, horário, e-mail | `surface` |

- CTA principal é o botão de WhatsApp (card em destaque)
- Google Maps: link para `maps.google.com` (evita embed pesado)
- SEO: title e description únicos

### O que este ticket NÃO faz

- Não implementa formulário (WhatsApp é o canal exclusivo)
- Não implementa chat widget

---

## Spec References

- `core-flows.md` — Wireframe da página de Contato
- `tech-plan.md` — Data layer (dados de `company.ts`)

---

## Arquivos a Criar

| Arquivo | Descrição |
|---------|-----------|
| `src/pages/contato.astro` | Página de Contato |

**Nenhum componente novo necessário** — usa `WhatsAppCTA.astro` e `SectionHeader.astro` dos tickets anteriores.

---

## Invariantes

- [x] INV-1: Todo CTA abre WhatsApp
- [x] INV-4: Mensagem pré-preenchida ("Gostaria de falar com a fábrica")
- [x] INV-5: Touch targets >= 44px (card WhatsApp é o alvo principal)
- [x] INV-12: Title único
- [x] INV-13: Description única

---

## Acceptance Criteria

- [ ] Página `/contato` renderiza corretamente
- [ ] Card de WhatsApp é o elemento mais visível da página
- [ ] Botão WhatsApp funcional (abre com mensagem pré-preenchida)
- [ ] Endereço da empresa visível com link para Google Maps
- [ ] CNPJ, horário e e-mail exibidos
- [ ] Mobile: card WhatsApp ocupa largura total, botão com thumb-friendly size
- [ ] `astro check` sem erros
- [ ] Build sem erros
