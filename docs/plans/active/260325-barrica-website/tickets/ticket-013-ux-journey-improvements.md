# Ticket 013 — Melhorias de Jornada do Usuário (UX + Marketing Psychology)

> **Epic:** Website Fábrica de Barricas e Baldes
> **Tipo:** Enhancement/UX + Conversion
> **Dependencies:** ticket-002, ticket-003, ticket-004, ticket-005, ticket-007
> **Origem:** Análise combinada de UX Journey Thinking + Marketing Psychology

---

## Contexto

Análise da jornada do usuário usando dois frameworks:
1. **UX Journey Thinking** — JTBD, 5 momentos críticos, estados, carga cognitiva, microinterações
2. **Marketing Psychology** — Modelos mentais de persuasão, social proof, loss aversion, authority bias

### JTBD do Usuário Principal (Gerente de Compras/Produção)

> "Quando estou buscando fornecedor de embalagens industriais, quero encontrar um fabricante confiável que entregue no prazo, com qualidade consistente e sem burocracia, para que minha linha de produção não pare e eu não leve bronca por perda de material no transporte."

**Job emocional:** Reduzir o risco pessoal da troca de fornecedor (a culpa cai no gerente se der errado).
**Job social:** Demonstrar para a diretoria que fez uma escolha inteligente com material para justificar internamente.

---

## Escopo

### O que este ticket FAZ

Implementa melhorias de jornada, conversão e persuasão baseadas na análise combinada. Dividido em 3 faixas de prioridade.

### O que este ticket NÃO faz

- Não substitui fotos stock por fotos reais (depende de sessão fotográfica — ver nota UXD-001)
- Não implementa captura de email/PDF de catálogo (escopo separado — ver nota UXD-002)
- Não altera pricing strategy (decisão de negócio)
- Não cria blog ou conteúdo editorial

---

## P0 — Crítico (Conversão Direta)

### P0.1: Corrigir credibilidade da métrica "0% Perdas"

**Modelo:** Pratfall Effect — imperfeição controlada aumenta credibilidade
**Problema:** "0% Perdas" é uma afirmação não-crível. Zero defeito em 22 anos? Comprador B2B desconfia e contamina todas as outras métricas.

**Ação:**
- `company.ts`: Trocar `defectRate: "0%"` por `defectRate: "0,3%"` (ou valor real)
- `MetricsStrip.astro`: Alterar label de "Perdas no transporte" para "Índice de perda em transporte" e exibir "< 0,3%" em vez de "0%"
- Considerar usar número invertido: "99,7% entregas sem avaria"

**Arquivos:** `src/data/company.ts`, `src/components/home/MetricsStrip.astro`

---

### P0.2: Trocar email Hotmail por domínio corporativo

**Modelo:** Authority Bias — credenciais institucionais geram confiança
**Problema:** `Kingpack@hotmail.com.br` em 2026 para empresa industrial com 22 anos contradiz todo o posicionamento. Compradores corporativos que precisam enviar PO/NF por email vão hesitar.

**Ação:**
- `company.ts`: Substituir email por `contato@barricasindustriais.com` ou `contato@kingpack.com.br`
- Garantir que o domínio de email tenha MX configurado

**Arquivos:** `src/data/company.ts`

---

### P0.3: Reposicionar testimonials para mais cedo na jornada

**Modelo:** Social Proof + Bandwagon Effect — prova social é o fator #1 em B2B
**Problema:** Os depoimentos (conteúdo mais persuasivo do site) estão no 6° bloco da Home. A maioria dos visitantes nunca chega lá. São só 2 depoimentos — quase pior que nenhum para um site que diz "500+ indústrias".

**Ação:**
1. **Mover snippet de testimonial para logo após o Hero** — criar componente `InlineTestimonial.astro` com 1 quote curto entre TrustBar e MetricsStrip
2. **Aumentar para 5-6 depoimentos** com: foto real, cargo completo, logo da empresa, dado numérico ("reduzimos perdas de X% para zero")
3. **Segmentar depoimentos por setor** nas páginas de produto: página de barricas mostra depoimento de empresa de tintas; baldes mostra de empresa de químicos
4. **Trocar "500+" por número quebrado** (ex: "523 indústrias") — número quebrado parece mais real que redondo
5. **Adicionar logos de clientes reais** no TrustBar (8-12 logos). Logo da empresa é mais persuasivo que nome da pessoa

**Arquivos:** `src/pages/index.astro`, `src/data/testimonials.ts`, `src/components/home/TrustBar.astro`, novo `src/components/shared/InlineTestimonial.astro`, `src/pages/barricas.astro`, `src/pages/baldes.astro`

**Nota:** Depende de coletar depoimentos e logos com clientes reais. O esforço é operacional (ligar para clientes), não técnico.

---

### P0.4: Consolidar TrustBar + MetricsStrip em bloco único

**Modelo:** Lei de Hick + Carga Cognitiva — menos blocos repetitivos = mais impacto
**Problema:** São 2 seções consecutivas com a mesma mensagem ("somos confiáveis") ocupando espaço vertical precioso. "500+" aparece 5x na jornada completa — na 3ª vez já é ruído.

**Ação:**
- Fundir `TrustBar.astro` + `MetricsStrip.astro` em bloco único com setores + métricas numéricas
- Usar "500+" apenas no Hero e neste bloco consolidado (2 pontos máximo)
- Espaço liberado é ocupado pelo testimonial reposicionado (P0.3)

**Nova ordem da Home:**
```
HERO → INLINE TESTIMONIAL → TRUST+METRICS (único) → PRODUCT CARDS → HOW IT WORKS → TESTIMONIALS (completos) → FINAL CTA
```

**Arquivos:** `src/components/home/TrustBar.astro`, `src/components/home/MetricsStrip.astro`, `src/pages/index.astro`

---

## P1 — Alto Impacto

### P1.1: Seção "O custo da embalagem errada" (Loss Aversion)

**Modelo:** Loss Aversion (Kahneman & Tversky) — perdas pesam ~2x mais que ganhos equivalentes
**Problema:** O H1 toca na dor ("sua produção não para"), mas o resto opera em gain framing. Gerentes de compras não são promovidos por escolher o melhor fornecedor, mas podem ser demitidos por escolher o errado.

**Ação:**
- Criar nova seção na Home, antes dos ProductCards, com 3 cenários curtos:
  - "Barrica que estoura no transporte = lote inteiro perdido + retrabalho + atraso"
  - "Embalagem sem certificação = linha parada até regularizar"
  - "Fornecedor que atrasa = sua produção espera, seu cliente não"
- Transição: "Por isso 500+ indústrias testam antes de arriscar."
- No ObjectionEliminator: trocar "Teste antes de decidir" por "Teste antes de arriscar" (reframe sutil)

**Arquivos:** Novo `src/components/home/PainPoints.astro`, `src/pages/index.astro`, dados de objections em `barricas.astro` e `baldes.astro`

---

### P1.2: CTAs contextuais + micro-copy de tempo de resposta

**Modelo:** BJ Fogg (Prompt variado) + Activation Energy
**Problema:** "Pedir minha amostra grátis" aparece em todo lugar sempre igual — após 3x o cérebro dessensibiliza. Além disso, 5 variações diferentes confundem ("Pedir Orçamento" vs "Receber amostra").

**Ação:**
1. **Padronizar 2 labels canônicos:**
   - Primário: "Pedir amostra grátis"
   - Secundário: "Tirar dúvida técnica"
2. **Variar CTA por contexto:**
   - Home hero: "Pedir minha amostra grátis"
   - Após depoimentos: "Quero testar como a [empresa] testou"
   - Página barricas: "Testar barrica na minha linha"
   - Página baldes: "Receber amostra de balde"
   - FinalCTA: "Mandar mensagem agora"
3. **Adicionar micro-copy sob CTAs principais:** "Resposta em até 2h em horário comercial"
4. **Diferenciar mensagens pré-preenchidas do WhatsApp** por página/produto para o vendedor saber de onde o lead veio

**Arquivos:** Todos os componentes com `WhatsAppCTA`, `src/components/shared/WhatsAppCTA.astro`

---

### P1.3: Authority signals (certificações, normas, conformidade)

**Modelo:** Authority Bias — credenciais permitem ao gerente justificar a decisão internamente
**Problema:** Nenhuma certificação, norma técnica, laudo ou compliance mencionado. Gerente de compras que precisa justificar troca de fornecedor para diretoria não tem munição documental.

**Ação:**
- Listar certificações/normas que os produtos atendem (INMETRO, ABNT, ANVISA se aplicável, licença IBAMA para agroquímicos)
- Adicionar badges visuais de conformidade próximo à SpecsTable nas páginas de produto
- Se não há certificação formal: listar laudos técnicos disponíveis
- Mencionar ISO, alvará ou credenciais institucionais se houver

**Arquivos:** Novo `src/components/product/ComplianceBadges.astro`, `src/pages/barricas.astro`, `src/pages/baldes.astro`, possivelmente `src/data/company.ts`

**Nota:** Depende de levantamento real de certificações com a empresa.

---

### P1.4: Página de contato com FAQ integrado

**Modelo:** Anchoring + Friction Reduction — cada pergunta respondida é uma objeção eliminada antes do WhatsApp
**Problema:** Página de contato é dead-end funcional. Se o visitante vai até lá, tem dúvidas — e a página não resolve nenhuma. Sem FAQ, sem mapa embarcado, sem dados de pessoa real.

**Ação:**
- Adicionar FAQ com 6-8 perguntas mais comuns do WhatsApp:
  - "Qual o pedido mínimo?"
  - "Vocês entregam fora de SP?"
  - "A amostra é realmente grátis?"
  - "Quais certificações vocês têm?"
  - "Prazo de entrega para pedidos recorrentes?"
  - "Posso personalizar cores/impressão?"
- Incluir nome do gerente comercial (humaniza contato)
- Mapa Google Maps embarcado (iframe) — fábrica real gera confiança

**Arquivos:** `src/pages/contato.astro`, novo `src/components/shared/FAQSection.astro`

---

## P2 — Médio Impacto

### P2.1: Indicador de horário de atendimento no CTA

**Modelo:** Expectation Management — gerenciar expectativa de resposta aumenta confiança
**Problema:** Visitante que acessa à noite/fim de semana envia mensagem e não recebe resposta. Lead perdido.

**Ação:**
- Badge contextual no WhatsAppCTA: "Online agora" (seg-sex 8-18h) ou "Responderemos na segunda"
- Lógica client-side baseada em hora local (timezone SP)

**Arquivos:** `src/components/shared/WhatsAppCTA.astro`

---

### P2.2: SpecsTable responsiva para mobile

**Modelo:** Friction Points — tabela com scroll horizontal em mobile perde conversão
**Problema:** Tabela com `min-w-[600px]` em tela de 375px força scroll lateral. Comprador técnico comparando modelos em mobile desiste.

**Ação:**
- Em telas < 640px: converter tabela para layout de cards empilhados (cada modelo em seu card)
- Desktop mantém formato tabela atual

**Arquivos:** `src/components/product/SpecsTable.astro`

---

### P2.3: FAQ técnico real nas páginas de produto

**Modelo:** Progressive Disclosure — informação técnica sob demanda reduz carga cognitiva
**Problema:** O FAQSchema existe no structured data, mas com apenas 3 "perguntas" que são as objeções do ObjectionEliminator. Não há FAQ técnico real (compatibilidade química, customização, normas).

**Ação:**
- Accordion com 6-10 perguntas reais por produto (derivadas de dúvidas do WhatsApp)
- Marca em schema.org para SEO
- Separado do ObjectionEliminator (que é marketing, não FAQ)

**Arquivos:** Novo `src/components/product/ProductFAQ.astro`, `src/pages/barricas.astro`, `src/pages/baldes.astro`

---

### P2.4: Fortalecer cross-link entre produtos

**Modelo:** Cross-sell + Bandwagon Effect
**Problema:** Cross-link atual é texto discreto "Precisa de embalagem plástica também?" — fácil de ignorar. Muitos clientes compram AMBOS os produtos.

**Ação:**
- Trocar por card visual com imagem, similar ao ProductCards da Home
- Copy: "Clientes que compram barricas também usam nossos baldes"

**Arquivos:** `src/pages/barricas.astro`, `src/pages/baldes.astro`

---

### P2.5: Hover highlight na tabela de specs

**Ação:** `hover:bg-surface/50` nas `<tr>` da tabela — melhora legibilidade sem custo.

**Arquivos:** `src/components/product/SpecsTable.astro`

---

## P3 — Oportunidades Futuras (fora deste ticket)

Registrados aqui para referência, mas são escopo de tickets separados:

| ID | Oportunidade | Modelo | Nota |
|----|-------------|--------|------|
| UXD-001 | **Substituir fotos stock por fotos reais** | Credibilidade | Depende de sessão fotográfica. É a mudança de maior impacto visual possível. |
| UXD-002 | **PDF catálogo técnico com captura de email** | Endowment + Lead Capture | Comprador precisa de material para circulação interna. Único mecanismo de captura de lead além do WhatsApp. |
| UXD-003 | **Referência de preço/faixa** | Anchoring | Decisão de negócio. Se viável, ao menos "A partir de R$ X/un" no ProductHero. |
| UXD-013 | **Mini-wizard "Qual embalagem?"** | Carga Cognitiva | Componente interativo de 2-3 perguntas que aponta para barrica ou balde com modelo sugerido. |
| UXD-SAZ | **Urgência sazonal real** | Scarcity genuína | Mencionar picos de demanda por estação se existirem. |

---

## Anti-Patterns a Evitar

| Anti-pattern | Por que NÃO fazer neste site B2B |
|---|---|
| Countdown timers / "Só hoje!" | Gerente de compras compra em ciclos de semanas. Urgência falsa destrói credibilidade. |
| Pop-ups de captura de email | Gerente não quer newsletter. Pop-up é fricção pura. |
| Chatbot automático | WhatsApp direto com vendedor é vantagem competitiva. Bot irrita público técnico. |
| Gamificação / roleta de desconto | Transmite falta de seriedade para indústria. |
| Comparativo direto com concorrentes | No B2B industrial, nomear concorrentes é visto como insegurança. |
| Depoimentos com stock photos | Público pequeno e interconectado. Se for falso, alguém descobre. |
| Preço unitário no site | Embalagem industrial tem pricing por volume. Atrai leads errados. |

---

## Checklist de Implementação

- [ ] P0.1: Corrigir métrica "0% Perdas" → "< 0,3%" ou "99,7%"
- [ ] P0.2: Trocar email Hotmail por domínio corporativo
- [ ] P0.3: Reposicionar testimonials + aumentar quantidade + logos de clientes
- [ ] P0.4: Consolidar TrustBar + MetricsStrip + reordenar Home
- [ ] P1.1: Criar seção Loss Aversion "O custo da embalagem errada"
- [ ] P1.2: CTAs contextuais + micro-copy + mensagens WhatsApp diferenciadas
- [ ] P1.3: Authority signals (certificações/normas)
- [ ] P1.4: Página de contato com FAQ + mapa + pessoa real
- [ ] P2.1: Badge de horário de atendimento no WhatsApp CTA
- [ ] P2.2: SpecsTable responsiva (cards em mobile)
- [ ] P2.3: FAQ técnico real nas páginas de produto
- [ ] P2.4: Cross-link visual entre produtos
- [ ] P2.5: Hover highlight na tabela de specs

---

## Métricas para Monitorar

| Métrica | Baseline | Meta |
|---------|----------|------|
| CTR do CTA primário (WhatsApp) | Medir atual | +30% |
| Scroll depth médio (Home) | Medir atual | 70%+ chegam até Testimonials |
| Bounce rate mobile | Medir atual | Redução de 20% |
| Tempo médio até primeiro CTA clicado | Medir atual | Redução de 15% |
| Leads qualificados via WhatsApp / mês | Medir atual | +25% |
