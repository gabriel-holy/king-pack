<!-- Lock: Urgot-6a2c | done | 2026-03-26T12:30:00Z -->

# Ticket 027 — Animação Draw-On + Reduced Motion

> **Epic:** Website Fábrica de Barricas e Baldes
> **Tipo:** Enhancement/UX
> **Dependencies:** ticket-023, ticket-025, ticket-026

---

## Escopo

### O que este ticket FAZ

- Implementar animação draw-on (stroke-dasharray/dashoffset) nos SVGs unitários da barrica e do balde
- Ativar via IntersectionObserver quando o componente entra na viewport
- Implementar fallback `prefers-reduced-motion: reduce` → fade-in simples (opacity 0→1)
- One-shot: anima apenas na primeira vez que entra na viewport

### O que este ticket NÃO faz

- Não altera a geometria dos SVGs
- Não altera a lógica de highlight ou abas
- Não afeta os SVGs de empilhamento (esses não têm draw-on)

---

## Spec References

- Decisão challenge-me: draw-on com stroke-dasharray + dashoffset
- Decisão challenge-me: `prefers-reduced-motion` → fade-in simples (opacity 0→1), sem stroke animation
- Padrão existente: `global.css` já trata reduced-motion em todos os efeitos (fade-up, text-reveal, card-lift)

---

## Animação Draw-On

### CSS

```css
@keyframes draw-line {
  to { stroke-dashoffset: 0; }
}

.draw-on {
  stroke-dasharray: var(--dash-length, 1000);
  stroke-dashoffset: var(--dash-length, 1000);
  animation: draw-line 0.8s ease forwards;
}
```

### Delays em Cascata

Cada elemento do SVG recebe `data-draw` e um `--dash-length` customizado. Os delays criam efeito de "mão desenhando":

**Barrica:**

| Elemento | Delay | --dash-length (estimar via `getTotalLength()`) |
|----------|-------|----------------------------------------------|
| Elipse topo | 0.0s | ~520 |
| Lateral esquerda | 0.3s | ~340 |
| Lateral direita | 0.3s | ~340 |
| Elipse fundo | 0.6s | ~540 |
| Hachuras (grupo) | 0.9s | ~200 |

**Balde:**

| Elemento | Delay | --dash-length |
|----------|-------|---------------|
| Elipse topo / tampa | 0.0s | ~520 |
| Lateral esquerda | 0.3s | ~300 |
| Lateral direita | 0.3s | ~300 |
| Elipse fundo | 0.6s | ~520 |
| Alça | 0.8s | ~250 |
| Hachuras (grupo) | 1.0s | ~200 |

**Nota:** Os valores de `--dash-length` são estimativas. Na implementação, usar `element.getTotalLength()` para calcular o valor exato de cada path/ellipse e setar via JS.

### Trigger via IntersectionObserver

```javascript
const svgSection = document.querySelector('.product-spec-svg-wrap');
const drawElements = svgSection.querySelectorAll('[data-draw]');

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    // Calcular dash-length real
    drawElements.forEach(el => {
      if (el instanceof SVGGeometryElement) {
        const len = el.getTotalLength();
        el.style.setProperty('--dash-length', String(len));
      }
      el.classList.add('draw-on');
    });
    observer.disconnect();
  }
}, { threshold: 0.3 });

observer.observe(svgSection);
```

### Reduced Motion — Fade-In Simples

```css
@media (prefers-reduced-motion: reduce) {
  .draw-on {
    stroke-dasharray: none;
    stroke-dashoffset: 0;
    animation: none;
  }

  .product-spec-svg-wrap svg {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .product-spec-svg-wrap svg.visible {
    opacity: 1;
  }
}
```

Com reduced-motion, o IntersectionObserver adiciona classe `.visible` no SVG em vez de `.draw-on` nos elementos individuais.

### Interação com Troca de Abas

Quando o usuário troca de aba (modelo), a animação **NÃO re-executa**. O SVG do novo modelo aparece imediatamente sem draw-on. A animação é one-shot por sessão de visualização da seção.

### Interação com Toggle Dimensões/Empilhamento

SVGs de empilhamento **NÃO têm draw-on**. Aparecem imediatamente com slide lateral. Ao voltar pro SVG unitário (que já animou), ele também aparece sem re-animar.

---

## Arquivos a Modificar

| Arquivo | Mudança |
|---------|---------|
| `src/components/product/ProductSpecBarrica.astro` | Adicionar `data-draw` nos elementos animáveis |
| `src/components/product/ProductSpecBalde.astro` | Adicionar `data-draw` nos elementos animáveis |
| `src/components/product/ProductSpec.astro` | Adicionar IntersectionObserver + lógica draw-on/reduced-motion no `<script>` |

---

## Acceptance Criteria

- [x] Animação draw-on executa ao entrar na viewport pela primeira vez
- [x] Efeito em cascata com delays visíveis (topo → laterais → fundo → detalhes)
- [x] `--dash-length` calculado via `getTotalLength()` (não hardcoded)
- [x] `prefers-reduced-motion: reduce` → fade-in simples, sem stroke animation
- [x] Troca de aba NÃO re-executa draw-on
- [x] Toggle empilhamento NÃO tem draw-on (aparece imediatamente)
- [x] One-shot: não re-anima ao sair e voltar pra viewport
- [x] Consistente com padrão de reduced-motion do `global.css`
- [x] `astro check` sem erros
- [x] Build sem erros

---

*Ticket criado em: 2026-03-25*
