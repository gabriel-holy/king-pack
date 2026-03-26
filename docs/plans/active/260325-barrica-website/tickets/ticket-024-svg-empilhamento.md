<!-- Lock: | pending | -->

# Ticket 024 — SVGs de Empilhamento (Barrica + Balde)

> **Epic:** Website Fábrica de Barricas e Baldes
> **Tipo:** Feature/Component
> **Dependencies:** ticket-023, ticket-026

---

## Escopo

### O que este ticket FAZ

- Criar `src/components/product/BarricaStackSvg.astro` — SVG com 3 barricas empilhadas
- Criar `src/components/product/BaldeStackSvg.astro` — SVG com 3 baldes empilhados
- Estilo visual: mesmo sketch com hachuras dos SVGs unitários (tickets 023 e 026)
- Aceita props `diameter` e `height` para calcular proporções
- Indica visualmente "Empilhamento máximo: 3 unidades (cheias)" no SVG

### O que este ticket NÃO faz

- Não cria a lógica de transição/slide entre SVGs (ticket-025)
- Não cria o componente wrapper (ticket-025)

---

## Spec References

- Decisão challenge-me: empilhamento máximo = 3 barricas/baldes cheias
- Decisão challenge-me: SVG separado do unitário, alternado por botão
- Decisão challenge-me: transição slide lateral (implementada no ticket-025)

---

## Design dos SVGs de Empilhamento

**Composição:** 3 unidades empilhadas verticalmente, vista frontal com perspectiva isométrica leve.

**Props:**

```typescript
interface Props {
  diameter: number;  // mm
  height: number;    // mm
}
```

**viewBox:** Mais alto que o unitário para caber 3 unidades. Sugestão: `"0 0 340 520"`.

**Cada unidade** é uma versão simplificada (sem cotas, sem zonas de hover) do SVG unitário correspondente:
- Mesma geometria (cilindro reto)
- Mesmas hachuras e estilo sketch
- Escala reduzida para caber 3 no viewBox

**Elementos visuais extras:**
- Setas ou linhas indicando a direção do empilhamento
- Texto "máx. 3 unidades" em estilo cota (mesma fonte Inter 9px)
- Linha de cota lateral mostrando altura total empilhada (3 × height)

**Diferenças entre barrica e balde:**
- Barrica: cilindro reto empilhado (tampa plástica sobre fundo plástico)
- Balde: cilindro reto com tampa de encaixe, alça metálica recolhida entre baldes

## Acessibilidade

```html
<svg role="img" aria-labelledby="stack-barrica-title" width="100%" viewBox="...">
  <title id="stack-barrica-title">
    Empilhamento máximo de 3 barricas de papelão cheias
  </title>
</svg>
```

---

## Arquivos a Criar

| Arquivo | Descrição |
|---------|-----------|
| `src/components/product/BarricaStackSvg.astro` | SVG de 3 barricas empilhadas |
| `src/components/product/BaldeStackSvg.astro` | SVG de 3 baldes empilhados |

---

## Acceptance Criteria

- [ ] SVG barrica renderiza 3 barricas empilhadas com proporções corretas
- [ ] SVG balde renderiza 3 baldes empilhados com proporções corretas
- [ ] Proporções calculadas a partir de `diameter` e `height` props
- [ ] Estilo sketch com hachuras consistente com SVGs unitários
- [ ] Indicação textual "máx. 3 unidades" presente
- [ ] Acessibilidade: `role="img"` e `<title>` presentes
- [ ] CSS scoped
- [ ] `astro check` sem erros
- [ ] Build sem erros

---

*Ticket criado em: 2026-03-25*
