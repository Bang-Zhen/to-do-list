---
description: "Cleans up the clutter in the code"
---

Carefully analyze the entire working space and identify code, files, dependencies, and assets that are candidates for removal or consolidation — but do **not** edit or delete anything yourself. Before declaring any item “not needed,” perform a thorough, evidence-based analysis and produce explicit manual-edit instructions for me to apply. Your goal is to clear clutter while **preserving all existing functionality**.

Requirements and steps:

1. **Read and map the workspace**

   - Produce a file map (folders → files) and a quick dependency overview (package.json, major libraries).
   - Identify entry points, routes, UI screens, and key build outputs (bundles).
   - Identify test files and the test runner configuration.

2. **Static analysis (required evidence for each candidate)**

   - For every candidate file/module/component/asset flagged as unused or redundant, show:

     - A list of direct imports/references (source files that import or export it).
     - Search results for runtime references (strings, route names, dynamic imports).
     - Whether it appears in the build output (bundle analysis/tree-shaking).
     - Whether it appears in any test or CI script.

   - If language supports type analysis (TypeScript) or AST queries, include unused-export diagnostics or unreachable-code indicators.

3. **Dynamic / runtime checks (where possible)**

   - If runtime traces or logs are available, show whether the module is ever loaded during app usage flows.
   - If feasible, run the test suite and/or a build and indicate which files are included in final bundles. (If you cannot run tests/build, state that explicitly and rely on static evidence.)

4. **Package / dependency pruning**

   - Identify dependencies in package.json that appear unused by the codebase. Provide evidence (no imports/requires, not referenced in scripts, not in bundle).
   - For each candidate dependency, list potential side effects of removal and a rollback plan.

5. **Assets and styles cleanup**

   - Identify unused images, fonts, and CSS/SCSS rules (classes not referenced anywhere). Provide evidence and file paths.

6. **Manual-edit instructions only (must follow this)**

   - For every change you recommend, do **not** modify files yourself. Instead, provide:

     - Exact file path(s).
     - The specific lines or line range to delete (or an exact snippet to match).
     - The exact code segment(s) to add (with precise insertion point).
     - Any import or export changes required in other files (with exact lines to add/delete).
     - Suggested shell commands to move files, run build/tests, and run lint.

   - Group these instructions in small, self-contained patches so I can apply them one-by-one.

7. **Tests, QA, and acceptance criteria (must be explicit)**

   - Provide a runnable test checklist: unit tests to run, integration tests, and one-click build commands.
   - Provide a manual QA checklist covering critical app functions (e.g., login, calendar add/save, task add/complete/delete, theme persistence, modal visibility, multi-day event rendering). For each checklist item, describe expected behavior and how to reproduce it.
   - Define success criteria: all tests pass, build succeeds, and manual QA checklist items all behave as expected.

8. **Risk assessment and confidence score**

   - For each recommended removal, give a short risk statement and a confidence score (High/Medium/Low) based on the evidence you gathered. Note potential side effects and components that might be indirectly impacted.

9. **Final report (required)**

   - A concise report listing: files flagged, evidence summaries, manual edit instructions, QA checklist, commands to run, and confidence for each item.
   - Prioritize items by low-risk first (safe to deprecate) and high-risk last.

**Tone and constraints:**

- Do not perform any edits. Do not produce patches or PRs. Only provide instructions and commands for me to execute.
- Be conservative and evidence-driven: never mark something as unused without at least two independent pieces of evidence (e.g., no imports + not in bundle + not in tests).
- Preserve all existing functionality. If uncertain, mark the item as “Needs manual review” and provide the minimal steps I should take to test it.

**Deliverable format (copy-paste-ready):**

- File map and dependency overview (bullet list).
- For each candidate: (a) evidence block, (b) risk/confidence, (c) exact manual-edit instructions (file path, lines to delete, code to add), (d) QA checklist steps and test commands.
- Final prioritized list and overall instructions for proceeding.

Begin by producing the workspace file map and the top 10 highest-confidence candidates for safe deprecation, following the rules above.
