<!-- Lock: Renata-8c3f | done | 2026-03-25T00:00:00Z -->

# Ticket 026 — SVG Balde: Desenho Técnico Unitário com Cotas

> **Epic:** Website Fábrica de Barricas e Baldes
> **Tipo:** Feature/Component
> **Dependencies:** ticket-022

---

## Escopo

### O que este ticket FAZ

- Criar `src/components/product/ProductSpecBalde.astro` — SVG do balde unitário com cotas interativas
- Estilo visual: desenho técnico sketch com hachuras (mesmo padrão da barrica, ticket-023)
- Geometria: cilindro reto (simplificado, boca ≈ base), tampa de encaixe com aba, alça metálica em arco
- Cotas interativas: diâmetro, altura
- Zonas de hover invisíveis sobre cada região do SVG
- Aceita props `diameter` e `height` para calcular proporções dinamicamente

### O que este ticket NÃO faz

- Não cria o SVG de empilhamento (ticket-024)
- Não cria o componente wrapper (ticket-025)
- Não implementa a lógica de highlight JS (ticket-025)
- Não implementa animação draw-on (ticket-027)

---

## Spec References

- Decisão challenge-me: cilindro reto (simplificado, levemente cônico na realidade mas tratado como reto)
- Decisão challenge-me: tem tampa de encaixe com aba de vedação
- Decisão challenge-me: tem alça metálica em arco
- Decisão challenge-me: estilo sketch com hachuras
- Referência visual: imagens fornecidas no challenge-me (balde = primeira imagem)

---

## Geometria do Balde

**Forma:** Cilindro reto (simplificado), vista frontal com perspectiva isométrica leve.

- Topo e base como elipses achatadas (mesmo raio — simplificado)
- Laterais retas
- Tampa de encaixe: aba saliente no topo com borda reforçada (lip)
- Alça metálica: arco semicircular preso nas laterais superiores, posição levantada (em repouso)
- Borda reforçada no topo (lip/aba onde a alça prende)

**Props do componente:**

```typescript
interface Props {
  diameter: number;  // mm
  height: number;    // mm
}
```

**Cálculo de proporções:** Mesmo padrão da barrica (ticket-023).

```
viewBox: "0 0 340 460" (mais alto que barrica para caber a alça)
Largura útil corpo: 230px
ESCALA = 230 / diameter (px/mm)
RX = diameter × ESCALA / 2
ALTURA_CORPO_SVG = height × ESCALA (max 280px)
RY_PERSPECTIVA = RX × 0.25
ALTURA_ALCA = ~60px acima do corpo (proporcional)
```

## Elementos do Balde

1. **Corpo:** cilindro reto com hachuras
2. **Tampa:** elipse topo com aba saliente (2-3px mais larga que o corpo) — indica encaixe
3. **Alça:** arco (path com curva quadrática ou cúbica) de um lado ao outro da borda superior
   - Ponto de fixação: lateral esquerda e direita na altura da borda do topo
   - Pico do arco: ~60px acima da borda do topo
   - Stroke mais grosso que o corpo (~2px) para indicar metal
4. **Fundo:** elipse inferior com leve borda
5. **Borda reforçada (lip):** anel/faixa na junção tampa-corpo, ~4px de altura

## Estilo Visual

Idêntico ao da barrica (ticket-023):
- Hachuras cruzadas sutis no corpo
- Linhas de construção finas nos cantos
- Traço principal `stroke-width: 1.5`
- Hachuras `stroke-width: 0.3`, cor `#2a2a2a`
- Alça: stroke `#3a3a3a`, `stroke-width: 2`

## Cotas (Linhas de Dimensão)

| Cota | Posição | Formato texto |
|------|---------|---------------|
| Diâmetro | Acima do SVG (acima da alça, y ≈ 20) | "Ø {diameter} mm" |
| Altura | Lado esquerdo (x ≈ 42), vertical — do topo do corpo ao fundo (sem alça) | "{height} mm" |

**IDs dos elementos SVG** (para highlight no ticket-025):

- `bucket-top` — elipse topo / tampa
- `bucket-bot` — elipse fundo
- `bucket-left` — lateral esquerda
- `bucket-right` — lateral direita
- `bucket-handle` — alça
- `bucket-lip` — borda reforçada
- `cota-diametro-linha`, `cota-diametro-ext-esq`, `cota-diametro-ext-dir`, `cota-diametro-texto`
- `cota-altura-linha`, `cota-altura-ext-top`, `cota-altura-ext-bot`, `cota-altura-texto`

## Zonas de Hover Invisíveis

```xml
<!-- Zona: topo/tampa — data-spec="diametro" -->
<ellipse class="zona-hover" data-spec="diametro" ... fill="transparent" cursor="crosshair"/>

<!-- Zona: altura (faixa lateral) — data-spec="altura" -->
<rect class="zona-hover" data-spec="altura" ... fill="transparent" cursor="crosshair"/>
```

## Acessibilidade

```html
<svg role="img" aria-labelledby="balde-svg-title" width="100%" viewBox="0 0 340 460">
  <title id="balde-svg-title">
    Desenho técnico do Balde Plástico — diâmetro {diameter}mm, altura {height}mm
  </title>
</svg>
```

---

## Arquivos a Criar

| Arquivo | Descrição |
|---------|-----------|
| `src/components/product/ProductSpecBalde.astro` | SVG do balde unitário com cotas |

---

## Acceptance Criteria

- [x] SVG renderiza cilindro reto com perspectiva isométrica leve
- [x] Alça metálica em arco visível e proporcional
- [x] Tampa com aba de encaixe visível (lip)
- [x] Proporções calculadas dinamicamente a partir de `diameter` e `height` props
- [x] Cotas de diâmetro e altura posicionadas corretamente
- [x] Cota de altura mede corpo (sem alça)
- [x] Estilo sketch com hachuras consistente com barrica (ticket-023)
- [x] Zonas de hover presentes com `data-spec` corretos
- [x] IDs dos elementos SVG seguem convenção para highlight
- [x] `role="img"` e `<title>` presentes
- [x] CSS scoped no componente
- [x] `astro check` sem erros
- [x] Build sem erros

---

*Ticket criado em: 2026-03-25*
