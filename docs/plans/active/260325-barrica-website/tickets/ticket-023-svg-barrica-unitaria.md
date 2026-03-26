<!-- Lock: | pending | -->

# Ticket 023 — SVG Barrica: Desenho Técnico Unitário com Cotas

> **Epic:** Website Fábrica de Barricas e Baldes
> **Tipo:** Feature/Component
> **Dependencies:** ticket-022

---

## Escopo

### O que este ticket FAZ

- Criar `src/components/product/ProductSpecBarrica.astro` — SVG da barrica unitária com cotas interativas
- Estilo visual: desenho técnico sketch com hachuras (referência: imagens do challenge-me)
- Geometria: cilindro reto (boca = fundo), tampa plástica topo e fundo iguais, sem aros, sem aduelas
- Cotas interativas: diâmetro, altura, capacidade
- Zonas de hover invisíveis sobre cada região do SVG
- Aceita props `diameter` e `height` para calcular proporções dinamicamente

### O que este ticket NÃO faz

- Não cria o SVG de empilhamento (ticket-024)
- Não cria o componente wrapper/container (ticket-025)
- Não implementa a lógica de highlight JS (ticket-025)
- Não implementa animação draw-on (ticket-027)

---

## Spec References

- Decisão challenge-me: cilindro reto, sem barriga, sem aros, sem aduelas
- Decisão challenge-me: espessura da parede FORA do painel
- Decisão challenge-me: estilo sketch com hachuras
- Referência visual: imagens fornecidas no challenge-me (barrica = segunda imagem)

---

## Geometria da Barrica

**Forma:** Cilindro reto, vista frontal com perspectiva isométrica leve.

- Topo e base como elipses achatadas (mesmo raio — boca = fundo)
- Laterais retas (sem curvatura convexa)
- Tampa plástica no topo com bocal central pequeno
- Fundo plástico com borda/aro na base
- Junção tampa/corpo e fundo/corpo com leve reforço visual

**Props do componente:**

```typescript
interface Props {
  diameter: number;  // mm — usado para calcular RX
  height: number;    // mm — usado para calcular altura proporcional
}
```

**Cálculo de proporções:**

```
viewBox: "0 0 340 420" (margem para cotas)
Largura útil corpo: 230px
ESCALA = 230 / diameter (px/mm)
RX = diameter × ESCALA / 2
ALTURA_SVG = height × ESCALA (max 300px)
RY_PERSPECTIVA = RX × 0.25
```

## Estilo Visual

Sketch técnico com:
- Hachuras cruzadas (cross-hatching) sutis no corpo para sugerir volume
- Linhas de construção finas nos cantos
- Traço principal do contorno em `stroke-width: 1.5`
- Hachuras em `stroke-width: 0.3`, cor `#2a2a2a`
- Fundo do SVG container: transição suave (vinheta) para integrar com o dark theme do site

## Cotas (Linhas de Dimensão)

Cada cota tem: linha de extensão tracejada + linha de cota com setas + texto com valor.

| Cota | Posição | Formato texto |
|------|---------|---------------|
| Diâmetro | Acima do SVG (y ≈ 36) | "Ø {diameter} mm" |
| Altura | Lado esquerdo (x ≈ 42), vertical | "{height} mm" (rotacionado -90°) |

**IDs dos elementos SVG** (para highlight no ticket-025):

- `barrel-top` — elipse topo
- `barrel-bot` — elipse fundo
- `barrel-left` — lateral esquerda
- `barrel-right` — lateral direita
- `cota-diametro-linha`, `cota-diametro-ext-esq`, `cota-diametro-ext-dir`, `cota-diametro-texto`
- `cota-altura-linha`, `cota-altura-ext-top`, `cota-altura-ext-bot`, `cota-altura-texto`

**Marcadores de seta:**

```xml
<defs>
  <marker id="seta-fim" viewBox="0 0 8 8" refX="7" refY="4"
    markerWidth="5" markerHeight="5" orient="auto">
    <path d="M1 1L7 4L1 7" fill="none"
      stroke="context-stroke" stroke-width="1.2"
      stroke-linecap="round" stroke-linejoin="round"/>
  </marker>
  <marker id="seta-inicio" viewBox="0 0 8 8" refX="1" refY="4"
    markerWidth="5" markerHeight="5" orient="auto">
    <path d="M7 1L1 4L7 7" fill="none"
      stroke="context-stroke" stroke-width="1.2"
      stroke-linecap="round" stroke-linejoin="round"/>
  </marker>
</defs>
```

## Zonas de Hover Invisíveis

```xml
<!-- Zona: topo/tampa — data-spec="diametro" -->
<ellipse class="zona-hover" data-spec="diametro" ... fill="transparent" cursor="crosshair"/>

<!-- Zona: altura (faixa lateral esquerda) — data-spec="altura" -->
<rect class="zona-hover" data-spec="altura" ... fill="transparent" cursor="crosshair"/>
```

## CSS (Scoped no componente)

Estilos do SVG em `<style>` scoped dentro do `.astro`:
- `.barrel-body` — fill e stroke do corpo
- `.cota-linha`, `.cota-tracejada`, `.cota-texto` — estados inativo e ativo (`.hl`)
- `.barrel-hatch` — hachuras decorativas
- `.zona-hover` — transparente, cursor crosshair

## Acessibilidade

```html
<svg role="img" aria-labelledby="barrica-svg-title" width="100%" viewBox="0 0 340 420">
  <title id="barrica-svg-title">
    Desenho técnico da Barrica de Papelão — diâmetro {diameter}mm, altura {height}mm
  </title>
</svg>
```

---

## Arquivos a Criar

| Arquivo | Descrição |
|---------|-----------|
| `src/components/product/ProductSpecBarrica.astro` | SVG da barrica unitária com cotas |

---

## Acceptance Criteria

- [ ] SVG renderiza cilindro reto com perspectiva isométrica leve
- [ ] Proporções calculadas dinamicamente a partir de `diameter` e `height` props
- [ ] Cotas de diâmetro e altura posicionadas corretamente
- [ ] Estilo sketch com hachuras visível
- [ ] Zonas de hover presentes com `data-spec` corretos
- [ ] IDs dos elementos SVG seguem convenção para highlight
- [ ] `role="img"` e `<title>` presentes
- [ ] CSS scoped no componente (não global)
- [ ] `astro check` sem erros
- [ ] Build sem erros

---

*Ticket criado em: 2026-03-25*
