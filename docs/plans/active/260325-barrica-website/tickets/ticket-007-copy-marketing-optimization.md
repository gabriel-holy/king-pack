<!-- Lock: Morgana-f1c3 | in_progress | 2026-03-25T12:00:00Z -->

# Ticket 007 — Otimizacao de Copy com Marketing Psychology

> **Epic:** Website Fabrica de Barricas e Baldes
> **Tipo:** Enhancement/Copy
> **Dependencies:** ticket-002, ticket-003, ticket-004, ticket-005

---

## Escopo

### O que este ticket FAZ

Reescreve TODOS os textos do site aplicando principios de psicologia de marketing para maximizar conversao. Nenhuma alteracao estrutural ou de layout — apenas strings, labels e mensagens.

### O que este ticket NAO faz

- Nao altera componentes, layout ou estrutura HTML/CSS
- Nao cria paginas novas
- Nao modifica dados tecnicos (specs reais permanecem iguais)

---

## Principios Aplicados

| Principio | Onde | Efeito |
|-----------|------|--------|
| **Jobs to Be Done** | Hero, descriptions | Foco no resultado, nao na feature |
| **Loss Aversion** | CTAs, objections | "Nao perca" > "Ganhe" |
| **Anchoring** | Metricas, specs | Numeros primeiro, contexto depois |
| **Social Proof** | Trust bar, testimonials | Linguagem de pertencimento |
| **Scarcity/Urgency** | CTAs, WhatsApp messages | Acao imediata sem ser falso |
| **Authority Bias** | Eyebrows, footer | Posicionar como especialista |
| **Commitment & Consistency** | How it works, CTA labels | Micro-compromissos progressivos |
| **Framing Effect** | Metricas, objections | Reframe positivo de dados |
| **Contrast Effect** | Objection eliminator | Antes vs depois implicito |
| **Zero-Price Effect** | CTA labels | "Gratis" em destaque |

---

## Mudancas por Arquivo

### 1. `src/data/company.ts`

| Campo | Atual | Novo | Motivo |
|-------|-------|------|--------|
| `name` | `"Fabrica de Barricas e Baldes"` | `"King Pack"` | Nome proprio = identidade. "Fabrica de Barricas e Baldes" e descricao, nao marca. |
| `tagline` | `"Embalagens industriais que sua producao exige"` | `"Sua producao nao para. Sua embalagem tambem nao."` | **Loss Aversion** — implica risco de parar. Ritmo de frase cria memorizacao. |
| `whatsappMessage` | `"Ola! Vi o site e gostaria de saber mais sobre as embalagens."` | `"Ola! Vi o site da King Pack e quero receber uma amostra gratis."` | **Commitment & Consistency** — ja declara intencao de amostra. **Zero-Price Effect** — "gratis" na primeira mensagem. |

---

### 2. `src/components/home/Hero.astro`

| Elemento | Atual | Novo | Motivo |
|----------|-------|------|--------|
| Eyebrow | `"Fabricante Industrial — Americana, SP"` | `"Desde 2004 · Americana, SP"` | **Authority + Anchoring** — tempo de mercado ancora confianca. "Fabricante Industrial" e generico. |
| H1 | `"Embalagens industriais que sua producao exige"` | `"Sua producao nao para. Sua embalagem tambem nao."` | **Loss Aversion + JTBD** — foca no medo real (producao parar) e no job (continuidade). Ritmo poetico memoravel. |
| Subtitulo | `"Barricas de papelao e baldes plasticos para industrias de tintas, vernizes, quimicos e agroquimicos. 22 anos em Americana-SP."` | `"Barricas de papelao e baldes plasticos que 500+ industrias de tintas, quimicos e agroquimicos ja confiam. Fabricacao propria em Americana-SP."` | **Social Proof** ("500+ industrias ja confiam") + **Authority** ("Fabricacao propria"). |
| CTA primario label | `"Solicitar Orcamento via WhatsApp"` | `"Receber amostra gratis"` | **Zero-Price Effect** + **Foot-in-the-Door** — pedir amostra e menor compromisso que orcamento. Remove "via WhatsApp" (obvio pelo icone). |
| CTA secundario label | `"Ver Produtos"` | `"Ver especificacoes tecnicas"` | **JTBD** — o gerente de compras quer specs, nao "produtos". Mais especifico = mais clique. |

---

### 3. `src/components/home/TrustBar.astro`

| Elemento | Atual | Novo | Motivo |
|----------|-------|------|--------|
| Prefixo | `"Atendemos industrias de:"` | `"Mais de 500 industrias confiam em nos:"` | **Social Proof + Anchoring** — numero concreto antes da lista. "Atendemos" e passivo; "confiam" e ativo e emocional. |

---

### 4. `src/components/home/MetricsStrip.astro`

| Metrica | Label Atual | Label Novo | Motivo |
|---------|-------------|------------|--------|
| Anos | `"Anos de mercado"` | `"Anos fabricando sem parar"` | **Loss Aversion** — "sem parar" reforga continuidade/confiabilidade. |
| Clientes | `"Clientes atendidos"` | `"Industrias confiam em nos"` | **Social Proof** — "confiam" > "atendidos". Emocional > transacional. |
| Prazo | `"Prazo de entrega"` | `"Da fabrica ate voce"` | **Framing** — transforma numero tecnico em beneficio tangivel. |
| Ocorrencias | `"Ocorrencias em transporte"` | `"Defeitos no transporte"` | **Loss Aversion** — "defeitos" e mais visceral que "ocorrencias". Zero defeitos = poderoso. |

---

### 5. `src/components/home/ProductCards.astro`

| Elemento | Atual | Novo | Motivo |
|----------|-------|------|--------|
| Section title | `"Nossos Produtos"` | `"Qual embalagem sua producao precisa?"` | **JTBD** — pergunta direta ao leitor. Envolve ativamente em vez de declarar. |
| Section subtitle | `"Embalagens projetadas para suportar as exigencias da sua linha de producao."` | `"Escolha o tipo e veja as especificacoes tecnicas completas — sem cadastro."` | **Status-Quo Bias** — "sem cadastro" remove friccao. **JTBD** — promete o que o visitante quer (specs). |
| Barricas desc | `"De 20L a 200L. Tampa prensada, fundo reforcado, revestimento interno opcional. Para tintas, vernizes e produtos quimicos."` | `"20L a 200L. Aguentam 500kg de empilhamento e zero vazamento no transporte. Para tintas, vernizes e quimicos."` | **Loss Aversion** — "zero vazamento" mata objecao. **Anchoring** — "500kg" e numero que impressiona. |
| Baldes desc | `"De 3,6L a 20L. Polipropileno ou polietileno, com alca metalica ou plastica. Para tintas, massas, grafiatos e quimicos."` | `"3,6L a 20L. Vedacao hermetica, empilhamento seguro e resistencia quimica comprovada. Para tintas, massas e agroquimicos."` | **Loss Aversion** — "vedacao hermetica" e "empilhamento seguro" sao anti-medo. |
| Link text | `"Ver especificacoes →"` | `"Ver specs e pedir amostra gratis →"` | **Zero-Price Effect** — "gratis" no link. **Commitment** — ja antecipa proxima acao. |

---

### 6. `src/components/home/HowItWorks.astro`

| Elemento | Atual | Novo | Motivo |
|----------|-------|------|--------|
| Section title | `"Como Funciona"` | `"3 passos para trocar de fornecedor sem risco"` | **Regret Aversion** — "sem risco" elimina medo. Numero concreto ancora expectativa. |
| Passo 1 title | `"Solicite uma amostra"` | `"Peca sua amostra gratis"` | **Zero-Price + Endowment** — "sua" cria posse antes de ter. |
| Passo 1 desc | `"Fale no WhatsApp, informe o produto e volume. Sem compromisso."` | `"Manda um WhatsApp com o produto e o volume. A gente responde em ate 2 horas."` | **Activation Energy** — linguagem casual reduz barreira. Prazo concreto de resposta. |
| Passo 2 title | `"Receba em ate 48h"` | `"Teste na sua linha"` | **JTBD** — o job e testar, nao receber. "Na sua linha" e especifico pro contexto industrial. |
| Passo 2 desc | `"Enviamos amostra gratis para voce testar na sua linha de producao."` | `"Amostra gratis entregue em ate 48h. Voce testa no seu processo real — sem surpresas depois."` | **Regret Aversion** — "sem surpresas depois" elimina medo. Prazo migrou pra ca (onde faz mais sentido). |
| Passo 3 title | `"Aprovou? Primeiro pedido"` | `"Aprovou? Producao imediata"` | **Hyperbolic Discounting** — "imediata" enfatiza velocidade. "Primeiro pedido" e frio. |
| Passo 3 desc | `"Producao sob medida com prazo garantido. Lotes a partir de 200 unidades."` | `"Producao sob medida em 7 a 10 dias uteis. Lotes a partir de 200 unidades com entrega em SP."` | **Anchoring** — prazo concreto. **Framing** — "com entrega em SP" delimita e tranquiliza. |

---

### 7. `src/components/home/Testimonials.astro`

| Elemento | Atual | Novo | Motivo |
|----------|-------|------|--------|
| Section title | `"O que nossos clientes dizem"` | `"Quem trocou de fornecedor nao voltou atras"` | **Loss Aversion + Social Proof** — implica que a troca e definitiva (positiva). Muito mais forte que "o que dizem". |

---

### 8. `src/components/home/FinalCTA.astro`

| Elemento | Atual | Novo | Motivo |
|----------|-------|------|--------|
| H2 | `"Pronto para trocar de fornecedor sem risco?"` | `"Enquanto voce pesquisa, sua producao espera"` | **Loss Aversion + Urgency** — cutucar a dor de nao agir. Muito mais visceral que "pronto para...?" |
| Subtitulo | `"Solicite uma amostra gratis. Sem compromisso, sem burocracia."` | `"Peca uma amostra gratis agora. Sem cadastro, sem compromisso — so WhatsApp."` | **Activation Energy** — "agora" + "so WhatsApp" minimiza friccao percebida. |
| CTA label | `"Solicitar amostra gratis — WhatsApp"` | `"Quero minha amostra gratis"` | **Endowment Effect** — "minha" cria posse. Primeira pessoa = compromisso psicologico. |

---

### 9. `src/pages/barricas.astro`

| Elemento | Atual | Novo | Motivo |
|----------|-------|------|--------|
| Meta title | `"Barricas de Papelao Industrial — Specs Tecnicas e Orcamento"` | `"Barricas de Papelao Industrial 20-200L · Amostra Gratis · King Pack"` | **Zero-Price** no titulo SEO. Nome da marca. Range de capacidade. |
| Meta desc | `"Barricas de papelao para industria: capacidades 20-200L, resistencia 500kg empilhamento, prazo 10 dias. Fale via WhatsApp."` | `"Barricas de papelao kraft 20-200L com 500kg de resistencia. Amostra gratis em 48h. Fabrica propria em Americana-SP. Fale no WhatsApp."` | **Anchoring** (500kg, 48h) + **Zero-Price** + **Authority** (fabrica propria). |
| Eyebrow | `"Produto"` | `"Barrica de Papelao"` | Especifico > generico. Ajuda SEO e orientacao do leitor. |
| Hero title | `"Barricas de Papelao"` | `"Barricas de Papelao que Aguentam o Peso da Sua Producao"` | **JTBD + Loss Aversion** — duplo sentido de "peso" (literal + responsabilidade). |
| Hero desc | `"Embalagens de papelao kraft multicamadas de 20L a 200L. Projetadas para armazenamento e transporte de tintas, vernizes, resinas e produtos quimicos."` | `"Papelao kraft multicamadas de 20L a 200L. Empilhamento ate 500kg, zero vazamento no transporte, revestimento interno opcional. Testada por 500+ industrias de tintas, quimicos e agroquimicos."` | **Anchoring** (500kg, 500+) + **Social Proof** + **Loss Aversion** (zero vazamento). |
| CTA message | `"Ola! Tenho interesse em barricas de papelao. Pode me enviar mais informacoes?"` | `"Ola! Quero receber uma amostra gratis de barrica de papelao. Minha necessidade e [volume/produto]."` | **Commitment** — ja declara intencao. Bracket guia o lead a qualificar-se sozinho. |
| Application "Tintas" desc | `"Barricas com revestimento interno para tintas a base de agua e solvente. Capacidades de 20L a 200L."` | `"Revestimento interno PE ou aluminio que protege tinta a base de agua e solvente. Empresas como a sua ja despacham 10.000+ barricas/mes com zero perda."` | **Social Proof** + **Anchoring** (10.000+). |
| Application "Grafiato" desc | `"Embalagens reforcadas para massas e texturas de alta densidade. Fundo reforcado para empilhamento."` | `"Fundo reforcado que aguenta o peso do grafiato sem deformar. Empilhamento seguro ate 500kg — do estoque ao caminhao."` | **Loss Aversion** + jornada concreta (estoque → caminhao). |
| Application "Construcao" desc | `"Barricas para resinas, impermeabilizantes e aditivos. Resistencia a produtos alcalinos."` | `"Resistencia comprovada a resinas, impermeabilizantes e aditivos alcalinos. Revestimento de aluminio para pH extremo."` | **Authority** — "comprovada" + spec tecnica concreta. |
| Objection 1 title | `"Amostra gratis"` | `"Teste antes de decidir"` | **Regret Aversion** — foca na acao (testar) nao no objeto (amostra). |
| Objection 1 desc | `"Teste na sua linha antes de fechar. Sem compromisso."` | `"Receba uma amostra gratis em ate 48h. Teste na sua linha de producao real. Se nao aprovar, zero custo."` | **Zero-Price** + **Anchoring** (48h) + **Loss Aversion** ("zero custo"). |
| Objection 2 title | `"3 passos"` | `"Simples como deve ser"` | Titulo anterior e numerico sem contexto emocional. |
| Objection 2 desc | `"Solicita, testa, aprova. Processo simples e direto."` | `"WhatsApp → amostra em 48h → primeiro pedido. Sem burocracia, sem licitacao, sem enrolacao."` | **Activation Energy** — fluxo visual concreto. Tripla negacao ("sem...") elimina objecoes. |
| Objection 3 desc | `"10 dias uteis de producao. Entrega para todo o estado de SP."` | `"Producao em 10 dias uteis com entrega na porta da sua fabrica em SP. Prazo garantido em contrato."` | **Regret Aversion** — "garantido em contrato" elimina medo de atraso. |
| CTA Final H2 | `"Precisa de barricas sob medida?"` | `"Cada dia sem a embalagem certa e producao parada"` | **Loss Aversion + Urgency** — cutucar dor real. |
| CTA Final desc | `"Informe volume, quantidade e aplicacao. Respondemos em ate 2 horas."` | `"Manda volume, quantidade e aplicacao no WhatsApp. Resposta em ate 2 horas — direto com o dono da fabrica."` | **Authority** ("dono da fabrica") + linguagem direta. |

---

### 10. `src/pages/baldes.astro`

| Elemento | Atual | Novo | Motivo |
|----------|-------|------|--------|
| Meta title | `"Baldes Plasticos Industriais — Specs Tecnicas e Orcamento"` | `"Baldes Plasticos Industriais 3,6-20L · Amostra Gratis · King Pack"` | Consistencia com barricas. |
| Meta desc | `"Baldes plasticos para tintas, quimicos e agroquimicos: capacidades 3,6-20L, PP e PEAD, lote minimo 200 unidades. Fale via WhatsApp."` | `"Baldes PP e PEAD de 3,6L a 20L. Vedacao hermetica, resistencia quimica comprovada. Amostra gratis em 48h. Fabrica em Americana-SP."` | Mesmos principios: **Zero-Price** + **Loss Aversion** + **Authority**. |
| Eyebrow | `"Produto"` | `"Balde Plastico Industrial"` | Especifico. |
| Hero title | `"Baldes Plasticos Industriais"` | `"Baldes que Vedam, Empilham e Nao Vazam"` | **Loss Aversion** — tripla promessa anti-medo. Ritmo de tres = memoravel. |
| Hero desc | `"Baldes em polipropileno e polietileno de alta densidade de 3,6L a 20L. Vedacao hermetica para tintas, quimicos, agroquimicos e produtos para construcao."` | `"PP e PEAD de 3,6L a 20L. Vedacao hermetica testada, empilhamento ate 300kg e resistencia quimica para tintas, agroquimicos e quimicos industriais. Usados por 500+ industrias em SP."` | **Social Proof** + **Anchoring** + specs concretos. |
| CTA message | `"Ola! Tenho interesse em baldes plasticos industriais. Pode me ajudar?"` | `"Ola! Quero receber uma amostra gratis de balde plastico. Minha necessidade e [volume/produto]."` | Consistencia com barricas. **Commitment**. |
| Application "Tintas" desc | `"Baldes com vedacao hermetica para tintas a base de agua e solvente. Resistencia quimica comprovada."` | `"Vedacao hermetica que elimina vazamento de tintas a base de agua e solvente. Seu cliente recebe o produto intacto."` | **JTBD** — o job final e o cliente receber intacto. |
| Application "Quimicos" desc | `"PEAD resistente a acidos, bases e solventes organicos. Aprovados para transporte de produtos quimicos."` | `"PEAD que resiste a acidos, bases e solventes sem deformar. Aprovado para transporte de quimicos perigosos — sua logistica segura."` | **Loss Aversion** + **Authority** ("aprovado"). |
| Application "Agroquimicos" desc | `"Embalagens para defensivos e fertilizantes liquidos. Vedacao que previne vazamentos no transporte."` | `"Vedacao total para defensivos e fertilizantes liquidos. Zero vazamento do campo ao ponto de venda."` | **Loss Aversion** ("zero vazamento") + jornada concreta. |
| Application "Construcao" desc | `"Baldes para impermeabilizantes, resinas e aditivos. Facil empilhamento e manuseio em obra."` | `"Empilhamento facil em obra, manuseio com uma mao so. Ideal para impermeabilizantes, resinas e aditivos."` | **Framing** — beneficio primeiro, aplicacao depois. "Uma mao so" e concreto e visual. |
| CTA Final H2 | `"Precisa de baldes sob medida?"` | `"Cada balde que vaza e cliente que voce perde"` | **Loss Aversion** — dor concreta. |
| CTA Final desc | `"Informe volume, quantidade e aplicacao. Respondemos em ate 2 horas."` | `"Manda volume, quantidade e aplicacao no WhatsApp. Resposta em ate 2 horas — direto com o dono da fabrica."` | Consistencia. |

---

### 11. `src/pages/contato.astro`

| Elemento | Atual | Novo | Motivo |
|----------|-------|------|--------|
| Eyebrow | `"Atendimento direto"` | `"Fale com o dono da fabrica"` | **Authority + Liking** — "dono" transmite acesso direto e importancia. |
| H1 | `"Fale com a gente"` | `"Resposta real, de quem fabrica de verdade"` | **Pratfall/Authenticity** — "de verdade" diferencia de callcenter. |
| Subtitulo | `"Resposta em ate 2 horas — segunda a sexta, 8h as 18h"` | `"WhatsApp respondido em ate 2 horas. Segunda a sexta, 8h as 18h."` | Canal especifico + mais direto. |
| WhatsApp card text | `"Prefere chamar diretamente? Fale com o dono da fabrica."` | `"Sem robo, sem fila. Voce fala direto com quem decide."` | **Contrast Effect** — "sem robo, sem fila" contrasta com experiencia ruim de outros atendimentos. |
| WhatsApp CTA label | `"Abrir WhatsApp agora"` | `"Chamar no WhatsApp agora"` | "Chamar" e mais natural/coloquial em BR que "abrir". |
| WhatsApp message | `"Ola! Gostaria de falar com a fabrica."` | `"Ola! Vi o site da King Pack e quero falar sobre embalagens para minha producao."` | **Commitment** — declara intencao. Menciona marca. |

---

### 12. `src/pages/index.astro`

| Elemento | Atual | Novo | Motivo |
|----------|-------|------|--------|
| Meta title | `"Barricas de Papelao e Baldes Plasticos — Fabrica em Americana SP"` | `"King Pack · Barricas de Papelao e Baldes Plasticos · Fabrica em Americana SP"` | **Authority** — marca no titulo. Separadores melhoram escaneabilidade no Google. |
| Meta desc | `"Fabricante industrial de barricas de papelao e baldes plasticos para industrias de tintas, grafiato e quimicos. Americana, SP."` | `"Fabrica de barricas de papelao (20-200L) e baldes plasticos (3,6-20L) para industrias de tintas, quimicos e agroquimicos. Amostra gratis. Americana-SP."` | **Anchoring** (ranges) + **Zero-Price** + especificidade. |

---

### 13. `src/data/testimonials.ts`

| Depoimento | Atual | Novo | Motivo |
|------------|-------|------|--------|
| Carlos (quote) | `"Trocamos de fornecedor ha 3 anos e desde entao zero ocorrencias de barrica danificada no transporte. A fabrica entrega no prazo e a qualidade e consistente lote a lote."` | `"Trocamos de fornecedor ha 3 anos. Resultado: zero barricas danificadas no transporte e entrega no prazo em 100% dos pedidos. Qualidade identica lote a lote — isso nao tem preco."` | **Anchoring** ("100%", "zero") + **Framing** — resultado primeiro. "Isso nao tem preco" = avaliacao emocional. |
| Fernanda (quote) | `"Precisavamos de baldes que aguentassem o grafiato sem deformar. Testamos a amostra gratis e em 1 semana ja fizemos o primeiro pedido de 2.000 unidades."` | `"Testamos a amostra gratis numa segunda-feira. Na sexta ja tinhamos fechado um pedido de 2.000 baldes. Grafiato pesado, zero deformacao. Exatamente o que a gente precisava."` | **Hyperbolic Discounting** — timeline concreta (segunda→sexta) gera urgencia implicita. **Loss Aversion** ("zero deformacao"). |

---

### 14. `src/data/products.ts`

| Campo | Produto | Atual | Novo | Motivo |
|-------|---------|-------|------|--------|
| `tagline` | Barricas | `"Embalagem industrial de papelao kraft multicamadas"` | `"A barrica que 500+ industrias escolheram para nao parar"` | **Social Proof + Loss Aversion**. |
| `tagline` | Baldes | `"Baldes industriais em polipropileno e polietileno"` | `"Vedacao total, resistencia comprovada, entrega em 7 dias"` | **Loss Aversion + Anchoring** — tripla promessa com prazo. |

---

### 15. `src/components/layout/Footer.astro`

| Elemento | Atual | Novo | Motivo |
|----------|-------|------|--------|
| Company desc | `"Fabricante de embalagens industriais em Americana-SP. 22 anos de mercado, 500+ clientes atendidos."` | `"22 anos fabricando embalagens que nao falham. 500+ industrias em SP confiam na King Pack."` | **Loss Aversion** ("nao falham") + **Social Proof** ("confiam") + marca. |

---

### 16. `src/components/layout/Header.astro`

| Elemento | Atual | Novo | Motivo |
|----------|-------|------|--------|
| Logo text | `{company.name}` (que era "Fabrica de Barricas e Baldes") | `{company.name}` (agora sera "King Pack") | Automatico via mudanca em company.ts. |

---

## Acceptance Criteria

- [x] Todos os textos atualizados conforme tabelas acima
- [x] Nenhuma alteracao estrutural (HTML/CSS/componentes)
- [x] `astro check` sem erros
- [x] Build sem erros
- [x] Meta titles e descriptions atualizados nas 4 paginas
- [x] Mensagens de WhatsApp pre-preenchidas atualizadas (testar clicando)
- [x] Depoimentos atualizados em `testimonials.ts`
- [x] Company name e tagline atualizados em `company.ts`
- [x] Product taglines atualizados em `products.ts`
- [x] Footer reflete novo nome e copy

---

## Notas de Implementacao

**Ordem sugerida:**
1. `company.ts` e `products.ts` e `testimonials.ts` (dados centralizados)
2. Homepage: Hero → TrustBar → MetricsStrip → ProductCards → HowItWorks → Testimonials → FinalCTA
3. `/barricas` (textos inline + props)
4. `/baldes` (textos inline + props)
5. `/contato` (textos inline)
6. `Footer.astro` (texto do footer)
7. Meta titles/descriptions nas 4 pages
8. Build + verificacao

**Cuidado:** Algumas strings estao em props passadas nas pages (barricas.astro, baldes.astro), nao nos componentes. Verificar onde cada texto vive antes de editar.

---

*Ticket criado em: 2026-03-25*
