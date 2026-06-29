---
name: prompt-template-generation
description: Produces system prompt templates for target agents by turning available context and the agent operating frame into a structured agent prompt contract. Use when the user asks to generate, refactor, architect, or improve a system prompt template for an agent.
---

# Prompt Template Generation

Use this skill to produce a **System Prompt Template** for a target agent. The template should encode a resolved **Agent Prompt Contract**: what the agent is for, how it handles upstream context, where its responsibilities end, how it works, what it delivers, and what limits it should respect.

Do not treat this skill as a Codex skill installer or publisher. Its job is to generate prompt template content.

## Inputs To Identify

Before writing the template, identify what is available:

- **Upstream Context**: user goals, confirmed decisions, existing documents, code facts, source materials, constraints, and any other reliable information already provided.
- **Agent Operating Frame**: the target agent's main function, functional boundaries, available capabilities or tools, governing rules, collaboration relationships, and non-responsibilities.
- **Deliverable Specification**: what the target agent must produce, who will use it, required content, optional omissions, preferred format, and quality expectations.

Use whichever upstream information is actually present. Do not invent missing context.

## Construction Flow

1. Choose the construction path:
   - Use the **Contract Refactoring Path** when the user provides existing prompt fragments, requirements, context, or output expectations.
   - Use the **Blank Construction Path** only when little prior material exists; clarify essentials before generating.
2. Choose a **Context Organization Pattern** that fits the available information. Do not force every prompt into the same section list.
3. Define the **Responsibility Boundary** with both responsibilities and non-responsibilities.
4. Shape a clear **Reasoning Protocol** that the target agent can follow and a human can review. Do not request hidden chain-of-thought.
5. Define the **Task Execution Flow** separately from the reasoning protocol.
6. Define the **Deliverable Specification** and **Constraint Notes**.
7. Generate the **System Prompt Template** in the user's working language unless the user asks otherwise. Canonical English section names may be kept when they improve clarity.

## Construction Readiness Gate

Generate directly when enough information is available. Ask **Minimal Blocking Questions** only when missing or conflicting information would materially change:

- the target agent's goal or main function
- the **Agent Operating Frame**
- the **Responsibility Boundary**
- the output recipient or **Deliverable Specification**
- high-risk constraints or explicit non-responsibilities

Ask only the few blocking questions needed, usually one to three. Resolve assumptions and open questions in conversation before writing the template. Do not include construction-time uncertainty as a final prompt section.

## Template Variables

Use **Template Variables** only when the prompt is meant to be reused or runtime information will be injected, such as `{{agent_name}}`, `{{upstream_context}}`, `{{available_tools}}`, or `{{output_format}}`.
Omit variables when concrete wording would be clearer for a one-off prompt.

## Reference Output Skeleton

This skeleton is optional. Trim, merge, rename, or reorder sections to fit the target agent.

```md
# Purpose
[State what the target agent exists to do.]

# Upstream Context Handling
[Explain how the agent should read, prioritize, verify, and use upstream context.]

# Agent Operating Frame
[Define the agent's main function, capabilities, collaboration relationships, and governing rules.]

# Responsibility Boundary
[Name what the agent owns, what it may decide, what it must hand back, and what is out of scope.]

# Reasoning Protocol
[Give a clear analysis protocol without asking for hidden chain-of-thought.]

# Task Execution Flow
[List the concrete workflow the agent should follow to complete the task.]

# Deliverable Specification
[Define the expected output, intended user, required content, allowed omissions, format, and quality bar.]

# Constraint Notes
[State boundary reminders, restrictions, and caution points plainly.]
```

## Template Quality Check

Before delivering, verify internally that the template:

- separates upstream context handling from the target agent's operating frame
- makes responsibilities and non-responsibilities explicit
- gives a usable reasoning protocol without requiring hidden chain-of-thought
- gives a concrete task execution flow
- defines the deliverable beyond mere output format
- includes only useful constraint notes
- avoids unresolved assumptions or open questions in the final prompt body
- uses template variables only when they add value
- is not over-structured for the target agent
