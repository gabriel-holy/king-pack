<!-- Lock: Singed-7e3b | done | 2026-03-26T00:30:00Z -->

# Ticket 025 — ProductSpec: Container Principal + Lógica Interativa

> **Epic:** Website Fábrica de Barricas e Baldes
> **Tipo:** Feature/Component
> **Dependencies:** ticket-022, ticket-023, ticket-024, ticket-026

---

## Escopo

### O que este ticket FAZ

- Criar `src/components/product/ProductSpec.astro` — container principal do componente interativo
- Layout: SVG à esquerda + painel de specs à direita (grid 1fr 1fr)
- Abas por modelo (ex: "Barrica 14L", "Barrica 16L", etc.) — troca SVG e valores
- Botão toggle "Dimensões" / "Empilhamento" — alterna entre SVG unitário e SVG de empilhamento
- Lógica JavaScript de highlight bidirecional (hover SVG → painel, hover painel → SVG)
- Mobile: tap como toggle (toca pra acender, toca em outro ou fora pra apagar)
- Transição slide lateral entre SVG unitário e empilhamento
- Integrar nas páginas existentes (`barricas.astro`, `baldes.astro`)
- Container SVG com fundo suavizado (vinheta/gradiente) para transição entre dark theme e sketch

### O que este ticket NÃO faz

- Não cria os SVGs (tickets 023, 024, 026)
- Não implementa animação draw-on (ticket-027)
- Não remove o SpecsTable existente (convive)

---

## Spec References

- Decisão challenge-me: layout SVG esquerda + specs direita, empilhados em mobile
- Decisão challenge-me: abas por modelo com labels legíveis ("Barrica 14L")
- Decisão challenge-me: CSS híbrido — Tailwind pro layout, scoped CSS pro SVG
- Decisão challenge-me: tap toggle em mobile
- Decisão challenge-me: slide lateral entre SVGs
- Decisão challenge-me: container com fundo suavizado para integrar sketch no dark theme

---

## Props do Componente

```typescript
interface Props {
  product: ProductSpec;
  models: ProductModel[];
  variant: 'barrica' | 'balde';
}
```

## Layout

```
┌─────────────────────────────────────────────────────────┐
│  [eyebrow] ESPECIFICAÇÕES TÉCNICAS                      │
│                                                         │
│  [tab] Barrica 14L  [tab] 16L  [tab] 18L  [tab] 20L   │
│                                                         │
│  ┌──────────────────┐  ┌──────────────────────────────┐ │
│  │                  │  │ Diâmetro                     │ │
│  │   SVG unitário   │  │ 260 mm                       │ │
│  │   ou             │  ├──────────────────────────────┤ │
│  │   SVG empilham.  │  │ Altura total                 │ │
│  │                  │  │ 320 mm                       │ │
│  │                  │  ├──────────────────────────────┤ │
│  │   [Dimensões]    │  │ Capacidade nominal           │ │
│  │   [Empilhamento] │  │ 14 L                         │ │
│  │                  │  ├──────────────────────────────┤ │
│  │                  │  │ Empilhamento máximo          │ │
│  │                  │  │ 3 unidades (cheias)          │ │
│  └──────────────────┘  └──────────────────────────────┘ │
│                                                         │
│  [hint] Passe o mouse nas dimensões ou na ilustração    │
└─────────────────────────────────────────────────────────┘
```

Mobile (< 768px): SVG em cima, painel embaixo, empilhados (`grid-template-columns: 1fr`).

## Abas de Modelo

- Labels vindas de `ProductModel.label` (ex: "Barrica 14L")
- Ao trocar aba: atualizar props do SVG (`diameter`, `height`), atualizar valores do painel
- Aba ativa: texto `#f0f0f0`, border-bottom `#4dabf7`
- Aba inativa: texto `#666666`
- Estilo das abas em Tailwind utility classes

## Botão Toggle Dimensões / Empilhamento

- Dois botões pequenos abaixo do SVG (ou sobrepostos no container)
- "Dimensões" (ativo por padrão) / "Empilhamento"
- Transição: **slide lateral** — SVG unitário sai pra esquerda, empilhamento entra pela direita (e vice-versa)
- Implementação: wrapper com `overflow: hidden`, transform translateX com transition

## Painel de Specs — Itens

### Barrica:

| data-spec | Label | Valor | Unidade | Descrição |
|-----------|-------|-------|---------|-----------|
| `diametro` | Diâmetro | {model.diameter} | mm | Boca e fundo iguais — cilindro reto |
| `altura` | Altura total | {model.height} | mm | Compatível com empilhamento em paletes padrão |
| `capacidade` | Capacidade nominal | {model.capacity} | — | Volume útil com tampa fechada |
| `empilhamento` | Empilhamento máximo | {model.stackingMax} unidades | — | Com produto dentro. Recomendação do fabricante. |

### Balde:

| data-spec | Label | Valor | Unidade | Descrição |
|-----------|-------|-------|---------|-----------|
| `diametro` | Diâmetro | {model.diameter} | mm | Boca e base iguais (simplificado) |
| `altura` | Altura total | {model.height} | mm | Sem alça; com alça recolhida |
| `capacidade` | Capacidade nominal | {model.capacity} | — | Volume útil |
| `empilhamento` | Empilhamento máximo | {model.stackingMax} unidades | — | Baldes cheios, tampa fechada |

### Estrutura HTML de cada item:

```html
<div class="spec-item" data-spec="[CHAVE]">
  <div class="spec-label">[NOME]</div>
  <div class="spec-value">
    <span class="spec-number">[VALOR]</span>
    <span class="spec-unit">[UNIDADE]</span>
  </div>
  <div class="spec-desc">[DESCRIÇÃO]</div>
</div>
```

## Lógica JavaScript — Highlight Bidirecional

```javascript
const HIGHLIGHT_MAP = {
  diametro: {
    svgIds: ['barrel-top', 'barrel-bot', 'cota-diametro-linha',
             'cota-diametro-ext-esq', 'cota-diametro-ext-dir', 'cota-diametro-texto'],
    panelKey: 'diametro'
  },
  altura: {
    svgIds: ['cota-altura-linha', 'cota-altura-ext-top',
             'cota-altura-ext-bot', 'cota-altura-texto'],
    panelKey: 'altura'
  },
  capacidade: { svgIds: [], panelKey: 'capacidade' },
  empilhamento: { svgIds: [], panelKey: 'empilhamento' }
}
```

**Desktop:** `mouseenter` → `highlight(key)`, `mouseleave` → `clearHighlight()`

**Mobile (touch):** Detectar via `window.matchMedia('(hover: none)')` ou `'ontouchstart' in window`.
- Tap na zona SVG ou spec-item → `highlight(key)` (toggle — se já estava ativo, limpa)
- Tap fora do componente → `clearHighlight()`

**Highlight ativo:**
- SVG: elementos com `.hl` class — stroke `#4dabf7`
- Painel: item com `.active` class — background `rgba(77, 171, 247, 0.08)`, border `rgba(77, 171, 247, 0.20)`, valor em `#4dabf7`

## Container SVG — Fundo Suavizado

O wrapper do SVG tem um fundo que faz transição suave do dark theme para o "papel" do sketch:

```css
.product-spec-svg-wrap {
  background: radial-gradient(ellipse at center, #f5f0eb 0%, #e8e0d8 60%, #2e2e2e 100%);
  /* Ou alternativa com vinheta mais sutil */
  border-radius: 8px;
  padding: 24px;
}
```

A cor exata do "papel" deve ser calibrada visualmente para combinar com as hachuras do sketch. Sugestão de range: tons de papel envelhecido (`#f5f0eb` a `#e8e0d8`) com fade para o `#2e2e2e` do surface.

## Hint

```html
<p class="product-spec-hint">Passe o mouse nas dimensões ou na ilustração</p>
```

Mobile: substituir texto por "Toque nas dimensões ou na ilustração".

## Integração nas Páginas

### `barricas.astro` — adicionar import e componente:

```astro
import ProductSpec from "../components/product/ProductSpec.astro";
import { barricaModels } from "../data/products";

<ProductSpec product={product} models={barricaModels} variant="barrica" />
```

Posição: abaixo do `ProductHero`, acima do `SpecsTable` (convivem).

### `baldes.astro` — mesmo padrão:

```astro
import ProductSpec from "../components/product/ProductSpec.astro";
import { baldeModels } from "../data/products";

<ProductSpec product={product} models={baldeModels} variant="balde" />
```

---

## Arquivos a Criar

| Arquivo | Descrição |
|---------|-----------|
| `src/components/product/ProductSpec.astro` | Container principal com abas, layout, painel e lógica JS |

## Arquivos a Modificar

| Arquivo | Mudança |
|---------|---------|
| `src/pages/barricas.astro` | Importar ProductSpec + barricaModels, inserir abaixo do hero |
| `src/pages/baldes.astro` | Importar ProductSpec + baldeModels, inserir abaixo do hero |

---

## Acceptance Criteria

- [x] Layout grid 2 colunas (desktop) e 1 coluna (mobile < 768px)
- [x] Abas de modelo funcionam — trocam valores e proporções do SVG
- [x] Labels das abas legíveis ("Barrica 14L", "Balde 3,6L")
- [x] Toggle Dimensões/Empilhamento funciona com slide lateral
- [x] Highlight bidirecional funciona: hover SVG ↔ hover painel
- [x] Mobile: tap toggle funciona (acende/apaga ao tocar)
- [x] Mobile: hint diz "Toque" em vez de "Passe o mouse"
- [x] Container SVG com fundo suavizado (vinheta/gradiente)
- [x] Painel specs com 4 itens: diâmetro, altura, capacidade, empilhamento
- [x] Componente inserido em barricas.astro e baldes.astro
- [x] SpecsTable existente permanece na página
- [x] Tailwind pro layout, scoped CSS pro SVG/interação
- [x] `astro check` sem erros
- [x] Build sem erros
- [x] Verificação visual em desktop e mobile

---

*Ticket criado em: 2026-03-25*
