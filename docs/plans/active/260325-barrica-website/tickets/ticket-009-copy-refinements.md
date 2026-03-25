<!-- Lock: Senna-f2a9 | done | 2026-03-25T21:05:00Z -->

# Ticket 009 — Refinamentos de Copy pos-Revisao Copywriting

> **Epic:** Website Fabrica de Barricas e Baldes
> **Tipo:** Enhancement/Copy
> **Dependencies:** ticket-007
> **Origem:** Revisao de copywriting sobre ticket 007

---

## Contexto

O ticket 007 aplicou psicologia de marketing a todos os textos. Uma revisao subsequente com a skill de copywriting identificou 12 pontos que precisam de calibragem — principalmente tom excessivamente agressivo pra B2B e auto-declaracoes que soam vaidosas.

---

## Mudancas

### 1. Hero CTA — `src/components/home/Hero.astro`

| Atual (007) | Novo | Motivo |
|-------------|------|--------|
| `"Receber amostra gratis"` | `"Pedir minha amostra gratis"` | Verbo ativo ("pedir") + Endowment Effect ("minha" cria posse). "Receber" e passivo. |

---

### 2. TrustBar — `src/components/home/TrustBar.astro`

| Atual (007) | Novo | Motivo |
|-------------|------|--------|
| `"Mais de 500 industrias confiam em nos:"` | `"500+ industrias ja usam nossas embalagens:"` | "Confiam em nos" e auto-elogioso. "Usam" e acao concreta e verificavel — mais credivel pra comprador B2B cetico. |

---

### 3. MetricsStrip — `src/components/home/MetricsStrip.astro`

| Metrica | Atual (007) | Novo | Motivo |
|---------|-------------|------|--------|
| Anos | `"Anos fabricando sem parar"` | `"Anos de fabricacao ininterrupta"` | Mais peso industrial, menos coloquial pra contexto de metrica. |
| Clientes | `"Industrias confiam em nos"` | `"Industrias atendidas em SP"` | Factual > auto-declaracao. Delimitacao geografica agrega contexto. |
| Prazo | `"Da fabrica ate voce"` | `"Horas da fabrica ate sua porta"` | Mantem o framing de beneficio, mas preserva contexto do numero (48h). |
| Ocorrencias | `"Defeitos no transporte"` | `"Perdas no transporte"` | "Perdas" e mais visceral que "defeitos" pro gerente de logistica. |

---

### 4. ProductCards link — `src/components/home/ProductCards.astro`

| Atual (007) | Novo | Motivo |
|-------------|------|--------|
| `"Ver specs e pedir amostra gratis →"` | `"Ver specs · Amostra gratis →"` | Mais limpo e escaneavel. Separador visual em vez de conjuncao. |

---

### 5. HowItWorks passo 3 — `src/components/home/HowItWorks.astro`

| Atual (007) | Novo | Motivo |
|-------------|------|--------|
| Passo 3 title: `"Aprovou? Producao imediata"` | `"Aprovou? A producao comeca"` | "Imediata" e promessa excessiva — producao leva 7-10 dias. "Comeca" e preciso sem exagero. |

---

### 6. FinalCTA Home — `src/components/home/FinalCTA.astro`

| Atual (007) | Novo | Motivo |
|-------------|------|--------|
| H2: `"Enquanto voce pesquisa, sua producao espera"` | `"A proxima remessa nao espera"` | Urgencia sem soar manipulativo. Foca no prazo da producao (real), nao na pessoa (pressao). Tom adequado pra B2B. |

---

### 7. CTA Final Barricas — `src/pages/barricas.astro`

| Atual (007) | Novo | Motivo |
|-------------|------|--------|
| H2: `"Cada dia sem a embalagem certa e producao parada"` | `"Teste na sua linha antes de decidir. Amostra em 48h."` | Acao clara + prazo concreto. Sem pressao excessiva que afasta gerente B2B analitico. |

---

### 8. CTA Final Baldes — `src/pages/baldes.astro`

| Atual (007) | Novo | Motivo |
|-------------|------|--------|
| H2: `"Cada balde que vaza e cliente que voce perde"` | `"Vedacao total ou amostra gratis. A escolha e sua."` | Risk reversal + agency. O visitante sente controle, nao pressao. Tom B2B adequado. |

---

### 9. Barricas Hero title — `src/pages/barricas.astro`

| Atual (007) | Novo | Motivo |
|-------------|------|--------|
| `"Barricas de Papelao que Aguentam o Peso da Sua Producao"` | `"Barricas de Papelao de 20 a 200L. Aguentam o peso da sua producao."` | Hibrido: keywords (20 a 200L) + personalidade. Visitante vindo do Google confirma range instantaneamente. |

---

### 10. Footer descriptor — `src/components/layout/Footer.astro`

Adicionar " — Embalagens Industriais" apos `{company.name}` no titulo do footer, pra compensar a mudanca de "Fabrica de Barricas e Baldes" → "King Pack". O nome proprio precisa de um descriptor pra SEO e reconhecimento.

| Atual (007) | Novo |
|-------------|------|
| `{company.name}` (renderiza "King Pack") | `King Pack — Embalagens Industriais` |

---

## Acceptance Criteria

- [x] 10 ajustes de texto aplicados conforme tabelas
- [x] Nenhum texto com pressao excessiva ("cada dia sem...", "cada balde que vaza...")
- [x] Nenhuma auto-declaracao ("confiam em nos") em posicoes de metrica/trust
- [x] CTA com verbo ativo na primeira pessoa ("Pedir minha...")
- [x] Footer com descriptor apos King Pack
- [x] `astro check` sem erros
- [x] Build sem erros

---

*Ticket criado em: 2026-03-25*
*Origem: Revisao de copywriting sobre ticket 007*
