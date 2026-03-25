<!-- Lock: Kayn-2e7b | done | 2026-03-25T18:20:00Z -->
# Ticket 014 — Post 1: Barrica de Papelão ou Lata

## Objetivo

Implementar o post "Barrica de Papelão ou Lata: Qual a Embalagem Certa Para Cada Tipo de Tinta?" no blog.

## Ação

1. Copiar `docs/plans/active/260325-barrica-website/content/blog/barrica-papelao-ou-lata-embalagem-tinta.md` para `src/content/blog/`
2. Verificar que o frontmatter está compatível com o schema da Content Collection (ticket 012)
3. Verificar links internos para /barricas e /baldes
4. Verificar que tabelas renderizam corretamente no template
5. Build passando

## Conteúdo

Texto completo já escrito em `content/blog/barrica-papelao-ou-lata-embalagem-tinta.md`.

**Keywords:** barrica de papelão para tinta, embalagem para tinta, tinta base água embalagem
**Dados-chave:** Tabela de compatibilidade química, 75% tintas base água (ABRAFATI), mecanismo de falha celulose/PEAD

## Acceptance Criteria

- [x] Post acessível em /blog/barrica-papelao-ou-lata-embalagem-tinta
- [x] Tabela de compatibilidade renderizando corretamente
- [x] Article schema (JSON-LD) presente
- [x] Meta tags (OG, Twitter, description) corretas
- [x] Links internos funcionando
- [x] Build passando

## Dependências

- Ticket 012 (setup técnico do blog)
- Paralelizável com tickets 015-020
