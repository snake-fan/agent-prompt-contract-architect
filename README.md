# Agent Prompt Contract Architect

Project-local agent skill for generating structured **System Prompt Templates**.

The skill helps an agent turn available upstream context plus an **Agent Operating Frame** into a clear prompt template with responsibilities, reasoning protocol, execution flow, deliverable expectations, and boundary notes.

## Install

### Directly from GitHub with npx

After this repo is pushed to GitHub, install the skill with:

```sh
npx github:snake-fan/agent-prompt-contract-architect
```

By default, the installer copies `skill/SKILL.md` to:

```text
~/.agents/skills/prompt-template-generation
```

The installer respects these locations in order:

1. `AGENTS_SKILLS_DIR`
2. `CODEX_HOME/skills`
3. `~/.agents/skills`

Use a custom skills directory when needed:

```sh
npx github:snake-fan/agent-prompt-contract-architect --dir ~/.agents/skills
```

Replace an existing install:

```sh
npx github:snake-fan/agent-prompt-contract-architect --force
```

Preview without writing files:

```sh
npx github:snake-fan/agent-prompt-contract-architect --dry-run
```

If your npm version treats installer flags as npx flags, pass them after `--`:

```sh
npx github:snake-fan/agent-prompt-contract-architect -- --dry-run
```

### After publishing to npm

If this package is published under its package name, the shorter command becomes:

```sh
npx agent-prompt-contract-architect
```

### skills CLI style

This repo also includes `.claude-plugin/plugin.json`, matching the convention used by repositories such as `mattpocock/skills`. Installers that understand that convention can consume the repo directly, for example:

```sh
npx skills@latest add snake-fan/agent-prompt-contract-architect
```

## Use

Once installed, ask the agent to use the `prompt-template-generation` skill when you need to generate, refactor, architect, or improve a system prompt template for a target agent.

The skill is designed to:

- use available upstream context without requiring every context type to exist
- combine that context with the target agent's operating frame
- clarify only blocking gaps before generation
- output a system prompt template, not construction-time notes
- keep recommended sections flexible rather than mandatory

## Repository Layout

```text
.
|-- skill/
|   `-- SKILL.md
|-- bin/
|   `-- install-skill.mjs
|-- .claude-plugin/
|   `-- plugin.json
|-- CONTEXT.md
|-- package.json
`-- README.md
```

## Development

Run the installer in dry-run mode:

```sh
npm run install:dry-run
```

Inspect the npm package contents:

```sh
npm run pack:dry-run
```

Install locally into a temporary directory:

```sh
node bin/install-skill.mjs --dir /tmp/agent-skills-test --force
```
