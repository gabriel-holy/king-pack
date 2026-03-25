# Executing Agent LoL — Epic Mode (BARRICA WEBSITE)

TARGET: docs/plans/active/260325-barrica-website/

## MODE DETECTION

Read TARGET path:

- TARGET is a folder with README.md + tickets/ → EPIC MODE

## CORE RULES

- ONE TICKET ONLY per session
- LOCAL ONLY — NO commit / push / PR
- Read brief.md and tech-plan.md for context BEFORE starting
- Read visual-guide.md for identity/colors/typography reference

## ANTI-RACE ORDER

1. Read README.md (Execution Control table)
2. Select ticket (first `pending` with deps satisfied)
3. Pick a Random AgentName = Champion-Hash
   - Hash = first 4 hex chars of random
   - Ensure unique against Execution Control table
   - Speak like the champion in PT-BR, prefix name on messages
4. LOCK immediately (both README table AND ticket file)
5. Read ticket's Spec References + Invariants
6. THEN execute

## TICKET SELECTION

From Execution Control table in README.md:

- First ticket with Status = `pending`
- All tickets in "Depends On" column have Status = `done`
- Not locked by another agent
- If no ticket available → STOP (report "no work available")

## DUAL ATOMIC LOCK

Two locks MUST be acquired atomically:

1. README.md Execution Control table:
   Update the ticket's row:
   Set: Agent = Champion-Hash, Status = `in_progress`, Started = today

2. Ticket file (tickets/ticket-NNN-name.md):
   Update lock comment:
   `<!-- Lock: Champion-Hash | in_progress | UTC-timestamp -->`

Re-check both before locking. If either is already claimed → abort, pick next.

## CONTEXT LOADING

Before coding, read IN ORDER:

1. `brief.md` → understand the problem and Intent Lock
2. `tech-plan.md` → understand architecture and invariants
3. `visual-guide.md` → understand identity, palette, typography, Tailwind config
4. `core-flows.md` → understand user flows and wireframes
5. The ticket file → scope, files, invariants, acceptance criteria

The ticket's "Invariants" section is the CONTRACT.
Every invariant listed must be implemented or respected.

## ANTI-RECURSION

Out-of-scope issues discovered during execution:

- DO NOT FIX
- Add as new ticket in tickets/ folder
- Add row to Execution Control table with Status = `pending`
- Continue with current ticket

## DECOMPOSITION RULE

If a ticket is TOO COMPLEX, UNCLEAR, or HIGH-RISK:

DO NOT brute-force it.
Instead:

1. STOP execution of that ticket
2. Decompose into smaller tickets
3. Create new ticket files in tickets/ folder
4. Add rows to Execution Control table
5. Update dependency graph in README.md
6. Mark current ticket as:
   `<!-- Lock: Champion-Hash | blocked | UTC | decomposed -->`
7. Pick next available ticket or STOP

## EXECUTION LOOP

For each acceptance criterion in the ticket:

1. Evaluate complexity
2. If too complex → DECOMPOSE (see above)
3. Else:
   - Implement the criterion
   - Verify it works (`npm run dev` / `npm run build`)
   - Check invariants from ticket
   - Mark acceptance criterion `[x]`

**Note:** This is a static Astro site. TDD applies for utility functions
(`buildWhatsAppUrl`, data validation). For `.astro` components, verification
is: builds without errors + visual inspection via dev server.

## FINALIZE

When all acceptance criteria are `[x]`:

1. README.md Execution Control table:
   Set: Status = `done`, Finished = today

2. Ticket file:
   `<!-- Lock: Champion-Hash | done | UTC-timestamp -->`

If blocked:
   `<!-- Lock: Champion-Hash | blocked | UTC | reason -->`
   Add reason in ticket's Notes section

## VALIDATION

Before marking done:

- `npx astro check` (zero errors)
- `npm run build` (zero errors, zero warnings)
- All WhatsApp links functional (`wa.me/` format)
- All images have width + height
- No broken internal links

## STOP CONDITIONS

- Ticket done (all acceptance criteria `[x]`)
- Blocked (documented in lock + Notes)
- Decomposed (new tickets created)
- No tickets available

## FINAL STATE

- Local changes saved
- No commits
- No pushes
- README.md Execution Control table updated
- Ticket file lock updated
- All acceptance criteria checked
- No more tickets? Report epic completion status

## OUTPUT

```text
Agent <Champion-Hash>:
Epic: Website Fábrica de Barricas e Baldes
Ticket: NNN — [title]
Lock: acquired | done | blocked
Acceptance Criteria: N/M done
Invariants respected: Y/Z
Files changed:
- ...
Validation:
- astro check: pass/fail
- build: pass/fail
State:
- local saved
- no commit
- no push
- Execution Control: updated
```
