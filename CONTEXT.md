# Agent Prompt Contract Architecture

This context defines the language for designing structured contracts that shape how an agent receives upstream information, understands its responsibilities, executes a task, and produces constrained outputs.

## Language

**Agent Prompt Contract**:
A structured instruction artifact for a single agent that combines available context with the agent's functional responsibilities, operating boundaries, task flow, output expectations, and restrictive notes. It defines the agent's working contract rather than merely wording a prompt.
_Avoid_: Prompt, prompt template, Prompt Blueprint, Prompt Spec, Agent Instruction Contract

**System Prompt Template**:
The final prompt artifact written for the target agent's system-level instructions. It encodes the resolved **Agent Prompt Contract** and should contain stable execution guidance, not the construction-time assumptions or unresolved questions used to produce it.
_Avoid_: Prompt file, final answer, conversation notes

**Prompt Template Generation Skill**:
The project-local skill being designed to help an agent produce a **System Prompt Template** from an **Agent Prompt Contract** shaped by available context and the target agent's operating information. It is about constructing the prompt template content, not installing or publishing a Codex skill.
_Avoid_: Skill installer, Codex skill creator, prompt writer

**Executable Skill Instruction**:
A project-local skill document written primarily for the agent that will execute the skill. It should provide trigger conditions, information to identify, clarification behavior, readiness checks, construction steps, output requirements, and exclusions rather than serve mainly as a human-facing design essay.
_Avoid_: Design document, explanatory note, implementation plan

**Recommended Template Sections**:
The optional reference skeleton for a **System Prompt Template**, commonly covering purpose, upstream context handling, the **Agent Operating Frame**, **Responsibility Boundary**, **Reasoning Protocol**, **Task Execution Flow**, **Deliverable Specification**, and **Constraint Notes**. It is a recommended starting point that may be trimmed, merged, or reordered to fit the agent.
_Avoid_: Required template, fixed section list, mandatory prompt schema

**Reference Output Skeleton**:
A non-mandatory example structure included in an **Executable Skill Instruction** to show how a **System Prompt Template** might be organized. The executing agent may trim, merge, rename, or reorder it according to the target agent's needs.
_Avoid_: Fill-in template, required output schema, canonical prompt body

**Template Language Policy**:
The rule that a **System Prompt Template** should normally follow the user's working language, while canonical domain terms may remain in English as stable section titles or concept labels when that improves clarity. The user can request a fully localized or fully English template.
_Avoid_: English-only prompt, automatic translation rule

**Template Variable**:
A placeholder inside a **System Prompt Template** for runtime or reusable values such as agent name, task goal, upstream context, available tools, or output format. Template variables are useful when stable instructions should be separated from changing inputs, but should be omitted when they make a one-off prompt harder to read.
_Avoid_: Required placeholder, prompt slot, variable schema

**Template Quality Check**:
The pre-delivery review the skill performs before returning a **System Prompt Template**, checking that the target agent's responsibilities, context handling, boundaries, reasoning protocol, execution flow, deliverable, constraints, language, and template variable use are clear and not over-structured. It is an internal quality check rather than a required user-facing audit log.
_Avoid_: Review report, compliance checklist, verbose self-evaluation

**Upstream Context**:
The available information supplied before or during construction of an **Agent Prompt Contract**, such as the user's goal, confirmed decisions, existing documentation, code, configuration, tool-read facts, source materials, and operating constraints. It uses whichever kinds of information are actually provided and does not require every kind to be present.
_Avoid_: Background, input, context dump

**Agent Operating Frame**:
The information that defines the target agent's primary function, functional boundaries, available capabilities, governing rules, collaboration relationships, and non-responsibilities. It complements **Upstream Context** by describing the agent itself rather than the situation around the task.
_Avoid_: agent frame, Agent Role, Capability Profile, persona

**Reasoning Protocol**:
A clear, structured analysis protocol inside an **Agent Prompt Contract** that tells the agent how to inspect **Upstream Context**, identify gaps, set responsibility boundaries, plan work, produce outputs, and check constraints. It must be understandable to a human reviewer and executable by the agent, without requiring the agent to expose hidden chain-of-thought.
_Avoid_: Thinking process, chain-of-thought, reasoning dump

**Context Organization Pattern**:
A selectable way of arranging **Upstream Context** so the agent can see known facts, constraints, decisions, gaps, and task-relevant material in a useful order. It is an orchestration approach chosen to fit the available information, not a fixed template or mandatory section list.
_Avoid_: Fixed prompt template, required context schema, context dump format

**Responsibility Boundary**:
The explicit scope of what the agent is responsible for, what information it may rely on, which decisions must be returned to the user or upstream agent, and what work is out of scope. It includes both positive responsibilities and explicit non-responsibilities.
_Avoid_: Role, job description, scope

**Contract Construction Flow**:
The process used by the skill to construct an **Agent Prompt Contract**, including inspecting available inputs, choosing a **Context Organization Pattern**, defining the **Responsibility Boundary**, shaping the **Reasoning Protocol**, and specifying outputs and limits. It is separate from the workflow the target agent will later execute.
_Avoid_: Prompt writing process, generation steps

**Contract Refactoring Path**:
The primary construction path where the skill turns existing goals, prompt fragments, requirements, context, boundaries, or output expectations into a clear **Agent Prompt Contract**. It reorganizes and sharpens available material instead of inventing missing responsibilities.
_Avoid_: Prompt cleanup, rewrite mode

**Blank Construction Path**:
The secondary construction path where the skill helps create an **Agent Prompt Contract** when little or no prior material exists. It depends more heavily on the **Construction Readiness Gate** because missing goals, boundaries, or deliverables must be clarified rather than invented.
_Avoid_: Freeform prompt invention, persona generation

**Task Execution Flow**:
The workflow inside an **Agent Prompt Contract** that tells the target agent how to perform its assigned task. It describes the target agent's execution path, not the skill's process for constructing the contract.
_Avoid_: Contract Construction Flow, prompt generation process

**Construction Readiness Gate**:
The decision point that determines whether the skill can produce a complete **Agent Prompt Contract** from the available information or must first ask blocking questions. It blocks only when missing or conflicting information would materially affect the target agent's goal, **Responsibility Boundary**, output recipient, high-risk constraints, or ability to act.
_Avoid_: Interview mode, clarification loop, discovery phase

**Clarification Dialogue**:
The construction-time conversation used to resolve missing information, assumptions, conflicts, and open questions before writing the **System Prompt Template**. It belongs to the skill's working process, not to the final prompt artifact unless a resolved rule needs to be encoded.
_Avoid_: Prompt appendix, assumptions section, open questions section

**Minimal Blocking Questions**:
The clarification style used by the **Prompt Template Generation Skill** when essential information is missing. The skill should ask only the few questions, usually one to three, that materially affect the **Agent Operating Frame**, **Responsibility Boundary**, or **Deliverable Specification** before generating the **System Prompt Template**.
_Avoid_: Full interview, exhaustive questionnaire, one-question-at-a-time grilling

**Deliverable Specification**:
The part of an **Agent Prompt Contract** that defines what the target agent must deliver, who will use it, what information it must include or may omit, the preferred output format, and the quality checks that make the output acceptable.
_Avoid_: Output Format, result, response shape

**Constraint Notes**:
Boundary-setting notes inside an **Agent Prompt Contract** that name the limits, restrictions, and caution points the target agent should respect while working. They clarify the work boundary without pretending that prompt-level constraints are a stronger enforcement mechanism than they are.
_Avoid_: Hard rule system, policy layer, enforcement framework

## Example Dialogue

Dev: "Should this just be called a prompt?"

Domain expert: "Call it an Agent Prompt Contract when it captures responsibilities, workflow, outputs, and limits. A prompt is only one possible wording of that contract."

Dev: "Is the final artifact a general contract document or a system prompt?"

Domain expert: "The final artifact is a System Prompt Template. The Agent Prompt Contract is the resolved structure that the template encodes."

Dev: "Is this project about creating and installing Codex skills?"

Domain expert: "No. The Prompt Template Generation Skill is a project-local skill for producing system prompt templates. Installation or publishing is outside its core responsibility."

Dev: "Should skill/SKILL.md explain the design to humans or instruct the agent?"

Domain expert: "It should be an Executable Skill Instruction: readable by humans, but primarily shaped so the executing agent knows when and how to generate a System Prompt Template."

Dev: "Must every system prompt use all recommended sections?"

Domain expert: "No. Recommended Template Sections are a reference skeleton. Trim, merge, or reorder them when the target agent would be clearer with a different shape."

Dev: "Can the skill include an example template structure?"

Domain expert: "Yes, include a Reference Output Skeleton, but make clear that it is guidance for shaping the output rather than a fill-in template."

Dev: "Should the system prompt always be in English?"

Domain expert: "No. Follow the user's working language by default, while keeping canonical domain terms in English when they help preserve precise structure."

Dev: "Should every generated template use placeholders?"

Domain expert: "No. Use Template Variables when the prompt will be reused or receive runtime context. Omit them when concrete wording is clearer."

Dev: "Should the skill show a full self-review after every generated prompt?"

Domain expert: "No. Perform a Template Quality Check before delivery, but only surface issues or concise notes that matter to the user."

Dev: "Do we need every upstream information type before making the contract?"

Domain expert: "No. Upstream Context is whatever reliable information has actually been provided; missing information becomes an assumption or open question, not invented context."

Dev: "Is Upstream Context enough to build the contract?"

Domain expert: "No. Combine it with the Agent Operating Frame so the contract reflects the target agent's function, boundaries, capabilities, and collaboration relationships."

Dev: "Should the contract ask the agent to show all its thinking?"

Domain expert: "No. Define a Reasoning Protocol that is clear enough for humans to review and agents to follow, then ask for concise rationale, assumptions, and open questions where visibility is needed."

Dev: "Should every contract use the same context sections?"

Domain expert: "No. Choose a Context Organization Pattern that fits the Upstream Context. The skill should teach the orchestration logic, not impose a rigid template."

Dev: "Can the agent decide adjacent product requirements while building the contract?"

Domain expert: "Only if that is inside its Responsibility Boundary. Otherwise it should surface the decision and hand it back instead of expanding its own scope."

Dev: "Is the task flow the same as the process for writing the contract?"

Domain expert: "No. Contract Construction Flow is how the skill creates the contract; Task Execution Flow is what the resulting contract tells the target agent to do."

Dev: "Is the skill mainly for inventing new agents from scratch?"

Domain expert: "No. Its primary mode is the Contract Refactoring Path: organize and sharpen existing material. Blank Construction Path is supported, but missing essentials must be clarified."

Dev: "Should the skill always interview the user before writing the contract?"

Domain expert: "No. Use the Construction Readiness Gate. Generate the contract directly when enough is known, and ask only the questions that block a reliable contract."

Dev: "Where do assumptions and open questions go?"

Domain expert: "Resolve them in the Clarification Dialogue before writing the System Prompt Template. Do not put construction-time uncertainty into the final prompt as if it were stable guidance."

Dev: "Should this skill interview the user one question at a time?"

Domain expert: "No. Ask Minimal Blocking Questions only when missing information would change the target agent's frame, boundary, or deliverable."

Dev: "Is it enough to say the agent should output Markdown?"

Domain expert: "No. The Deliverable Specification should also name the intended user, required content, optional omissions, and quality checks."

Dev: "Should every limitation be classified by enforcement level?"

Domain expert: "No. Constraint Notes should state the limits and boundary reminders plainly. Prompt-level constraints are useful for guidance, but they are not a full enforcement system."
