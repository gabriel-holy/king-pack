# Brief — Website Fábrica de Barricas e Baldes

## Intent Lock

> Construir um site institucional B2B em Astro + Tailwind que posiciona a fábrica de Americana-SP como fornecedor industrial confiável e converte visitantes que pesquisam embalagens online em leads qualificados — onde todo ponto de conversão é um botão de WhatsApp direto para o dono da fábrica, sem login, sem formulário complexo.

**Esta frase é imutável. Todo artefato deste epic referencia este objetivo.**

---

## Problema

A fábrica fabrica barricas de papelão e baldes plásticos para indústrias de tintas, grafiato, vernizes, químicos e agroquímicos. Não tem presença digital. Compete apenas via indicação e relacionamento direto.

**Consequências diretas:**

- 70% das decisões de compra B2B são tomadas antes do comprador falar com qualquer vendedor — sem site, a empresa não existe nessa fase
- Prospects que pesquisam "barrica papelão 200L SP" no Google não chegam até a empresa
- Novos compradores que pesquisam fornecedores online formam impressão negativa (ou nula) antes de qualquer contato
- Cada prospect novo consome tempo do comercial respondendo perguntas que um site resolveria

---

## Escopo

### IN — O que este epic entrega (MVP)

- **4 páginas:** Home, Barricas de Papelão, Baldes Plásticos, Contato
- Todos os componentes com copy e estrutura de informação prontos
- Conteúdo placeholder realista (textos, métricas, depoimentos de exemplo)
- SEO técnico completo (meta tags, sitemap, robots.txt, structured data para LocalBusiness)
- **Todos os CTAs são botões de WhatsApp** — nenhum ponto de conversão exige login ou cadastro
- Botão de WhatsApp flutuante em todas as páginas
- Mobile responsivo e performance otimizada (Core Web Vitals)
- Deploy-ready para Vercel ou Netlify (exportação estática)
- Estrutura de rotas preparada para Setores e Cases (epic futuro)

### OUT — O que este epic NÃO entrega

- Páginas de setores (Tintas, Construção Civil, Agroquímicos) — epic futuro
- Página de Cases e Depoimentos — epic futuro
- Página Nossa Fábrica — epic futuro
- Conteúdo real (fotos profissionais, dados reais, depoimentos reais) — responsabilidade do dono
- Formulário com processamento backend — WhatsApp substitui formulário
- Sistema de blog com CMS
- E-commerce ou orçamento online automatizado

---

## Personas

| Persona | Dor principal | O que precisa encontrar |
|---------|--------------|------------------------|
| **Gerente de Compras** | Fornecedor confiável, sem risco de troca | Prazo, lote mínimo, anos de mercado, clientes atendidos |
| **Gerente de Produção** | Embalagem que não falha no processo | Specs técnicas, materiais, compatibilidade por produto |
| **Responsável de Logística** | Embalagem que aguenta transporte e empilhamento | Dimensões, resistência de empilhamento, prazo de reposição |
| **Diretor / Dono** | Fornecedor sólido de longo prazo | Tempo de mercado, clientes conhecidos, solidez da empresa |

---

## Páginas do Site — MVP

| # | Página | Objetivo | Status |
|---|--------|---------|--------|
| 1 | Home (`/`) | Converter visitante em lead — primeiro impacto, prova social, CTAs WhatsApp | **MVP** |
| 2 | Barricas de Papelão (`/barricas`) | Specs técnicas, variantes, aplicações, CTA WhatsApp | **MVP** |
| 3 | Baldes Plásticos (`/baldes`) | Specs técnicas, variantes, aplicações, CTA WhatsApp | **MVP** |
| 4 | Contato (`/contato`) | WhatsApp + mapa + dados da empresa | **MVP** |
| 5 | Setor: Tintas e Vernizes (`/setores/tintas`) | Copy segmentado + prova social | *Epic futuro* |
| 6 | Setor: Construção Civil (`/setores/construcao`) | Copy segmentado + prova social | *Epic futuro* |
| 7 | Setor: Agroquímicos (`/setores/agroquimicos`) | Copy segmentado + prova social | *Epic futuro* |
| 8 | Nossa Fábrica (`/fabrica`) | Credibilidade — fotos, capacidade, certificações | *Epic futuro* |
| 9 | Cases (`/cases`) | Prova social consolidada | *Epic futuro* |

---

## Constraints

- **Stack:** Astro v4+ com Tailwind CSS v3+
- **Deploy:** Estático (Netlify/Vercel) — sem backend próprio
- **Conteúdo:** Todos os textos e números são placeholders realistas — estrutura pronta para substituição
- **Conversão:** 100% via botões de WhatsApp — sem formulário backend, sem processamento server-side
- **Imagens:** Usar Unsplash/stock industrial como placeholder, com comentários indicando o tipo de foto necessária
- **Performance:** LCP < 2.5s, CLS < 0.1, FID < 100ms
- **SEO:** Páginas indexáveis, meta tags por página, structured data para LocalBusiness e Product
- **Sem CMS:** Dev é o próprio dono do site — edição direta nos arquivos `.astro`

---

## Success Metrics (pós-lançamento)

| Métrica | Baseline | Target 6 meses |
|---------|----------|----------------|
| Leads via WhatsApp/formulário | 0/mês | 5+ qualificados/mês |
| Posição no Google "barrica papelão SP" | Ausente | Top 10 |
| Taxa de conversão (visitante → contato) | - | ≥ 2% |
| Core Web Vitals — todas as páginas | - | Todas verdes |

---

## Boas Práticas Adicionais (Lovable — Industrial Website Design)

Incorporadas ao brief a partir de pesquisa específica sobre sites industriais que convertem:

- **Performance:** target < 2.4s de carregamento — cada 100ms de atraso reduz conversão em 7%
- **Desktop-first:** compradores industriais pesquisam em horário comercial, no desktop — mobile deve funcionar, mas o design prioriza desktop
- **Certificações:** exibir acima da dobra, com número e data de emissão — credibilidade instantânea
- **Cases com números:** estrutura problema → solução → resultado, com ROI em percentual — "35% de aumento na conversão" supera qualquer elogio genérico
- **Trust > preço:** confiança e valores superam preço como driver primário de compra B2B — a proposta de valor do site deve comunicar solidez, não desconto
- **Escaneabilidade:** compradores fazem scanning, não leitura — hierarquia visual que entrega o ponto crítico de cada seção em < 3 segundos
- **67% dos compradores B2B** confiam mais em conteúdo do que no ano anterior para decisões de compra — conteúdo técnico é ativo de vendas, não só SEO

---

## Referências

- **FourJaw** (fourjaw.com) — referência principal de arquitetura e copy B2B industrial
- **Beckwood Press** (beckwoodpress.com) — referência de fabricante físico com catálogo bem organizado
- **Altium Packaging** (altiumpkg.com) — segmento mais próximo (embalagens plásticas industriais)
- **Lovable Guide** — Industrial Website Design Examples That Convert (pesquisa de março/2026)

---

*Epic criado em: 2026-03-25*
*Status: PENDING*
