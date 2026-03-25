# Guia Visual — Identidade "Grafite Técnico"

## Site de Barricas de Papelão e Baldes Plásticos Industriais

> **Stack:** Astro + Tailwind CSS
> **Identidade:** Grafite Técnico — escuro, preciso, industrial sem ser pesado
> **Referência de design:** fourjaw.com
> **Domínio:** barricasindustriais.com (Vercel)

---

## 1. Filosofia visual

Três princípios inegociáveis:

**Escuro com propósito.** O fundo grafite não é estética — é posicionamento. Transmite seriedade técnica e diferencia a empresa da maioria dos concorrentes que usa fundos brancos genéricos.

**Azul como sinal, não como decoração.** O acento `#4dabf7` aparece exclusivamente em elementos que pedem ação ou destacam informação crítica. Nunca como cor decorativa de fundo.

**Tipografia que carrega peso.** Space Grotesk nos títulos cria identidade própria. Inter no corpo garante legibilidade em specs técnicas longas.

---

## 2. Paleta de cores

### Cores base

| Token | Hex | Uso |
|-------|-----|-----|
| `bg` | `#242424` | Fundo principal da página |
| `bg-deep` | `#1a1a1a` | Hero, rodapé, header — ancora topo e base |
| `surface` | `#2e2e2e` | Cards, painéis, seções alternadas |
| `surface-2` | `#3a3a3a` | Hover de cards, fundo de imagem em card |
| `border-subtle` | `#3d3d3d` | Bordas de cards, divisores, separadores |

### Texto

| Token | Hex | Uso |
|-------|-----|-----|
| `text-primary` | `#f0f0f0` | Títulos, texto principal |
| `text-muted` | `#888888` | Subtextos, descrições, labels secundários |
| `text-accent` | `#4dabf7` | Links, eyebrows, números de destaque |

### Acento

| Token | Hex / Valor | Uso |
|-------|-------------|-----|
| `accent` | `#4dabf7` | CTA primário, links, destaques |
| `accent-hover` | `#1a8fd1` | Hover do botão primário |
| `accent-bg` | `rgba(77, 171, 247, 0.10)` | Fundo de badges/tags de setor |
| `accent-border` | `rgba(77, 171, 247, 0.20)` | Borda de badges/tags de setor |

### Alternância de seções (ritmo da página)

```text
Header/Hero  →  #1a1a1a  (mais escuro — ancora o topo)
Seção A      →  #242424  (fundo padrão da página)
Seção B      →  #2e2e2e  (surface — levemente mais claro)
Seção A      →  #242424
Seção B      →  #2e2e2e
...
Rodapé       →  #1a1a1a  (mais escuro — ancora a base)
```

---

## 3. Tipografia

### Famílias

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&display=swap');

--font-heading: 'Space Grotesk', system-ui, sans-serif;
--font-body:    'Inter', system-ui, sans-serif;
```

- **Space Grotesk** — exclusivamente para títulos (h1-h4), logo, CTA primário e números de métrica
- **Inter** — corpo de texto, descrições, labels, nav links, footer

### Escala tipográfica

| Token | rem | px | Uso típico |
|-------|-----|-----|-----------|
| `text-xs` | `0.6875` | 11 | Labels uppercase, eyebrows, badges |
| `text-sm` | `0.75` | 12 | Corpo secundário, descrições de card |
| `text-base` | `1.0` | 16 | Corpo principal |
| `text-lg` | `1.125` | 18 | Subtítulos de seção |
| `text-xl` | `1.375` | 22 | Números de métrica, h3 |
| `text-2xl` | `1.5` | 24 | h2 compacto |
| `text-3xl` | `1.875` | 30 | h2 padrão |
| `text-4xl` | `2.25` | 36 | h1 de seção |
| `text-hero` | `clamp(2.25rem, 5vw, 3.75rem)` | 36-60 | H1 do hero, responsivo |

### Letter spacing

| Token | Valor | Onde usar |
|-------|-------|----------|
| `tracking-tight` | `-0.02em` | H1 hero |
| `tracking-snug` | `-0.01em` | H2, h3, logo no header |
| `tracking-normal` | `0` | Corpo de texto |
| `tracking-wide` | `0.05em` | Labels uppercase, eyebrows |
| `tracking-wider` | `0.08em` | Footer column labels, badges |
| `tracking-widest` | `0.10em` | Hero eyebrow ("FABRICANTE INDUSTRIAL") |

### Pesos por contexto

| Contexto | Família | Peso |
|----------|---------|------|
| H1 hero | Space Grotesk | 700 |
| H2 de seção | Space Grotesk | 600 |
| H3, nome de produto | Space Grotesk | 600 |
| Logo no header | Space Grotesk | 600 |
| CTA primário | Space Grotesk | 600 |
| Número de métrica | Space Grotesk | 700 |
| Corpo, descrições | Inter | 400 |
| Nav links, labels, badges | Inter | 500 |
| Footer column labels (uppercase) | Inter | 500 |

---

## 4. Espaçamento

Base 8px. Todos os valores são múltiplos de 4.

| Token | px | Uso típico |
|-------|-----|-----------|
| `space-1` | 4 | Gap entre badge e texto, micro-ajustes |
| `space-2` | 8 | Gap interno de badge, gap entre ícone e label |
| `space-3` | 12 | Gap entre botões, padding de badge |
| `space-4` | 16 | Padding interno de card (horizontal) |
| `space-5` | 20 | Gap entre nav links |
| `space-6` | 24 | Padding lateral da página (mobile/padrão) |
| `space-8` | 32 | Gap entre colunas de grid, padding de footer |
| `space-10` | 40 | Margin-top das métricas no hero |
| `space-12` | 48 | Padding vertical de seções médias |
| `space-16` | 64 | Padding vertical de seções grandes |
| `space-20` | 80 | Padding vertical do hero |
| `space-24` | 96 | Padding vertical hero em desktop |

---

## 5. Bordas e raios

```css
--radius-sm:  3px;   /* badges, tags, botões pequenos */
--radius-md:  6px;   /* inputs, botões padrão         */
--radius-lg:  8px;   /* cards de produto              */

--border-default: 0.5px solid #3d3d3d;
```

---

## 6. Tailwind Config

```js
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg':           '#242424',
        'bg-deep':      '#1a1a1a',
        'surface':      '#2e2e2e',
        'surface-2':    '#3a3a3a',
        'border-subtle':'#3d3d3d',
        'accent':       '#4dabf7',
        'accent-hover': '#1a8fd1',
        'text-primary': '#f0f0f0',
        'text-muted':   '#888888',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs':   ['0.6875rem', { lineHeight: '1.4' }],
        'sm':   ['0.75rem',   { lineHeight: '1.5' }],
        'base': ['1rem',      { lineHeight: '1.6' }],
        'lg':   ['1.125rem',  { lineHeight: '1.5' }],
        'xl':   ['1.375rem',  { lineHeight: '1.3' }],
        '2xl':  ['1.5rem',    { lineHeight: '1.3' }],
        '3xl':  ['1.875rem',  { lineHeight: '1.2' }],
        '4xl':  ['2.25rem',   { lineHeight: '1.1' }],
      },
      letterSpacing: {
        tight:   '-0.02em',
        snug:    '-0.01em',
        wide:    '0.05em',
        wider:   '0.08em',
        widest:  '0.10em',
      },
      borderRadius: {
        sm: '3px',
        md: '6px',
        lg: '8px',
      },
      maxWidth: {
        content: '1200px',
        text:    '680px',
      },
      spacing: {
        '18': '72px',
        '22': '88px',
      },
    },
  },
}
```

---

## 7. Regras de uso

| Errado | Correto |
|--------|---------|
| Usar `#4dabf7` como cor de fundo de seção | Usar acento apenas em texto, botão e badge |
| Gradientes em qualquer elemento | Fundos sólidos sempre |
| Mais de 4 campos no formulário | Máximo 4 campos |
| Texto `#888888` sobre fundo `#2e2e2e` em < 12px | Usar `#f0f0f0` para texto pequeno importante |
| Space Grotesk no corpo de texto | Space Grotesk só em títulos, logo e CTA |
| Superlativo sem evidência | Dado concreto ("15 anos", "200L", "0 ocorrências") |
| `box-shadow` decorativo | Zero shadow — profundidade via cor de fundo |
| CTA escondido no rodapé | CTA visível em toda página (header sticky) |

---

## 8. Checklist de acessibilidade

- Contraste `#f0f0f0` sobre `#242424` — ratio 12.6:1 (WCAG AAA)
- Contraste `#888888` sobre `#242424` — ratio 4.5:1 (WCAG AA)
- Contraste `#4dabf7` sobre `#1a1a1a` — ratio 6.2:1 (WCAG AA)
- Fonte mínima: 11px (labels uppercase). Corpo sempre >= 14px
- Focus ring visível: `outline: 2px solid #4dabf7`
- Atributo `alt` em todas as imagens de produto
- `<h1>` único por página
- Estrutura semântica: `<header>`, `<main>`, `<footer>`, `<section>`, `<article>`

---

*Identidade: "Grafite Técnico" — Space Grotesk + Inter + #4dabf7 sobre grafite.*
