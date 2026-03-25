<!-- Lock: Mundo-e5b2 | done | 2026-03-25T18:20:00Z -->
# Ticket 013 — Auditoria de Compatibilidade: Correções de Conteúdo do Site

## Objetivo

Corrigir afirmações tecnicamente incorretas e adicionar aplicações compatíveis que o site não menciona, com base na pesquisa de compatibilidade química (fontes: INEOS HDPE Chemical Resistance Guide, Calpac Lab, Air Sea Containers, dados ABRAFATI).

---

## PARTE 1: O Que o Site Diz Que PODE, Mas NÃO PODE

### 1.1 Barricas — "Produtos Químicos" na lista de aplicações

**Onde:** `src/data/products.ts` linha 31 — `"Produtos Químicos"` na array `applications`
**Problema:** Barrica de papelão NÃO é compatível com a maioria dos produtos químicos líquidos (ácidos, bases, solventes). Papelão maculatura sem revestimento especial absorve líquidos e perde integridade. Mesmo com liner PE, não resiste a solventes ou ácidos fortes.
**Correção:** Remover "Produtos Químicos" genérico. Substituir por algo específico como "Produtos à Base de Água" ou simplesmente remover — as aplicações reais já estão cobertas (tintas, grafiato, construção civil).

### 1.2 Barricas — "Agroquímicos" na lista de aplicações

**Onde:** `src/data/products.ts` linha 32 — `"Agroquímicos"` na array `applications`
**Problema:** Agroquímicos são predominantemente líquidos e regulamentados. A Lei 9.974/2000 e o INMETRO exigem embalagens específicas (geralmente PEAD com homologação). Barrica de papelão NÃO é adequada para agroquímicos líquidos. Fibra (código UN 1G) não é usada para agroquímicos no Brasil.
**Correção:** Remover "Agroquímicos" das barricas.

### 1.3 Barricas — "Vernizes" no card de aplicação

**Onde:** `src/pages/barricas.astro` linha 22-24 — card "Tintas e Vernizes"
**Problema:** Vernizes frequentemente contêm solventes orgânicos (aguarrás, thinner). Verniz à base de solvente é INCOMPATÍVEL com papelão. Apenas vernizes à base de água seriam compatíveis.
**Correção:** Mudar de "Tintas e Vernizes" para "Tintas à Base de Água" ou "Tintas e Vernizes à Base de Água". Deixar claro que só base água.

### 1.4 Barricas — "Resistência comprovada a resinas, impermeabilizantes e aditivos alcalinos. Revestimento de alumínio para pH extremo."

**Onde:** `src/pages/barricas.astro` linha 32 — card "Construção Civil"
**Problema:** "pH extremo" e "aditivos alcalinos" sugerem que a barrica aguenta produtos químicos agressivos. Papelão com liner de alumínio tem resistência limitada — não é o mesmo que PEAD ou metal. A afirmação "pH extremo" é uma promessa exagerada.
**Correção:** Suavizar para: "Compatível com impermeabilizantes e resinas à base de água. Para produtos com pH extremo, consulte nosso técnico."

### 1.5 Barricas — Hero diz "químicos e agroquímicos"

**Onde:** `src/pages/barricas.astro` linha 120 — description do ProductHero
**Problema:** Mesmo problema dos itens 1.1 e 1.2 — barrica de papelão NÃO é para químicos genéricos nem agroquímicos.
**Correção:** Trocar "tintas, químicos e agroquímicos" por "tintas, texturas e produtos para construção civil".

### 1.6 Baldes — "PEAD resistente a... solventes"

**Onde:** `src/data/products.ts` linha 57 — `chemicalCompatibility` dos baldes
**Também:** `src/pages/baldes.astro` linha 25 — "tintas à base de água e solvente"
**Também:** `src/pages/baldes.astro` linha 29 — "PEAD que resiste a ácidos, bases e solventes"
**Problema:** PEAD NÃO resiste a solventes aromáticos (tolueno = dano imediato, xileno = dano em 7 dias a 20°C). PEAD resiste a alguns solventes alifáticos (aguarrás = parcial), mas afirmar "resistente a solventes" genericamente é tecnicamente incorreto e perigoso.
**Correção:** Trocar "solventes" por uma afirmação mais precisa: "PEAD resistente a ácidos, bases e álcoois. Incompatível com solventes aromáticos (tolueno, xileno). Consulte tabela de compatibilidade." Ou simplificar: "PEAD resistente a ácidos, bases e produtos à base de água."

### 1.7 Baldes — Card "Tintas e Massas" menciona solvente

**Onde:** `src/pages/baldes.astro` linha 25
**Texto atual:** "Vedação hermética que elimina vazamento de tintas à base de água e solvente"
**Problema:** Baldes PP (BL-3.6, BL-5) não resistem a solventes. Baldes PEAD (BL-10, BL-18, BL-20) resistem parcialmente a alifáticos mas NÃO a aromáticos.
**Correção:** "Vedação hermética que elimina vazamento de tintas à base de água. Para tintas à base de solvente, consulte nosso técnico."

### 1.8 Home — Card barricas diz "químicos"

**Onde:** `src/components/home/ProductCards.astro` linha 13
**Texto atual:** "Para tintas, vernizes e químicos."
**Correção:** "Para tintas à base de água, texturas e construção civil."

---

## PARTE 2: O Que PODE Ser Envasado e o Site NÃO Menciona

### 2.1 Barricas — Produtos secos e granulares

**O que:** Pó, grãos, pigmentos secos, cal, cimento branco, gesso — a aplicação clássica do tambor de fibra. Compatibilidade total, sem necessidade de liner.
**Onde adicionar:** Card de aplicação em barricas.astro + applications em products.ts
**Sugestão de texto:** "Produtos Secos e Granulares — Pigmentos, cal, gesso e materiais em pó. Compatibilidade total sem necessidade de revestimento interno."

### 2.2 Barricas — Alimentos secos (farinhas, temperos, grãos)

**O que:** Tambores de fibra são amplamente usados na indústria alimentícia para secos. Não precisa de liner especial.
**Onde adicionar:** Pode ser uma menção secundária se o cliente quiser expandir mercado.
**Decisão necessária:** Perguntar ao cliente se ele atende esse segmento ou quer atender.

### 2.3 Baldes — Álcoois (etílico, isopropílico)

**O que:** PEAD tem resistência excelente a álcool etílico e isopropílico (classificação "Satisfactory" no guia INEOS). PP também resiste.
**Onde adicionar:** Pode ser mencionado em "Químicos Industriais" na página de baldes.
**Sugestão de texto:** Adicionar na description: "...incluindo álcoois, detergentes industriais e produtos de limpeza."

### 2.4 Baldes — Óleos minerais

**O que:** PEAD resiste bem a óleo mineral. Indústrias de lubrificantes usam baldes plásticos.
**Onde adicionar:** Nova aplicação ou dentro de "Químicos Industriais".

### 2.5 Baldes — Produtos de limpeza e detergentes industriais

**O que:** Base água + tensoativos — totalmente compatível com PEAD e PP.
**Onde adicionar:** Nova aplicação ou dentro de "Químicos Industriais".
**Sugestão de texto:** "Produtos de Limpeza — Detergentes, desengordurantes e sanitizantes industriais. PEAD resiste a formulações alcalinas e ácidas diluídas."

### 2.6 Baldes — Alimentos (mel, doces, conservas, gorduras)

**O que:** PP e PEAD são food-grade quando certificados. Baldes plásticos são padrão na indústria alimentícia.
**Decisão necessária:** Perguntar ao cliente se os baldes têm certificação para alimentos.

---

## RESUMO DAS ALTERAÇÕES

### Arquivos a modificar

| Arquivo | Alteração |
|---------|-----------|
| `src/data/products.ts` | Remover "Produtos Químicos" e "Agroquímicos" das barricas. Corrigir compatibilidade dos baldes (remover "solventes" genérico). |
| `src/pages/barricas.astro` | Corrigir cards de aplicação (Tintas e Vernizes → Tintas à Base de Água). Corrigir hero (remover "químicos e agroquímicos"). Suavizar claim de pH extremo. Adicionar "Produtos Secos e Granulares". |
| `src/pages/baldes.astro` | Corrigir cards de aplicação (remover menções genéricas a solvente). Adicionar álcoois/óleos/limpeza se aprovado. |
| `src/components/home/ProductCards.astro` | Corrigir "químicos" na description das barricas. |
| `src/pages/index.astro` | Verificar se meta description ou hero mencionam termos incorretos. |

### Decisões pendentes do cliente

1. **Barricas para produtos secos/granulares:** O Alex atende esse mercado? Se sim, adicionar como aplicação.
2. **Barricas para alimentos secos:** Quer expandir pra esse segmento?
3. **Baldes com certificação food-grade:** Os baldes PP/PEAD têm certificação pra alimentos?
4. **Baldes para álcoois e óleos:** Quer destacar esses segmentos?

---

## Acceptance Criteria

- [x] Removidas todas as afirmações de compatibilidade incorretas
- [x] "Solvente" removido de contextos onde PEAD/papelão não resiste
- [x] "Produtos Químicos" e "Agroquímicos" removidos das barricas
- [x] Aplicações reais adicionadas (após aprovação do cliente)
- [x] Hero e meta tags atualizados
- [x] Cards da home atualizados
- [x] Build passando
- [x] Conteúdo revisado contra tabela de compatibilidade química

## Prioridade

**Alta** — Afirmações incorretas de compatibilidade podem causar:
1. Dano ao produto do cliente (perda financeira)
2. Responsabilidade legal (produto inadequado causando acidente)
3. Perda de credibilidade quando o comprador técnico perceber a inconsistência
