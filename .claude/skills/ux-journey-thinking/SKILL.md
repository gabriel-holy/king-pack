---
name: ux-journey
description: "Framework de pensamento para design de jornada de usuario antes de desenvolver qualquer frontend ou feature. Use SEMPRE que o usuario mencionar: criar uma nova tela, desenhar um fluxo, pensar numa feature, planejar UX, 'antes de codar quero pensar', design de interface, experiencia do usuario, onboarding, fluxo de usuario, wireframe conceitual, ou qualquer variacao de 'quero pensar na jornada antes de desenvolver'. Tambem use quando o usuario pedir review de UX, critique de um fluxo existente, ou quiser melhorar a experiencia de uma feature ja implementada. Esta skill NAO gera codigo — ela gera pensamento estruturado, decisoes de design e specs de UX que alimentam o desenvolvimento posterior."
---

# UX Journey Thinking Framework

## Quando usar esta skill

Antes de qualquer desenvolvimento frontend ou de feature. O objetivo e **pensar antes de codar** usando os mesmos frameworks mentais dos designers de elite de empresas como Apple, Linear, Stripe, Airbnb e Spotify.

Esta skill produz um **UX Thinking Document** — um artefato de pensamento estruturado, nao codigo.

-----

## Processo: 6 Etapas

Siga estas etapas em ordem. Para cada etapa, faca as perguntas ao usuario se a resposta nao for obvia pelo contexto.

-----

### Etapa 1: Job To Be Done (JTBD)

Antes de qualquer coisa, defina o progresso humano que o usuario quer fazer.

**Pergunta central:** "Qual e o progresso que a pessoa quer fazer na vida dela ao usar isso?"

Formato de resposta:

```
JTBD: Quando [situacao], eu quero [motivacao], para que eu possa [resultado desejado].
```

**Regras:**

- NUNCA formule o JTBD como uma tarefa funcional ("filtrar lista", "clicar botao")
- SEMPRE formule como progresso emocional/pessoal ("sentir confianca", "reduzir ansiedade", "ganhar tempo")
- Se o usuario der um JTBD funcional, reformule e peca confirmacao

**Exemplo ruim:** "Quero ver o historico de ordens"
**Exemplo bom:** "Quando estou avaliando minha performance, quero entender rapidamente se minhas decisoes foram boas, para que eu possa ajustar minha estrategia com confianca."

-----

### Etapa 2: Mapeamento dos 5 Momentos Criticos

Para a feature/tela em questao, mapeie explicitamente:

| Momento | Pergunta-chave | O que projetar |
|---|---|---|
| **First Contact** | O que a pessoa ve nos primeiros 5 segundos? Ela entende o que fazer? | Clareza absoluta. Zero ambiguidade. |
| **Aha Moment** | Em que instante o valor fica obvio? | Projetar PARA esse instante. Reduzir tudo que esta entre o usuario e esse momento. |
| **Habit Loop** | O que traz a pessoa de volta? Existe um gatilho recorrente? | Rituais, notificacoes com valor, estados que mudam ao longo do tempo. |
| **Friction Points** | Onde a pessoa pode desistir ou se confundir? | Eliminar friccao desnecessaria. Manter friccao intencional (confirmacoes de acoes destrutivas, feedback de processamento). |
| **Peak-End** | Qual e o pico emocional? Como termina a interacao? | O final deve ser positivo. O pico deve ser memoravel. (Regra de Kahneman) |

**Instrucao para Claude:** Preencha a tabela com hipoteses concretas baseadas no contexto do usuario. Se nao tiver informacao suficiente, pergunte.

-----

### Etapa 3: Analise de Estados

Toda tela tem multiplos estados. Os designers de elite projetam TODOS, nao so o "happy path".

Para cada tela/componente, considere:

1. **Estado Vazio (Empty State)** — Primeira vez, sem dados. Este e o mais negligenciado e o mais importante. Deve parecer um convite, nao um vazio.
1. **Estado de Carregamento (Loading)** — O que a pessoa ve enquanto espera? Skeleton screens > spinners. Conteudo parcial > tela em branco.
1. **Estado Ideal (Happy Path)** — Tudo funcionando, dados populados. A maioria dos designers so projeta isso.
1. **Estado de Erro** — Algo deu errado. A mensagem deve: explicar o que aconteceu, em linguagem humana; sugerir o que fazer; nunca culpar o usuario.
1. **Estado Parcial** — Dados incompletos, acao pela metade. Ex: formulario preenchido parcialmente, lista com poucos itens.
1. **Estado de Sucesso** — Acao completada. Feedback claro e celebracao proporcional a importancia da acao.
1. **Estado de Limite/Edge** — Dados extremos: listas com 1000+ itens, textos muito longos, numeros negativos, zero.

**Instrucao para Claude:** Liste quais estados se aplicam a feature em questao e descreva brevemente como cada um deve se comportar.

-----

### Etapa 4: Progressive Disclosure & Carga Cognitiva

Aplique estes principios:

**Lei de Hick:** Cada opcao adicional aumenta o tempo de decisao logaritmicamente. Menos opcoes = decisoes mais rapidas.

**Progressive Disclosure:** Mostre apenas o que e necessario agora. Revele complexidade conforme a confianca do usuario cresce.

Para a feature em questao, responda:

- **O que e essencial na primeira visualizacao?** (nivel 1 — visivel imediatamente)
- **O que pode ser revelado sob demanda?** (nivel 2 — hover, clique, expansao)
- **O que e avancado e pode ficar escondido?** (nivel 3 — settings, menus secundarios)

**Regra de ouro:** Se voce precisa de um tooltip para explicar um elemento, esse elemento provavelmente esta complexo demais ou no lugar errado.

-----

### Etapa 5: Microinteracoes & Feedback Emocional

Defina o feedback sensorial para cada acao do usuario:

| Acao do Usuario | Feedback Esperado | Timing |
|---|---|---|
| Clique/tap em acao primaria | Feedback visual imediato (cor, escala) | < 100ms |
| Submissao de formulario | Estado de loading -> confirmacao | Loading < 2s ideal |
| Erro | Destaque do campo + mensagem inline | Imediato |
| Acao destrutiva | Confirmacao com undo > modal de "tem certeza?" | — |
| Conquista/milestone | Celebracao proporcional a importancia | Imediato |

**Principios:**

- Prefira **undo** a **confirmacao preventiva** (Gmail "desfazer envio" > "tem certeza que quer enviar?")
- Animacoes devem comunicar significado, nao decorar
- Transicoes entre estados devem ser suaves (150-300ms ease-out)
- Feedback tatil/visual deve confirmar que o sistema "ouviu" o input

-----

### Etapa 6: Sintese — UX Decision Record

Consolide tudo em um documento de decisao:

```markdown
# UX Decision Record: [Nome da Feature]

## JTBD
[Da etapa 1]

## Momentos Criticos
[Da etapa 2 — versao resumida]

## Estados Projetados
[Da etapa 3 — lista dos estados relevantes com decisoes]

## Hierarquia de Informacao
- Nivel 1 (visivel): ...
- Nivel 2 (sob demanda): ...
- Nivel 3 (avancado): ...

## Decisoes de Microinteracao
[Da etapa 5 — as mais importantes]

## O que NAO fazer (anti-patterns evitados)
- [Liste decisoes conscientes de remocao]

## Proximos Passos
- [ ] Prototipar estado vazio
- [ ] Prototipar happy path
- [ ] Prototipar estados de erro
- [ ] Validar com 3 usuarios reais
```

-----

## Principios Inegociaveis (referencia rapida)

Tenha estes principios sempre em mente ao aplicar as etapas:

1. **Perfeicao e remocao, nao adicao.** Se algo pode ser removido sem perda, remova.
1. **Projete para estados emocionais, nao para telas.** A pessoa esta ansiosa? Confiante? Confusa? Isso muda tudo.
1. **Carga cognitiva e o inimigo.** Cada campo, botao ou opcao e uma decisao que o usuario precisa tomar.
1. **O estado vazio e a primeira impressao.** Trate-o como um tapete vermelho, nao como uma sala vazia.
1. **Friccao intencional > friccao acidental.** Adicione atrito onde protege o usuario. Remova onde atrasa.
1. **Meca comportamento, nao opiniao.** O que as pessoas fazem importa mais do que o que dizem.
1. **Peak-End Rule.** O pico emocional e o momento final definem a memoria da experiencia inteira.
1. **Consistencia > criatividade.** Padroes familiares reduzem atrito. Invente apenas quando o ganho justifica o custo de aprendizado.

-----

## Formato de Output

Quando esta skill for ativada, Claude deve:

1. Identificar qual feature/tela o usuario quer pensar
1. Percorrer as 6 etapas, preenchendo com informacoes do contexto e perguntando o que faltar
1. Produzir o **UX Decision Record** como entregavel final
1. O documento pode ser gerado como Markdown (.md) para consulta futura

**Nota:** Esta skill NAO gera codigo, wireframes visuais ou prototipos. Ela gera o pensamento estruturado que precede e informa essas atividades.
