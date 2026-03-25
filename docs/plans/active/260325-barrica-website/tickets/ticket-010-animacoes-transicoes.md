<!-- Lock: Warwick-c9d2 | done | 2026-03-25T22:10:00Z -->

# Ticket 010 — Animacoes e Transicoes (CSS + Vanilla JS)

> **Epic:** Website Fabrica de Barricas e Baldes
> **Tipo:** Enhancement/UX
> **Dependencies:** ticket-002, ticket-003, ticket-004, ticket-005

---

## Escopo

### O que este ticket FAZ

Implementa 10 efeitos de transicao e animacao no site Astro + Tailwind CSS usando exclusivamente CSS nativo e Vanilla JS. Zero dependencias externas (sem GSAP, Framer Motion, AOS, etc).

### O que este ticket NAO faz

- Nao altera conteudo, copy ou estrutura de paginas
- Nao adiciona bibliotecas de animacao
- Nao modifica dados ou specs tecnicas

---

## Requisitos Gerais (INVIOLAVEIS)

1. **`prefers-reduced-motion: reduce`** — TODOS os 10 efeitos DEVEM ser desativados quando ativo. Sem excecao.
2. **Zero dependencias** — tudo em CSS nativo + Vanilla JS em `<script>` inline dos componentes Astro
3. **Encapsulamento** — cada efeito no seu proprio componente ou utilitario, sem poluir escopo global
4. **`will-change: transform`** — somente nos elementos que realmente animam, remover apos animacao completar
5. **Somente `transform` e `opacity`** — NUNCA animar `width`, `height`, `top`, `left` ou `margin` (CLS killer)
6. **Performance mobile** — efeitos pesados (parallax) desativados em mobile (< 768px)

### Cuidados de SEO

- **Fade up (efeitos 1 e 2):** usar `opacity: 0` — NUNCA `display: none` ou `visibility: hidden`. Googlebot indexa `opacity: 0` normalmente mas trata `display: none` como conteudo oculto.
- **Page transitions (efeito 9):** a implementacao do Astro ViewTransitions e segura — mantem URLs reais e carregamentos completos. NAO implementar roteamento SPA client-side customizado.
- **Core Web Vitals:** animar apenas `transform` e `opacity` protege CLS. Parallax com rAF desativado em mobile protege INP. Zero libs externas protege LCP.

---

## Efeito 1 — Fade Up ao Entrar na Viewport

### Arquivo a criar: `src/utils/fadeUp.ts`

Utilitario reutilizavel com IntersectionObserver. Qualquer elemento com `data-fade-up` entra com fade + translate.

**Atributos:**
- `data-fade-up` — ativa o efeito
- `data-fade-delay="200"` — delay opcional em ms

**CSS base (adicionar ao global ou ao utilitario):**
```css
[data-fade-up] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
[data-fade-up].visible {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  [data-fade-up] {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

**Comportamento:**
- Observer com `threshold: 0.15` e `rootMargin: '0px 0px -50px 0px'`
- Ao intersectar, aplicar delay via `transitionDelay` se `data-fade-delay` presente
- Adicionar classe `.visible`
- `unobserve` apos a primeira vez (one-shot)
- Aplicar `will-change: transform, opacity` antes da animacao, remover no `transitionend`

Chamar o utilitario via `<script>` nas paginas que usarem.

---

## Efeito 2 — Stagger (Entrada em Cascata para Grids)

**Atributo:** `data-stagger-parent` no container

**Comportamento:**
- Detectar todos os filhos diretos com `data-fade-up`
- Aplicar delay incremental de 80ms por filho
- **Delay maximo: 400ms** — cap independente de quantos filhos houver (`Math.min(index * 80, 400)`)
- Funciona em conjunto com o utilitario fadeUp do efeito 1

**Onde aplicar:**
- Grid de metricas (MetricsStrip)
- Grid de cards de produto (ProductCards)
- Grid de passos "Como Funciona" (HowItWorks)
- Grid de aplicacoes por setor (ApplicationCards)

---

## Efeito 3 — Contador Animado (Count-Up)

### Arquivo a criar: `src/components/shared/CountUp.astro`

**Props:**
```typescript
interface Props {
  value: number;       // valor final
  suffix?: string;     // sufixo opcional ("+", "L", " dias")
  duration?: number;   // duracao em ms (default: 1200)
}
```

**Comportamento:**
- Inicia quando o elemento entrar na viewport (IntersectionObserver)
- Conta de 0 ate `value` com easing ease-out
- `font-variant-numeric: tabular-nums` — OBRIGATORIO para evitar layout shift durante contagem
- One-shot (nao re-anima ao sair e voltar)
- Com `prefers-reduced-motion: reduce`, mostrar valor final imediatamente sem animacao

**Onde aplicar:**
- MetricsStrip — substituir os valores estaticos pelo componente CountUp

---

## Efeito 4 — Text Reveal com Clip-Path

**Classe CSS:** `.text-reveal`

```css
.text-reveal {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 0.65s cubic-bezier(0.77, 0, 0.18, 1);
}
.text-reveal.revealed {
  clip-path: inset(0 0% 0 0);
}
@media (prefers-reduced-motion: reduce) {
  .text-reveal {
    clip-path: none;
    transition: none;
  }
}
```

**Atributo:** `data-reveal-delay="200"` para escalonar multiplas linhas

**Trigger:** IntersectionObserver, one-shot

**Onde aplicar:**
- H1 do hero da homepage
- H1 do hero das paginas de produto (/barricas, /baldes)

---

## Efeito 5 — Parallax no Hero

**Arquivo a modificar:** `src/components/home/Hero.astro` (ou `src/components/product/ProductHero.astro`)

**Comportamento:**
- Aplica SOMENTE no elemento de imagem/background do hero
- `requestAnimationFrame` com `window.scrollY`
- Background move a 40% da velocidade de scroll (`transform: translateY(scrollY * 0.4)`)
- **Desativar completamente em:**
  - Mobile (< 768px) — `window.matchMedia('(max-width: 767px)')`
  - `prefers-reduced-motion: reduce`
- Usar flag de `ticking` para debounce do rAF (evitar multiplas chamadas)

**Performance:**
- `will-change: transform` no elemento de background enquanto scroll ativo
- Remover `will-change` apos 150ms de inatividade de scroll

---

## Efeito 6 — Card Hover Lift + Border Accent

**CSS puro, nenhum JavaScript necessario.**

```css
.card-lift {
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.card-lift:hover {
  transform: translateY(-4px);
  border-color: #4dabf7;
}
@media (prefers-reduced-motion: reduce) {
  .card-lift {
    transition: none;
  }
  .card-lift:hover {
    transform: none;
  }
}
```

**Onde aplicar (adicionar classe `card-lift`):**
- Cards de produto em ProductCards.astro
- Cards de aplicacao em ApplicationCards.astro
- Cards de objecao em ObjectionEliminator.astro

---

## Efeito 7 — Active Nav Highlight com IntersectionObserver

**Arquivo a modificar:** `src/components/layout/Header.astro`

**Comportamento:**
- IntersectionObserver observa todas as `<section>` com `id` correspondente ao `href` dos links de nav
- Ao intersectar, adiciona `.nav-active` ao link correspondente
- `threshold: 0.3` (secao precisa ter 30% visivel)

**CSS:**
```css
.nav-active {
  color: #4dabf7;
  border-bottom: 2px solid #4dabf7;
}
```

**Pre-requisito:** Cada `<section>` no site precisa ter um `id` correspondente. Ex:
- `<section id="produtos">` → link `href="#produtos"`
- Para paginas diferentes (/barricas, /baldes), o highlight segue a rota ativa

**Nota:** Funciona para scroll na mesma pagina (homepage). Para nav entre paginas, usar `Astro.url.pathname` para marcar o link ativo no server-side.

---

## Efeito 8 — Magnetic Button no CTA Principal

### Arquivo a criar: `src/components/shared/MagneticButton.astro`

**Comportamento:**
- Envolve qualquer botao como wrapper
- Detecta `mousemove` na area de 60px ao redor do botao
- Move o botao ate 35% da distancia entre cursor e centro
- `transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)`
- Reset ao `mouseleave`

**Desativar em:**
- Touch devices: `window.matchMedia('(hover: none)')`
- `prefers-reduced-motion: reduce`

**Onde aplicar:**
- CTA primario do hero da homepage
- CTA primario do hero das paginas de produto
- CTA do FinalCTA

---

## Efeito 9 — Page Transitions (View Transitions API)

**Arquivo a modificar:** `astro.config.mjs`
```js
experimental: { viewTransitions: true }
```

**Arquivo a modificar:** `src/layouts/BaseLayout.astro`
- Adicionar `<ViewTransitions />` do Astro no `<head>`

**CSS para animacao customizada:**
```css
::view-transition-old(root) {
  animation: 350ms ease both fade-out-up;
}
::view-transition-new(root) {
  animation: 350ms ease both fade-in-up;
}
@keyframes fade-out-up {
  to { opacity: 0; transform: translateY(-12px); }
}
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(12px); }
}
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
  }
}
```

**Cuidado SEO:** A implementacao Astro ViewTransitions mantem URLs reais e carregamento completo — segura pra Googlebot. NAO implementar roteamento SPA customizado.

---

## Efeito 10 — Scroll Progress Bar

**Arquivo a modificar:** `src/layouts/BaseLayout.astro`

Adicionar `<div id="scroll-progress">` fixada no topo.

**CSS (progressive enhancement):**
```css
#scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #4dabf7;
  transform-origin: left;
  transform: scaleX(0);
  z-index: 9999;
}

@supports (animation-timeline: scroll()) {
  #scroll-progress {
    animation: grow-bar linear;
    animation-timeline: scroll();
  }
  @keyframes grow-bar {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
}
```

**Fallback JS** para browsers sem `animation-timeline: scroll()`:
```javascript
if (!CSS.supports('animation-timeline', 'scroll()')) {
  const bar = document.getElementById('scroll-progress');
  if (bar) {
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight);
      bar.style.transform = `scaleX(${pct})`;
    }, { passive: true });
  }
}
```

**`prefers-reduced-motion`:** A barra de progresso pode permanecer ativa em reduced motion — ela reflete posicao de scroll, nao e uma animacao decorativa. Porem, ocultar se preferir uma abordagem mais conservadora.

---

## Arquivos a Criar

| Arquivo | Descricao |
|---------|-----------|
| `src/utils/fadeUp.ts` | Utilitario IntersectionObserver para fade up + stagger |
| `src/components/shared/CountUp.astro` | Contador animado com easing |
| `src/components/shared/MagneticButton.astro` | Wrapper de botao com efeito magnetico |

## Arquivos a Modificar

| Arquivo | Mudanca |
|---------|---------|
| `src/layouts/BaseLayout.astro` | ViewTransitions + scroll progress bar + CSS global dos efeitos |
| `src/components/home/Hero.astro` | Parallax + text reveal + `data-fade-up` |
| `src/components/home/MetricsStrip.astro` | CountUp + `data-stagger-parent` |
| `src/components/home/ProductCards.astro` | `card-lift` + `data-stagger-parent` |
| `src/components/home/HowItWorks.astro` | `data-stagger-parent` |
| `src/components/home/Testimonials.astro` | `data-fade-up` |
| `src/components/home/FinalCTA.astro` | MagneticButton no CTA |
| `src/components/product/ProductHero.astro` | Text reveal + parallax |
| `src/components/product/ApplicationCards.astro` | `card-lift` + `data-stagger-parent` |
| `src/components/product/ObjectionEliminator.astro` | `card-lift` |
| `src/components/layout/Header.astro` | Active nav highlight |
| `astro.config.mjs` | `experimental.viewTransitions` |

---

## Ordem de Implementacao Sugerida

1. **CSS global** — fade-up, card-lift, text-reveal, scroll-progress, view-transitions (BaseLayout)
2. **fadeUp.ts** — utilitario IntersectionObserver + stagger logic
3. **CountUp.astro** — componente de contador
4. **MagneticButton.astro** — componente de botao magnetico
5. **Aplicar nos componentes** — adicionar atributos `data-fade-up`, `data-stagger-parent`, classes `card-lift`, `text-reveal`
6. **Hero parallax** — implementar no Hero.astro e ProductHero.astro
7. **Active nav** — Header.astro
8. **ViewTransitions** — config + layout
9. **Testes visuais** — verificar em desktop e mobile
10. **Teste `prefers-reduced-motion`** — simular via DevTools e confirmar que TODOS os efeitos desativam

---

## Acceptance Criteria

- [x] Efeito 1: Elementos com `data-fade-up` animam ao entrar na viewport
- [x] Efeito 2: Grids com `data-stagger-parent` aplicam delay cascata (max 400ms)
- [x] Efeito 3: Metricas contam de 0 ate valor com easing ease-out
- [x] Efeito 3: `font-variant-numeric: tabular-nums` presente (sem layout shift)
- [x] Efeito 4: Titulos hero revelam com clip-path
- [x] Efeito 5: Parallax funciona em desktop, desativado em mobile
- [x] Efeito 6: Cards sobem 4px no hover com borda accent
- [x] Efeito 7: Nav highlight acompanha secao visivel
- [x] Efeito 8: Botao magnetico funciona em desktop, desativado em touch
- [x] Efeito 9: Transicoes de pagina com fade + translateY
- [x] Efeito 10: Barra de progresso de scroll funciona (CSS nativo ou JS fallback)
- [x] TODOS os efeitos desativados com `prefers-reduced-motion: reduce`
- [x] Zero dependencias externas de animacao
- [x] `astro check` sem erros
- [x] Build sem erros
- [x] Core Web Vitals: CLS < 0.1, nenhum layout shift causado por animacoes

---

*Ticket criado em: 2026-03-25*
