Here's a complete and extensive description of all 5 newly created nodes — what they do, how they work, their connections, use cases, and how they fit into pipelines.

---

## 1. API Request Node (`apiNode.js`)

The API Request node is the **gateway between your pipeline and the outside world**. Its job is to make HTTP network calls to any external service or REST API and bring that data back into the pipeline for further processing.

**Inputs (left side):**
- `url` — accepts a dynamic URL string from another node. This means you can construct URLs programmatically using a Text node with variables, then pipe it here.
- `body` — accepts the request payload (useful for POST, PUT, PATCH requests). This could come from a Text node, Transform node, or any node that produces a JSON-formatted string.

**Outputs (right side):**
- `response` — the raw body of the HTTP response, ready to be processed by a Transform node (e.g., `JSON.parse`), passed into an LLM node, or sent to an Output node.
- `status` — the HTTP status code (e.g., `200`, `404`, `500`), which can be fed into a Conditional node to route the pipeline based on success or failure.

**Configurable fields:**
- `Method` — a dropdown to select the HTTP verb: GET, POST, PUT, PATCH, or DELETE. Changing this changes the semantics of the request entirely.
- `URL` — a static fallback URL you can type directly. If the `url` input handle is connected, that takes precedence.

**Real-world use cases:** Fetching weather data from a weather API, sending a user message to a Slack webhook, querying a database REST API, calling OpenAI or any third-party service, or pulling live data from a CRM like Salesforce.

------

## 2. Condition Node (`conditionalNode.js`)

The Condition node is the **decision-maker of your pipeline** — a router that evaluates an incoming value against a rule you define and branches the flow into one of two paths: `true` or `false`. This makes it possible to build pipelines that behave differently depending on the actual data flowing through them.

**Input (left side):**
- `value` — any string or value coming from an upstream node (a response from an API, an LLM output, a text field, etc.) that will be evaluated against your condition.

**Outputs (right side):**
- `true` — the pipeline continues through this path when the condition is satisfied.
- `false` — the pipeline continues through this path when the condition is not satisfied.

**Configurable fields:**
- `Operator` — lets you pick how the comparison is made. Options include `==` (exact match), `!=` (not equal), `>`, `<`, `>=`, `<=` (numeric comparisons), `contains` (substring check), and `starts with` (prefix check).
- `Compare to` — the value on the right-hand side of the comparison. For example: operator `contains`, compare to `"error"` would route to `true` whenever the input contains the word "error".

**Real-world use cases:** Checking if an API returned a successful response before feeding it to an LLM. Routing a user query to different LLM prompts based on intent. Validating that a form field isn't empty before proceeding. Branching a customer support pipeline between billing questions and technical questions.

---

## 3. Note Node (`noteNode.js`)

The Note node is intentionally the **simplest node in the system** — it has no input handles, no output handles, and produces no data. Its sole purpose is to let pipeline builders annotate their canvas with human-readable context, reminders, or explanations for anyone reading or maintaining the pipeline later.

**Inputs:** None  
**Outputs:** None

**Configurable fields:**
- A free-form `textarea` styled to look like a sticky note (light yellow background, dark text) — type anything: a reminder, a warning, a description of what a complex section does, a TODO, or a link to external documentation.

**Why this matters:** In complex pipelines with dozens of nodes, it becomes very hard to understand why certain connections exist or what a cluster of nodes is trying to accomplish. Note nodes solve this by letting you leave "documentation in place" right on the canvas — exactly where it matters. It's the equivalent of a code comment, but for visual pipelines.

**Real-world use cases:** Marking a section of the pipeline as "do not modify — production", explaining what a specific LLM prompt is optimized for, flagging a part of the pipeline as a known bottleneck, or leaving a step-by-step explanation of a multi-node sequence for new team members.

------

## 4. Transform Node (`transformNode.js`)

The Transform node is the **data processing workhorse** of the pipeline. It takes any value coming in through its single input, applies a single pure transformation operation to it, and outputs the result. Think of it as a one-line function applied to your data as it flows through the pipeline.

**Input (left side):**
- `data` — any string or serialized value from an upstream node (API response, LLM output, text, etc.)

**Output (right side):**
- `result` — the transformed version of the input, ready for further processing.

**Configurable fields:**
- `Operation` — a dropdown with 8 built-in transformations:
  - `JSON.parse` — converts a raw JSON string into a structured object (use after an API response to make it readable by downstream nodes).
  - `JSON.stringify` — converts an object back into a JSON string (use before sending data to an API body).
  - `Uppercase` / `Lowercase` — simple string case transformations.
  - `Trim` — strips leading and trailing whitespace, cleaning up sloppy inputs.
  - `Reverse` — reverses the character order of a string.
  - `Base64 Encode` / `Base64 Decode` — encodes or decodes data in Base64 format, which is commonly needed when working with file attachments, authentication tokens, or binary data passed as strings.

**Real-world use cases:** Parsing a JSON API response before extracting a field for an LLM prompt. Encoding a user's email as Base64 before sending it to an authentication service. Cleaning whitespace from user text inputs before validation. Lowercasing an input before a case-sensitive Condition node comparison.

---

## 5. Merge Node (`mergeNode.js`)

The Merge node is the **combiner** — it accepts up to three separate inputs (A, B, C) and fuses them together into a single unified output. This is critical in pipelines where multiple parallel branches need to converge back into one stream, or where you want to assemble a compound value from multiple sources.

**Inputs (left side):**
- `A`, `B`, `C` — three independent input handles, each accepting a value from any upstream node. Not all three need to be connected — the node works with just two, or even one.

**Output (right side):**
- `merged` — the single combined result produced according to the selected mode.

**Configurable fields:**
- `Mode` — determines how the inputs are combined:
  - `Concatenate` — joins inputs as plain strings, one after another. Paired with a `Separator` field where you can specify exactly what goes between them (a space, a comma, a newline `\n`, or any custom delimiter).
  - `Join Array` — treats each input as an array element and joins them into a single JavaScript array string.
  - `Merge Objects` — treats each input as a JSON object and merges their keys together (like `Object.assign(A, B, C)`). Useful for combining data from multiple APIs into one record.
  - `Template` — reserved for a future mode where inputs are injected into a template string at defined positions.
- `Separator` — (visible only in `Concatenate` mode) the character or string placed between each joined segment.

**Real-world use cases:** Building a complete LLM prompt by joining a system instruction (A), a user query (B), and retrieved context from an API (C). Merging user profile data from two separate API calls into one object. Assembling a formatted email body from a greeting, the main content, and a signature — each coming from different pipeline branches.

---

Here's a quick-reference summary of all 5 nodes:

| Node | Color | Inputs | Outputs | Core job |
|---|---|---|---|---|
| API Request | Blue | `url`, `body` | `response`, `status` | Fetches data from any external API |
| Condition | Pink | `value` | `true`, `false` | Routes flow based on a comparison rule |
| Note | Yellow | none | none | Annotates the canvas — no data processing |
| Transform | Orange | `data` | `result` | Applies a single operation to transform data |
| Merge | Teal | `A`, `B`, `C` | `merged` | Combines multiple inputs into one output |