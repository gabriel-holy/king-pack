---
name: plan-epic
description: "Transform a PRD or feature description into a structured epic with specs, tickets, and invariants. Guided sequential workflow: Trigger → Brief → Core Flows → Tech Plan → Ticket Breakdown, with Challenge Me checkpoints after each step. Use when the user wants to plan a complex feature from a PRD, needs structured epic planning, or says '/plan-epic'. Triggers on: 'plan epic', 'create epic', 'PRD to plan', 'epic from PRD', or any complex feature planning that involves multiple domains, >5 phases, or ambiguous requirements."
---

# Plan Epic

Transform a PRD or feature description into a structured, multi-file epic with specs, tickets, and domain invariants. Inspired by Traycer Epic Mode but adapted for the pm-labs planning system.

**Skip this skill** for: bug fixes, single-file changes, refactors with clear scope (<5 steps). Use `TEMPLATE-PLAN.md` instead.

---

## Input

The skill accepts ONE of:

1. **PRD path:** `product-development/current-feature/PRD.md` (or any `.md` in `product-development/`)
2. **Feature description:** Free-form text describing what to build

If a PRD path is provided, read it first. If not, the Trigger step handles elicitation from scratch.

---

## Output Structure

The skill generates a folder in `docs/plans/backlog/`:

```text
docs/plans/backlog/YYMMDD-epic-name/
  README.md              <- Index (ticket status, dependency graph)
  brief.md               <- Epic Brief (problem, scope, constraints)
  core-flows.md          <- User flows + UX decisions (optional)
  tech-plan.md           <- Architecture, files, data flow, invariants
  tickets/
    ticket-001-name.md   <- Atomic ticket + invariants + acceptance criteria
    ticket-002-name.md
    ...
```

Use the templates from `docs/plans/epic-templates/` as the base for each file.

---

## Workflow: 5 Sequential Steps

Execute in strict order. Never skip a step (except Core Flows when explicitly not applicable). Each step produces one or more files. Each step ends with a Challenge Me checkpoint.

```text
Step 1: Trigger    → brief.md
Step 2: Core Flows → core-flows.md (optional)
Step 3: Tech Plan  → tech-plan.md
Step 4: Tickets    → tickets/*.md + README.md
Step 5: Handoff    → summary + execution options
```

---

## Step 1: Trigger — Elicitation

**Goal:** Build shared understanding of the problem before writing any specs.

### If PRD exists

1. Read the PRD file completely
2. Read `product-development/resources/product.md` for product context
3. Identify gaps, ambiguities, and unstated assumptions in the PRD
4. Ask the user 2-3 targeted questions about the gaps (use `AskUserQuestion` with options)

### If no PRD

1. Read the user's feature description
2. Explore the codebase to understand relevant domains and existing patterns
3. Ask clarifying questions in rounds (max 3 rounds):

| Round | Focus | Question Style |
|-------|-------|----------------|
| 1 | Scope | What is IN and OUT? Who uses it? |
| 2 | Constraints | Timeline, infra limits, dependencies on existing work |
| 3 | Edge cases | What can go wrong? What if X fails? Concurrent access? |

Use `AskUserQuestion` with concrete options whenever possible — avoid open-ended questions.

### Generate brief.md

After elicitation, create the epic folder and write `brief.md` using `docs/plans/epic-templates/brief-template.md`.

**Critical:** The **Intent Lock** at the top of `brief.md` (and `README.md`) is 1-2 sentences that capture the core objective. This line is NEVER edited after creation. Every subsequent artifact references it to prevent drift.

### Challenge Checkpoint — Brief

After writing `brief.md`, challenge the user:

- Is the problem statement precise? Any ambiguity?
- Is the scope right? Something missing? Something that should be OUT?
- Are the constraints realistic?
- Are there unstated assumptions hiding?

Ask these as pointed questions. Resolve each branch before moving on. If the user identifies issues, update `brief.md` (but never the Intent Lock).

---

## Step 2: Core Flows (Optional)

**Goal:** Map how the user interacts with the feature before designing the tech.

**Skip when:** Feature is purely backend/domain with no user-facing flows. Ask the user: "This feature has user-facing flows, or is it purely backend?" If backend-only, skip to Step 3 and mark core-flows as "skipped" in README.md.

### Generate core-flows.md

1. Map primary user flow (happy path) as a step-by-step sequence
2. Map error paths and alternative flows
3. Define information hierarchy (what the user sees first)
4. Include wireframes (ASCII or Mermaid) when they clarify
5. Document UX decisions as a decision table

Use `docs/plans/epic-templates/core-flows-template.md` as base.

### Challenge Checkpoint — Core Flows

- Do these flows cover all scenarios from the brief?
- Any UX edge case missing?
- Does the information hierarchy make sense?
- Is there a simpler flow that achieves the same goal?

---

## Step 3: Tech Plan + Invariant Identification

**Goal:** Design the technical architecture and identify domain invariants BEFORE writing tickets.

### Explore the codebase

Before designing, understand what exists:

1. Search for related domains, entities, and patterns using Grep/Glob
2. Read existing entity files to understand current invariants
3. Check `docs/domain/` for domain documentation
4. Check `docs/architecture/` for infrastructure context

### Generate tech-plan.md

Using `docs/plans/epic-templates/tech-plan-template.md`:

1. **Architecture Overview** — Components, their responsibilities, how they connect
2. **Data Flow** — Input → Transform → Store → Read → Output
3. **Files to Create/Modify** — Exact paths, line references where applicable
4. **Reuse** — Reference existing functions, utilities, patterns that should be reused (with file paths)

### Identify Domain Invariants

This is the critical differentiator. For every domain entity or value object involved:

1. Search existing invariants in the codebase:
   ```
   Grep pattern="Result\.err" path="domains/"
   ```
2. Read the PM Labs domain invariants reference (from invariant-driven-design skill):
   - Wallet: balance never negative
   - Order: remaining + filled = initial
   - Price: yes + no = 100
   - Settlement: unique per (account_id, market_id), immutable
   - Transactions: immutable append-only
   - Money: integer cents, never float
   - Time: UTC, always TimestampUtc
3. Identify NEW invariants this feature introduces
4. Classify each invariant:

| Type | Example | Where Enforced |
|------|---------|----------------|
| Construction | Money must have integer cents | Value object factory |
| State transition | Settled order cannot be cancelled | Entity method |
| Cross-field | `yes_price + no_price = 100` | Entity method |
| Aggregate | `remaining + filled = initial` | Entity method |
| Persistence | Unique `(account_id, market_id)` | DB constraint + service |

Write all invariants in the `Domain Invariants` section of `tech-plan.md`.

### Challenge Checkpoint — Tech Plan + Invariants

- Is this the simplest architecture that solves the problem?
- Any over-engineering? Any YAGNI?
- Are the invariants complete? Any business rule missing?
- Are the file paths correct? Any existing code that should be reused but was missed?
- Does the data flow make sense end-to-end?

---

## Step 4: Ticket Breakdown

**Goal:** Decompose the tech plan into atomic, independently implementable tickets.

### Decomposition Rules

1. Each ticket is a **vertical slice** — it delivers one unit of value
2. Each ticket is **independently testable** — it has its own acceptance criteria
3. Each ticket **references specs** — links back to brief, core-flows, tech-plan
4. Each ticket **lists its invariants** — copied from tech-plan, this is the contract
5. Tickets define **dependencies** explicitly — which tickets must be done first
6. Target **3-8 tickets** per epic. If more than 12, consider splitting into sub-epics

### Generate tickets

For each ticket, using `docs/plans/epic-templates/ticket-template.md`:

1. **Scope** — what this ticket does and does NOT do
2. **Spec References** — which parts of brief/core-flows/tech-plan to read
3. **Files** — exact paths to create/modify/test
4. **Invariants** — invariants this ticket must implement or respect (from tech-plan)
5. **Acceptance Criteria** — objective, verifiable (includes tests pass, typecheck, lint)
6. **Dependencies** — which tickets must be done first

### Add Lock Comments to Each Ticket

Every ticket file gets a lock comment at the top for agent coordination:

```markdown
<!-- Lock: - | pending | - -->
```

When an agent claims a ticket, it updates to:

```markdown
<!-- Lock: Agent-Name | in_progress | <ISO-8601-timestamp> -->
```

### Generate README.md

After all tickets, create `README.md` using `docs/plans/epic-templates/README-template.md`:

1. Fill the ticket status table
2. Draw the dependency graph (ASCII art showing layers)
3. Identify which tickets can run in parallel (same layer, no dependencies on each other)
4. **Fill the Execution Control table** — one row per ticket, all starting as `pending` with no agent assigned. This table is the single source of truth for agent-team parallel execution.
5. Fill the execution summary (total, parallelizable, layers)

### Challenge Checkpoint — Tickets

- Are the tickets truly independent? Any hidden coupling?
- Are the dependencies correct? Does the graph make sense?
- Does every invariant from the tech-plan appear in at least one ticket?
- Are the acceptance criteria objectively verifiable?
- Is the ticket count reasonable (3-8)? Too granular? Too coarse?

---

## Step 5: Handoff

**Goal:** Present the epic summary and let the user decide how to execute.

### Present summary

```text
Epic: [name]
Intent: [intent lock sentence]
Tickets: N total, M parallelizable across L dependency layers
Invariants: X domain invariants identified

Execution Control table ready in README.md
```

### Execution options

Ask the user how they want to execute (use `AskUserQuestion`):

1. **Parallel agent-teams** — Launch parallel agents for independent tickets. Agents claim tickets via Execution Control table in README.md. Best for large epics with many parallel tickets. The Execution Control table is already populated and ready.
2. **Sequential /spec** — Execute tickets one by one with full TDD + verification. Best for complex domain work where order matters.
3. **Manual handoff** — User picks tickets individually and executes with Claude. Best for learning/reviewing.
4. **Not now** — Epic stays in `backlog/` for later.

The skill does NOT execute tickets — it only prepares the handoff.

### Agent Coordination Protocol

When the user chooses parallel agent-teams, each agent follows this protocol:

1. Read `README.md` Execution Control table
2. Find an unclaimed ticket (`pending`) whose dependencies are all `done`
3. Update the table: write agent name, set `in_progress`, add timestamp
4. Update the ticket's lock comment: `<!-- Lock: Agent-Name | in_progress | timestamp -->`
5. Execute the ticket (TDD, implementation, verification)
6. Update the table: set `done`, add finish timestamp
7. Update the ticket's lock comment: `<!-- Lock: Agent-Name | done | timestamp -->`
8. Repeat from step 1 until no tickets remain

---

## Anti-Drift Mechanisms

These are baked into the workflow to prevent the three original pain points:

| Pain Point | Mechanism |
|------------|-----------|
| Drift of intent | **Intent Lock** — immutable sentence in every file. Challenge checkpoints validate alignment. |
| Lack of elicitation | **Step 1 is mandatory** — cannot skip to tech plan. Structured questions with AskUserQuestion. |
| Monolithic plans | **Multi-file structure** — each artifact is atomic, navigable, independently readable. |

---

## Markdown Output Compliance

All markdown output produced by this skill must pass markdownlint. Follow every rule below:

- **Headings**: ATX style (`#`), single space after `#`, increment by one level only, blank lines before and after, no trailing punctuation (`:` `.` `;` `!`), single top-level `#` per document, no duplicate heading text at the same level
- **Lists**: Use `-` for unordered, incrementing numbers (`1.` `2.` `3.`) for ordered, 2-space indent for nesting, blank lines before and after lists, single space after marker
- **Code blocks**: Backtick fences (not tildes), always specify language, blank lines before and after, no leading `$` in commands unless showing output
- **Emphasis**: `*italic*` and `**bold**` only (not underscores), no spaces inside markers
- **Links**: `[text](url)` format only, no bare URLs, no empty links, no spaces inside link text
- **Images**: Always include alt text: `![description](url)`
- **Spacing**: No trailing whitespace, no consecutive blank lines, no hard tabs, file ends with single newline
- **Tables**: Consistent pipe style, column count must match header
- **HTML**: No inline HTML — use markdown equivalents
- **Blockquotes**: Single space after `>`, no blank lines inside blockquotes
- **Horizontal rules**: Use `---` consistently

For the complete rule reference, read `.claude/skills/shared/markdown-lint-rules.md`.
