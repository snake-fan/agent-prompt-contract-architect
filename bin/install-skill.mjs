#!/usr/bin/env node

import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SKILL_NAME = "prompt-template-generation";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
const sourceDir = path.join(packageRoot, "skill");

const usage = `Install the prompt-template-generation skill.

Usage:
  npx agent-prompt-contract-architect [options]

Options:
  --dir <path>    Skills root directory. Defaults to AGENTS_SKILLS_DIR,
                  then CODEX_HOME/skills, then ~/.agents/skills.
  --name <name>   Installed skill directory name. Defaults to ${SKILL_NAME}.
  --force         Replace an existing installed skill directory.
  --dry-run       Print what would be installed without writing files.
  --help          Show this help.
`;

function parseArgs(argv) {
  const options = {
    dryRun: false,
    force: false,
    name: SKILL_NAME,
    dir: defaultSkillsRoot()
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }

    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    if (arg === "--force") {
      options.force = true;
      continue;
    }

    if (arg === "--dir") {
      options.dir = requireValue(argv, index, arg);
      index += 1;
      continue;
    }

    if (arg === "--name") {
      options.name = requireValue(argv, index, arg);
      index += 1;
      continue;
    }

    throw new Error(`Unknown option: ${arg}`);
  }

  return options;
}

function requireValue(argv, index, optionName) {
  const value = argv[index + 1];

  if (!value || value.startsWith("--")) {
    throw new Error(`${optionName} requires a value.`);
  }

  return value;
}

function defaultSkillsRoot() {
  if (process.env.AGENTS_SKILLS_DIR) {
    return process.env.AGENTS_SKILLS_DIR;
  }

  if (process.env.CODEX_HOME) {
    return path.join(process.env.CODEX_HOME, "skills");
  }

  return path.join(os.homedir(), ".agents", "skills");
}

function expandHome(inputPath) {
  if (inputPath === "~") {
    return os.homedir();
  }

  if (inputPath.startsWith("~/")) {
    return path.join(os.homedir(), inputPath.slice(2));
  }

  return inputPath;
}

function copyDirectory(source, target) {
  mkdirSync(target, { recursive: true });

  for (const entry of readdirSync(source)) {
    const sourcePath = path.join(source, entry);
    const targetPath = path.join(target, entry);
    const stat = statSync(sourcePath);

    if (stat.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
      continue;
    }

    copyFileSync(sourcePath, targetPath);
  }
}

function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    console.log(usage);
    return;
  }

  if (!existsSync(sourceDir)) {
    throw new Error(`Skill source directory not found: ${sourceDir}`);
  }

  const skillsRoot = path.resolve(expandHome(options.dir));
  const targetDir = path.join(skillsRoot, options.name);

  if (options.dryRun) {
    console.log(`Would install ${sourceDir} -> ${targetDir}`);
    return;
  }

  if (existsSync(targetDir)) {
    if (!options.force) {
      throw new Error(
        `Skill already exists at ${targetDir}. Re-run with --force to replace it.`
      );
    }

    rmSync(targetDir, { recursive: true, force: true });
  }

  copyDirectory(sourceDir, targetDir);
  console.log(`Installed ${SKILL_NAME} to ${targetDir}`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  console.error("");
  console.error(usage);
  process.exitCode = 1;
}
