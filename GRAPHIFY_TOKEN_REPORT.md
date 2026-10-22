# Graphify token report (Portfolio project)

Graphify 0.9.93 (`pip install graphifyy`), run 2026-10-22. Measured with `get_usage` ("Messages" category, session `self`), so numbers are context tokens, not billed tokens.

## Method and caveats
- Fixed tasks: **T1** where `DemoLab` is rendered and what data it uses; **T2** which files change to add a new nav-linked section; **T3** how Vercel deployment is configured.
- Baseline: Grep/Read only. Messages went 130 → 7,898 tokens for all three tasks combined. This was not split per task, and it includes a shared ~2.5k repo overview (`git ls-files`, `package.json`, `vercel.json`).
- After: `graphify query` / `explain`, as the installed CLAUDE.md rule instructs. Messages went 16,614 → 21,176, so +4.5k. That figure includes my own commentary, and 3 queries returned ~14 KB (~3.5k tokens).
- **Not a clean context.** I could not compact or fork from inside this session, and the baseline work was still in context. Results are indicative only. Per-task numbers below are estimates from output sizes (bytes / 4).
- The fixed overhead (tools, system prompt, skills, MCP) is ~78k tokens in either case. Graphify does not touch it.

## Results

| Task | Baseline (grep/read) | Graph-first | Answer quality with graph |
|---|---|---|---|
| T1 DemoLab | ~2.5k (2 greps + 2 file reads, DemoLab.jsx and App.jsx) | `query` ~1.6k, noisy: pulled in unrelated Python nodes and truncated edges. `explain src/components/DemoLab.jsx::DemoLab()` ~0.2k, precise: imported by App.jsx:9, called at App.jsx:61. | Correct only after the targeted `explain`. Data source (`demoLab`, site.js:296) was found by `query`. |
| T2 add a section | ~2k (grep + reads) | `query` ~1.6k, noisy (included doc nodes). `explain navLinks` ~0.1k: imported by Nav.jsx and Contact.jsx. | Partial. It found the importers, but not that App.jsx needs a `<section id>` or that Nav uses an IntersectionObserver over the ids. Those still needed a read. |
| T3 Vercel | ~3k (cat vercel.json, .vercelignore, package.json, vite.config grep) | `query` ~0.25k: only vercel.json top-level keys | Incomplete. No header values, no `.vercelignore`, no `vite.config.js` `assetsDir`. Needs a raw read anyway. |
| **Total** | **~7.8k (measured)** | **~4.5k measured, ~6.5k once the follow-up reads are added** | graph alone is not enough for 2 of 3 |

Net: roughly 0–15% fewer context tokens on these tasks, within the noise of my measurement. This is not a meaningful saving.

## Build cost
- 0 LLM tokens. I used `graphify update .` (AST-only, ~16 s, 302 nodes / 554 edges / 31 communities). Semantic extraction of the docs and Markdown needs an API key (Gemini etc.) and was not run.
- `.sql` files were not parsed (they need `pip install "graphifyy[sql]"`). `main.jsx` and `vite.config.js` yielded no symbols.
- Output is `graphify-out/` (graph.json 242 KB, graph.html 282 KB, GRAPH_REPORT.md 7 KB). It is gitignored, since it is regenerated.

## Break-even
There is no build token cost, so the only cost is the standing instructions. `CLAUDE.md` adds ~300 tokens per session, and two PreToolUse hooks add a reminder to every Bash/Grep/Read/Glob call (~50 tokens each, which I saw in the output). The 170-file repo is small enough that raw Grep/Read already costs ~1–3k per question. A graph query costs ~1.6k when it is noisy. Savings only appear with `explain`/`path` on a known symbol (~0.1–0.3k). Break-even is therefore roughly "never" on this repo, and about neutral if queries are narrow.

## Quality notes
- Node lookup and importer/caller edges were exact (`explain`).
- Free-text `query` mixed in unrelated nodes (the Python demo app, doc headings), and it truncated at its ~2k budget. It never returned config values or code bodies.
- Setting and layout questions such as T3 get no help, because JSON keys are indexed but not their values.

## Recommendation
Not worth it for this project. Keep it only if you want cheap "who imports / calls X" lookups: `graphify explain "path::symbol"` works well and costs little. Revisit on a much larger or unfamiliar codebase (several hundred files), where grep output balloons. The published "70x" figure was not reproduced here. Note that the integration makes the agent run a graph query before searching, which adds tokens on small repos.

To remove it: `graphify claude uninstall`, then delete `graphify-out/`.

## What was installed (project-scoped only)
- `pip install graphifyy` (user-level Python package). I skipped `graphify install`, which copies a skill into `~/.claude`, because the task said not to touch anything outside the folder. The CLI build and `claude install` do not need it.
- `CLAUDE.md` (new graphify rules) and `.claude/settings.json` (PreToolUse hooks). The hook command contains an absolute path to this machine's Python, so it is machine-specific.
- `.gitignore`: added `graphify-out/`.
