# Ticket 014 — Remover Email Hotmail do Site

> **Epic:** Website Fábrica de Barricas e Baldes
> **Tipo:** Fix/Credibilidade
> **Dependencies:** ticket-005
> **Origem:** ticket-013 (P0.2 — Authority Bias)

---

## Contexto

O site exibia `Kingpack@hotmail.com.br` na página de contato e no structured data (schema.org). Email Hotmail em 2026 para uma empresa industrial com 22 anos de mercado contradiz o posicionamento profissional construído no restante do site.

**Modelo psicológico:** Authority Bias — credenciais institucionais geram confiança. Um email @hotmail sinaliza amadorismo para compradores corporativos que precisam enviar PO/NF por email.

**Decisão:** Remover completamente o email até que um domínio corporativo esteja configurado (ex: `contato@barricasindustriais.com`). WhatsApp continua como canal principal de contato.

---

## Alterações Realizadas

### 1. `src/data/company.ts`

- Campo `email` esvaziado (`""`) — mantém a propriedade no tipo para quando o domínio corporativo for configurado

### 2. `src/pages/contato.astro`

- Removido `email: company.email` do structured data `ContactPage` (schema.org)
- Removido bloco `<dt>E-mail</dt>/<dd>{company.email}</dd>` da seção "Dados da Empresa"

### Arquivos NÃO alterados (sem impacto)

- `ticket-008-seo-deep-optimization.md` — referência no ticket é documentação, não código renderizado

---

## Próximo passo (fora deste ticket)

Quando o domínio corporativo estiver configurado com MX:
1. Atualizar `company.ts` com o novo email
2. Re-adicionar no structured data e na página de contato
