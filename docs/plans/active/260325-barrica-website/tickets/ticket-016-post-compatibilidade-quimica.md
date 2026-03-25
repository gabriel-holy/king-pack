<!-- Lock: Zyra-4c8e | done | 2026-03-25T00:00:00Z -->
# Ticket 016 — Post 3: Guia de Compatibilidade Química

## Objetivo

Implementar o post "Guia de Compatibilidade Química: Qual Material de Embalagem Resiste ao Seu Produto?" no blog.

## Ação

1. Copiar `docs/plans/active/260325-barrica-website/content/blog/guia-compatibilidade-quimica-embalagem.md` para `src/content/blog/`
2. Verificar frontmatter compatível com schema
3. Verificar que a tabela expandida (15+ produtos) renderiza corretamente
4. Verificar links internos
5. Build passando

## Conteúdo

Texto completo já escrito em `content/blog/guia-compatibilidade-quimica-embalagem.md`.

**Keywords:** compatibilidade química embalagem, PEAD compatibilidade, embalagem produtos químicos
**Dados-chave:** Tabela expandida 15+ produtos, mecanismo de falha PEAD/celulose, fontes INEOS/Calpac

## Acceptance Criteria

- [x] Post acessível em /blog/guia-compatibilidade-quimica-embalagem
- [x] Tabela expandida renderizando corretamente (sem scroll horizontal em desktop)
- [x] Article schema presente
- [x] Meta tags corretas
- [x] Links internos funcionando
- [x] Build passando

## Dependências

- Ticket 012 (setup técnico do blog)
- Paralelizável com tickets 014-015, 017-020
