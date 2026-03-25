# Core Flows — Website Fábrica de Barricas e Baldes

> **Intent Lock:** Construir um site B2B que posiciona a fábrica como fornecedor confiável e converte visitantes em leads — onde todo ponto de conversão é um botão de WhatsApp direto para o dono da fábrica.

---

## Fluxo Principal — Gerente de Compras pesquisa novo fornecedor

**Cenário:** Gerente de compras de uma indústria de tintas em SP pesquisa "fornecedor barrica papelão 200L SP" no Google.

```
[Google Search]
       |
       v
[Home — resultado orgânico ou /barricas — resultado de página de produto]
       |
       +--- Menos de 8 segundos para entender:
            "Essa empresa fabrica embalagens industriais em SP?"
            "Eles atendem indústria de tintas?"
            "Posso confiar neles?"
       |
       v
[Scroll: Logos de clientes + Métricas numéricas]
       |
       v
[Scroll: Produtos — clica em "Barricas de Papelão"]
       |
       v
[/barricas — Specs técnicas, capacidades, compatibilidade]
       |
       v
[Clica em "Solicitar amostra grátis via WhatsApp"]
       |
       v
[WhatsApp abre com mensagem pré-preenchida]
       "Olá! Vi o site e tenho interesse em solicitar uma amostra de barrica de papelão para [setor]."
       |
       v
[Lead qualificado entrou no funil]
```

**Pontos de decisão críticos:**

- Se hero não comunicar claramente o produto em 8s → bounce
- Se specs técnicas não estiverem visíveis sem login → abandono
- Se botão de WhatsApp não estiver visível no mobile → zero conversão

---

## Fluxo Alternativo — Gerente de Produção valida compatibilidade técnica

**Cenário:** Gerente de produção precisa saber se a barrica aguenta produto químico específico.

```
[Chegou pela Home]
       |
       v
[Navega para /barricas]
       |
       v
[Busca seção de especificações técnicas]
       |
       +--- HAPPY PATH: Encontra tabela com materiais, resistência química, temperatura
            → Confiante → Clica WhatsApp com pergunta técnica específica
       |
       +--- CAMINHO ALTERNATIVO: Não encontra o que precisa na spec
            → Vê botão "Tem dúvida técnica? Fale com a gente no WhatsApp"
            → Clica → WhatsApp abre para tirar dúvida técnica
```

---

## Fluxo de Erro — Visitante chega numa rota de setor (ainda não implementada)

```
[Google indexa /setores/tintas no futuro]
       |
       v
[Usuário acessa rota que ainda não existe]
       |
       v
[404 page customizada]
       |
       v
[CTA: "Conheça nossos produtos" → /barricas ou /baldes]
       +
[CTA: "Fale diretamente no WhatsApp" → link WhatsApp]
```

**Invariante:** O site nunca deixa o visitante em beco sem saída. Toda página de erro tem WhatsApp como saída.

---

## Hierarquia de Informação por Página

### Home (`/`)

```
┌─────────────────────────────────────────────────────────┐
│ HEADER: Logo | Barricas | Baldes | Contato | [WhatsApp] │
├─────────────────────────────────────────────────────────┤
│ HERO                                                    │
│ Tagline 4-6 palavras — produto + benefício central      │
│ Sub-tagline 1 linha com contexto industrial             │
│ [CTA primário: Solicitar Orçamento — WhatsApp]          │
│ [CTA secundário: Ver Produtos]                          │
│ Foto do produto em contexto industrial (placeholder)   │
├─────────────────────────────────────────────────────────┤
│ FAIXA DE CREDIBILIDADE                                  │
│ "Atendemos indústrias de: Tintas | Grafiato | Químicos  │
│  Agroquímicos | Construção Civil"                       │
├─────────────────────────────────────────────────────────┤
│ MÉTRICAS NUMÉRICAS (4 blocos)                          │
│ [XX anos no mercado] [XXX clientes] [XX horas prazo]   │
│ [0 ocorrências em transporte]                          │
├─────────────────────────────────────────────────────────┤
│ PRODUTOS (2 cards)                                      │
│ ┌──────────────┐  ┌──────────────┐                     │
│ │ Barricas de  │  │    Baldes    │                     │
│ │  Papelão     │  │  Plásticos   │                     │
│ │ [Ver specs]  │  │ [Ver specs]  │                     │
│ └──────────────┘  └──────────────┘                     │
├─────────────────────────────────────────────────────────┤
│ COMO FUNCIONA (3 passos)                                │
│ 1. Você solicita amostra via WhatsApp                   │
│ 2. Entregamos amostra em X dias úteis                   │
│ 3. Aprovação e primeiro pedido                          │
├─────────────────────────────────────────────────────────┤
│ DEPOIMENTO (1-2 cards)                                  │
│ "Resultado concreto" — Nome, Cargo, Empresa, Cidade     │
├─────────────────────────────────────────────────────────┤
│ CTA FINAL                                               │
│ Título: "Pronto para trocar de fornecedor sem risco?"   │
│ [Solicitar amostra grátis — WhatsApp]                   │
├─────────────────────────────────────────────────────────┤
│ FOOTER: Endereço | Telefone | WhatsApp | Links          │
└─────────────────────────────────────────────────────────┘
```

### Barricas de Papelão (`/barricas`)

```
┌─────────────────────────────────────────────────────────┐
│ HEADER (idêntico)                                       │
├─────────────────────────────────────────────────────────┤
│ HERO DO PRODUTO                                         │
│ "Barricas de Papelão para Indústria"                    │
│ Sub: aplicações principais — tintas, grafiato, vernizes │
│ [CTA: Solicitar amostra grátis — WhatsApp]              │
│ Foto do produto (placeholder)                           │
├─────────────────────────────────────────────────────────┤
│ ESPECIFICAÇÕES TÉCNICAS (tabela visível, sem login)     │
│ Capacidades disponíveis: XXL, XXL, XXL                  │
│ Material: papelão kraft multicamadas                    │
│ Resistência de empilhamento: até X kg                   │
│ Resistência à umidade: [sim/não/parcial]                │
│ Lote mínimo: XXX unidades                               │
│ Prazo de entrega: XX dias úteis                         │
├─────────────────────────────────────────────────────────┤
│ APLICAÇÕES POR SETOR (cards)                            │
│ Tintas e Vernizes | Grafiato | Construção               │
├─────────────────────────────────────────────────────────┤
│ ELIMINA OBJEÇÕES                                        │
│ "Medo de trocar de fornecedor?"                         │
│ → Amostra grátis sem compromisso                        │
│ → Processo em 3 passos                                  │
│ → Garantia de prazo                                     │
├─────────────────────────────────────────────────────────┤
│ CTA FINAL                                               │
│ [Solicitar amostra — WhatsApp]                          │
│ [Tirar dúvida técnica — WhatsApp]                       │
├─────────────────────────────────────────────────────────┤
│ FOOTER                                                  │
└─────────────────────────────────────────────────────────┘
```

### Baldes Plásticos (`/baldes`)

Estrutura idêntica à de Barricas, com:

- Specs técnicas de baldes (material plástico, capacidades, resistência química)
- Aplicações: produtos para construção, químicos industriais, agroquímicos
- Mesmos CTAs de WhatsApp

### Contato (`/contato`)

```
┌─────────────────────────────────────────────────────────┐
│ HEADER (idêntico)                                       │
├─────────────────────────────────────────────────────────┤
│ HERO: "Fale com a gente"                                │
│ Sub: "Resposta em até X horas — seg a sex"              │
├─────────────────────────────────────────────────────────┤
│ CARD WHATSAPP (destaque principal)                      │
│ Ícone grande de WhatsApp                                │
│ Número: (XX) XXXXX-XXXX                                 │
│ "Prefere chamar diretamente?"                           │
│ [Abrir WhatsApp agora]                                  │
├─────────────────────────────────────────────────────────┤
│ ENDEREÇO + MAPA                                         │
│ Americana-SP, CEP XXXXX-XXX                             │
│ [Google Maps embed ou link]                             │
├─────────────────────────────────────────────────────────┤
│ DADOS DA EMPRESA                                        │
│ CNPJ | Horário de atendimento | E-mail                  │
├─────────────────────────────────────────────────────────┤
│ FOOTER                                                  │
└─────────────────────────────────────────────────────────┘
```

---

## Botão WhatsApp Flutuante (global)

Presente em **todas as páginas**, em **todos os breakpoints**.

- Posição: fixed, bottom-right
- Mobile: ícone grande (48px+), z-index alto
- Mensagem pré-preenchida: "Olá! Vim pelo site e gostaria de saber mais sobre as embalagens."
- Não some em nenhum scroll

---

## Decisões de UX

| Decisão | Escolha | Motivo |
|---------|---------|--------|
| Canal de conversão | WhatsApp exclusivo | Preferência do mercado industrial brasileiro; zero fricção |
| Formulário | Nenhum | WhatsApp elimina necessidade; cada campo = menos conversão |
| Specs técnicas | Abertas, sem login | Ocultar spec afasta comprador industrial antes do contato |
| CTA primário | "Solicitar amostra grátis" | Remove objeção de risco de troca; baixo compromisso |
| Menu | Simples (4 itens) | MVP não tem muitas páginas; mega menu seria overkill |
| Depoimentos | Nome + cargo + empresa + resultado | Depoimento anônimo = valor zero |
| 404 | WhatsApp + links internos | Visitante nunca fica sem saída |

---

## Fluxo Mobile (crítico)

```
[Acessa pelo celular — muito comum para gerente industrial]
       |
       v
[Hero carrega em < 2s]
       |
       v
[Botão WhatsApp flutuante visível imediatamente]
       |
       v
[Scroll ergonômico — touch targets mínimo 44px]
       |
       v
[Toca no WhatsApp → app do WhatsApp abre direto]
       |
       v
[Contato estabelecido sem nenhum formulário]
```

---

*Gerado em: 2026-03-25*
