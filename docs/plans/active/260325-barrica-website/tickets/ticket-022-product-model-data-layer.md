<!-- Lock: Ornn-7f2a | done | 2026-03-25T00:00:00Z -->

# Ticket 022 — Data Layer: ProductModel com Dimensões Numéricas

> **Epic:** Website Fábrica de Barricas e Baldes
> **Tipo:** Data/Refactor
> **Dependencies:** nenhuma

---

## Escopo

### O que este ticket FAZ

- Criar tipo `ProductModel` em `src/data/products.ts` com dimensões numéricas separadas
- Migrar dados de modelos que hoje estão hardcoded nas páginas (`barricas.astro`, `baldes.astro`) para `products.ts`
- Exportar arrays `barricaModels` e `baldeModels` tipados

### O que este ticket NÃO faz

- Não altera as páginas (o import muda no ticket-025)
- Não cria componentes visuais
- Não altera o tipo `ProductSpec` existente

---

## Spec References

- Decisão do challenge-me: campos `diameter`, `height` numéricos para cálculo de proporções SVG
- Decisão do challenge-me: `label` com nome legível ("Barrica 14L") para exibição em abas

---

## Tipo a Criar

```typescript
export type ProductModel = {
  model: string;        // "BP-14" (interno, nunca exibido na UI)
  label: string;        // "Barrica 14L" (exibido nas abas)
  capacity: string;     // "14L"
  diameter: number;     // 260 (mm)
  height: number;       // 320 (mm)
  wall: string;         // "3mm dupla"
  lining: string;       // "Opcional (PE)"
  stackingMax: number;  // 3
}
```

## Dados a Migrar

### Barrica Models

| model | label | capacity | diameter | height | wall | lining | stackingMax |
|-------|-------|----------|----------|--------|------|--------|-------------|
| BP-14 | Barrica 14L | 14L | 260 | 320 | 3mm dupla | Opcional (PE) | 3 |
| BP-16 | Barrica 16L | 16L | 270 | 340 | 3mm dupla | Opcional (PE) | 3 |
| BP-18 | Barrica 18L | 18L | 280 | 360 | 3mm dupla | Opcional (PE) | 3 |
| BP-20 | Barrica 20L | 20L | 290 | 380 | 3mm dupla | Opcional (PE) | 3 |

### Balde Models

| model | label | capacity | diameter | height | wall | lining | stackingMax |
|-------|-------|----------|----------|--------|------|--------|-------------|
| BL-3.6 | Balde 3,6L | 3,6L | 190 | 170 | 1.2mm PP | Natural | 3 |
| BL-5 | Balde 5L | 5L | 210 | 190 | 1.2mm PP | Natural | 3 |
| BL-10 | Balde 10L | 10L | 260 | 250 | 1.5mm PEAD | Natural / Colorido | 3 |
| BL-18 | Balde 18L | 18L | 310 | 340 | 1.8mm PEAD | Natural / Colorido | 3 |
| BL-20 | Balde 20L | 20L | 320 | 360 | 2.0mm PEAD | Natural / Colorido | 3 |

---

## Arquivos a Modificar

| Arquivo | Mudança |
|---------|---------|
| `src/data/products.ts` | Adicionar tipo `ProductModel`, exportar `barricaModels` e `baldeModels` |

---

## Acceptance Criteria

- [x] Tipo `ProductModel` exportado de `products.ts`
- [x] `barricaModels: ProductModel[]` exportado com 4 modelos
- [x] `baldeModels: ProductModel[]` exportado com 5 modelos
- [x] Todos os modelos com `diameter` e `height` numéricos
- [x] Todos os modelos com `label` legível para o cliente
- [x] `astro check` sem erros
- [x] Build sem erros

---

*Ticket criado em: 2026-03-25*
