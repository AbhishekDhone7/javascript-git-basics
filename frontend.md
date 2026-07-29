# The React Ecosystem Handbook

> A single-file, production-oriented guide to React 18+, React Router, Redux Toolkit, RTK Query, Axios, build tooling, architecture, performance, authentication, and deployment.

<a id="top"></a>

## How to Use This Book

This handbook assumes knowledge of JavaScript functions, objects, arrays, promises, modules, and `async`/`await`. Read Modules 1-5 in order, then follow the modules relevant to your work. Examples use React 18 behavior. Class components and Create React App (CRA) are covered for enterprise maintenance, but new client applications should normally use function components and Vite.

> [!NOTE]
> React is a UI library, not a complete application framework. Routing, remote-data caching, authentication policy, bundling, monitoring, and deployment remain architectural decisions.

> [!WARNING]
> Browser-delivered code is public. Environment variables, minification, and obfuscation do not protect secrets.

## Table of Contents

1. [React Fundamentals](#module-1-react-fundamentals)
2. [React Internals](#module-2-react-internals)
3. [Component Lifecycle](#module-3-component-lifecycle)
4. [React Hooks](#module-4-react-hooks)
5. [Component Communication](#module-5-component-communication)
6. [React Router](#module-6-react-router)
7. [Forms](#module-7-forms)
8. [Axios](#module-8-axios)
9. [Context API](#module-9-context-api)
10. [Redux Toolkit and RTK Query](#module-10-redux-toolkit-and-rtk-query)
11. [Performance Optimization](#module-11-performance-optimization)
12. [Environment Variables](#module-12-environment-variables)
13. [Webpack](#module-13-webpack)
14. [Vite](#module-14-vite)
15. [Tree Shaking](#module-15-tree-shaking)
16. [Authentication](#module-16-authentication)
17. [Error Handling](#module-17-error-handling)
18. [Project Architecture](#module-18-project-architecture)
19. [Build Process and Deployment](#module-19-build-process-and-deployment)
20. [Final Interview Handbook](#final-interview-handbook)

## Book Conventions

- "Render" means React calls components to calculate a candidate tree.
- "Commit" means React changes the host DOM and runs commit-related work.
- Effects synchronize with systems outside React; they are not a general tool for derived values.
- API examples use `/api` as a placeholder origin.
- Every production system must adapt examples to its threat model, browser support, observability, and API contract.

---

<a id="module-1-react-fundamentals"></a>
# Module 1: React Fundamentals

[Previous: Contents](#table-of-contents) | [Next: React Internals](#module-2-react-internals)

## Introduction

React is an open-source JavaScript library for building user interfaces from reusable components. A useful mental model is:

> **UI = f(state)**

For the same props, state, and context, a pure component should describe the same UI. Developers declare the desired result; React coordinates when components run and how their output reaches the browser DOM.

React is a **library**, not a complete framework. It owns component rendering and related APIs, but it does not prescribe one router, HTTP client, global store, folder structure, or deployment platform. This focused scope is an advantage when a team needs flexibility and a disadvantage when a team needs a single prescribed architecture.

### Why React Exists

Before component-oriented libraries became common, large interfaces often mixed DOM queries, event listeners, data mutation, and manual element updates. As state grew, developers had to remember every DOM location affected by each change. React changed the question from "Which DOM commands should run?" to "What should the interface look like for this state?"

Facebook open-sourced React in 2013 after using its ideas internally. Important milestones include:

| Period | Milestone | Why it mattered |
|---|---|---|
| 2013 | Public React release | Popularized declarative components and one-way data flow |
| 2015 | React Native | Applied the component model beyond browser DOM rendering |
| 2017 | Fiber architecture in React 16 | Enabled incremental work, priorities, and modern error boundaries |
| 2019 | Hooks in React 16.8 | Let function components compose stateful behavior |
| 2022 | React 18 | Added `createRoot`, automatic batching, transitions, and concurrent foundations |

### Industry Usage

React is commonly used for product interfaces that contain many interacting states: e-commerce catalogs, banking workspaces, CRM pipelines, administrative dashboards, HR systems, chat clients, social feeds, and internal enterprise tools. Its ecosystem, hiring market, testing support, and long-term adoption make it a common organizational choice, but popularity alone is not an architecture decision.

| Decision | Guidance |
|---|---|
| Advantages | Composition, declarative updates, predictable data flow, mature ecosystem, strong tooling, broad industry use |
| Disadvantages | Not a complete framework; state/effects can be misused; ecosystem choices add governance cost; client JavaScript has loading and runtime costs |
| Use it | Interactive products with reusable screens, evolving state, complex workflows, or long-term team ownership |
| Avoid it | Tiny static documents, content requiring almost no interaction, or environments where shipping client JavaScript is inappropriate |

### SPA vs MPA

An SPA keeps one document and JavaScript runtime while a client router changes views. An MPA requests another document for navigation. React can support either model; server-rendering frameworks can return route-specific documents and then hydrate React on the client.

| Concern | SPA | MPA or server-rendered navigation |
|---|---|---|
| First request | Often loads an application shell and JavaScript | Returns route-specific document content |
| Later navigation | Client router can update quickly | Browser requests another document |
| State continuity | Naturally remains in one runtime | Must be persisted or transferred |
| Failure isolation | One runtime may affect many screens | Document navigations create stronger isolation |
| SEO and previews | Requires correct rendering strategy | Content exists naturally in returned documents |
| Best fit | Highly interactive application-like products | Content-heavy or document-oriented experiences |

## Internal and Step-by-Step Working

JSX compiles to instructions that create immutable React element descriptions. An element is a small JavaScript description containing a type, props, and optional key. It is not a browser node and has no methods such as `focus()` or `appendChild()`.

React associates component state with a Fiber's identity and position in the rendered tree. Calling a state setter enqueues an update; it does not mutate the value captured by the currently running function. React later renders with a new state snapshot. If the resulting host output differs, the commit phase updates the DOM. The browser then performs any required style calculation, layout, paint, and compositing.

```mermaid
flowchart LR
 A[Event or data] --> B[Queue update]
 B --> C[Scheduler]
 C --> D[Render components]
 D --> E[Reconcile Fibers]
 E --> F[Commit DOM]
 F --> G[Browser paint]
 G --> H[Passive effects]
```

The arrows show causality:

1. An event, timer, request completion, context change, or external-store notification triggers an update.
2. React puts the update into an internal queue and assigns scheduling priority.
3. The render phase calls components and reconciles their new element output with previous Fibers.
4. Render must be pure because React may pause, restart, or discard uncommitted work.
5. The commit phase applies a completed set of DOM mutations and updates refs.
6. The browser converts changed DOM and styles into pixels.
7. Passive effects synchronize subscriptions, analytics, or other external systems after commit.

### Initial Render Execution Trace

```jsx
// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);
```

Line by line:

1. `StrictMode` enables additional development checks without adding visible DOM.
2. `createRoot` creates a React 18 root attached to the existing container.
3. `<App />` creates an element describing the root component.
4. `root.render` schedules initial rendering; it does not append a prebuilt `App` DOM node.
5. React calls `App` and descendants, commits their host output, and the browser paints it.

> [!NOTE]
> Development Strict Mode can call render logic more than once and test effect cleanup. This behavior exposes impurities; it does not mean production commits duplicate UI.

## Installation and Tooling

### Vite Setup (Recommended)

```bash
npm create vite@latest storefront -- --template react
cd storefront
npm install
npm run dev
```

The scaffold creates a package manifest, Vite configuration defaults, an HTML entry, and a React source entry. `npm install` resolves dependencies from the package manifest and lockfile. `npm run dev` starts Vite's development server with on-demand module transforms and hot updates.

Useful generated commands normally include:

| Command | Purpose |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Create optimized production assets in `dist/` |
| `npm run preview` | Inspect the production build locally; not a production server |
| `npm run lint` | Run the scaffold's lint configuration when included |

### Create React App

CRA and `react-scripts` remain relevant in existing applications but are not the recommended starting point for a new client application. CRA hides Webpack/Babel configuration and uses `REACT_APP_*` environment variables. A migration to Vite commonly requires moving `index.html`, changing environment access to `import.meta.env.VITE_*`, translating proxy and asset behavior, and replacing CRA-specific test assumptions.

### Project Structure

A small application can remain simple:

```text
src/
|-- app/          # root providers, router, store
|-- features/     # business capabilities
|-- shared/       # reusable UI, hooks, utilities
|-- App.jsx
`-- main.jsx
```

| Path | Responsibility |
|---|---|
| `app/` | Composition root: providers, router, store, global error boundaries |
| `features/` | Business capabilities such as products, cart, students, or reports |
| `shared/` | Domain-neutral UI, hooks, and utilities used by multiple features |
| `App.jsx` | Top-level application composition |
| `main.jsx` | Browser bootstrap and root creation |

Do not create every possible folder on day one. Introduce a boundary when it expresses real ownership, removes harmful coupling, or supports multiple consumers.

## JSX and React Elements

JSX is syntax embedded in JavaScript. It resembles HTML, but expressions follow JavaScript rules and attributes often use DOM-property names such as `className` and `htmlFor`. JSX must produce one root expression; a fragment (`<>...</>`) groups siblings without creating a wrapper DOM element.

```jsx
function ProductHeading({ product, featured }) {
	const availability = product.stock > 0 ? "In stock" : "Unavailable";

	return (
		<>
			<h2>{featured ? "Featured: " : ""}{product.name}</h2>
			<p>{availability}</p>
		</>
	);
}
```

- Curly braces evaluate JavaScript expressions.
- `null`, `undefined`, and booleans render no text; numbers and strings do.
- React escapes string values before inserting them, reducing accidental markup injection.
- `dangerouslySetInnerHTML` bypasses this protection and requires trusted, sanitized content.

Conceptually, `<ProductHeading product={item} />` becomes an element-creation instruction. React does not call the component until rendering that element.

## Components

A component is a reusable rendering unit. Good components have a focused responsibility, explicit inputs, semantic output, and a name based on domain intent rather than visual accident.

### Function Components

Function components are the standard for new React code. React calls them with props. They may use hooks and must remain pure during render.

```jsx
function Price({ amount, currency = "USD" }) {
	const formatted = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
	}).format(amount);

	return <strong>{formatted}</strong>;
}
```

For `amount={49.99}`, the expected output is `$49.99`. Formatting runs whenever `Price` renders. React can preserve the existing `strong` DOM node when its type and position remain the same.

### Class Components

Class components remain supported and common in legacy systems and error boundaries:

```jsx
import { Component } from "react";

class LegacyCounter extends Component {
	state = { count: 0 };

	render() {
		return (
			<button onClick={() => this.setState(({ count }) => ({ count: count + 1 }))}>
				Count: {this.state.count}
			</button>
		);
	}
}
```

Class state lives on the component instance. Function-component state is tracked by React through the Fiber/hook structure. Prefer functions for new feature code; learn classes to maintain existing applications and understand lifecycle/error-boundary APIs.

## Props and Component Contracts

Props are read-only inputs supplied by a parent. They may contain primitives, objects, arrays, elements, or callback functions. A child must never mutate a prop object because the parent owns it.

```jsx
function ProductCard({ product, onAddToCart, children }) {
	return (
		<article>
			<h2>{product.name}</h2>
			<Price amount={product.price} />
			{children}
			<button type="button" onClick={() => onAddToCart(product.id)}>
				Add to cart
			</button>
		</article>
	);
}
```

`children` is ordinary composition data. The card controls structure while its caller can provide badges or supporting content. In production, TypeScript or runtime validation can document and enforce component contracts.

## State, Snapshots, and Updates

State represents information that changes over time and affects visible output. Store only the minimum source of truth. Values calculable from props/state should normally be derived during render.

```jsx
import { useState } from "react";

function Counter() {
	const [count, setCount] = useState(0);

	function addThree() {
		setCount((current) => current + 1);
		setCount((current) => current + 1);
		setCount((current) => current + 1);
	}

	return <button onClick={addThree}>Count: {count}</button>;
}
```

Each functional updater receives the pending result of the previous update, so one click moves from `0` to `3`. With three `setCount(count + 1)` calls, each expression uses the same captured snapshot and typically requests the same replacement value.

### Object and Array State

```jsx
// Wrong: mutates the existing object and preserves its identity.
profile.name = "Asha";
setProfile(profile);

// Correct: create a replacement while preserving unchanged fields.
setProfile((current) => ({ ...current, name: "Asha" }));

// Correct array insertion.
setItems((current) => [...current, newItem]);
```

React compares state with `Object.is`. Immutable replacement makes changed identity explicit and allows memoization, selectors, and debugging tools to reason about transitions.

## Events and One-Way Data Flow

```jsx
import { useState } from "react";

function Quantity({ value, onChange }) {
	return (
		<div role="group" aria-label="Quantity">
			<button type="button" disabled={value <= 1}
				onClick={() => onChange(Math.max(1, value - 1))}>Decrease</button>
			<output aria-live="polite">{value}</output>
			<button type="button" onClick={() => onChange(value + 1)}>Increase</button>
		</div>
	);
}

function App() {
	const [quantity, setQuantity] = useState(1);
	return <Quantity value={quantity} onChange={setQuantity} />;
}
```

`App` owns state; `Quantity` receives the value and reports user intent through a callback. A click runs the handler, queues state, renders `App` and `Quantity`, and commits only changed host output. This parent-to-child data and child-to-parent event flow keeps ownership explicit.

```mermaid
sequenceDiagram
	participant U as User
	participant Q as Quantity child
	participant A as App state owner
	participant R as React
	participant D as Browser DOM
	U->>Q: Click Increase
	Q->>A: Call onChange(value + 1)
	A->>R: setQuantity(nextValue)
	R->>A: Render App with new snapshot
	A->>Q: Pass updated value prop
	Q-->>R: Return updated element output
	R->>D: Commit changed output text
```

The sequence emphasizes ownership. The child does not mutate the parent's state. It reports intent through `onChange`; the parent queues the update; React renders a new snapshot; and only then does the committed DOM display the new quantity.

React uses synthetic event objects with browser-like APIs. Use `preventDefault()` to stop a form's default navigation when managing submission in React. Use `stopPropagation()` sparingly because it changes ancestor event behavior and can make component composition surprising.

```jsx
// Wrong: save runs while rendering.
<button onClick={save()}>Save</button>

// Correct: React receives a function to call after the click.
<button onClick={save}>Save</button>
```

## Conditional Rendering

React uses JavaScript control flow to choose elements:

```jsx
function AccountPanel({ status, account }) {
	if (status === "loading") return <p>Loading account...</p>;
	if (status === "failed") return <p role="alert">Account unavailable.</p>;
	if (!account) return null;

	return (
		<section>
			<h2>{account.name}</h2>
			{account.overdrawn && <strong>Action required</strong>}
		</section>
	);
}
```

Prefer explicit early returns for substantially different states. Be careful with `count && <Badge />`: when `count` is `0`, React renders `0`. Use `count > 0 && ...` when zero should render nothing.

## Lists and Keys

```jsx
function Orders({ orders }) {
	if (!orders.length) return <p>No orders.</p>;
	return <ul>{orders.map((o) => <li key={o.id}>{o.number}: {o.status}</li>)}</ul>;
}

// Wrong: random keys remount every row.
items.map((item) => <Row key={Math.random()} item={item} />);
// Correct: stable data identity preserves row state through reordering.
items.map((item) => <Row key={item.id} item={item} />);
```

Keys identify siblings, not global records. React uses type and key to match old and new children. Stable data IDs preserve row state during reordering. Array indexes are acceptable only when a list is static and cannot be reordered, filtered, inserted into, or deleted from.

### Rendering and Memory Behavior

Mapping creates new element descriptions in JavaScript memory. React reconciles them against existing child Fibers. Matching rows can preserve component state and DOM; removed rows unmount and become garbage-collection candidates after references and cleanup are released.

## Forms: Controlled and Uncontrolled

### Controlled Example

```jsx
function SearchForm({ onSearch }) {
	const [query, setQuery] = useState("");

	function submit(event) {
		event.preventDefault();
		const normalized = query.trim();
		if (normalized) onSearch(normalized);
	}

	return (
		<form onSubmit={submit}>
			<label>
				Search products
				<input value={query} onChange={(event) => setQuery(event.target.value)} />
			</label>
			<button disabled={!query.trim()}>Search</button>
		</form>
	);
}
```

Every change updates state and renders `SearchForm`. This enables immediate validation and dependent UI. Keep this state near the input so the entire page does not render on every keystroke.

### Uncontrolled Example

```jsx
function NewsletterForm({ subscribe }) {
	function submit(event) {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		subscribe(data.get("email"));
	}

	return (
		<form onSubmit={submit}>
			<label>Email <input name="email" type="email" required /></label>
			<button>Subscribe</button>
		</form>
	);
}
```

The browser owns the current input value. React does not render per keystroke unless another update occurs. This approach suits simple forms and libraries such as React Hook Form.

## Styling React Applications

React does not require one styling solution:

| Approach | Strength | Tradeoff |
|---|---|---|
| Plain stylesheet | Simple, cacheable, platform-native | Naming and global cascade need discipline |
| CSS Modules | Build-time local class names | Requires build-tool integration |
| Styled Components | Props can drive colocated runtime styles | Runtime work, SSR configuration, library dependency |
| Tailwind CSS | Fast utility composition and constrained tokens | Long class lists and build/content configuration |

```jsx
// CSS Module integration
import styles from "./Button.module.css";

function Button({ variant = "primary", children, ...buttonProps }) {
	return (
		<button className={`${styles.button} ${styles[variant]}`} {...buttonProps}>
			{children}
		</button>
	);
}
```

Choose a styling approach at the team/design-system level. Preserve semantic elements and accessibility regardless of visual implementation. Styling choices can affect bundle size, runtime memory, server rendering, and cache behavior.

## Complete Real-Project Example

```jsx
function ProductCatalog({ products, onAddToCart }) {
	const [query, setQuery] = useState("");
	const [inStockOnly, setInStockOnly] = useState(false);

	const normalizedQuery = query.trim().toLowerCase();
	const visibleProducts = products.filter((product) => {
		const matchesName = product.name.toLowerCase().includes(normalizedQuery);
		const matchesStock = !inStockOnly || product.stock > 0;
		return matchesName && matchesStock;
	});

	return (
		<section aria-labelledby="catalog-title">
			<h1 id="catalog-title">Product catalog</h1>
			<input
				aria-label="Search products"
				value={query}
				onChange={(event) => setQuery(event.target.value)}
			/>
			<label>
				<input
					type="checkbox"
					checked={inStockOnly}
					onChange={(event) => setInStockOnly(event.target.checked)}
				/>
				In stock only
			</label>

			{visibleProducts.length ? (
				<ul>
					{visibleProducts.map((product) => (
						<li key={product.id}>
							<ProductCard product={product} onAddToCart={onAddToCart} />
						</li>
					))}
				</ul>
			) : <p>No matching products.</p>}
		</section>
	);
}
```

Important behavior:

1. The component stores only user-controlled filters.
2. `visibleProducts` is derived during render, avoiding duplicated state and synchronization effects.
3. Typing or checking the box renders the catalog with a new snapshot.
4. Stable product IDs preserve card identity.
5. Memoization is unnecessary until profiling proves filtering or child rendering is expensive.
6. For a very large catalog, server filtering, deferred rendering, pagination, or virtualization may be better than `useMemo` alone.

## Real-World Applications

| Domain | Fundamentals in practice |
|---|---|
| E-commerce | Product props, cart state, keyed results, controlled checkout fields |
| Student management | Student rows, enrollment conditions, shared filters |
| Banking | Account summaries, transfer-state validation, explicit status UI |
| CRM | Lead cards, pipeline lists, callback-driven actions |
| Dashboard | Composed widgets with isolated loading and error states |
| HRMS | Controlled leave requests and conditional approval actions |
| Food ordering | Menu options, quantity state, derived basket totals |
| Chat | Message keys, draft state, event-driven sending |
| Social media | Feed items, reaction events, optimistic visible state |

The patterns remain the same across domains: identify state ownership, pass data down, report events up, derive output, preserve identity, and synchronize external systems outside render.

## Mistakes, Best Practices, and Performance

| Level | Common mistake | Production correction |
|---|---|---|
| Beginner | Mutating props or state | Create replacement objects/arrays and preserve ownership |
| Beginner | Invoking handlers during render | Pass a function reference or wrapper |
| Beginner | Missing/stable key problems | Use a persistent data ID among siblings |
| Intermediate | Copying props into state | Derive values unless an independent editable draft is required |
| Intermediate | Storing every calculated value | Keep minimal state and calculate pure output during render |
| Intermediate | Lifting input state too high | Colocate rapidly changing state with its narrow consumer |
| Senior | Memoizing every component | Profile production behavior and optimize measured hot paths |
| Senior | Treating React as the entire architecture | Define routing, data, security, testing, and deployment boundaries |

Performance guidance:

- A component render costs JavaScript even if React commits no DOM change.
- DOM changes may trigger browser style, layout, and paint work.
- Keep rendering pure and inexpensive; move external synchronization to events, effects, or data layers.
- Split components by responsibility, not solely to reduce line count.
- Use route/feature lazy loading for meaningful bundle boundaries.
- Avoid memoization until repeated expensive work and stable inputs are demonstrated.
- Test production builds because development checks and source tooling change performance.

---

<a id="module-2-react-internals"></a>
# Module 2: React Internals

[Previous: Fundamentals](#module-1-react-fundamentals) | [Next: Lifecycle](#module-3-component-lifecycle)

## Introduction

React internals explain observable application behavior: why a component can render without changing the DOM, why a changed key resets state, why effects need cleanup, why Strict Mode repeats development work, and how transitions keep urgent input responsive.

The most important boundary is that React and the browser perform different jobs:

- **React** calculates a desired host tree, tracks component state, schedules updates, reconciles identities, and commits host operations.
- **The browser** owns DOM nodes, style calculation, layout geometry, painting, compositing, event delivery, and pixels on the screen.
- **JavaScript memory** contains elements, Fibers, update queues, hook state, closures, application data, and references to browser objects.

React internals are useful mental models, not public application APIs. Fiber fields, lane constants, effect flags, and implementation file names may change between releases. Production code should depend on documented React behavior rather than private fields.

### Why React Introduced an Abstraction over DOM Updates

Direct DOM manipulation is not inherently slow or incorrect. The difficulty appears when a large product has many states and every state transition must manually update all affected nodes while preserving consistency. React provides a declarative state-to-UI model and centralizes update coordination.

| Concern | Manual imperative coordination | React coordination |
|---|---|---|
| Source of truth | Can become split between data and DOM | Component state/props/context describe output |
| Update logic | Developer selects every mutation | React reconciles previous and next output |
| Reuse | Usually convention-based | Components provide explicit boundaries |
| Scheduling | Commands execute when called | Updates enter React's scheduling model |
| State preservation | Developer manages node/instance identity | Type, position, and key guide identity |
| Cost | Can be optimal when carefully designed | Adds render/reconciliation overhead for consistency and composition |

## Browser Rendering Pipeline

When a browser loads an application, it parses HTML into the DOM and stylesheets into the CSSOM. It combines relevant information into a render representation, calculates geometry, paints drawing instructions, and composites layers. JavaScript and React normally execute on the main thread, so long work can delay user input and painting.

```mermaid
flowchart LR
	H[HTML bytes] --> DP[HTML parser]
	DP --> DOM[DOM tree]
	C[CSS bytes] --> CP[CSS parser]
	CP --> CSSOM[CSSOM]
	DOM --> ST[Style calculation]
	CSSOM --> ST
	ST --> L[Layout geometry]
	L --> P[Paint records]
	P --> CO[Composite layers]
	CO --> PX[Pixels]
	J[JavaScript and React commits] --> DOM
	J --> ST
```

Diagram flow:

1. HTML parsing creates browser node objects in the DOM.
2. CSS parsing creates rules used by style calculation.
3. Style calculation determines applicable computed styles.
4. Layout calculates element sizes and positions.
5. Paint produces drawing commands for text, borders, images, and effects.
6. Compositing combines layers into the final frame.
7. A React commit can invalidate part of this work by changing DOM properties, structure, or styles.

### Browser Performance Consequences

Not every DOM change causes the same work:

| Change | Possible browser work |
|---|---|
| Text or color | Style and paint; layout may be unnecessary |
| Width, height, font metrics | Style, layout, paint, and composite |
| Transform or opacity on a promoted layer | Often compositing without full layout |
| Reading layout after a write | May force synchronous style/layout calculation |
| Adding thousands of nodes | DOM allocation, style matching, layout, paint, and memory growth |

> [!WARNING]
> React can reduce unnecessary DOM mutations, but it cannot make an inherently expensive layout, image, animation, or huge DOM tree free.

## DOM, Real DOM, and React Elements

The **DOM** is the browser's object representation of the document. A DOM node is mutable, participates in layout and events, and exposes methods such as `focus()`, `remove()`, and `getBoundingClientRect()`.

A **React element** is an immutable JavaScript description of desired output. It commonly includes a type, props, and key. Calling a component or evaluating JSX creates descriptions; it does not immediately create or mutate browser nodes.

"Virtual DOM" is an informal term for React's in-memory UI descriptions and comparison process. It is not one special browser API and should not be confused with the Fiber tree:

| Structure | Meaning | Mutable by application code? | Lifetime |
|---|---|---:|---|
| React element | Immutable output description | No | Usually one render calculation |
| Fiber | Internal work/state record | Never directly | Preserved while identity survives |
| DOM node | Browser host object | Through React/ref integration | Preserved while matching host identity survives |
| Component function | Reusable rendering definition | Source code, not an instance | Module lifetime |

```mermaid
flowchart TB
	JSX[JSX expression] --> EL[React element description]
	EL --> FI[Fiber work record]
	FI --> HOST{Host output?}
	HOST -->|Component| CHILD[Render child elements]
	HOST -->|DOM element| OP[Prepare host operation]
	CHILD --> FI
	OP --> DN[Browser DOM node]
```

The diagram shows that JSX first becomes element data. Fiber records connect that output to preserved state and work. Only host elements such as `div`, `button`, and `input` lead to DOM operations. A component such as `ProductCard` is called to obtain more element descriptions.

## Reconciliation and the Diffing Algorithm

Reconciliation compares new element output with the current Fiber tree to determine which identities can be reused and which host operations are required. React uses practical heuristics rather than calculating the mathematically minimal edit sequence for arbitrary trees.

### Core Identity Rules

1. **Same component or host type at the same position:** preserve identity and reconcile props/children.
2. **Different type at the same position:** remove the old subtree and mount a new one.
3. **Same sibling type and key:** preserve identity even when its sibling position changes.
4. **Changed key:** create a new identity and reset state below that point.
5. **Removed child:** schedule unmount behavior and host removal.

```mermaid
flowchart TD
	N[Next element at a position] --> T{Same type?}
	T -->|No| RM[Unmount old subtree]
	RM --> NM[Mount new subtree and state]
	T -->|Yes| K{Same key?}
	K -->|No| RM
	K -->|Yes| PR[Preserve Fiber and state]
	PR --> PP[Compare props]
	PP --> CH[Reconcile children]
	CH --> EF[Record required effects]
```

### State Preservation and Reset

```jsx
function ProfileWorkspace({ customerId }) {
	return (
		<section>
			{/* State resets intentionally when the business identity changes. */}
			<CustomerEditor key={customerId} customerId={customerId} />
		</section>
	);
}
```

Changing `customerId` changes the key, so React unmounts the previous editor identity and mounts a fresh one. This is appropriate when drafts must not leak between customers. It is inappropriate when the key changes accidentally on every render, such as `Math.random()`.

### List Reconciliation Example

```jsx
function StudentRows({ students }) {
	return students.map((student) => (
		<StudentRow key={student.id} student={student} />
	));
}
```

If a student moves from index 5 to index 1, the stable ID lets React associate the existing row state with that student. With index keys, React associates identities with positions, which can move input state, focus, or animation state to the wrong record.

> [!NOTE]
> A key only needs to be unique among siblings. React does not pass `key` as a normal prop; pass the ID separately when the component needs it.

## Fiber Architecture

Before Fiber, React's older stack reconciler processed a large update synchronously once it began. Fiber, introduced with React 16, represents the tree as linked units of work. This architecture supports priorities, interruption before commit, error boundaries, Suspense coordination, and concurrent rendering features.

A Fiber conceptually records information such as:

- Component or host type and key
- Parent, first child, and sibling relationships
- Current props and memoized state
- Hook state and update queues
- Pending work priority
- Flags describing commit work
- A link to the alternate Fiber in the other tree

These are conceptual categories, not a stable public schema.

```mermaid
flowchart TB
	ROOT[Host root Fiber] --> APP[App Fiber]
	APP --> NAV[Navigation Fiber]
	APP --> PAGE[ProductPage Fiber]
	PAGE --> INFO[ProductInfo Fiber]
	PAGE --> CART[AddToCart Fiber]
	CUR[Current tree] <--> ALT[Work-in-progress alternates]
	APP -. alternate .-> ALT
```

### Current and Work-in-Progress Trees

React maintains a current committed tree and prepares changes in work-in-progress Fibers. The work-in-progress tree can reuse alternate records rather than allocating an entirely unrelated permanent tree for every update.

```mermaid
stateDiagram-v2
	[*] --> CurrentTree
	CurrentTree --> WorkInProgress: update scheduled
	WorkInProgress --> WorkInProgress: perform units of work
	WorkInProgress --> Abandoned: superseded or failed work
	Abandoned --> WorkInProgress: restart latest update
	WorkInProgress --> FinishedTree: render completes
	FinishedTree --> CurrentTree: atomic commit switches current
```

The state diagram explains why render must be restartable. Work that has not committed may be abandoned. Application-visible side effects during render would therefore run without a corresponding committed UI.

### Fiber Memory Behavior

While a component is mounted, its Fiber can retain hook state, update queues, memoized values, props, and closures referenced by those values. Removed Fibers and elements become eligible for garbage collection only when no remaining application, browser, cache, timer, subscription, or developer-tool reference retains them.

## Update Queues, Lanes, and the Scheduler

Calling a setter creates/enqueues an update associated with the relevant Fiber. React classifies work into priority lanes so urgent interaction can be processed before non-urgent rendering. The scheduler coordinates when render work should run or yield to the browser.

Important principles:

- A setter requests work; it does not mutate the current render's variable.
- Multiple queued updater functions are processed in order.
- Urgent input should not be blocked behind expensive non-urgent results.
- React may render lower-priority work later or restart it with newer inputs.
- Once a selected tree enters commit, React does not expose a half-committed tree.

```mermaid
sequenceDiagram
	participant U as User input
	participant H as Event handler
	participant Q as Update queue
	participant S as React scheduler
	participant R as Render work
	participant C as Commit
	U->>H: Type a character
	H->>Q: Queue urgent input update
	H->>Q: Queue transition result update
	Q->>S: Pending lanes available
	S->>R: Process urgent lane first
	R->>C: Commit latest input
	S->>R: Continue non-urgent results
	Note over R: May yield or restart
	R->>C: Commit finished latest results
```

This sequence does not imply parallel JavaScript threads. It shows priority and interruptibility in React's render coordination.

## Render Phase

The render phase calculates the next UI and required work. At a high level React:

1. Selects pending lanes to process.
2. Begins at an affected Fiber/root.
3. Calls function components or class `render` methods.
4. Processes hooks and update queues for the selected work.
5. Reconciles returned children.
6. Records flags for insertions, updates, deletions, refs, and effects.
7. Completes the tree or yields/restarts before commit.

Render must not perform observable external mutation.

```jsx
// Wrong: an abandoned or repeated render still sends analytics.
function Product({ product }) {
	analytics.track("product_rendered", { id: product.id });
	return <h2>{product.name}</h2>;
}

// Correct: track the business event caused by user intent.
function Product({ product }) {
	function selectProduct() {
		analytics.track("product_selected", { id: product.id });
	}

	return <button onClick={selectProduct}>{product.name}</button>;
}
```

Pure rendering permits repeated calls with no external difference until commit. Calculations, local variable creation, and reading props/state are appropriate. Network requests, subscriptions, DOM mutation, timers, and analytics mutation belong in event handlers, effects, or dedicated integration layers.

### Render Without DOM Mutation

A parent update can call a child again even when the child returns equivalent host output. React still paid component and reconciliation CPU cost, but commit may have no host changes.

```jsx
function Greeting({ name }) {
	console.log("Greeting rendered");
	return <p>Hello, {name}</p>;
}
```

If the parent renders while `name` remains identical, the log can run again while the existing `p` and text remain unchanged. This distinction is essential when profiling.

## Commit Phase

Commit applies a finished render result to the host environment. Unlike concurrent render work, the selected commit is synchronous from the application's perspective so users do not observe a partially applied tree.

A simplified commit sequence is:

1. **Before mutation:** capture information needed before host changes, including class snapshots.
2. **Mutation:** insert, update, or remove host nodes and detach affected refs.
3. **Layout:** attach refs and run layout effects/class post-commit lifecycle work.
4. **Browser opportunity:** style, layout, and paint occur as required.
5. **Passive effects:** React later flushes `useEffect` cleanup/setup work.

```mermaid
sequenceDiagram
	participant R as Finished React work
	participant D as DOM
	participant L as Layout effects
	participant B as Browser
	participant P as Passive effects
	R->>R: Before-mutation work
	R->>D: Insert, update, remove nodes
	D->>L: Attach refs and run layout work
	L->>B: Release main thread
	B->>B: Style, layout, paint, composite
	B->>P: Flush passive cleanup and setup
```

`useLayoutEffect` can read the committed DOM and synchronously queue correction before paint, but it blocks painting. `useEffect` is preferable for work that does not need to affect the current frame.

## Complete Rendering Pipeline

For a state update caused by a click:

1. The browser dispatches the click event.
2. React's event handler executes with the current render snapshot.
3. A state setter enqueues one or more updates.
4. React batches eligible updates until the event work completes.
5. The scheduler chooses lanes to process.
6. React creates/updates work-in-progress Fibers.
7. Components run and return element descriptions.
8. Reconciliation preserves or replaces identities.
9. React records required host and effect work.
10. A completed tree enters commit.
11. DOM mutations and layout work run.
12. The browser recalculates and paints only what its engine determines is invalidated.
13. Passive effects clean up previous synchronization and establish the next synchronization.

```mermaid
flowchart LR
	EV[Browser event] --> EH[React handler]
	EH --> UQ[Update queues]
	UQ --> BA[Batch eligible work]
	BA --> SC[Select lanes]
	SC --> RE[Render Fibers]
	RE --> DI[Diff identities]
	DI --> FW[Finished work]
	FW --> CM[Commit host changes]
	CM --> BP[Browser pipeline]
	BP --> PE[Passive effects]
```

This end-to-end model separates an update request, React calculation, host mutation, and browser rendering. Performance investigation should identify which stage is actually expensive.

## Concurrent Rendering

Concurrent rendering is React's ability to prepare certain UI work interruptibly before commit. It does not mean components execute safely on background threads, and it does not make all updates asynchronous. Urgent controlled inputs still need immediate state updates.

```jsx
import { useState, useTransition } from "react";

function SearchWorkspace() {
	const [query, setQuery] = useState("");
	const [filter, setFilter] = useState("");
	const [isPending, startTransition] = useTransition();

	function handleChange(event) {
		const nextQuery = event.target.value;
		setQuery(nextQuery); // Urgent: keep the controlled input responsive.
		startTransition(() => {
			setFilter(nextQuery); // Non-urgent: expensive results may lag.
		});
	}

	return (
		<>
			<input value={query} onChange={handleChange} />
			{isPending && <span>Updating results...</span>}
			<ExpensiveResults filter={filter} />
		</>
	);
}
```

If another keystroke arrives while results are rendering, React can prioritize the new input and supersede obsolete result work. This improves responsiveness but does not reduce the cost of `ExpensiveResults`; optimize or virtualize it when necessary.

### Tearing and External Stores

Concurrent rendering can expose inconsistency if components read a mutable external store at different times. `useSyncExternalStore` provides React with a subscription and stable snapshot contract so a committed tree observes a consistent external state.

## Automatic Batching

Batching groups multiple state updates into fewer render/commit cycles. With a React 18 `createRoot`, updates in React events, promises, timers, and native event callbacks are generally batched.

```jsx
function SaveButton() {
	const [status, setStatus] = useState("idle");
	const [savedCount, setSavedCount] = useState(0);

	async function save() {
		setStatus("saving");
		await api.save();
		setSavedCount((current) => current + 1);
		setStatus("saved");
	}

	return <button onClick={save}>{status}: {savedCount}</button>;
}
```

After the promise resolves, the count and status updates can be processed in one render. Batching improves throughput; it does not change snapshot semantics. Functional updaters remain necessary when next state depends on previous pending state.

`flushSync` can force React to commit synchronously for rare browser/third-party integration requirements. It defeats batching and can expose fallbacks or hurt responsiveness, so it should not be routine application code.

## Strict Mode

Strict Mode enables development-only checks for behavior that is unsafe under modern rendering. It can:

- Call component render logic more than once to expose impure calculations
- Invoke state initializer/updater functions more than once in development checks
- Run an additional effect setup-cleanup-setup cycle on initial mount
- Warn about deprecated or unsafe patterns

```mermaid
sequenceDiagram
	participant R as React Strict Mode
	participant C as Component
	participant E as Effect
	R->>C: Development render check
	R->>C: Development render check again
	R->>R: Commit visible tree
	R->>E: Run setup
	R->>E: Run cleanup test
	R->>E: Run setup again
	Note over R,E: Production does not run this test cycle
```

### Incorrect and Correct Cleanup

```jsx
// Wrong: no cleanup, so remount/testing can retain duplicate listeners.
useEffect(() => {
	window.addEventListener("resize", handleResize);
}, []);

// Correct: cleanup mirrors setup.
useEffect(() => {
	window.addEventListener("resize", handleResize);
	return () => window.removeEventListener("resize", handleResize);
}, []);
```

Disabling Strict Mode hides evidence; it does not repair impure rendering or leaked synchronization.

## Hydration and Server-Rendered Output

Hydration attaches React behavior to compatible HTML that was already generated on a server. React expects the client component tree to produce matching initial output. Differences caused by timestamps, random values, browser-only branches, locale mismatches, or invalid HTML can produce hydration warnings and replacement work.

```jsx
// Wrong for deterministic server/client first output.
function RequestId() {
	return <span>{Math.random()}</span>;
}

// Appropriate for stable accessibility relationships.
function EmailField() {
	const id = useId();
	return <><label htmlFor={id}>Email</label><input id={id} /></>;
}
```

Server rendering creates HTML; it does not preserve a server Fiber tree in the browser. The client creates its own React structures while hydrating the existing host nodes.

## Memory Model and Garbage Collection

React participates in JavaScript memory management but does not replace garbage collection. Memory remains reachable through references.

| Retained object | Common retaining reference | Release strategy |
|---|---|---|
| Component/Fiber state | Mounted tree | Unmount or replace identity |
| Subscription callback | External event source | Unsubscribe in cleanup |
| Timer closure | Browser timer queue | Clear timer in cleanup |
| In-flight request callback | Promise/request | Abort and ignore obsolete completion |
| Cached data | Store/query cache | Expiration, eviction, bounded policy |
| DOM node | Ref or third-party library | Clear integration and destroy plugin |
| Large memoized value | Mounted hook state | Remove unnecessary memo or unmount owner |

### Memory Leak Example

```jsx
function LivePrices({ productId }) {
	useEffect(() => {
		const subscription = prices.subscribe(productId, updatePrice);
		return () => subscription.unsubscribe();
	}, [productId]);

	return <PriceDisplay productId={productId} />;
}
```

When `productId` changes, cleanup releases the old subscription before the new synchronization is established. On unmount, final cleanup lets the external source release the callback closure and captured references.

## Performance Analysis

Separate four kinds of cost:

1. **Scheduling and queueing:** usually small, but update storms can accumulate work.
2. **Render/reconciliation:** JavaScript CPU spent calling components and comparing output.
3. **Commit:** refs, effects, and DOM mutations.
4. **Browser rendering:** style, layout, paint, compositing, and image work.

Use the React DevTools Profiler for component render and commit information. Use browser Performance and Memory tools for long tasks, event timing, forced layouts, paint, allocations, and retained objects. Measure a production build because development checks and source instrumentation change results.

```mermaid
flowchart TD
	S[Slow interaction] --> P[Record production profile]
	P --> Q{Dominant cost?}
	Q -->|React render| RR[Colocate state or reduce expensive renders]
	Q -->|DOM size| VD[Virtualize or paginate]
	Q -->|Layout or paint| LP[Reduce invalidation and layout thrashing]
	Q -->|Network or bundle| NB[Cache, split, compress, prefetch carefully]
	Q -->|Memory growth| MG[Inspect retainers and cleanup]
	RR --> M[Measure again]
	VD --> M
	LP --> M
	NB --> M
	MG --> M
```

### Common Performance Problems

- State placed at the application root causes broad render work for local interactions.
- Unstable objects/functions defeat memoized child props.
- Huge lists create excessive React work and browser DOM/layout cost.
- Layout reads immediately after DOM/style writes force synchronous calculation.
- Effects trigger chains of state updates and additional commits.
- Duplicate server data is copied into several stores and drifts.
- Overuse of memoization increases comparison work and retained memory.

## Real-World Internal Flows

### E-Commerce Search

Typing updates the controlled input urgently. Product filtering can be deferred or transitioned. A virtualized result list controls DOM size. Stable product keys preserve row identity. Remote requests should be canceled or keyed in a server-state cache.

### Banking Transfer

Form input remains urgent and controlled. A submit event starts the external mutation. Pending/success/failure states create explicit render snapshots. Authorization occurs on the API. A transaction ID provides stable business identity; sensitive data must not appear in logs or client bundles.

### Chat Application

A subscription effect acquires a room connection after commit and releases it when the room changes. Incoming messages enqueue updates. Stable message IDs preserve rows. Windowing limits DOM size, while cleanup prevents callbacks from retaining unmounted room state.

### Analytics Dashboard

Route-level code splitting reduces initial modules. Query caching avoids duplicate remote work. A chart boundary isolates failures. Expensive chart layout can dominate browser paint even when React reconciliation is efficient, so both React and browser profiles are required.

## Common Mistakes and Production Best Practices

| Mistake | Why it fails | Better approach |
|---|---|---|
| Calling APIs during render | Render may repeat or be abandoned | Event handler, effect with cleanup, or data layer |
| Treating Virtual DOM as always faster | React calculation also costs CPU | Measure complete interaction cost |
| Random or index keys in changing lists | Identity/state attaches to wrong row | Stable data identifiers |
| Assuming render means DOM change | Reconciliation may find no host difference | Profile render and commit separately |
| Disabling Strict Mode to stop duplicates | Hides impurity/leaks | Make setup idempotent and add cleanup |
| Using transitions for controlled input state | Input can lag behind typing | Keep input urgent; transition slow consumers |
| Reading private Fiber fields | Internal schema is unsupported | Depend on documented behavior and DevTools |
| Memoizing everything | Adds comparisons and retains values | Optimize measured expensive paths |

Production guidance:

- Keep render deterministic and free of external mutation.
- Preserve identity deliberately with component type, position, and stable keys.
- Treat effects as synchronization processes with symmetric cleanup.
- Keep urgent interaction separate from non-urgent expensive rendering.
- Bound DOM size through pagination or virtualization.
- Use React Profiler and browser tooling together.
- Confirm behavior in production builds and representative devices.
- Document performance budgets and validate them in delivery pipelines.

---

<a id="module-3-component-lifecycle"></a>
# Module 3: Component Lifecycle

[Previous: Internals](#module-2-react-internals) | [Next: Hooks](#module-4-react-hooks)

## Introduction

A component lifecycle describes how a component identity is created, rendered, committed, updated, and removed from the React tree. Lifecycle is not simply the amount of time a function or class exists in memory. It follows the identity React preserves through component type, tree position, and key.

Three high-level lifecycle phases are visible to application developers:

1. **Mount:** React creates a component identity and commits its initial host output.
2. **Update:** existing identity receives new props, state, or context and may commit changed output.
3. **Unmount:** React removes that identity, runs cleanup, detaches refs, and removes associated host output.

Class components expose named lifecycle methods. Function components do not have equivalent methods for every phase. They render snapshots and use effects to synchronize independent external processes. This distinction matters: `useEffect` is not a generic "after lifecycle" callback and should not be used for pure calculations or user actions.

### Why Lifecycle APIs Exist

Rendering describes UI, but applications also interact with systems outside React:

- Network requests and streaming connections
- Browser event listeners and observers
- Timers and animation APIs
- Document title, focus, and selection
- Third-party widgets and imperative libraries
- Logging, monitoring, and analytics

Lifecycle APIs define safe times to acquire, update, and release those resources relative to React's commits.

```mermaid
stateDiagram-v2
	[*] --> MountRender: identity introduced
	MountRender --> Mounted: initial commit
	Mounted --> UpdateRender: props, state, or context
	UpdateRender --> Mounted: update commit
	UpdateRender --> UpdateRender: interrupted or restarted render
	Mounted --> Unmounting: removed or identity changed
	Unmounting --> [*]: cleanup and host removal
	MountRender --> ErrorRecovery: descendant throws
	UpdateRender --> ErrorRecovery: descendant throws
	ErrorRecovery --> Mounted: fallback committed
```

The state diagram separates render from commit. Mount and update rendering can be repeated before React commits. Cleanup occurs when synchronization dependencies change or when the component identity is removed. An ancestor error boundary can replace a failed subtree with fallback UI.

## Lifecycle and React Phases

Lifecycle methods and hooks execute within React's broader render and commit phases:

| React work | Class component | Function component | May perform side effects? |
|---|---|---|---:|
| Render calculation | `constructor`, `render`, static derived state | component body, state/reducer calculations | No |
| Optional render bailout | `shouldComponentUpdate` | `memo`, unchanged state, compiler/store optimizations | No |
| Before DOM mutation | `getSnapshotBeforeUpdate` | specialized layout-effect cleanup behavior | Read only for snapshot purpose |
| Layout commit work | `componentDidMount`, `componentDidUpdate` | `useLayoutEffect` setup | Yes, but blocks paint |
| Passive commit work | No direct class equivalent with identical timing | `useEffect` cleanup/setup | Yes |
| Removal | `componentWillUnmount` | layout/passive effect cleanup | Release resources |

> [!WARNING]
> Constructors, render methods, component functions, reducer functions, state initializers, and `shouldComponentUpdate` belong to render calculation. They must remain pure because React may invoke or discard render work.

## Class Component Lifecycle

Class components remain fully supported. They are especially important when maintaining established enterprise applications and when implementing error boundaries.

```mermaid
flowchart TD
	C[constructor] --> R1[render]
	R1 --> CM[Commit DOM]
	CM --> CDM[componentDidMount]
	CDM --> T{Props, state, or context change}
	T --> SCU[shouldComponentUpdate]
	SCU -->|false| WAIT[Preserve current rendered output]
	SCU -->|true| R2[render]
	R2 --> GS[getSnapshotBeforeUpdate]
	GS --> UC[Commit DOM update]
	UC --> CDU[componentDidUpdate]
	CDU --> T
	WAIT --> T
	T -->|identity removed| CWU[componentWillUnmount]
	CWU --> END[Host removal]
```

This is a simplified application-facing sequence. Context updates and error recovery can affect paths, and React's internal implementation contains additional work. The key rule is that render-side methods calculate, while did-mount/did-update/unmount methods synchronize around committed output.

### `constructor(props)`

The constructor initializes class state and binds methods when class-field syntax is not used.

```jsx
import { Component } from "react";

class OrderEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			note: props.initialNote ?? "",
			saving: false,
		};
		this.handleNoteChange = this.handleNoteChange.bind(this);
	}

	handleNoteChange(event) {
		this.setState({ note: event.target.value });
	}

	render() {
		return <textarea value={this.state.note} onChange={this.handleNoteChange} />;
	}
}
```

`super(props)` initializes the base `Component` instance before `this` is used. The constructor must not subscribe, request data, set timers, or read DOM nodes because nothing has committed. Copying `initialNote` is appropriate only because this component intentionally owns an editable draft; ordinary props should not be duplicated into state.

### `render()`

`render` reads props/state/context and returns elements, strings, numbers, fragments, portals, arrays of keyed elements, or `null`. It must be pure.

```jsx
render() {
	const { order } = this.props;
	const { saving } = this.state;

	if (!order) return <p>No order selected.</p>;

	return (
		<section aria-busy={saving}>
			<h2>Order {order.number}</h2>
			<button disabled={saving} onClick={this.saveOrder}>
				{saving ? "Saving..." : "Save"}
			</button>
		</section>
	);
}
```

An event callback may cause a side effect because it runs in response to user intent. Calling the side effect directly from `render` would be unsafe.

### `componentDidMount()`

`componentDidMount` runs after the initial output is committed. The DOM and refs exist, so it can establish subscriptions, integrate a widget, focus an element, or start a request.

```jsx
class OnlineStatus extends Component {
	state = { online: navigator.onLine };

	componentDidMount() {
		window.addEventListener("online", this.updateStatus);
		window.addEventListener("offline", this.updateStatus);
	}

	componentWillUnmount() {
		window.removeEventListener("online", this.updateStatus);
		window.removeEventListener("offline", this.updateStatus);
	}

	updateStatus = () => {
		this.setState({ online: navigator.onLine });
	};

	render() {
		return <output>{this.state.online ? "Online" : "Offline"}</output>;
	}
}
```

The unmount method mirrors mount setup. Without cleanup, the browser retains the callback and class instance after removal.

### `shouldComponentUpdate(nextProps, nextState)`

This method can return `false` to skip rendering for an update. It is a performance optimization, not a correctness mechanism.

```jsx
shouldComponentUpdate(nextProps, nextState) {
	return (
		nextProps.product !== this.props.product ||
		nextState.expanded !== this.state.expanded
	);
}
```

Manual comparison is easy to get wrong. A skipped render also skips update lifecycle methods for that update. Prefer normal rendering unless profiling identifies a costly path; then use immutable data and a complete comparison or extend `PureComponent`, which performs shallow prop/state comparison.

> [!NOTE]
> Returning `false` does not permanently prevent all future rendering, and it should never be used to hide state synchronization defects.

### `getSnapshotBeforeUpdate(previousProps, previousState)`

This method runs after render has calculated updated output but immediately before React mutates the DOM. It captures information that would otherwise be lost, such as scroll position.

```jsx
class MessageList extends Component {
	listRef = React.createRef();

	getSnapshotBeforeUpdate(previousProps) {
		if (previousProps.messages.length < this.props.messages.length) {
			const list = this.listRef.current;
			return list.scrollHeight - list.scrollTop;
		}
		return null;
	}

	componentDidUpdate(_previousProps, _previousState, snapshot) {
		if (snapshot !== null) {
			const list = this.listRef.current;
			list.scrollTop = list.scrollHeight - snapshot;
		}
	}

	render() {
		return (
			<ul ref={this.listRef}>
				{this.props.messages.map((message) => (
					<li key={message.id}>{message.text}</li>
				))}
			</ul>
		);
	}
}
```

The returned snapshot becomes the third argument to `componentDidUpdate`. Do not perform asynchronous work here; capture the minimum pre-mutation value.

### `componentDidUpdate(previousProps, previousState, snapshot)`

This method runs after an update commits. It can synchronize an external system based on what changed, but conditions are essential to avoid loops.

```jsx
componentDidUpdate(previousProps) {
	if (previousProps.roomId !== this.props.roomId) {
		this.disconnectFromRoom(previousProps.roomId);
		this.connectToRoom(this.props.roomId);
	}
}
```

Calling `setState` unconditionally from `componentDidUpdate` creates a render-update loop. Guard by comparing previous and current values, or redesign the state so no synchronization update is needed.

### `componentWillUnmount()`

Unmount runs before a component identity and committed host subtree are removed. It must release every owned external resource:

```jsx
componentWillUnmount() {
	this.abortController?.abort();
	this.subscription?.unsubscribe();
	window.clearInterval(this.intervalId);
	this.widget?.destroy();
}
```

Do not call `setState` during unmount; the component will not render again. Cleanup should be idempotent where practical because integrations may already be closed.

## Complete Class Lifecycle Example

```jsx
class ChatRoom extends Component {
	state = { messages: [], status: "connecting" };

	componentDidMount() {
		this.connect(this.props.roomId);
	}

	componentDidUpdate(previousProps) {
		if (previousProps.roomId !== this.props.roomId) {
			this.disconnect();
			this.setState({ messages: [], status: "connecting" });
			this.connect(this.props.roomId);
		}
	}

	componentWillUnmount() {
		this.disconnect();
	}

	connect(roomId) {
		this.connection = chatApi.subscribe(roomId, {
			onOpen: () => this.setState({ status: "connected" }),
			onMessage: (message) => {
				this.setState(({ messages }) => ({ messages: [...messages, message] }));
			},
		});
	}

	disconnect() {
		this.connection?.unsubscribe();
		this.connection = null;
	}

	render() {
		return (
			<section aria-busy={this.state.status === "connecting"}>
				<p>Status: {this.state.status}</p>
				<MessageList messages={this.state.messages} />
			</section>
		);
	}
}
```

One synchronization concern is distributed across mount, update, and unmount methods. This fragmentation is one reason hooks model synchronization by concern instead of by lifecycle phase.

## Function Component Lifecycle

A function component has no persistent function instance. React calls the function for each render and associates state/effects with the preserved Fiber identity. Local variables belong to one render snapshot; refs and hook state survive through React's bookkeeping.

### Functional Mount Flow

```mermaid
sequenceDiagram
	participant R as React
	participant C as Component function
	participant D as DOM
	participant B as Browser
	participant E as Effects
	R->>C: Call with initial props and state
	C-->>R: Return element tree
	R->>D: Commit initial host nodes
	R->>E: Attach refs and run layout effects
	E->>B: Browser paints
	B->>E: Run passive effect setup
```

Mount execution:

1. State initializers and component logic run during render.
2. React reconciles the returned elements.
3. Commit creates/updates host nodes and attaches refs.
4. Layout effects run before paint.
5. The browser paints.
6. Passive effects normally run after commit/paint opportunity.

### Functional Update Flow

An update begins when state, parent rendering, consumed context, or an external-store subscription changes.

```mermaid
sequenceDiagram
	participant T as Update trigger
	participant R as React render
	participant C as Commit
	participant L as Layout effects
	participant P as Passive effects
	T->>R: Queue update
	R->>R: Call component with new snapshot
	R->>R: Reconcile identities
	R->>C: Commit changed host output
	C->>L: Previous layout cleanup
	L->>L: New layout setup
	C->>P: Schedule passive work
	P->>P: Previous passive cleanup
	P->>P: New passive setup
```

Only effects whose dependency comparisons indicate a change need resynchronization. Effects without a dependency array run after every relevant commit; `[]` effects rerun when the component remounts and receive an extra development test cycle under Strict Mode.

### Functional Unmount Flow

```mermaid
flowchart LR
	ID[Identity removed by parent, type, or key] --> LC[Run layout-effect cleanup]
	LC --> RR[Detach refs]
	RR --> HD[Remove host descendants]
	HD --> PC[Run passive-effect cleanup]
	PC --> GC[Release reachable references]
	GC --> EL[Objects become GC eligible]
```

Garbage collection is not immediate or controlled by React. Cleanup removes external references so unreachable Fibers, closures, and DOM-related objects can become eligible.

## Effects as Synchronization Processes

An effect should describe one independent synchronization relationship: connect to a room, observe an element, control a map widget, or report a committed page view. Setup acquires/configures the external resource; cleanup reverses that work.

```jsx
import { useEffect, useState } from "react";

function ChatRoom({ roomId }) {
	const [messages, setMessages] = useState([]);
	const [status, setStatus] = useState("connecting");

	useEffect(() => {
		setMessages([]);
		setStatus("connecting");

		const connection = chatApi.subscribe(roomId, {
			onOpen: () => setStatus("connected"),
			onMessage: (message) => {
				setMessages((current) => [...current, message]);
			},
		});

		return () => connection.unsubscribe();
	}, [roomId]);

	return (
		<section aria-busy={status === "connecting"}>
			<p>Status: {status}</p>
			<MessageList messages={messages} />
		</section>
	);
}
```

When `roomId` changes, React renders and commits the new snapshot, cleans up the old room subscription, and establishes the new one. On unmount, cleanup releases the final connection.

> [!TIP]
> If changing `roomId` represents a completely new screen identity and every nested draft should reset, key the room subtree by `roomId` instead of resetting many independent state variables in an effect.

### Dependency Arrays

```jsx
// Runs after every commit of this component.
useEffect(() => synchronize());

// Resynchronizes when roomId or serverUrl changes, and on mount/remount.
useEffect(() => {
	const connection = connect(serverUrl, roomId);
	return () => connection.disconnect();
}, [serverUrl, roomId]);

// Synchronizes with no reactive values, but still remounts and is tested by Strict Mode.
useEffect(() => {
	const listener = () => reportViewport(window.innerWidth);
	window.addEventListener("resize", listener);
	return () => window.removeEventListener("resize", listener);
}, []);
```

Dependencies are not an optimization wish list. They describe every reactive value read by setup/cleanup. Suppressing the exhaustive-deps rule can preserve stale closures and connect cleanup to the wrong resource.

### Stale Closure Example

```jsx
// Wrong: interval always sees the first count because count is omitted.
useEffect(() => {
	const id = setInterval(() => console.log(count), 1000);
	return () => clearInterval(id);
}, []);

// Correct when the interval should reflect each committed count.
useEffect(() => {
	const id = setInterval(() => console.log(count), 1000);
	return () => clearInterval(id);
}, [count]);
```

If recreating the interval is undesirable, redesign around a functional update, ref, or effect-event pattern appropriate to the actual requirement rather than lying about dependencies.

## `useEffect` Lifecycle Timing

`useEffect` is passive synchronization. It normally runs after React commits, often after the browser has painted. It is suitable for subscriptions, requests, analytics, storage coordination, and nonvisual third-party integrations.

```mermaid
stateDiagram-v2
	[*] --> Setup: first committed dependency set
	Setup --> Active
	Active --> Cleanup: dependency changed
	Cleanup --> Setup: establish next dependency set
	Active --> FinalCleanup: component unmounted
	FinalCleanup --> [*]
	Setup --> Cleanup: Strict Mode development test
```

The lifecycle belongs to the synchronization process, not merely the component. A component can stay mounted while an effect repeatedly cleans up and restarts because one dependency changed.

### Cancellable Request Example

```jsx
function UserProfile({ userId }) {
	const [state, setState] = useState({ status: "loading", user: null, error: null });

	useEffect(() => {
		const controller = new AbortController();
		setState({ status: "loading", user: null, error: null });

		async function loadUser() {
			try {
				const response = await fetch(`/api/users/${userId}`, {
					signal: controller.signal,
				});
				if (!response.ok) throw new Error(`HTTP ${response.status}`);
				const user = await response.json();
				setState({ status: "succeeded", user, error: null });
			} catch (error) {
				if (error.name !== "AbortError") {
					setState({ status: "failed", user: null, error });
				}
			}
		}

		loadUser();
		return () => controller.abort();
	}, [userId]);

	if (state.status === "loading") return <Spinner />;
	if (state.status === "failed") return <p role="alert">Unable to load user.</p>;
	return <UserCard user={state.user} />;
}
```

Cancellation prevents an obsolete request from continuing to consume resources or committing stale data. Production applications with shared server state usually benefit from RTK Query or another data layer rather than repeating request lifecycle logic in components.

## `useLayoutEffect` Lifecycle Timing

`useLayoutEffect` has the same dependency/cleanup model as `useEffect`, but setup runs synchronously after DOM mutation and before the browser paints. It is intended for layout measurement or visual correction that cannot tolerate one frame of incorrect geometry.

```jsx
import { useLayoutEffect, useRef, useState } from "react";

function Tooltip({ targetRect, children }) {
	const tooltipRef = useRef(null);
	const [height, setHeight] = useState(0);

	useLayoutEffect(() => {
		const nextHeight = tooltipRef.current.getBoundingClientRect().height;
		setHeight(nextHeight);
	}, [children]);

	return (
		<div
			ref={tooltipRef}
			style={{ position: "fixed", top: targetRect.top - height }}
		>
			{children}
		</div>
	);
}
```

React first commits a measurable tooltip, the layout effect reads its geometry, and a synchronous corrective render occurs before paint. This avoids a visible jump but delays painting. Use passive effects for all work that does not require this timing.

```mermaid
sequenceDiagram
	participant R as React render
	participant D as DOM commit
	participant L as useLayoutEffect
	participant B as Browser paint
	participant E as useEffect
	R->>D: Apply host mutations
	D->>L: Cleanup previous and run new layout setup
	L-->>R: Optional synchronous correction
	R->>D: Commit correction if queued
	D->>B: Paint final frame
	B->>E: Run passive cleanup and setup
```

## When No Effect Is Needed

Effects are frequently overused. Do not use an effect for pure derived data, event-specific work, or resetting an entire identity.

```jsx
// Wrong: adds an unnecessary commit and can show stale data briefly.
useEffect(() => {
	setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);

// Correct: derive during render.
const fullName = `${firstName} ${lastName}`;
```

```jsx
// Wrong: an effect observes state to infer the user just submitted.
useEffect(() => {
	if (submitted) ordersApi.create(order);
}, [submitted, order]);

// Correct: the submit event owns the action.
async function handleSubmit(event) {
	event.preventDefault();
	await ordersApi.create(order);
}
```

Removing unnecessary effects reduces render chains, synchronization bugs, and memory complexity.

## Error Boundaries

An error boundary is a class component that catches errors thrown while rendering descendants, in descendant constructors, and in descendant lifecycle methods. It commits fallback UI instead of leaving a corrupted subtree.

```mermaid
flowchart TD
	CH[Child subtree renders] --> ER{Error thrown?}
	ER -->|No| OK[Commit normal UI]
	ER -->|Yes| AN[Find nearest ancestor boundary]
	AN --> DS[getDerivedStateFromError]
	DS --> FB[Render and commit fallback]
	FB --> DC[componentDidCatch reports details]
	DC --> RT{User retries?}
	RT -->|Yes| NK[Reset boundary or change subtree key]
	NK --> CH
```

### Production Error Boundary

```jsx
class ErrorBoundary extends React.Component {
	state = { error: null, resetKey: 0 };

	static getDerivedStateFromError(error) {
		return { error };
	}

	componentDidCatch(error, info) {
		monitoring.captureException(error, {
			componentStack: info.componentStack,
			feature: this.props.feature,
		});
	}

	handleRetry = () => {
		this.setState(({ resetKey }) => ({ error: null, resetKey: resetKey + 1 }));
	};

	render() {
		if (this.state.error) {
			return <Fallback onRetry={this.handleRetry} />;
		}

		return <React.Fragment key={this.state.resetKey}>{this.props.children}</React.Fragment>;
	}
}
```

Boundaries do not catch:

- Errors thrown in event handlers (use `try/catch` or rejected-state handling)
- Arbitrary asynchronous callbacks and promise rejections
- Server/API error responses unless rendering code throws them deliberately
- Errors thrown inside the boundary itself
- Errors during server rendering for that same boundary instance

Place boundaries around routes and independently recoverable widgets. A single root boundary prevents a blank application but cannot preserve unaffected regions when one small widget fails.

## Lifecycle Identity and Remounting

A component unmounts and mounts again when its identity changes because of type, key, or tree removal.

```jsx
function CustomerPage({ customerId }) {
	return <CustomerForm key={customerId} customerId={customerId} />;
}
```

When the ID changes:

1. The old form's layout/passive cleanup runs.
2. Its local draft state is discarded.
3. React creates a new form identity with fresh hook state.
4. New host output commits.
5. New effects establish synchronization.

This is useful for deliberate reset. Accidental dynamic keys create repeated requests, lost focus, destroyed input drafts, and unnecessary allocation.

## Class vs Function Lifecycle Comparison

| Requirement | Class pattern | Function pattern |
|---|---|---|
| Initialize local state | constructor/class field | `useState` or `useReducer` initializer |
| Render output | `render()` | component function return |
| Subscribe after commit | `componentDidMount` | `useEffect` |
| Replace subscription on prop change | compare in `componentDidUpdate` | dependency-driven effect cleanup/setup |
| Release subscription | `componentWillUnmount` | effect cleanup |
| Measure before paint | snapshot/did-update combination | `useLayoutEffect` |
| Skip expensive render | `PureComponent`/`shouldComponentUpdate` | `memo` after profiling |
| Catch descendant render failure | error-boundary class | class boundary/library wrapper |
| Reuse stateful behavior | render props/HOC/helper class | custom hook |

Hooks do not make lifecycle disappear. They organize related setup and cleanup together, while class methods organize work by lifecycle phase.

## Memory Changes Across the Lifecycle

```mermaid
flowchart TB
	M[Mount] --> A[Allocate Fiber, hook/class state, closures, host nodes]
	A --> S[Effect setup adds external references]
	S --> U[Updates create snapshots and replace retained values]
	U --> C[Dependency cleanup releases old external references]
	C --> S
	U --> X[Unmount]
	X --> FC[Final cleanup and ref detachment]
	FC --> G[Unreachable objects become GC eligible]
```

Common retainers include event targets, timers, observers, subscriptions, unresolved requests, query caches, and third-party widgets. React can remove its tree references, but it cannot automatically unsubscribe from an external API that still holds a callback.

## Lifecycle Performance

- Rendering is JavaScript work even when commit makes no DOM changes.
- A layout effect blocks paint and may force synchronous layout when reading geometry.
- An effect that immediately sets state adds another render and commit.
- Repeated mount/unmount destroys caches, DOM state, focus, and subscriptions.
- Broad parent state can update many children and run their render calculations.
- Cleanup/setup churn can be costly for sockets, observers, media streams, and widgets.
- Strict Mode development behavior should reveal defects, not be used for production timing measurements.

### Optimized Subscription Ownership

```jsx
function Dashboard({ selectedRoomId }) {
	return (
		<DashboardLayout>
			<StaticNavigation />
			<ChatRoom roomId={selectedRoomId} />
		</DashboardLayout>
	);
}
```

Keep the subscription in the narrow `ChatRoom` owner rather than the entire dashboard. Room updates then affect a smaller render subtree, and cleanup responsibility remains near acquisition.

## Real-World Lifecycle Scenarios

| Domain | Mount | Update | Unmount/cleanup |
|---|---|---|---|
| E-commerce | Load or subscribe to cart state | Product/cart identity changes | Cancel obsolete requests |
| Student management | Initialize selected student workspace | Student ID or filters change | Release observers and drafts |
| Banking | Establish secure session/status listener | Account or transfer state changes | Clear sensitive timers/subscriptions |
| CRM | Connect lead activity stream | Selected lead changes | Disconnect previous lead stream |
| Dashboard | Initialize charts after host commit | Data/size/theme changes | Destroy chart instances and observers |
| HRMS | Load leave workflow | Employee or policy changes | Cancel validation and upload work |
| Food ordering | Open restaurant/menu context | Restaurant changes | Reset basket according to business rule |
| Chat | Subscribe to room | Room identity changes | Unsubscribe and release callbacks |
| Social media | Observe feed sentinel | Filter/account changes | Disconnect observer and abort pages |

## Common Mistakes and Production Best Practices

| Mistake | Result | Production correction |
|---|---|---|
| Side effect in constructor/render | Repeats during discarded render work | Move to event or effect/did-mount |
| Missing cleanup | Duplicate callbacks and retained memory | Mirror every acquired resource |
| Unconditional update in did-update/effect | Infinite or excessive render loop | Compare dependencies or derive during render |
| Empty dependency array used to silence lint | Stale closure and wrong resource | Include dependencies or restructure ownership |
| One effect handles unrelated systems | Coupled restart and difficult cleanup | Split by synchronization concern |
| Layout effect for network/analytics | Blocks paint unnecessarily | Use passive effect/data layer |
| Random key to "refresh" component | Repeated remount, lost state/focus | Stable identity; explicit reset only when required |
| Root-only error boundary | Small failure replaces entire app | Add route/widget recovery boundaries |
| Manual class bailout with incomplete comparison | Stale UI | Preserve correctness; optimize measured paths |

Production guidance:

- Treat render as a pure calculation and commit APIs as integration points.
- Pair setup and cleanup in the same conceptual concern.
- Use dependency arrays as correctness declarations.
- Cancel obsolete requests and ignore expected cancellation errors.
- Prefer explicit status state over ambiguous booleans.
- Use layout effects only for pre-paint visual requirements.
- Preserve or reset identity deliberately through type, position, and key.
- Place boundaries according to recovery scope and report errors with release context.
- Profile mount/update churn on production builds and representative devices.

---

<a id="module-4-react-hooks"></a>
# Module 4: React Hooks

[Previous: Lifecycle](#module-3-component-lifecycle) | [Next: Communication](#module-5-component-communication)

## Introduction

Hooks are React functions that let function components use state, reducers, refs, context, effects, concurrent scheduling, and external-store integration. Hooks were introduced in React 16.8 to make stateful behavior composable without class instances, higher-order wrappers, or lifecycle logic split across unrelated methods.

Hooks do not make functions stateful by storing values in local variables. React stores hook records on the component's preserved Fiber identity. Each render receives snapshots from those records and returns new element descriptions.

### Why Hooks Exist

Before hooks, reusable stateful behavior commonly required render props, higher-order components, mixins in older systems, or helper classes. Those patterns could create deep wrapper trees, prop collisions, and lifecycle fragmentation. Hooks let a custom hook colocate setup, cleanup, state, and reusable policy.

| Advantage | Tradeoff |
|---|---|
| Composes stateful behavior through functions | Call order rules must be respected |
| Keeps one synchronization concern together | Dependency mistakes create stale closures |
| Removes most wrapper components | Hooks can hide expensive or surprising behavior if poorly named |
| Works with concurrent rendering semantics | Render purity becomes non-negotiable |
| Supports focused custom APIs | Custom hooks share logic, not state automatically |

## Hook Storage and Internal Working

React associates a linked sequence of hook records with each function-component Fiber. During rendering, React advances through those records in call order. Variables such as `count` or `theme` do not identify hook state; position does.

```mermaid
flowchart LR
	F[ProductPage Fiber] --> H1[Hook 1: state queue]
	H1 --> H2[Hook 2: ref object]
	H2 --> H3[Hook 3: memo value and deps]
	H3 --> H4[Hook 4: effect and deps]
	N[Next render] --> O[Call hooks in identical order]
	O --> H1
```

On initial mount, React creates hook records. On update, it reuses the records in the same order, processes pending updates, compares dependencies with `Object.is`, and returns the current values for that render.

### Rules of Hooks

1. Call hooks only at the top level of a React function component or custom hook.
2. Do not call hooks in conditions, loops, event handlers, nested functions, or ordinary utilities.
3. Custom hook names begin with `use` so tooling can enforce these rules.
4. Components and hooks must remain pure during render.

```jsx
// Wrong: the second render may skip a hook and shift later records.
if (authenticated) {
	const [profile, setProfile] = useState(null);
}

// Correct: always call the hook; put the condition in behavior or output.
const [profile, setProfile] = useState(null);
if (!authenticated) return <Login />;
```

```mermaid
flowchart TD
	R1[Render 1 calls state, effect, ref] --> M1[Records: 1 state, 2 effect, 3 ref]
	R2[Render 2 condition skips effect] --> M2[Calls: 1 state, 2 ref]
	M2 --> E[Record 2 is misinterpreted]
	E --> B[Broken hook state association]
```

## Hook Reference

| Hook | Primary purpose | Schedules rendering? | Main production rule |
|---|---|---:|---|
| `useState` | Local state snapshot | Setter does | Use updater when next depends on previous |
| `useReducer` | Action-driven transitions | `dispatch` does | Reducer must be pure |
| `useEffect` | Passive external synchronization | Only if effect queues state | Complete dependencies and cleanup |
| `useLayoutEffect` | Pre-paint synchronization | Only if setup queues state | Blocks paint; reserve for visual measurement |
| `useRef` | Stable mutable cell or host ref | No | Do not use for visible state |
| `useMemo` | Cache calculation result | No | Optimization, not semantic storage |
| `useCallback` | Cache function identity | No | Use only when identity is observed |
| `useContext` | Read nearest provider value | Provider change does | Split broad/high-frequency contexts |
| `useImperativeHandle` | Customize exposed ref API | No by itself | Expose narrow operations |
| `useTransition` | Mark updates non-urgent | Yes | Keep controlled inputs urgent |
| `useDeferredValue` | Let a consumer lag behind a value | Yes | Does not debounce requests itself |
| `useId` | Hydration-safe accessibility IDs | No | Never use for list keys |
| `useSyncExternalStore` | Consistent external-store snapshot | Subscription does | Snapshot must be cached/stable |
| `useInsertionEffect` | Insert dynamic styles before layout work | Not for state updates | Library-author API |

## `useState`

`useState(initialState)` returns the state snapshot for the current render and a stable setter. Passing a function as the initial argument performs lazy initialization on mount.

```jsx
import { useState } from "react";

function CartLine({ product }) {
	const [quantity, setQuantity] = useState(() => {
		return Math.max(1, product.initialQuantity ?? 1);
	});

	function increase() {
		setQuantity((current) => current + 1);
	}

	return (
		<div>
			<span>{product.name}</span>
			<output>{quantity}</output>
			<button onClick={increase}>Increase</button>
		</div>
	);
}
```

The lazy initializer runs when React creates the component state, though development Strict Mode may invoke it again to verify purity. The functional updater receives the pending queue value, so it is safe when multiple updates compose.

### State Queue Execution

```mermaid
sequenceDiagram
	participant E as Event handler snapshot count=0
	participant Q as State update queue
	participant R as Next render
	E->>Q: enqueue current => current + 1
	E->>Q: enqueue current => current + 1
	E->>Q: enqueue current => current + 1
	Q->>R: process from base state 0
	R->>R: 0 to 1 to 2 to 3
	R-->>E: commit output count=3
```

Three `setCount(count + 1)` calls instead capture `0` and commonly enqueue the same replacement `1`. State setters do not mutate the current render snapshot.

### Object and Array State

```jsx
const [profile, setProfile] = useState({ name: "Asha", role: "Student" });

// Wrong: mutation keeps the same object identity.
profile.role = "Mentor";
setProfile(profile);

// Correct: preserve unchanged fields in a replacement object.
setProfile((current) => ({ ...current, role: "Mentor" }));
```

React uses `Object.is` when deciding whether a state value changed. Store the minimum source of truth and derive values such as totals or full names during render.

## `useReducer`

`useReducer` centralizes related transitions as actions. It is useful when state has several fields, transitions must be explicit, or many handlers update the same model.

```jsx
import { useReducer } from "react";

const initialState = {
	status: "idle",
	draft: { amount: "", recipientId: "" },
	error: null,
};

function transferReducer(state, action) {
	switch (action.type) {
		case "fieldChanged":
			return {
				...state,
				draft: { ...state.draft, [action.field]: action.value },
			};
		case "submitted":
			return { ...state, status: "pending", error: null };
		case "succeeded":
			return { ...initialState, status: "succeeded" };
		case "failed":
			return { ...state, status: "failed", error: action.error };
		default:
			throw new Error(`Unknown transfer action: ${action.type}`);
	}
}

function TransferForm() {
	const [state, dispatch] = useReducer(transferReducer, initialState);
	// Render fields and dispatch domain events.
}
```

Reducers execute during render and must be pure. `dispatch` has stable identity and queues an action. A reducer improves transition modeling; it does not make state global and does not run asynchronous work.

```mermaid
flowchart LR
	UI[Event handler] -->|dispatch action| Q[Reducer update queue]
	Q --> RR[Render calls reducer]
	RR --> NS[Next immutable state]
	NS --> RC[Reconcile output]
	RC --> C[Commit changes]
```

Use state for independent values and a reducer when transitions benefit from names, atomic updates, or standalone tests.

## `useEffect`

`useEffect` synchronizes a committed component with systems outside React. Setup runs after commit; cleanup runs before setup repeats and during unmount.

```jsx
import { useEffect, useState } from "react";

function UserProfile({ userId }) {
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const controller = new AbortController();

		async function loadUser() {
			try {
				const response = await fetch(`/api/users/${userId}`, {
					signal: controller.signal,
				});
				if (!response.ok) throw new Error(`HTTP ${response.status}`);
				setUser(await response.json());
			} catch (requestError) {
				if (requestError.name !== "AbortError") setError(requestError);
			}
		}

		loadUser();
		return () => controller.abort();
	}, [userId]);

	if (error) return <p role="alert">Unable to load profile.</p>;
	return user ? <UserCard user={user} /> : <Spinner />;
}
```

```mermaid
stateDiagram-v2
	[*] --> Setup: first committed dependencies
	Setup --> Active
	Active --> Cleanup: dependencies change
	Cleanup --> Setup: synchronize next values
	Active --> FinalCleanup: unmount
	FinalCleanup --> [*]
```

Do not make the effect callback itself `async`; React expects cleanup or `undefined`, not a Promise. Production remote data often belongs in RTK Query because caching, deduplication, retries, invalidation, and races span many components.

### Effects You Do Not Need

```jsx
// Wrong: duplicated derived state adds a render and can drift.
useEffect(() => setFullName(`${firstName} ${lastName}`), [firstName, lastName]);

// Correct: calculate pure output during render.
const fullName = `${firstName} ${lastName}`;
```

User actions belong in handlers. Effects are for synchronization caused by the component being committed with particular reactive values.

## `useLayoutEffect`

`useLayoutEffect` follows the same dependency and cleanup model as `useEffect`, but setup runs after DOM mutation and before browser paint. It can measure layout and synchronously request a correction.

```jsx
function Popover({ anchorRect, children }) {
	const ref = useRef(null);
	const [height, setHeight] = useState(0);

	useLayoutEffect(() => {
		setHeight(ref.current.getBoundingClientRect().height);
	}, [children]);

	return (
		<div ref={ref} style={{ position: "fixed", top: anchorRect.top - height }}>
			{children}
		</div>
	);
}
```

```mermaid
sequenceDiagram
	participant R as Render
	participant D as DOM commit
	participant L as useLayoutEffect
	participant B as Browser paint
	participant E as useEffect
	R->>D: Apply host changes
	D->>L: Measure and optionally update
	L->>R: Synchronous correction
	R->>D: Commit corrected position
	D->>B: Paint
	B->>E: Passive synchronization
```

Layout effects block paint. Use them only when the current frame depends on measurement or imperative visual state.

## `useRef`

`useRef(initialValue)` returns the same mutable object across renders. React does not monitor `.current`, so changing it does not schedule rendering.

```jsx
function SearchBox() {
	const inputRef = useRef(null);
	const requestSequence = useRef(0);

	function focus() {
		inputRef.current?.focus();
	}

	async function search(query) {
		const sequence = ++requestSequence.current;
		const result = await api.search(query);
		if (sequence === requestSequence.current) display(result);
	}

	return (
		<>
			<input ref={inputRef} onChange={(event) => search(event.target.value)} />
			<button onClick={focus}>Focus search</button>
		</>
	);
}
```

Refs suit DOM handles, timer IDs, previous integration values, and mutable bookkeeping. If changing a value must update visible output, use state or a store.

| Use state | Use ref |
|---|---|
| Value affects rendering | Value is invisible bookkeeping |
| Transition should be observable | Mutation should not render |
| Snapshot semantics are desired | Latest mutable value is required |
| DevTools/state flow should show it | DOM or third-party handle is stored |

## `useMemo`

`useMemo(calculate, dependencies)` caches a calculation result between renders while dependencies remain `Object.is`-equal.

```jsx
function ProductResults({ products, query }) {
	const rankedProducts = useMemo(() => {
		return expensiveRank(products, query);
	}, [products, query]);

	return <ProductList products={rankedProducts} />;
}
```

React may discard memoized values in situations where re-computation is valid, so `useMemo` must never be required for correctness. It retains the value and dependencies while the component identity remains mounted, increasing memory usage.

Use it when profiling shows an expensive repeated calculation or when stable result identity is required by another measured optimization. Do not memoize trivial arithmetic or every object by default.

## `useCallback`

`useCallback(fn, dependencies)` returns a stable function identity while dependencies remain equal. It is conceptually similar to memoizing the function itself.

```jsx
const ProductList = memo(function ProductList({ products, onSelect }) {
	return products.map((product) => (
		<button key={product.id} onClick={() => onSelect(product.id)}>
			{product.name}
		</button>
	));
});

function Catalog({ products, selectProduct }) {
	const handleSelect = useCallback((productId) => {
		selectProduct(productId);
	}, [selectProduct]);

	return <ProductList products={products} onSelect={handleSelect} />;
}
```

This helps only if `ProductList` is costly, memoized, and receives otherwise stable props. `useCallback` does not stop creation of the function expression during render; React returns the cached reference when dependencies match.

```mermaid
flowchart TD
	P[Parent renders] --> F{Callback identity stable?}
	F -->|No| CR[Memoized child props changed]
	CR --> R[Child renders]
	F -->|Yes| O{Other props equal?}
	O -->|No| R
	O -->|Yes| S[Child render may be skipped]
```

## `useContext`

`useContext(Context)` reads the nearest matching provider above the component. React subscribes the consumer to provider value changes.

```jsx
const ThemeContext = createContext(null);

function useTheme() {
	const theme = useContext(ThemeContext);
	if (!theme) throw new Error("useTheme must be used inside ThemeProvider");
	return theme;
}

function Toolbar() {
	const { mode, toggleMode } = useTheme();
	return <button onClick={toggleMode}>Current theme: {mode}</button>;
}
```

When the provider value changes by `Object.is`, every consuming component under that provider is eligible to render, even through memoized ancestors. Split unrelated or differently changing context values. Context solves delivery, not ownership, caching, reducers, or high-frequency selector performance.

```mermaid
flowchart TB
	P[ThemeProvider value changes] --> C1[Toolbar consumer renders]
	P --> C2[Settings consumer renders]
	P --> C3[Deep button consumer renders]
	M[Memoized intermediary] -. does not block context .-> C3
```

## `useImperativeHandle`

This hook customizes the value exposed through a ref. Use it for small imperative operations that are difficult to express declaratively, such as focus, selection, or media control.

```jsx
import { forwardRef, useImperativeHandle, useRef } from "react";

export const SearchInput = forwardRef(function SearchInput(props, forwardedRef) {
	const inputRef = useRef(null);

	useImperativeHandle(forwardedRef, () => ({
		focus() {
			inputRef.current?.focus();
		},
		selectAll() {
			inputRef.current?.select();
		},
	}), []);

	return <input ref={inputRef} type="search" {...props} />;
});
```

The parent receives only `focus` and `selectAll`, not unrestricted DOM access. Keep the exposed object stable through correct dependencies. Prefer props/state when the behavior can be declarative.

## `useTransition`

`useTransition` returns a pending flag and `startTransition`. Updates scheduled synchronously inside `startTransition` are marked non-urgent and may be interrupted by newer urgent work.

```jsx
function ReportsWorkspace() {
	const [tab, setTab] = useState("overview");
	const [isPending, startTransition] = useTransition();

	function openTab(nextTab) {
		startTransition(() => setTab(nextTab));
	}

	return (
		<>
			<TabList value={tab} onChange={openTab} />
			{isPending && <span>Updating report...</span>}
			<ExpensiveReport tab={tab} />
		</>
	);
}
```

Do not transition the state controlling a text input because controlled input output must follow typing immediately. Transitions improve scheduling responsiveness; they do not make expensive algorithms cheaper.

```mermaid
sequenceDiagram
	participant U as User
	participant S as Scheduler
	participant I as Urgent input render
	participant T as Transition render
	U->>S: Type character plus update results
	S->>I: Process urgent input
	I-->>U: Commit responsive input
	S->>T: Start non-urgent results
	U->>S: Type another character
	S--xT: Supersede obsolete render
	S->>I: Commit latest input
	S->>T: Render latest results
```

## `useDeferredValue`

`useDeferredValue(value)` returns a deferred version that may temporarily lag behind the latest value while React prioritizes urgent work.

```jsx
function SearchPage() {
	const [query, setQuery] = useState("");
	const deferredQuery = useDeferredValue(query);
	const stale = query !== deferredQuery;

	return (
		<>
			<input value={query} onChange={(event) => setQuery(event.target.value)} />
			<div aria-busy={stale} style={{ opacity: stale ? 0.6 : 1 }}>
				<SlowResults query={deferredQuery} />
			</div>
		</>
	);
}
```

Use a transition when you control the state update; use a deferred value when a slow consumer receives a rapidly changing value. It is not a fixed-time debounce and does not stop effects from requesting every value. Debounce network initiation separately or use a cache that handles request identity.

## `useId`

`useId` generates a stable identifier prefix designed to match across server rendering and client hydration.

```jsx
function PasswordField() {
	const id = useId();
	const helpId = `${id}-help`;

	return (
		<>
			<label htmlFor={id}>Password</label>
			<input id={id} type="password" aria-describedby={helpId} />
			<p id={helpId}>Use at least 12 characters.</p>
		</>
	);
}
```

Use IDs for accessibility relationships, not list keys. List identity must come from data because `useId` follows component call position rather than business records.

## `useSyncExternalStore`

This hook provides a consistent contract for state held outside React. It accepts a subscription function, a client snapshot getter, and an optional server snapshot getter.

```jsx
import { useSyncExternalStore } from "react";

function subscribe(callback) {
	window.addEventListener("online", callback);
	window.addEventListener("offline", callback);
	return () => {
		window.removeEventListener("online", callback);
		window.removeEventListener("offline", callback);
	};
}

function getSnapshot() {
	return navigator.onLine;
}

export function useOnlineStatus() {
	return useSyncExternalStore(subscribe, getSnapshot, () => true);
}
```

React reads the snapshot during rendering and subscribes around commit. When notified, it reads again and schedules an update if the snapshot changed. Object snapshots must be cached; returning a new object on every call can cause repeated updates.

```mermaid
sequenceDiagram
	participant R as React
	participant G as getSnapshot
	participant S as subscribe
	participant X as External store
	R->>G: Read consistent render snapshot
	R->>S: Subscribe after commit
	X->>S: Store changed notification
	S->>R: Request snapshot check
	R->>G: Read latest snapshot
	G-->>R: Changed value schedules render
```

Library authors and integrations should use this instead of hand-written effect subscriptions when concurrent consistency matters.

## `useInsertionEffect`

`useInsertionEffect` runs during commit before layout effects so CSS-in-JS libraries can insert dynamic rules before components measure layout. It is not a general component hook.

```jsx
// Simplified library-level illustration, not typical application code.
function useDynamicStyle(rule) {
	useInsertionEffect(() => {
		const style = document.createElement("style");
		style.textContent = rule;
		document.head.appendChild(style);
		return () => style.remove();
	}, [rule]);
}
```

Refs are not ready for ordinary measurement at this timing, and state updates are inappropriate. Application teams should normally use their styling system rather than writing this hook directly.

```mermaid
flowchart LR
	C[Commit begins] --> I[useInsertionEffect: insert rules]
	I --> D[DOM mutation complete]
	D --> L[useLayoutEffect: measure layout]
	L --> P[Browser paint]
	P --> E[useEffect: passive work]
```

## Custom Hooks

A custom hook extracts reusable React behavior behind a purpose-specific API. Each caller gets independent hook state unless the custom hook connects them to a shared context or external store.

### Beginner Custom Hook: Debounced Value

```jsx
function useDebouncedValue(value, delayMs) {
	const [debounced, setDebounced] = useState(value);

	useEffect(() => {
		const timerId = window.setTimeout(() => setDebounced(value), delayMs);
		return () => window.clearTimeout(timerId);
	}, [value, delayMs]);

	return debounced;
}
```

Every value or delay change cancels the previous timer and starts a new one. Unmount cancels final pending work.

### Production Custom Hook: Document Visibility

```jsx
function subscribeToVisibility(callback) {
	document.addEventListener("visibilitychange", callback);
	return () => document.removeEventListener("visibilitychange", callback);
}

function getVisibilitySnapshot() {
	return document.visibilityState;
}

export function useDocumentVisibility() {
	return useSyncExternalStore(
		subscribeToVisibility,
		getVisibilitySnapshot,
		() => "visible",
	);
}
```

This custom hook names the domain concept, hides subscription mechanics, supports server rendering, and uses the correct external-store consistency contract.

### Custom Hook Design Principles

- Name the behavior, not the implementation (`useOnlineStatus`, not `useWindowListeners`).
- Keep the returned API small and stable.
- Expose data and commands, not internal setters by default.
- Preserve errors and status explicitly for asynchronous behavior.
- Accept dependencies as parameters rather than importing hidden mutable globals.
- Test behavior through a representative component or hook test harness.
- Avoid a custom hook that merely renames one built-in hook without adding meaning.

```mermaid
flowchart TB
	C1[Component A] --> H1[Custom hook instance A]
	C2[Component B] --> H2[Custom hook instance B]
	H1 --> S1[Independent hook state]
	H2 --> S2[Independent hook state]
	H1 --> X[Optional shared context/store]
	H2 --> X
```

## Choosing the Correct Hook

```mermaid
flowchart TD
	Q[What does the value or behavior represent?] --> V{Affects visible output?}
	V -->|Yes, simple local value| ST[useState]
	V -->|Yes, structured transitions| RD[useReducer]
	V -->|Shared provider dependency| CT[useContext]
	V -->|External mutable store| ES[useSyncExternalStore]
	V -->|No, mutable bookkeeping or DOM| RF[useRef]
	Q --> SY{Synchronize external system?}
	SY -->|After paint is fine| EF[useEffect]
	SY -->|Before paint required| LE[useLayoutEffect]
	Q --> OP{Measured optimization?}
	OP -->|Expensive result| MM[useMemo]
	OP -->|Observed function identity| CB[useCallback]
	Q --> PR{Priority control?}
	PR -->|Own update| TR[useTransition]
	PR -->|Slow consumer value| DV[useDeferredValue]
```

The diagram is a decision aid, not a substitute for architecture. Server data usually belongs in a data cache; global workflow state may belong in Redux Toolkit; URL state belongs in the router.

## Hook Memory and Rendering Behavior

| Hook category | Retained while mounted | Render effect |
|---|---|---|
| State/reducer | Current state and update queues | Updates schedule render |
| Ref | Stable object and referenced value | Mutation does not render |
| Memo/callback | Cached value/function and dependencies | No render by itself; retains memory |
| Effect | Setup function, dependencies, cleanup | Setup may queue updates after commit |
| Context | Dependency on provider value | Provider changes schedule consumer render |
| Transition/deferred | Priority-related state/work | Coordinates additional renders |
| External store | Subscribe/getSnapshot contract | Changed snapshot schedules render |

Unmount removes React's hook records from the active tree. External resources remain retained if cleanup is missing. Memoized large objects and closures remain reachable while their owning component is mounted.

## Performance Guidance

- Keep high-frequency state close to the component that consumes it.
- Prefer deriving pure values over effect-driven duplicate state.
- Use reducers for clarity, not because they are inherently faster.
- Memoize only measured expensive work with sufficiently stable dependencies.
- Do not use refs to bypass rendering when UI should update.
- Split contexts by ownership and update rate.
- Use transitions for scheduling, then optimize the underlying slow work separately.
- Cancel stale asynchronous work and bound subscriptions, timers, and caches.
- Profile production builds with React DevTools and browser tools.

## Common Mistakes and Production Best Practices

| Mistake | Consequence | Production correction |
|---|---|---|
| Hook inside condition/loop | Hook records shift | Always call at top level |
| Missing effect dependency | Stale closure or wrong cleanup | Include reactive dependencies or restructure |
| Effect for derived value | Extra render and drift | Calculate during render |
| Async effect callback | Promise returned instead of cleanup | Define and call async function inside |
| Ref stores visible state | UI remains stale | Use state/reducer/store |
| State stores timer/instance handle | Unnecessary rendering | Use a ref |
| Memoization everywhere | Comparison and memory overhead | Profile before optimizing |
| Transition controls input value | Typing can lag | Keep controlled input state urgent |
| `useId` used for keys | Identity follows call position, not data | Use persistent record IDs |
| New object from external snapshot | Infinite/repeated checks | Return cached immutable snapshot |
| Imperative handle exposes DOM | Tight implementation coupling | Expose narrow commands |
| Custom hook hides side effects | Surprising consumers | Name behavior and document lifecycle |

## Real-World Hook Architecture

### E-Commerce

Use state for cart drafts, reducers for checkout transitions, refs for focus and idempotency handles, RTK Query for products, deferred values for costly search results, and effects only for genuine external synchronization.

### Banking

Use reducers for explicit transfer states, layout effects only for accessibility focus correction, external-store hooks for network/session signals, and refs for request IDs that should not render. Authorization remains server-owned.

### CRM and Dashboards

Use context for stable workspace dependencies, Redux selectors for global workflow state, memoization for measured chart transformations, transitions for non-urgent tab/report rendering, and cleanup-aware hooks for observers or live feeds.

### Chat and Social Media

Use effects or a data layer for room/feed subscriptions, refs for scroll/sequence bookkeeping, stable state updates for messages, deferred rendering for expensive filters, and virtualization to control DOM size.

Production hook design starts with ownership and lifecycle, not with choosing a hook by name.

---

<a id="module-5-component-communication"></a>
# Module 5: Component Communication

[Previous: Hooks](#module-4-react-hooks) | [Next: Router](#module-6-react-router)

## Communication as Data Ownership

React component communication begins with one architectural question: **which component or system owns the source of truth?** Once ownership is clear, values move down to readers and user intent moves back to the owner. React does not automatically synchronize duplicated state in different components.

The default model is one-way data flow:

- A parent passes data and configuration through props.
- A child reports intent through callback props.
- Siblings coordinate through their nearest common owner.
- Composition passes elements or components into structural slots.
- Context distributes a dependency through a subtree.
- External stores coordinate client state outside one component branch.
- Server-state libraries own remote data, caching, invalidation, and request status.

```mermaid
flowchart TB
	O[Canonical owner] -->|state snapshot as props| A[Child A]
	O -->|state snapshot as props| B[Child B]
	A -->|intent callback| O
	B -->|intent callback| O
	O --> R[Render next consistent snapshot]
	R --> A
	R --> B
```

This loop is declarative. Children do not directly mutate a parent's state. They request a transition, the owner decides whether and how to apply it, and React renders the resulting snapshot.

## Communication Pattern Reference

| Pattern | Direction | Best use | Main risk |
|---|---|---|---|
| Props | Parent to child | Local explicit data/configuration | Long forwarding chains |
| Callback props | Child to parent | Report user intent | Passing implementation-oriented setters |
| Lifted state | Shared owner to siblings | Keep sibling views consistent | Owner becomes too broad |
| Controlled API | Owner manages value | Coordinated, resettable components | Excessive boilerplate |
| Uncontrolled API | Component manages value | Local reusable defaults | Harder external coordination |
| Composition/slots | Parent supplies UI structure | Flexible layouts and wrappers | Unclear slot contracts |
| Context | Provider to descendants | Subtree-wide stable dependencies | Broad updates and hidden coupling |
| Compound components | Related descendants coordinate | Expressive cohesive component APIs | Accessibility/state complexity |
| Render prop | Component calls function child/prop | Dynamic behavior sharing | Nested markup and unstable functions |
| Higher-order component | Wrapper enhances component | Legacy/library cross-cutting behavior | Prop collisions and wrapper depth |
| Imperative ref | Parent invokes narrow child command | Focus, selection, media control | Tight coupling |
| External store | Store to subscribers | Cross-feature client workflow state | Global state overuse |
| Server cache | Cache to query consumers | Remote entities and request lifecycle | Duplicating cache into local/global state |

## Parent-to-Child Communication with Props

Props are immutable inputs for one render. A parent creates an element with values; React later invokes the child with that props snapshot. The child may derive output from props but must not mutate objects received through them.

```jsx
function ProductCard({ product, currency, featured = false }) {
	const formattedPrice = new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency,
	}).format(product.price);

	return (
		<article data-featured={featured || undefined}>
			<h3>{product.name}</h3>
			<p>{formattedPrice}</p>
		</article>
	);
}

function ProductGrid({ products }) {
	return products.map((product) => (
		<ProductCard
			key={product.id}
			product={product}
			currency="INR"
			featured={product.rating >= 4.5}
		/>
	));
}
```

### Designing Professional Prop APIs

- Name props by domain meaning: `onInvoiceApprove`, not `handleClickFromParent`.
- Prefer positive booleans such as `disabled` or `readOnly` over confusing double negatives.
- Avoid passing an entire model when the child needs only two stable fields.
- Keep required data distinct from optional presentation settings.
- Use default parameter values rather than deprecated `defaultProps` patterns for function components.
- Preserve native HTML props when building reusable controls.
- Document mutually exclusive combinations or model them as explicit variants.

```jsx
function StatusBadge({ status }) {
	const labels = {
		pending: "Pending review",
		approved: "Approved",
		rejected: "Rejected",
	};

	if (!(status in labels)) {
		throw new Error(`Unsupported status: ${status}`);
	}

	return <span data-status={status}>{labels[status]}</span>;
}
```

Prop validation can be implemented with TypeScript, PropTypes in applicable JavaScript projects, schema validation at external boundaries, and focused tests. Runtime data from APIs must still be validated because static types disappear at runtime.

## Child-to-Parent Communication with Callbacks

Function props let children report semantic events. The child supplies relevant data; the parent owns the transition and side effects.

```jsx
function QuantityEditor({ value, min = 1, max = 20, onChange }) {
	function requestChange(nextValue) {
		const boundedValue = Math.min(max, Math.max(min, nextValue));
		onChange(boundedValue);
	}

	return (
		<div aria-label="Quantity">
			<button disabled={value <= min} onClick={() => requestChange(value - 1)}>
				Decrease
			</button>
			<output aria-live="polite">{value}</output>
			<button disabled={value >= max} onClick={() => requestChange(value + 1)}>
				Increase
			</button>
		</div>
	);
}

function CartLine({ item }) {
	const [quantity, setQuantity] = useState(item.quantity);
	return <QuantityEditor value={quantity} onChange={setQuantity} />;
}
```

Passing `setQuantity` is acceptable for a small generic input whose event precisely means replacing the value. Domain components should usually expose intent such as `onMemberInvite`, allowing the owner to validate, authorize, log, or reject the action without exposing state mechanics.

```mermaid
sequenceDiagram
	participant U as User
	participant C as Child component
	participant P as Parent owner
	participant R as React
	U->>C: Select quantity 3
	C->>P: onChange(3)
	P->>P: Validate and update state
	P->>R: Queue render
	R->>C: New value prop equals 3
	C-->>U: Display committed value
```

Callbacks execute in the render snapshot where they were created. If an asynchronous callback calculates from previous state, use a functional updater or reducer to avoid stale captured values.

## Lifting State for Sibling Communication

When siblings need the same evolving value, move one canonical value to their nearest common owner. Pass the value to each reader and callbacks to components that can request changes.

```jsx
function ProductWorkspace({ products }) {
	const [filters, setFilters] = useState({ query: "", inStockOnly: false });

	const visibleProducts = products.filter((product) => {
		const matchesQuery = product.name
			.toLowerCase()
			.includes(filters.query.toLowerCase());
		return matchesQuery && (!filters.inStockOnly || product.stock > 0);
	});

	return (
		<>
			<ProductFilters
				value={filters}
				onChange={setFilters}
			/>
			<ProductCount count={visibleProducts.length} />
			<ProductList products={visibleProducts} />
		</>
	);
}
```

```mermaid
flowchart TB
	W[ProductWorkspace owns filters] -->|filters| F[ProductFilters]
	W -->|derived count| C[ProductCount]
	W -->|derived visible products| L[ProductList]
	F -->|onChange next filters| W
	D[Duplicate filter state in siblings] -. creates disagreement .-> X[Inconsistent UI]
```

Lift state only as high as necessary. Moving every local interaction to the application root increases render reach, API surface, and maintenance cost. If the state belongs in navigation, such as a shareable search or page number, the URL can be the common owner.

## Controlled and Uncontrolled Components

A controlled component receives its current value and reports changes. An uncontrolled component initializes internal state from a default and manages later transitions itself.

```jsx
function Disclosure({ open, defaultOpen = false, onOpenChange, children }) {
	const controlled = open !== undefined;
	const [internalOpen, setInternalOpen] = useState(defaultOpen);
	const currentOpen = controlled ? open : internalOpen;

	function setOpen(nextOpen) {
		if (!controlled) setInternalOpen(nextOpen);
		onOpenChange?.(nextOpen);
	}

	return (
		<section>
			<button
				aria-expanded={currentOpen}
				onClick={() => setOpen(!currentOpen)}
			>
				Details
			</button>
			{currentOpen && children}
		</section>
	);
}
```

```mermaid
flowchart LR
	Q{Is open prop supplied?} -->|Yes| CP[Read controlled prop]
	Q -->|No| IS[Read internal state]
	CP --> E[User requests change]
	IS --> E
	E --> CB[Call onOpenChange]
	E -->|uncontrolled only| US[Update internal state]
	CB --> PO[Parent may provide next prop]
```

Do not switch between controlled and uncontrolled behavior during one mounted lifetime. A controlled parent must update the prop after receiving the callback; otherwise the component correctly continues displaying the parent's unchanged value.

### Resetting State Deliberately

State is tied to tree position and component identity. A changed `key` intentionally replaces an instance and resets its local state.

```jsx
function CustomerEditor({ customer }) {
	return <ProfileForm key={customer.id} initialProfile={customer} />;
}
```

Do not mirror every prop into state with an effect. Use a controlled value, derive output directly, or use an intentional identity reset based on the required user experience.

## Composition and `children`

Composition communicates structure instead of only data. A wrapper receives elements and decides where they render without knowing their internal implementation.

```jsx
function Dialog({ title, actions, children, onClose }) {
	return (
		<div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
			<header>
				<h2 id="dialog-title">{title}</h2>
				<button aria-label="Close" onClick={onClose}>Close</button>
			</header>
			<div>{children}</div>
			<footer>{actions}</footer>
		</div>
	);
}

function DeleteCustomerDialog({ customer, onCancel, onConfirm }) {
	return (
		<Dialog
			title="Delete customer"
			onClose={onCancel}
			actions={(
				<>
					<button onClick={onCancel}>Cancel</button>
					<button onClick={() => onConfirm(customer.id)}>Delete</button>
				</>
			)}
		>
			<p>This permanently deletes {customer.name}.</p>
		</Dialog>
	);
}
```

Named slots such as `actions`, `toolbar`, `sidebar`, or `emptyState` make complex composition explicit. Elements passed as children retain the context of where they were created; the wrapper controls placement, not ownership of their closures.

```mermaid
flowchart TB
	P[Consumer creates element tree] --> D[Dialog composition boundary]
	D --> H[Header slot]
	D --> B[children body slot]
	D --> A[Actions slot]
	B --> U[Consumer-owned content and callbacks]
	A --> U
```

Avoid `cloneElement` as a default communication mechanism because it creates implicit prop injection and fragile assumptions about child shape. Prefer explicit props, context, or render functions when descendants require coordination.

## Context Communication

Context lets descendants read a value without forwarding it through every intermediate component. It is appropriate for subtree-scoped dependencies such as theme, locale, authenticated principal, feature configuration, or a compound component's internal contract.

```jsx
const WorkspaceContext = createContext(null);

function WorkspaceProvider({ workspaceId, children }) {
	const [density, setDensity] = useState("comfortable");

	const value = useMemo(() => ({
		workspaceId,
		density,
		setDensity,
	}), [workspaceId, density]);

	return (
		<WorkspaceContext.Provider value={value}>
			{children}
		</WorkspaceContext.Provider>
	);
}

function useWorkspace() {
	const context = useContext(WorkspaceContext);
	if (!context) {
		throw new Error("useWorkspace must be used within WorkspaceProvider");
	}
	return context;
}
```

```mermaid
flowchart TB
	PR[WorkspaceProvider] --> L[Layout does not consume]
	L --> T[Toolbar consumes density]
	L --> G[Grid consumes workspaceId and density]
	PR -->|provider value changes| T
	PR -->|provider value changes| G
	N[Unrelated subtree outside provider] -. no subscription .-> PR
```

Memoizing a provider object prevents changes caused only by a newly allocated wrapper, but consumers still render when a genuine dependency changes. Split contexts when values have different ownership or update frequencies. Context selectors or an external store may be more suitable for high-frequency large state.

### Prop Drilling Is Not Automatically a Problem

Passing a value through one or two meaningful layers is explicit, traceable, and reusable. Context is justified when many distant descendants need a stable dependency or intermediary components should not conceptually know about it. Replacing every forwarded prop with context hides dependencies and makes isolated reuse/testing harder.

## Compound Components

Compound components expose related parts that coordinate through a private context. They provide flexible composition while one root owns the shared behavior.

```jsx
const TabsContext = createContext(null);

function Tabs({ value, onValueChange, children }) {
	const context = useMemo(
		() => ({ value, onValueChange }),
		[value, onValueChange],
	);

	return <TabsContext.Provider value={context}>{children}</TabsContext.Provider>;
}

function useTabs() {
	const context = useContext(TabsContext);
	if (!context) throw new Error("Tab components must be inside Tabs");
	return context;
}

Tabs.List = function TabList({ label, children }) {
	return <div role="tablist" aria-label={label}>{children}</div>;
};

Tabs.Tab = function Tab({ value, panelId, children }) {
	const tabs = useTabs();
	const selected = tabs.value === value;

	return (
		<button
			role="tab"
			id={`${panelId}-tab`}
			aria-controls={panelId}
			aria-selected={selected}
			tabIndex={selected ? 0 : -1}
			onClick={() => tabs.onValueChange(value)}
		>
			{children}
		</button>
	);
};

Tabs.Panel = function TabPanel({ value, id, children }) {
	const tabs = useTabs();
	if (tabs.value !== value) return null;

	return (
		<div role="tabpanel" id={id} aria-labelledby={`${id}-tab`}>
			{children}
		</div>
	);
};
```

```jsx
function AccountTabs() {
	const [tab, setTab] = useState("profile");

	return (
		<Tabs value={tab} onValueChange={setTab}>
			<Tabs.List label="Account settings">
				<Tabs.Tab value="profile" panelId="profile-panel">Profile</Tabs.Tab>
				<Tabs.Tab value="security" panelId="security-panel">Security</Tabs.Tab>
			</Tabs.List>
			<Tabs.Panel value="profile" id="profile-panel"><Profile /></Tabs.Panel>
			<Tabs.Panel value="security" id="security-panel"><Security /></Tabs.Panel>
		</Tabs>
	);
}
```

```mermaid
flowchart TB
	RT[Tabs root owns selected value] --> CT[Private TabsContext]
	CT --> TL[Tabs.List provides structure]
	CT --> T1[Tabs.Tab reads selection and sends intent]
	CT --> T2[Tabs.Tab reads selection and sends intent]
	CT --> PN[Tabs.Panel renders matching content]
	T1 -->|onValueChange| RT
	T2 -->|onValueChange| RT
```

A production tabs implementation must also support arrow-key navigation, Home/End keys, focus movement, orientation, disabled tabs, stable IDs, and server rendering. Compound syntax does not provide accessibility automatically.

## Render Props

A render prop is a function prop that receives behavior or state and returns UI. It remains useful when the consumer must control rendering at a particular point.

```jsx
function PointerTracker({ children }) {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	return (
		<div onPointerMove={(event) => {
			setPosition({ x: event.clientX, y: event.clientY });
		}}>
			{children(position)}
		</div>
	);
}

function Canvas() {
	return (
		<PointerTracker>
			{({ x, y }) => <Cursor x={x} y={y} />}
		</PointerTracker>
	);
}
```

Custom hooks replace many behavior-only render props with flatter code, but render props can still be appropriate for headless components, dynamic item rendering, and library APIs. A newly created render function can defeat shallow memoization; optimize only when profiling identifies an actual cost.

## Higher-Order Components

A higher-order component (HOC) is a function that receives a component and returns an enhanced component. HOCs remain common in older React applications and some libraries.

```jsx
function withPermission(requiredPermission) {
	return function enhance(WrappedComponent) {
		function PermissionBoundary(props) {
			const permissions = usePermissions();
			if (!permissions.includes(requiredPermission)) {
				return <Forbidden />;
			}
			return <WrappedComponent {...props} />;
		}

		PermissionBoundary.displayName =
			`withPermission(${WrappedComponent.displayName ?? WrappedComponent.name ?? "Component"})`;

		return PermissionBoundary;
	};
}

const ProtectedPayroll = withPermission("payroll:read")(PayrollPage);
```

HOCs should pass unrelated props through, avoid mutating the wrapped component, use collision-resistant injected prop names, preserve a useful display name, and consider ref forwarding where required. Hooks are usually clearer for application behavior because they avoid wrapper depth and implicit injected props.

```mermaid
flowchart LR
	C[Original component] --> H1[withPermission wrapper]
	H1 --> H2[withTelemetry wrapper]
	H2 --> E[Rendered enhanced component]
	W[Wrapper depth and injected props] -. maintenance cost .-> E
```

## Imperative Communication with Refs

Declarative props should be the default. A parent ref is justified when it must invoke a narrow command that naturally belongs to an imperative platform API.

```jsx
const PaymentField = forwardRef(function PaymentField(props, ref) {
	const inputRef = useRef(null);

	useImperativeHandle(ref, () => ({
		focusInvalid() {
			inputRef.current?.focus();
		},
	}), []);

	return <input ref={inputRef} inputMode="decimal" {...props} />;
});

function PaymentForm() {
	const amountRef = useRef(null);

	function submit(event) {
		event.preventDefault();
		if (!isValidAmount(event.currentTarget.amount.value)) {
			amountRef.current?.focusInvalid();
		}
	}

	return (
		<form onSubmit={submit}>
			<PaymentField ref={amountRef} name="amount" />
			<button>Pay</button>
		</form>
	);
}
```

Do not expose the complete child DOM tree or methods that mutate business state behind React's data flow. Commands such as `focus`, `scrollTo`, `play`, `pause`, and `selectText` are narrow and understandable.

## External Stores and Server State

Communication scope determines whether local React ownership is still appropriate.

```mermaid
flowchart TD
	S[State requirement] --> Q1{Only one component?}
	Q1 -->|Yes| LS[Local state]
	Q1 -->|No| Q2{Nearby siblings?}
	Q2 -->|Yes| LU[Lift to common owner]
	Q2 -->|No| Q3{Subtree-wide stable dependency?}
	Q3 -->|Yes| CX[Context]
	Q3 -->|No| Q4{Remote server data?}
	Q4 -->|Yes| SC[RTK Query or server cache]
	Q4 -->|No| Q5{Cross-feature client workflow?}
	Q5 -->|Yes| ES[Redux Toolkit or external store]
	Q5 -->|No| URL[Consider URL or component composition]
```

Redux Toolkit can coordinate authenticated workflow state, drafts shared across routes, notifications, or normalized client entities. RTK Query, TanStack Query, or an equivalent data layer should own fetched server data when caching and invalidation are required. Do not copy query results into component state or Redux slices without a specific editing/snapshot requirement.

External stores should expose focused selectors so components subscribe only to data they render. Commands or action creators preserve domain intent better than direct object mutation.

## Events and Communication Boundaries

React events bubble through the React tree, which often matches the DOM tree but can differ with portals. Event propagation is useful for generic interaction boundaries, not as a replacement for explicit domain callbacks.

```jsx
function SelectableRow({ customer, onSelect }) {
	return (
		<tr onClick={() => onSelect(customer.id)}>
			<td>{customer.name}</td>
			<td>
				<button onClick={(event) => {
					event.stopPropagation();
					archiveCustomer(customer.id);
				}}>
					Archive
				</button>
			</td>
		</tr>
	);
}
```

Use propagation deliberately. A nested interactive element inside another interactive element may be invalid HTML or inaccessible even if `stopPropagation` appears to fix behavior. Prefer structurally valid controls with explicit callbacks.

## Communication Across Portals

Portals change physical DOM placement but preserve the React ownership tree. Context still reaches portal content, and React events bubble to ancestors in the React tree.

```mermaid
flowchart LR
	subgraph ReactTree[React ownership tree]
		A[App] --> M[Modal component]
		M --> P[Portal content]
	end
	subgraph DOMTree[DOM placement]
		R[app root]
		B[modal root] --> PD[Portal DOM]
	end
	A -->|context and event ancestry| P
	P -. rendered into .-> PD
```

Modals still require focus trapping, initial focus, focus restoration, Escape handling, accessible labeling, background inertness, and scroll management. A portal solves stacking and placement, not modal behavior.

## Performance and Render Reach

Communication choices affect how broadly updates propagate:

- State updates render the owning component and reconcile its descendants.
- Changed context values notify every consumer of that context beneath the provider.
- External-store selectors can limit updates to subscribers whose selected values changed.
- Stable keys preserve child identity; incorrect keys can reset or move state unexpectedly.
- `memo` can skip child rendering only when observable inputs remain equal.
- `useCallback` and `useMemo` are useful only when stable identity participates in a measured optimization.
- Composition can move stateful children outside an updating wrapper's render work.

```jsx
// The slow child element is supplied by the parent and can retain its identity
// while Panel updates only its local expanded state.
function Panel({ children }) {
	const [expanded, setExpanded] = useState(false);
	return (
		<section>
			<button onClick={() => setExpanded((value) => !value)}>Toggle</button>
			{expanded && children}
		</section>
	);
}
```

Measure with React DevTools Profiler before adding identity management. A clear ownership boundary usually produces larger gains than scattered memoization.

## Common Failure Modes

| Failure | Why it happens | Correction |
|---|---|---|
| Siblings keep duplicate state | No canonical owner | Lift one source of truth |
| Child mutates a prop object | Parent and child share reference | Request immutable owner update |
| Callback is invoked during render | JSX receives result, not function | Pass a function such as `() => save(id)` |
| Child receives raw domain setter | Parent policy leaks outward | Expose semantic event callback |
| Props copied to state by effect | Two sources drift and add renders | Derive, control, or intentionally reset |
| Context stores everything | Every change has broad reach | Split ownership and update frequency |
| Provider creates value every render | Consumers see changed identity | Stabilize value where beneficial |
| Index used as key in mutable list | State follows position | Use persistent data identity |
| HOC overwrites a prop | Injected contract is implicit | Use explicit names and pass-through rules |
| Compound control lacks keyboard behavior | Visual API mistaken for accessibility | Implement the complete ARIA pattern |
| Ref exposes internal DOM/state | Parent couples to implementation | Expose narrow imperative commands |
| Server data copied into local state | Cache and copy diverge | Read from cache; separate edit draft only |
| Event propagation is used as state bus | Dependencies become implicit | Use callbacks, context, or store |

## Production Design Checklist

1. Identify the canonical owner before writing communication code.
2. Keep local state local and lift only genuinely shared values.
3. Pass immutable snapshots downward and semantic intent upward.
4. Choose URL state for shareable navigation and filter state.
5. Prefer composition when a parent needs layout flexibility rather than child data.
6. Use context for coherent subtree dependencies, not as a universal store.
7. Separate client workflow state from cached server state.
8. Preserve child identity with domain keys.
9. Include loading, empty, error, pending, disabled, and permission states in contracts.
10. Verify keyboard operation, focus behavior, labels, and announcements for compound UI.
11. Test communication at the observable behavior boundary.
12. Profile render reach before introducing memoization.

## Real-World Architectures

### E-Commerce Product Filters

Place shareable filters in search parameters, let the router own their serialized form, derive query arguments from the URL, and let a server cache own products. Filter controls report semantic changes rather than maintaining disconnected copies.

### Banking Transfer Workflow

Use a reducer in the workflow owner for draft, review, authorization, submission, and result transitions. Child fields report edits; the server remains authoritative for account permissions, balances, limits, and idempotency.

### CRM Workspace

Use route parameters for the selected customer, query caching for customer records, local state for an unsaved edit draft, context for workspace-level permissions/configuration, and an external store only for cross-feature client workflows.

### Dashboard Widgets

Use composition for widget shells and toolbars, explicit props for display configuration, server caches for metrics, and scoped contexts for shared date range or dashboard editing mode. Subscribe each widget to the smallest useful snapshot.

Professional component communication minimizes the number of owners, makes dependencies visible, and selects the narrowest mechanism that matches the required lifetime and scope.

---

<a id="module-6-react-router"></a>
# Module 6: React Router

[Previous: Communication](#module-5-component-communication) | [Next: Forms](#module-7-forms)

## Introduction

React Router maps a browser location to a branch of React UI. The URL is not merely a string displayed in the address bar; it is durable application state that supports navigation history, bookmarks, refreshes, sharing, server requests, analytics, and accessibility.

React Router does not replace HTTP APIs, authentication, authorization, or server routing. It coordinates client-side location changes and renders the route branch associated with the current location.

```bash
npm install react-router-dom
```

This chapter uses React Router 6.4+ concepts, including data routers. The declarative `<BrowserRouter>` API remains useful, while `createBrowserRouter` and `<RouterProvider>` add loaders, actions, route-level errors, pending navigation, and scroll restoration.

## Routing Mental Model

A location contains four relevant pieces:

| Location part | Example | Typical responsibility |
|---|---|---|
| Pathname | `/customers/42/invoices` | Resource and nested view identity |
| Search | `?status=overdue&page=2` | Shareable filters, sorting, pagination |
| Hash | `#payment-history` | In-document target or specialized state |
| History state | `{ from: "/checkout" }` | Ephemeral same-session navigation metadata |

The router ranks route branches, matches the strongest branch, extracts dynamic parameters, runs relevant data work, and renders nested elements through outlets.

```mermaid
flowchart LR
	L[Location changes] --> M[Rank route branches]
	M --> B[Match best branch]
	B --> P[Extract path parameters]
	P --> D[Run loaders or actions]
	D --> E{Data result}
	E -->|success| R[Render nested route branch]
	E -->|redirect| N[Navigate to target]
	E -->|error| X[Render nearest route error boundary]
```

### Client Navigation Lifecycle

```mermaid
sequenceDiagram
	participant U as User
	participant L as Link or form
	participant H as Browser history
	participant R as React Router
	participant D as Route data
	participant V as Route UI
	U->>L: Activate navigation
	L->>R: Request target location
	R->>D: Load or mutate route data
	D-->>R: Data, redirect, or error
	R->>H: Push or replace history entry
	R->>V: Commit matched route branch
	V-->>U: Focusable updated interface
```

Client-side links avoid downloading a completely new HTML document for each internal route. The router updates browser history and reconciles the next React branch. A normal anchor is still correct for external sites, downloads, documents outside the SPA, and navigation that intentionally requires a full reload.

## Router API Families

React Router offers two primary application styles.

| Style | Core API | Appropriate use |
|---|---|---|
| Declarative router | `BrowserRouter`, `Routes`, `Route` | Existing applications or component-driven fetching |
| Data router | `createBrowserRouter`, `RouterProvider` | Route loaders/actions, pending UI, errors, redirects, scroll restoration |

Do not create both router roots for the same application tree. Components using router hooks must render beneath the selected router provider.

### Declarative Router

```jsx
import {
	BrowserRouter,
	Navigate,
	Outlet,
	Route,
	Routes,
} from "react-router-dom";

function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AppLayout />}>
					<Route index element={<Dashboard />} />
					<Route path="products" element={<Products />} />
					<Route path="products/:productId" element={<ProductDetails />} />
					<Route element={<RequireSession />}>
						<Route path="account" element={<Account />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
```

### Data Router

```jsx
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		errorElement: <RootRouteError />,
		children: [
			{ index: true, element: <Dashboard /> },
			{
				path: "products",
				element: <Products />,
				loader: productsLoader,
			},
			{
				path: "products/:productId",
				element: <ProductDetails />,
				loader: productLoader,
			},
			{ path: "*", element: <NotFound /> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} fallbackElement={<AppBootScreen />} />;
}
```

Create the router outside the component tree so it is not reconstructed during rendering.

## Route Matching and Ranking

React Router ranks route branches by specificity rather than using declaration order as a simple first-match list. Static segments generally outrank dynamic segments, which outrank splats.

| Pattern | Matches | Captured value |
|---|---|---|
| `/products` | Exact products route | None |
| `/products/new` | Static creation route | None |
| `/products/:productId` | `/products/42` | `productId = "42"` |
| `/files/*` | `/files/reports/2026.pdf` | Remaining splat path |
| Index route | Parent path exactly | None |
| Pathless route | No URL segment | Groups layout, guard, or behavior |

```mermaid
flowchart TD
	URL[URL: /products/new] --> S{Static products/new?}
	S -->|highest specificity| NEW[NewProduct route]
	S -->|otherwise| D{Dynamic products/:productId?}
	D -->|match| PD[ProductDetails route]
	D -->|otherwise| SP[Products splat or not found]
```

Dynamic parameters are strings and may be absent. Validate identifiers before using them in requests. Do not assume a numeric-looking route parameter is a valid integer or an authorized resource.

## Nested Routes and Layouts

Nested routes model nested UI. A parent element renders shared chrome and an `<Outlet>` at the location where the matched child belongs.

```jsx
function AppLayout() {
	return (
		<div className="app-shell">
			<PrimaryNavigation />
			<main id="main-content">
				<Outlet />
			</main>
		</div>
	);
}

function CustomerLayout() {
	const { customerId } = useParams();

	return (
		<section>
			<CustomerHeader customerId={customerId} />
			<CustomerNavigation customerId={customerId} />
			<Outlet />
		</section>
	);
}
```

```jsx
<Routes>
	<Route path="/" element={<AppLayout />}>
		<Route index element={<Dashboard />} />
		<Route path="customers" element={<CustomerList />} />
		<Route path="customers/:customerId" element={<CustomerLayout />}>
			<Route index element={<CustomerOverview />} />
			<Route path="contacts" element={<CustomerContacts />} />
			<Route path="invoices" element={<CustomerInvoices />} />
		</Route>
	</Route>
</Routes>
```

```mermaid
flowchart TB
	URL[customers/42/invoices] --> A[AppLayout]
	A --> AO[App outlet]
	AO --> C[CustomerLayout with customerId 42]
	C --> CO[Customer outlet]
	CO --> I[CustomerInvoices]
```

An index route is the default child rendered when the parent path matches exactly. A pathless route contributes behavior or layout without adding a URL segment.

### Outlet Context

Parents may pass narrowly scoped values to matched children through outlet context.

```jsx
function ProjectLayout() {
	const project = useLoaderData();
	return <Outlet context={{ project }} />;
}

function ProjectMembers() {
	const { project } = useOutletContext();
	return <MemberList projectId={project.id} />;
}
```

Use outlet context for data inherently owned by a route layout. Use broader context or a cache when the dependency extends beyond that route branch.

## Links and Active Navigation

Use `<Link>` for internal navigation and `<NavLink>` when the destination needs active or pending styling and semantics.

```jsx
function CustomerNavigation({ customerId }) {
	const links = [
		{ to: ".", end: true, label: "Overview" },
		{ to: "contacts", label: "Contacts" },
		{ to: "invoices", label: "Invoices" },
	];

	return (
		<nav aria-label="Customer">
			{links.map((link) => (
				<NavLink
					key={link.to}
					to={link.to}
					end={link.end}
					className={({ isActive, isPending }) =>
						[isActive && "active", isPending && "pending"]
							.filter(Boolean)
							.join(" ")
					}
				>
					{link.label}
				</NavLink>
			))}
		</nav>
	);
}
```

Relative links make nested route modules portable. `to="contacts"` resolves from the current route hierarchy, while an absolute path begins with `/`. Use the `end` prop when a parent link should not remain active for all descendants.

## Route Parameters with `useParams`

`useParams` returns parameters captured by the matched route branch. Validate and normalize them at a boundary before requesting data.

```jsx
function ProductDetails() {
	const { productId } = useParams();
	const numericProductId = Number(productId);

	if (!Number.isSafeInteger(numericProductId) || numericProductId <= 0) {
		return <InvalidResource message="Invalid product identifier." />;
	}

	return <Product productId={numericProductId} />;
}
```

Route parameters communicate identity, not authorization. The server must verify whether the authenticated principal may access that product, customer, account, or invoice.

## Search Parameters as Shareable State

Search parameters are appropriate for filters, sort order, pagination, selected views, and other state users should bookmark, share, refresh, or navigate through.

```jsx
function ProductFilters() {
	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get("q") ?? "";
	const page = Math.max(1, Number(searchParams.get("page")) || 1);
	const sort = ["name", "price", "rating"].includes(searchParams.get("sort"))
		? searchParams.get("sort")
		: "name";

	function updateFilter(name, value) {
		setSearchParams((current) => {
			const next = new URLSearchParams(current);
			if (value) next.set(name, value);
			else next.delete(name);
			if (name !== "page") next.set("page", "1");
			return next;
		}, { replace: true });
	}

	return (
		<FilterBar
			query={query}
			page={page}
			sort={sort}
			onFilterChange={updateFilter}
		/>
	);
}
```

```mermaid
flowchart LR
	U[User changes filter] --> SP[Update URLSearchParams]
	SP --> H[Replace or push history entry]
	H --> R[Router exposes new search]
	R --> V[Validate and derive query model]
	V --> Q[Request or select matching data]
	Q --> UI[Render shareable filtered view]
```

Treat the URL as untrusted input. Apply defaults, allowlists, bounds, and decoding rules. Use `replace` for rapid edits such as typing when each character should not create a Back-button entry; use push behavior for meaningful navigation steps.

## Location and Navigation Hooks

### `useLocation`

`useLocation` returns the current pathname, search, hash, history state, and a location key. It is useful for analytics, route transition behavior, and preserving a requested destination.

```jsx
function RouteAnalytics() {
	const location = useLocation();

	useEffect(() => {
		analytics.pageView({
			path: `${location.pathname}${location.search}`,
		});
	}, [location.pathname, location.search]);

	return null;
}
```

Never include secrets, access tokens, private personal data, or sensitive financial values in URLs. URLs appear in browser history, logs, screenshots, analytics, referrer headers, and shared links.

### `useNavigate`

Use declarative links and redirects for ordinary navigation. Use `navigate` after an imperative event such as a successful form submission.

```jsx
function CreateCustomerForm() {
	const navigate = useNavigate();

	async function submit(event) {
		event.preventDefault();
		const customer = await createCustomer(new FormData(event.currentTarget));
		navigate(`/customers/${customer.id}`, {
			replace: true,
			state: { notice: "Customer created" },
		});
	}

	return <form onSubmit={submit}>{/* fields */}</form>;
}
```

`navigate(-1)` depends on a usable history entry and may leave the application. For a reliable Cancel destination, use an explicit route and optionally enhance it with known safe history behavior.

### Declarative Redirects

`<Navigate>` redirects during rendering in a declarative router. Data-router loaders and actions should usually return or throw `redirect(...)` before rendering protected content.

```jsx
function LegacyCustomerRoute() {
	const { customerId } = useParams();
	return <Navigate to={`/customers/${customerId}/overview`} replace />;
}
```

## Data Routers: Loaders

A loader obtains route data before rendering the route element. It receives route parameters and a Web `Request` whose signal is aborted when navigation makes the request obsolete.

```jsx
import { json } from "react-router-dom";

export async function productLoader({ params, request }) {
	const productId = Number(params.productId);
	if (!Number.isSafeInteger(productId) || productId <= 0) {
		throw new Response("Invalid product ID", { status: 400 });
	}

	const response = await fetch(`/api/products/${productId}`, {
		signal: request.signal,
		headers: { Accept: "application/json" },
	});

	if (response.status === 404) {
		throw new Response("Product not found", { status: 404 });
	}
	if (!response.ok) {
		throw new Response("Unable to load product", { status: response.status });
	}

	return json(await response.json());
}

function ProductDetails() {
	const product = useLoaderData();
	return <ProductView product={product} />;
}
```

```mermaid
sequenceDiagram
	participant U as User
	participant R as Router
	participant L as Loader
	participant A as API
	U->>R: Navigate to product 42
	R->>L: params plus Request signal
	L->>A: Fetch product 42
	U->>R: Navigate to product 84
	R--xL: Abort obsolete request
	R->>L: Load product 84
	L->>A: Fetch product 84
	A-->>L: Product data
	L-->>R: Route data
	R-->>U: Commit product 84 route
```

Loaders improve routing coordination but are not automatically a complete server cache. Use RTK Query or another cache when data is shared broadly, requires normalized updates, background refetching, sophisticated invalidation, or offline behavior.

## Data Routers: Actions and Forms

An action handles mutations submitted to a route. React Router's `<Form>` progressively models navigation and mutation using Web `FormData` semantics.

```jsx
import {
	Form,
	redirect,
	useActionData,
	useNavigation,
} from "react-router-dom";

export async function createProjectAction({ request }) {
	const formData = await request.formData();
	const name = String(formData.get("name") ?? "").trim();

	if (name.length < 3) {
		return { errors: { name: "Enter at least three characters." } };
	}

	const project = await api.projects.create({ name });
	return redirect(`/projects/${project.id}`);
}

function NewProjectRoute() {
	const actionData = useActionData();
	const navigation = useNavigation();
	const submitting = navigation.state === "submitting";

	return (
		<Form method="post">
			<label htmlFor="project-name">Project name</label>
			<input
				id="project-name"
				name="name"
				aria-invalid={Boolean(actionData?.errors?.name)}
				aria-describedby={actionData?.errors?.name ? "name-error" : undefined}
			/>
			{actionData?.errors?.name && (
				<p id="name-error" role="alert">{actionData.errors.name}</p>
			)}
			<button disabled={submitting}>
				{submitting ? "Creating..." : "Create project"}
			</button>
		</Form>
	);
}
```

After an action completes, the data router revalidates relevant loaders so the UI can reflect server truth. The server must validate every field and enforce authorization regardless of client behavior.

```mermaid
flowchart LR
	F[Route Form submission] --> A[Action validates input]
	A -->|invalid| FE[Return field errors]
	A -->|valid| API[Mutate through API]
	API -->|success| RD[Redirect or result]
	RD --> RV[Revalidate relevant loaders]
	RV --> UI[Render fresh server state]
	API -->|failure| EB[Route error boundary]
```

## Pending UI and Fetchers

`useNavigation` exposes global route navigation state: `idle`, `submitting`, or `loading`. Use it for page-level progress and pending form feedback without inventing disconnected local flags.

```jsx
function AppLayout() {
	const navigation = useNavigation();
	const busy = navigation.state !== "idle";

	return (
		<>
			<ProgressBar active={busy} />
			<main aria-busy={busy}>
				<Outlet />
			</main>
		</>
	);
}
```

`useFetcher` loads or submits route data without navigation. It is appropriate for inline mutations, optimistic controls, autocomplete, and resource interactions that should preserve the current location.

```jsx
function FavoriteButton({ productId, favorite }) {
	const fetcher = useFetcher();
	const optimisticFavorite = fetcher.formData
		? fetcher.formData.get("favorite") === "true"
		: favorite;

	return (
		<fetcher.Form method="post" action={`/products/${productId}/favorite`}>
			<input type="hidden" name="favorite" value={String(!optimisticFavorite)} />
			<button aria-pressed={optimisticFavorite}>
				{optimisticFavorite ? "Remove favorite" : "Add favorite"}
			</button>
		</fetcher.Form>
	);
}
```

Optimistic UI must define rollback behavior, duplicate-submission policy, idempotency expectations, and accessible pending/error feedback.

## Route Error Boundaries

Data routers render the nearest `errorElement` when rendering, loading, or action processing throws. Route errors should distinguish expected HTTP responses from unexpected exceptions.

```jsx
import {
	isRouteErrorResponse,
	useRouteError,
} from "react-router-dom";

function ProductRouteError() {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			return <NotFoundResource resource="product" />;
		}
		return <RouteProblem status={error.status} message={error.statusText} />;
	}

	reportError(error);
	return <UnexpectedError />;
}
```

```mermaid
flowchart TB
	E[Loader, action, or render throws] --> N[Find nearest matched errorElement]
	N --> T{Route error response?}
	T -->|404| NF[Resource not found UI]
	T -->|401 or 403| AU[Authentication or permission UI]
	T -->|other HTTP| HP[HTTP problem UI]
	T -->|unexpected exception| RP[Report and show recovery UI]
```

Place error boundaries at meaningful recovery levels. A product failure should not necessarily replace the application shell; a root failure should still offer navigation or reload recovery where possible.

## Authentication and Authorization

A client route guard improves navigation and prevents inappropriate UI display. It is not a security boundary because users can call APIs directly or modify client code. APIs must authenticate requests and authorize every protected operation.

### Declarative Guard

```jsx
function RequireSession({ allowedRoles }) {
	const session = useSession();
	const location = useLocation();

	if (session.status === "loading") return <SessionLoading />;

	if (!session.user) {
		return (
			<Navigate
				to="/login"
				replace
				state={{ from: `${location.pathname}${location.search}` }}
			/>
		);
	}

	if (allowedRoles && !allowedRoles.includes(session.user.role)) {
		return <Navigate to="/forbidden" replace />;
	}

	return <Outlet />;
}
```

### Loader Guard

```jsx
import { redirect } from "react-router-dom";

async function requireSession(request, allowedRoles = []) {
	const session = await sessionStore.read(request.signal);
	const url = new URL(request.url);

	if (!session.user) {
		const returnTo = `${url.pathname}${url.search}`;
		throw redirect(`/login?returnTo=${encodeURIComponent(returnTo)}`);
	}

	if (allowedRoles.length && !allowedRoles.includes(session.user.role)) {
		throw new Response("Forbidden", { status: 403 });
	}

	return session;
}
```

```mermaid
flowchart TD
	N[Protected navigation] --> S{Session known?}
	S -->|loading| W[Wait or loader resolves]
	S -->|anonymous| LG[Redirect to login]
	S -->|authenticated| P{Required permission?}
	P -->|missing| F[Forbidden route]
	P -->|allowed| R[Render protected branch]
	R --> API[API independently authorizes request]
```

Validate post-login return destinations. Accept only same-origin application paths, typically strings beginning with one `/` but not `//`, and fall back to a known route. Never navigate directly to an arbitrary URL supplied by a query parameter.

## Code Splitting by Route

Routes are natural code-splitting boundaries because users do not need every screen on initial load.

### Component Lazy Loading

```jsx
const ReportsPage = lazy(() => import("./routes/ReportsPage.jsx"));

function AppRoutes() {
	return (
		<Suspense fallback={<RouteSkeleton />}>
			<Routes>
				<Route path="reports" element={<ReportsPage />} />
			</Routes>
		</Suspense>
	);
}
```

### Lazy Data Route Module

```jsx
const router = createBrowserRouter([
	{
		path: "/reports",
		lazy: () => import("./routes/reports.route.jsx"),
	},
]);
```

```jsx
// reports.route.jsx
export async function loader({ request }) {
	return loadReports({ signal: request.signal });
}

export function Component() {
	const reports = useLoaderData();
	return <ReportList reports={reports} />;
}

export function ErrorBoundary() {
	return <ReportsError error={useRouteError()} />;
}
```

Split at meaningful route boundaries, not every tiny component. Provide stable loading UI and monitor chunk failures because a deployment can invalidate assets requested by an older open tab.

## Scroll and Focus Management

Data routers provide `<ScrollRestoration>` for history-aware scroll behavior. Applications still need deliberate focus management after navigation so keyboard and assistive-technology users know the view changed.

```jsx
function AppLayout() {
	const location = useLocation();
	const headingRef = useRef(null);

	useEffect(() => {
		headingRef.current?.focus();
	}, [location.pathname]);

	return (
		<>
			<PrimaryNavigation />
			<main>
				<h1 ref={headingRef} tabIndex={-1}>Workspace</h1>
				<Outlet />
			</main>
			<ScrollRestoration />
		</>
	);
}
```

Focus the route's meaningful heading or main region, not an arbitrary body element. Avoid moving focus for search-parameter changes that only update filters within the same conceptual page.

```mermaid
sequenceDiagram
	participant U as Keyboard user
	participant R as Router
	participant D as Document
	U->>R: Activate customer link
	R->>D: Commit customer route
	D->>D: Update title and heading
	D-->>U: Move focus to route heading
	U->>D: Continue navigation from known position
```

## Navigation Blocking and Unsaved Changes

Blocking navigation can protect unsaved work, but it should be a last resort because it interrupts expected browser behavior. Persist drafts where possible and ask only when data loss is real.

An implementation may use the router version's blocker API for in-app navigation and `beforeunload` for document exits. These APIs and their stability vary by React Router version, so isolate the behavior in one hook and test Back, Forward, links, reload, tab close, and successful submission.

```mermaid
stateDiagram-v2
	[*] --> Clean
	Clean --> Dirty: user edits draft
	Dirty --> Saving: submit
	Saving --> Clean: save succeeds
	Saving --> Dirty: save fails
	Dirty --> Confirming: navigation requested
	Confirming --> Dirty: user stays
	Confirming --> Discarded: user leaves
	Discarded --> [*]
```

Do not use blockers to trap users in marketing funnels or prevent ordinary navigation.

## Not-Found and Canonical Routing

Use a splat route for unmatched client paths and resource-specific 404 handling for valid route shapes whose records do not exist.

```jsx
<Route path="*" element={<NotFound />} />
```

These cases differ:

| Situation | Example | Correct handling |
|---|---|---|
| Unknown application path | `/does-not-exist` | App-level 404 route |
| Known pattern, missing record | `/products/999999` | Loader/API 404 and resource UI |
| Old path with replacement | `/catalog/42` | Permanent server redirect or client replace |
| Unauthorized record | `/accounts/secret` | 401/403 without revealing sensitive existence |

Use canonical URL forms for trailing slashes, casing, aliases, and legacy paths. Search engines and analytics benefit from one stable identity per public resource.

## SPA Deployment and Deep Links

Client routing works only after the application JavaScript loads. When a user directly requests `/customers/42`, the web server receives that path first.

```mermaid
flowchart TD
	B[Browser requests /customers/42] --> S[Web server or CDN]
	S --> A{Static asset or API path?}
	A -->|yes| F[Serve requested resource]
	A -->|no SPA route| I[Rewrite to index.html]
	I --> J[Load application JavaScript]
	J --> R[React Router matches /customers/42]
	R --> UI[Render customer route]
```

Configure the host to serve `index.html` for unknown frontend routes while excluding API paths and static assets. Without this fallback, in-app navigation works but refreshes and shared deep links return server 404 responses.

When an application is deployed below a subpath, configure the router basename and asset paths consistently.

```jsx
const router = createBrowserRouter(routes, {
	basename: "/scholar-desk",
});
```

## BrowserRouter, HashRouter, and MemoryRouter

| Router | Location source | Typical use |
|---|---|---|
| `BrowserRouter` | History API pathname | Production web application with server fallback |
| `HashRouter` | URL fragment after `#` | Static hosting where rewrites are impossible |
| `MemoryRouter` | In-memory entries | Component tests, stories, non-browser environments |
| `createMemoryRouter` | Data router in memory | Tests for loaders, actions, redirects, and errors |

Hash routing avoids server fallback requirements but produces less natural URLs and limits normal fragment semantics. Prefer browser routing when deployment configuration is available.

## Testing Routes

Test observable routing behavior: matched content, active navigation, parameter handling, redirects, pending UI, errors, and history changes. Avoid mocking every router hook because doing so can produce tests that no longer represent actual matching behavior.

### Component Route Test

```jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

test("renders the selected customer", () => {
	render(
		<MemoryRouter initialEntries={["/customers/42"]}>
			<Routes>
				<Route path="customers/:customerId" element={<CustomerDetails />} />
			</Routes>
		</MemoryRouter>,
	);

	expect(screen.getByRole("heading", { name: /customer 42/i })).toBeVisible();
});
```

### Data Router Test

```jsx
test("shows a route-level not-found response", async () => {
	const router = createMemoryRouter([
		{
			path: "/products/:productId",
			loader: () => {
				throw new Response("Not found", { status: 404 });
			},
			element: <ProductDetails />,
			errorElement: <ProductRouteError />,
		},
	], { initialEntries: ["/products/404"] });

	render(<RouterProvider router={router} />);
	expect(await screen.findByText(/product not found/i)).toBeVisible();
});
```

Use user-event interactions for links and forms. Add a small number of browser end-to-end tests for refreshes on deep links, authentication returns, Back/Forward behavior, hosting rewrites, scroll/focus, and chunk loading.

## Routing Performance

- Split code at substantial route boundaries.
- Start route data before rendering when loaders fit the architecture.
- Cancel obsolete requests through the loader request signal.
- Keep search-parameter parsing deterministic and inexpensive.
- Avoid remounting layouts through unstable route definitions or keys.
- Use cache-aware data libraries when multiple routes consume the same entities.
- Prefetch only likely destinations and respect bandwidth constraints.
- Monitor navigation timings, loader failures, and lazy-chunk errors.

Do not wrap route configuration in a component that recreates the router on every render. Avoid fetching the same route data independently in several nested components when one owner or cache can coordinate it.

## Routing Security

| Risk | Example | Mitigation |
|---|---|---|
| Open redirect | `?returnTo=https://attacker.example` | Allow only validated same-origin app paths |
| Sensitive URL data | Token or account details in query | Keep secrets out of paths/search/history state |
| Client-only authorization | Hidden admin route | Enforce permissions on every API operation |
| Identifier trust | `/accounts/42` assumed accessible | Validate format and authorize server-side |
| Unsafe external link | New-tab link controls opener | Use appropriate `rel="noopener noreferrer"` |
| Route data injection | Unescaped API content | Render as text; sanitize intentional HTML |
| History-state trust | Privilege carried in location state | Treat navigation state as untrusted metadata |

Route guards improve experience, not security authority. The browser is controlled by the user.

## Common Mistakes

| Mistake | Consequence | Production correction |
|---|---|---|
| Using `<a>` for every internal route | Full document reload and lost client state | Use `Link` or `NavLink` |
| Using `Link` for an external document | Router handles a non-app destination | Use a normal anchor |
| Duplicating filters in component state and URL | Back/Forward and sharing disagree | Make URL canonical or define explicit synchronization |
| Treating parameters as valid records | Invalid requests and misleading UI | Validate format and handle resource 404 |
| Absolute paths throughout nested modules | Routes become difficult to move | Prefer intentional relative links |
| Missing `<Outlet>` | Child route matches but cannot render | Place outlet in parent layout |
| Recreating router during render | Router state and subscriptions reset | Define router outside components |
| Guard checks only the UI | Direct API access remains possible | Authorize on server |
| Arbitrary post-login redirect | Open-redirect vulnerability | Validate same-origin return path |
| No host rewrite | Deep-link refresh returns 404 | Configure SPA fallback |
| One root error screen for everything | Small failures replace whole app | Add recovery boundaries by route scope |
| No route focus management | Screen-reader/keyboard context is unclear | Focus meaningful heading/main region |
| Index route confused with index key | Wrong conceptual model | Index route is default nested UI, not list identity |
| Navigation effect used instead of redirect | Protected UI may render briefly | Redirect in loader/route guard |

## Production Architecture Checklist

1. Model URLs around stable user-facing resources and workflows.
2. Decide whether declarative routing or a data router owns route data flow.
3. Use nested layouts and outlets to match persistent UI structure.
4. Validate path and search parameters at route boundaries.
5. Put bookmarkable filters, sorting, and pagination in the URL.
6. Keep secrets and sensitive personal data out of locations.
7. Enforce authentication and authorization on the server.
8. Define loading, empty, 404, forbidden, and unexpected-error states.
9. Cancel obsolete requests and prevent duplicate mutations.
10. Split bundles at meaningful route boundaries.
11. Manage document titles, focus, scrolling, and active navigation semantics.
12. Configure deep-link rewrites and test direct URL requests.
13. Test routes through real matching and representative navigation.
14. Observe navigation latency, failed loaders, redirects, and chunk errors.

## Real-World Route Architectures

### E-Commerce

Use paths for product/category identity, search parameters for filters and pagination, loaders or a query cache for products, actions/fetchers for cart mutations, and resource-level 404 handling. Preserve checkout steps deliberately and never place payment secrets in the URL.

### Banking

Use nested account routes, strict parameter validation, server-enforced permissions, short-lived session handling, explicit forbidden states, and idempotent actions for transfers. Avoid exposing sensitive account information in route segments, search strings, analytics, or history state.

### CRM

Use `/customers/:customerId` as the resource layout with nested contacts, activity, invoices, and notes. Keep selected tabs in route segments, grid filters in search parameters, customer data in a server cache, and unsaved edit drafts in a scoped form owner.

### Dashboard and Analytics

Use route segments for dashboards/reports, search parameters for time range and comparison settings, lazy route modules for heavy visualization bundles, and route errors that preserve the application shell. Validate expensive query ranges before sending requests.

A professional routing architecture makes navigation durable, predictable, secure at server boundaries, accessible after every transition, and observable in production.

---

<a id="module-7-forms"></a>
# Module 7: Forms

[Previous: Router](#module-6-react-router) | [Next: Axios](#module-8-axios)

Controlled forms provide immediate React-driven validation and dependent UI. Uncontrolled forms keep values in DOM controls and can reduce per-keystroke rendering. Validate on both client (experience) and server (authority). Preserve server field errors and submission state.

```mermaid
flowchart LR
 U[User edits fields] --> M{Control model}
 M -->|Controlled| S[React state update and render]
 M -->|Uncontrolled| D[DOM retains value]
 S --> V[Client validation]
 D --> F[FormData on submit]
 F --> V
 V -->|valid| A[API submission]
 V -->|invalid| E[Accessible error summary]
 A -->|server errors| E
 A -->|success| C[Confirmation/navigation]
```

The first branch distinguishes where current values live. Both models converge at validation and submission; server validation remains authoritative; failure returns focusable/announced feedback while success advances the workflow.

```jsx
function ProfileForm() {
	const [errors, setErrors] = useState({});
	async function submit(event) {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const file = data.get("avatar");
		if (file.size > 2_000_000) return setErrors({ avatar: "Maximum 2 MB" });
		await api.post("/profile", data);
	}
	return (
		<form onSubmit={submit} noValidate>
			<input name="name" required />
			<input name="avatar" type="file" accept="image/*" />
			{errors.avatar && <p role="alert">{errors.avatar}</p>}
			<button>Save</button>
		</form>
	);
}
```

React Hook Form uses uncontrolled registration/subscriptions to limit renders and supports dynamic arrays and schema resolvers. Do not manually set multipart `Content-Type`; the browser adds its boundary. Revoke object URLs, validate type/size server-side, prevent duplicate submit, focus the first invalid field, and announce errors.

**Mini project:** dynamic HRMS employee form with field arrays, async uniqueness validation, upload progress, dirty-state navigation guard, and accessible error summary.

---

<a id="module-8-axios"></a>
# Module 8: Axios

[Previous: Forms](#module-7-forms) | [Next: Context](#module-9-context-api)

Axios is a promise-based HTTP client offering instances, transforms, interceptors, timeouts, cancellation, and progress APIs. HTTP work is external to React; keep transport policy in an API layer and UI status in a data layer/component.

```mermaid
sequenceDiagram
 participant C as Component
 participant S as Service
 participant I as Axios interceptors
 participant A as API
 C->>S: getProducts(params, signal)
 S->>I: configured request
 I->>A: headers + query
 A-->>I: response/error
 I-->>S: normalized result
 S-->>C: data or AppError
```

```jsx
import axios from "axios";

export const http = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 10_000,
	withCredentials: true,
	headers: { Accept: "application/json" },
});

http.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject({
		kind: error.response ? "http" : error.request ? "network" : "client",
		status: error.response?.status,
		message: error.response?.data?.message ?? error.message,
		cause: error,
	}),
);

export const productsApi = {
	list: ({ page, query, signal }) => http.get("/products", { params: { page, query }, signal }),
	create: (data) => http.post("/products", data),
	replace: (id, data) => http.put(`/products/${id}`, data),
	update: (id, data) => http.patch(`/products/${id}`, data),
	remove: (id) => http.delete(`/products/${id}`),
};
```

Use `AbortController`; timeout and cancellation solve different problems. Retry only idempotent/transient operations with capped exponential backoff and jitter. Never blindly retry validation/auth failures. `Promise.all` is fail-fast for independent concurrent calls; `allSettled` preserves partial outcomes. Cursor pagination is robust under insertions; infinite scroll needs duplicate prevention, termination, accessibility, and scroll restoration.

```jsx
const controller = new AbortController();
const [products, categories] = await Promise.all([
	http.get("/products", { signal: controller.signal }),
	http.get("/categories", { signal: controller.signal }),
]);

// Upload; let the browser create the multipart boundary.
await http.post("/files", formData, { onUploadProgress: ({ loaded, total }) => setProgress(loaded / total) });
// Download
const { data } = await http.get("/report", { responseType: "blob" });
```

For JWT refresh, prefer secure HttpOnly cookies when architecture permits. A single-flight refresh prevents many 401s from starting many refresh requests; `_retry` guards loops; failure clears session. Interceptors must be ejected when dynamically installed.

```text
src/api/http.js             # transport policy
src/api/errors.js           # normalized error model
src/features/products/api.js# endpoint service
src/features/products/hooks/# React integration
```

**Mistakes:** token in every component, global mutable defaults, no cancellation, treating every error alike, infinite retries, manually setting multipart boundaries, and duplicating RTK Query caching. **Interview:** Axios rejects non-2xx by default; inspect `response`, `request`, or setup error. **Project:** paginated catalog with cancellation, retry, upload/download, normalized errors, and interceptor tests.

---

<a id="module-9-context-api"></a>
# Module 9: Context API

[Previous: Axios](#module-8-axios) | [Next: Redux Toolkit](#module-10-redux-toolkit-and-rtk-query)

Context distributes a value through a subtree without forwarding it through every intermediate component. A provider owns a value; `useContext` reads the nearest provider. Consumers re-render when provider value changes by `Object.is`, even through memoized ancestors.

```mermaid
flowchart TB
 O[Provider owner renders] --> V{Value changed by Object.is?}
 V -->|No| N[Consumers retain current context]
 V -->|Yes| P[Publish new context value]
 P --> C1[Consumer A renders]
 P --> C2[Consumer B renders]
 P --> C3[Deep consumer renders]
 X[Non-consuming intermediary] -. need not read value .-> C3
```

The owner computes the provider value; React compares its identity; a real change notifies every subscribed consumer beneath that provider. Intermediate components need not receive props, but context consumers still pay for relevant provider updates.

```jsx
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const value = useMemo(() => ({ user, signOut: () => setUser(null) }), [user]);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be inside AuthProvider");
	return context;
}
```

Memoizing value avoids changes caused only by object recreation, but every actual `user` change still notifies all consumers. Split state/dispatch or fast/slow contexts; colocate providers; consider selector-based stores for high-frequency global data.

| Context | Redux Toolkit |
|---|---|
| Dependency distribution, simple low-frequency shared state | Complex transitions, middleware, DevTools, selectors, entity normalization |
| No built-in async/cache model | Thunks, listeners, RTK Query cache |
| Provider value update reaches consumers | Subscription selectors limit updates |

**Assignment:** theme/auth contexts with invariant hooks and render-count tests. **Interview:** Context does not eliminate state ownership; it changes delivery. It can be combined with a reducer but does not gain Redux middleware, DevTools, or server caching.

---

<a id="module-10-redux-toolkit-and-rtk-query"></a>
# Module 10: Redux Toolkit and RTK Query

[Previous: Context](#module-9-context-api) | [Next: Performance](#module-11-performance-optimization)

Redux implements one-way event flow: UI dispatches actions, middleware may react, reducers calculate next state, and subscribers select updates. Redux Toolkit (RTK) is the official way to write Redux: `configureStore`, `createSlice`, Immer-powered immutable updates, thunks, listeners, entity adapters, and RTK Query.

```mermaid
flowchart LR
 UI -->|dispatch action| MW[Middleware]
 MW --> R[Root reducer]
 R --> S[New store state]
 S -->|selector subscription| UI
 MW --> API[Async work]
 API --> MW
```

```jsx
import { configureStore, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const products = createEntityAdapter();
export const fetchProducts = createAsyncThunk("products/fetch", async (_, { signal, rejectWithValue }) => {
	try { return (await http.get("/products", { signal })).data; }
	catch (error) { return rejectWithValue(error.message); }
});

const slice = createSlice({
	name: "products",
	initialState: products.getInitialState({ status: "idle", error: null }),
	reducers: { productUpdated: products.updateOne },
	extraReducers: (builder) => builder
		.addCase(fetchProducts.pending, (state) => { state.status = "pending"; })
		.addCase(fetchProducts.fulfilled, (state, action) => { state.status = "succeeded"; products.setAll(state, action.payload); })
		.addCase(fetchProducts.rejected, (state, action) => { state.status = "failed"; state.error = action.payload ?? action.error.message; }),
});

export const store = configureStore({ reducer: { products: slice.reducer } });
```

Immer lets reducers use mutation syntax on a draft while producing immutable structural sharing. State/actions should remain serializable. Select narrowly; normalized `{ids, entities}` data avoids duplication and makes updates direct. Use listener middleware for workflows reacting to actions/state; custom middleware must call `next(action)` and return its result.

## RTK Query

RTK Query caches server state by endpoint plus serialized arguments, deduplicates requests, tracks subscribers, expires unused cache, and invalidates tags.

```jsx
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "/api", credentials: "include" }),
	tagTypes: ["Product"],
	endpoints: (build) => ({
		getProducts: build.query({
			query: (params) => ({ url: "products", params }),
			providesTags: (result = []) => ["Product", ...result.map(({ id }) => ({ type: "Product", id }))],
		}),
		updateProduct: build.mutation({
			query: ({ id, ...patch }) => ({ url: `products/${id}`, method: "PATCH", body: patch }),
			async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
				const undo = dispatch(api.util.updateQueryData("getProducts", undefined, (draft) => {
					Object.assign(draft.find((p) => p.id === id), patch);
				}));
				try { await queryFulfilled; } catch { undo.undo(); }
			},
			invalidatesTags: (_r, _e, { id }) => [{ type: "Product", id }],
		}),
	}),
});
```

Register `api.reducer` and `api.middleware`. Use generated hooks, `prefetch`, polling options, and focus/reconnect listeners deliberately. Optimistic updates must patch the exact cache key/arguments and rollback failures. Tags describe data relationships, not UI screens.

```text
src/app/store.js
src/app/listenerMiddleware.js
src/services/api.js
src/features/products/productsSlice.js
src/features/products/selectors.js
src/features/products/components/
```

**Context vs Redux:** use context for stable dependency distribution; Redux for cross-feature event/state workflows; RTK Query for shared server cache. Do not copy query data into slices unless creating a deliberate editable snapshot.

**Common mistakes:** giant slice, nonserializable values, dispatching in render, selecting whole state, hand-written immutable nesting, duplicate Axios/RTKQ caches, broad invalidation, and optimistic updates without rollback.

**Practice:** configure store; build slice; thunk abort; adapter selectors; middleware; listener workflow; API slice; tag invalidation; optimistic update; polling/prefetch. **Mini project:** CRM leads with normalized local workflow state and RTK Query server data. **Interview:** reducers are pure calculations; middleware surrounds dispatch; `extraReducers` responds to external action types without generating them.

---

<a id="module-11-performance-optimization"></a>
# Module 11: Performance Optimization

[Previous: Redux Toolkit](#module-10-redux-toolkit-and-rtk-query) | [Next: Environment Variables](#module-12-environment-variables)

## Introduction and Measurement Model

Performance is user experience under real devices and networks, not the number of optimization hooks. Measure loading (LCP), responsiveness (INP), layout stability (CLS), JavaScript long tasks, React render/commit duration, memory growth, and bundle transfer/parse cost. Optimize the measured bottleneck while preserving correctness.

```mermaid
flowchart LR
 M[Measure profile] --> B[Locate bottleneck]
 B --> C{Cost type}
 C -->|Render| R[Colocate state/memoize]
 C -->|Large list| V[Virtualize]
 C -->|Bundle| S[Split/tree shake]
 C -->|Network| Q[Cache/prefetch]
 R --> P[Measure again]
 V --> P
 S --> P
 Q --> P
```

`React.memo` can skip rendering when props compare equal by `Object.is`; context and local state still update it. `useMemo` caches a calculation and `useCallback` caches function identity. All add comparison/cache/retention overhead. The React DevTools Profiler shows why and how long components rendered; browser Performance tools show main-thread, layout, paint, and network work.

```jsx
const ProductRow = memo(function ProductRow({ product, onSelect }) {
	return <button onClick={() => onSelect(product.id)}>{product.name}</button>;
});

function Catalog({ products, query, onSelect }) {
	const filtered = useMemo(() => rank(products, query), [products, query]);
	const select = useCallback((id) => onSelect(id), [onSelect]);
	return filtered.map((product) => <ProductRow key={product.id} product={product} onSelect={select} />);
}
```

This is useful only when ranking/rows are costly and `product` identities are stable. An inline reconstructed product object defeats the bailout.

## Lazy Loading, Suspense, and Virtualization

```jsx
const Analytics = lazy(() => import("./Analytics.jsx"));
function ReportsRoute() {
	return <Suspense fallback={<ReportSkeleton />}><Analytics /></Suspense>;
}
```

Dynamic import creates an asynchronous chunk. Split at routes or heavy optional capabilities; too many chunks increase request/coordination overhead. Suspense displays fallback while a supported child suspends; it does not automatically make arbitrary effect fetching Suspense-aware.

Virtualization renders a visible window rather than thousands of DOM rows. Use a proven library, stable item keys, overscan, measured/fixed dimensions, accessible semantics, and focus handling. Optimize images with correct dimensions, responsive sources, modern formats, lazy loading below the fold, and CDN caching.

**Wrong:** memoize trivial arithmetic, create unstable props, render 50,000 hidden nodes, lazy-load above-the-fold essentials, or judge only development Strict Mode. **Best:** production profile, state colocation, server cache, route splitting, virtualization, and budgets. **Assignment:** compare baseline and optimized catalog with profiler evidence. **Interview:** memoization reduces repeated work; it does not make a calculation free and is not a correctness guarantee.

---

<a id="module-12-environment-variables"></a>
# Module 12: Environment Variables

[Previous: Performance](#module-11-performance-optimization) | [Next: Webpack](#module-13-webpack)

Frontend environment variables are build-time configuration replacements. Vite exposes only `VITE_*` through `import.meta.env`; CRA exposes `REACT_APP_*` through `process.env`. Mode files commonly load with precedence such as `.env`, `.env.local`, `.env.development`, and `.env.production` (tool-specific rules apply).

```mermaid
flowchart LR
 E[Mode env files + process env] --> T[Build tool load/expand]
 T --> R[Static replacements]
 R --> B[Browser bundle]
 B --> U[User can inspect values]
```

```env
# .env.development
VITE_API_URL=http://localhost:8080/api
VITE_APP_ENV=development
```

```js
const required = ["VITE_API_URL", "VITE_APP_ENV"];
for (const key of required) {
	if (!import.meta.env[key]) throw new Error(`Missing environment variable: ${key}`);
}
export const config = Object.freeze({
	apiUrl: import.meta.env.VITE_API_URL,
	environment: import.meta.env.VITE_APP_ENV,
	production: import.meta.env.PROD,
});
```

Values are strings unless the tool provides built-ins; parse and validate them. Never store private keys, database credentials, signing secrets, or privileged tokens. Public API origins and public telemetry identifiers are configuration, not secrets. Build once per environment when values are embedded, or intentionally load a validated runtime config file before boot if one artifact must deploy everywhere.

**Mistakes:** committing `.env.local`, assuming prefixes secure values, boolean string errors (`"false"` is truthy), reading dynamic property names that cannot be statically replaced, and mixing environments in one build. **Assignment:** typed config validation with clear startup failure and deployment injection.

---

<a id="module-13-webpack"></a>
# Module 13: Webpack

[Previous: Environment](#module-12-environment-variables) | [Next: Vite](#module-14-vite)

Webpack builds a dependency graph from one or more entries, transforms matching modules with loaders, lets plugins participate across compilation lifecycle hooks, and emits assets/chunks. Babel transforms syntax; it is not a bundler. `webpack-dev-server` serves memory output and HMR updates changed modules while preserving state when boundaries accept updates.

```mermaid
flowchart LR
 E[Entry] --> G[Module graph]
 G --> L[Loaders transform modules]
 L --> P[Plugins optimize compilation]
 P --> C[Chunks]
 C --> O[Hashed output assets]
```

```js
// webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = (_, argv) => ({
	mode: argv.mode ?? "development",
	entry: "./src/main.jsx",
	output: { filename: "assets/[name].[contenthash].js", clean: true },
	module: { rules: [{ test: /\.jsx?$/, exclude: /node_modules/, use: "babel-loader" }] },
	resolve: { extensions: [".js", ".jsx"] },
	plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
	devtool: argv.mode === "production" ? "source-map" : "eval-cheap-module-source-map",
	optimization: { splitChunks: { chunks: "all" }, runtimeChunk: "single" },
	devServer: { historyApiFallback: true, hot: true },
});
```

Production mode enables minification and tree-shaking-related optimizations. Content hashes support long caching; source maps aid diagnosis but require an intentional exposure policy. Asset modules handle files. Dynamic imports split chunks. Bundle analyzers reveal duplicate/large modules. Loaders transform individual modules; plugins coordinate compilation-wide behavior.

**Mistakes:** one giant vendor chunk, cache-busting filenames without cache headers, transpiling all dependencies, source maps exposed accidentally, and assuming HMR equals production. **Mini project:** build a React app with Babel, CSS/assets, HMR, route chunks, analyzer, budgets, and long-term caching.

---

<a id="module-14-vite"></a>
# Module 14: Vite

[Previous: Webpack](#module-13-webpack) | [Next: Tree Shaking](#module-15-tree-shaking)

Vite serves source through native browser ESM during development, transforms requested modules on demand, and pre-bundles dependencies for efficiency. Its HMR graph invalidates affected modules. Production builds use Rollup, so dev and build pipelines differ and both must be tested.

```mermaid
flowchart TB
 B[Browser requests module] --> D[Vite dev server]
 D --> X[Transform on demand]
 X --> B
 H[File change] --> G[HMR module graph]
 G --> B
 S[Production command] --> R[Rollup bundle]
 R --> A[Optimized assets]
```

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
	plugins: [react()],
	server: { proxy: { "/api": { target: "http://localhost:8080", changeOrigin: true } } },
	build: { sourcemap: mode !== "production", chunkSizeWarningLimit: 600 },
}));
```

Vite treats `index.html` as an entry and rewrites imported assets. Plugins use Rollup-compatible hooks plus Vite extensions. Use `import.meta.env`, `import.meta.glob` for controlled file discovery, and `vite preview` only to inspect a build, not as a production server.

| Concern | Vite | Webpack |
|---|---|---|
| Development | native ESM/on-demand transforms | bundled graph/dev compilation |
| Production | Rollup | Webpack optimizer |
| Configuration | conventionally smaller | highly mature/customizable |
| Best fit | modern app development | legacy/custom enterprise pipelines too |

**Assignment:** migrate a CRA app, translating env variables, aliases, proxy, tests, SVG/assets, and deployment fallback; verify production rather than assuming dev parity.

---

<a id="module-15-tree-shaking"></a>
# Module 15: Tree Shaking

[Previous: Vite](#module-14-vite) | [Next: Authentication](#module-16-authentication)

Tree shaking removes statically provable unused exports, primarily from ESM's static import/export graph. Minifiers perform dead-code elimination after bundler analysis. CommonJS and dynamic access are harder to analyze. Package `sideEffects` metadata tells bundlers which files may be safely omitted; incorrect `false` can remove CSS or initialization.

```mermaid
flowchart LR
 M[ES module graph] --> U[Mark used exports]
 U --> S[Respect side effects]
 S --> D[Drop unreachable code]
 D --> N[Minify]
 N --> A[Analyze bundle]
```

```js
// Better analyzability
import { formatCurrency } from "./money.js";

// Dynamic import is code splitting, not by itself tree shaking.
const module = await import("./heavy-report.js");
module.openReport();
```

Named imports do not guarantee a small bundle if the package is CommonJS or has broad side effects. Barrel files can accidentally pull initialization or create cycles; measure rather than banning them categorically. Configure `sideEffects: ["**/*.css", "./src/polyfills.js"]`, publish ESM correctly, avoid top-level effects, and inspect source-map-explorer/rollup visualizer/webpack analyzer output.

**Interview:** code splitting changes when code loads; tree shaking changes whether unused code is emitted. **Assignment:** create an intentionally bloated bundle, identify retained modules, correct imports/metadata, and record before/after parsed and compressed sizes.

---

<a id="module-16-authentication"></a>
# Module 16: Authentication

[Previous: Tree Shaking](#module-15-tree-shaking) | [Next: Error Handling](#module-17-error-handling)

Authentication proves identity; authorization decides permission. JWT is a token format, not an authentication architecture. Access tokens should be short-lived; refresh tokens rotate and require replay protection. Browser storage choice is a threat-model decision: `localStorage` is readable by successful XSS; HttpOnly Secure SameSite cookies resist token theft by JavaScript but require CSRF controls where applicable. In-memory access tokens reduce persistence but are lost on reload.

```mermaid
sequenceDiagram
 participant U as User
 participant R as React app
 participant A as Auth API
 participant P as Protected API
 U->>R: Submit credentials
 R->>A: Login over TLS
 A-->>R: Secure refresh cookie + access/session state
 R->>P: Authorized request
 P-->>R: 401 expired
 R->>A: Single-flight refresh
 A-->>R: Rotated session/access token
 R->>P: Retry once
```

```jsx
function RequireRole({ allow }) {
	const { status, user } = useAuth();
	if (status === "loading") return <PageSpinner />;
	if (!user) return <Navigate to="/login" replace />;
	return allow.includes(user.role) ? <Outlet /> : <Navigate to="/forbidden" replace />;
}
```

This guard improves UX only. The API must enforce authorization for every protected operation. On startup, resolve session before rendering protected content to avoid flashes. A refresh implementation should queue concurrent failures behind one promise, retry once, reject on refresh failure, clear cached user data, and redirect without loops. Logout should invalidate the server session/refresh token, clear client caches, close sensitive subscriptions, and broadcast across tabs if required.

Never decode a JWT and treat claims as trusted authorization without server verification. Do not log tokens, place them in URLs, or store secrets in the bundle. Add CSP, output encoding, dependency hygiene, CSRF strategy, idle/absolute timeout policy, audit logging, and step-up authentication for high-risk banking actions.

**Mini project:** role-based banking shell with bootstrap, cookie session, refresh rotation simulation, multi-tab logout, return URL validation, and authorization tests. **Interview:** private routes do not secure data; only server authorization does.

---

<a id="module-17-error-handling"></a>
# Module 17: Error Handling

[Previous: Authentication](#module-16-authentication) | [Next: Architecture](#module-18-project-architecture)

Errors belong to different boundaries: render failures, event failures, network/HTTP failures, validation, authorization, and unexpected global failures. Normalize transport errors into a domain-safe model and present actionable messages without leaking internals.

```mermaid
flowchart TB
 E[Failure] --> C{Category}
 C -->|Render| B[Error boundary fallback]
 C -->|API| N[Normalize + retry policy]
 C -->|Validation| F[Field/form errors]
 C -->|Auth| A[Refresh/logout/forbidden]
 B --> O[Monitoring]
 N --> O
 A --> O
```

Place boundaries around routes and risky widgets so one chart does not blank the application. Include reset/retry and correlation ID. Event handlers use `try/catch`; rejected async work must be awaited/caught. Retry transient idempotent failures with capped exponential backoff and jitter; never retry every 4xx or non-idempotent mutation blindly.

```jsx
async function save() {
	setStatus("pending");
	try {
		await ordersApi.submit(draft);
		setStatus("succeeded");
	} catch (error) {
		monitoring.capture(error, { feature: "checkout" });
		setStatus("failed");
	}
}
```

Global `error`/`unhandledrejection` listeners are last-resort telemetry, not recovery architecture. Redact PII/tokens, attach release/environment/route/correlation context, upload source maps securely, sample noisy events, and test fallback paths.

**Mistakes:** swallowing errors, endless spinner, raw server messages, retry storms, one root boundary only, and logging sensitive payloads. **Assignment:** route/widget boundaries plus normalized API errors, retry, offline UI, and monitoring assertions.

---

<a id="module-18-project-architecture"></a>
# Module 18: Project Architecture

[Previous: Error Handling](#module-17-error-handling) | [Next: Deployment](#module-19-build-process-and-deployment)

Architecture manages change. Organize by business capability as the application grows, define dependency direction, separate server state from client workflow state, and keep feature internals private. Avoid both one global `components` bucket and premature micro-frontends.

```mermaid
flowchart TB
 APP[app: bootstrap/providers/router] --> PAGES[pages/routes]
 PAGES --> FEATURES[features]
 FEATURES --> ENTITIES[domain entities]
 FEATURES --> SHARED[shared UI/hooks/utils]
 ENTITIES --> SHARED
 API[services/API] --> FEATURES
```

### Small

```text
src/{components,hooks,services,App.jsx,main.jsx}
```

### Medium Feature-Based

```text
src/
|-- app/{router,store,providers}
|-- features/
|   |-- products/{api,components,hooks,productsSlice.js}
|   `-- checkout/{components,hooks,validation.js}
|-- shared/{ui,hooks,utils,constants,assets}
`-- main.jsx
```

### Enterprise

```text
src/
|-- app/                    # composition root only
|-- pages/                  # route composition
|-- features/               # user capabilities
|-- entities/               # domain models/selectors/UI
|-- services/               # transport, telemetry, config
|-- shared/                 # domain-neutral primitives
`-- test/                   # cross-feature fixtures/setup
```

Use PascalCase components, `useX` hooks, event-named Redux actions, and explicit public `index.js` boundaries. Components render/coordinate; hooks integrate React behavior; services perform transport; selectors derive data; constants represent stable semantics; utilities remain pure. Tests should follow risk: reducers/selectors, integration flows, route/auth boundaries, and a few critical end-to-end journeys.

```mermaid
journey
 title Architecture growth
 section Small app
 Colocate simple code: 5: Team
 section Product grows
 Extract feature boundaries: 4: Team
 Add store/API policies: 4: Team
 section Enterprise
 Enforce dependency rules: 5: Team
 Observe and deploy independently where justified: 3: Team
```

**Mistakes:** folders by file type at large scale, circular feature imports, business logic in shared UI, API calls throughout components, duplicated server state, and abstractions with one consumer. **Mini project:** design an e-commerce repository with dependency rules, ADRs, test strategy, ownership, and migration path from small to medium.

---

<a id="module-19-build-process-and-deployment"></a>
# Module 19: Build Process and Deployment

[Previous: Architecture](#module-18-project-architecture) | [Next: Interview Handbook](#final-interview-handbook)

Development prioritizes feedback: source maps, HMR, diagnostics, and unminified modules. Production prioritizes correctness and delivery: validated environment configuration, transformed syntax, bundled/split assets, tree shaking, minification, hashing, compression at the host/CDN, and observable releases.

```mermaid
flowchart LR
 S[Source + config] --> Q[Lint/test/type checks]
 Q --> B[Production build]
 B --> A[Analyze/test artifact]
 A --> D[Deploy immutable assets]
 D --> C[CDN + cache headers]
 C --> M[Monitor canary]
 M -->|bad release| R[Rollback]
```

```bash
npm ci
npm test -- --run
npm run build
```

Deploy `dist` for Vite and `build` for CRA. Netlify uses a rewrite such as `/* /index.html 200`; Vercel uses a rewrite to `/index.html`; static GitHub Pages often needs a correct base path and SPA fallback strategy. Each platform should inject public config at build time, serve HTTPS, compress assets, and preserve hashed files with long immutable caching while giving HTML short/no cache so it discovers new hashes.

CI/CD overview: install from lockfile, static checks, tests, build, vulnerability/policy checks, artifact smoke test, deploy preview, approval/canary, production, synthetic check, telemetry, rollback. Do not rebuild during rollback; redeploy a known immutable artifact. Upload source maps to monitoring with release IDs and restrict public exposure. Set CSP/security headers at the host.

### Production Checklist

- Deep links and refresh work; base paths are correct.
- Environment values are validated and contain no secrets.
- Error/loading/empty/offline paths work.
- Bundle and performance budgets pass.
- Hashed assets and HTML use appropriate cache policies.
- Source maps, release metadata, monitoring, and alerts are configured.
- Accessibility and critical browser/device flows pass.
- Rollback is documented and tested.

**Mini project:** deploy the same Vite SPA to Netlify and Vercel with preview environments, route rewrites, security headers, immutable caching, smoke tests, and rollback evidence. **Interview:** a successful build only proves asset generation; deployment must also prove routing, configuration, headers, cache behavior, runtime API access, and observability.

---

<a id="final-interview-handbook"></a>
# Final Interview Handbook

[Previous: Deployment](#module-19-build-process-and-deployment) | [Back to Top](#top)

## Consolidated Summary, Practice, and Interview Preparation

This end-of-book section centralizes review material so the teaching modules can remain focused on concepts, execution, and production implementation.

### React Fundamentals Summary

React converts declarative element descriptions into focused host updates. Components define reusable boundaries, props provide read-only inputs, state represents changing source data, events express user intent, and keys preserve sibling identity. Correct state ownership and pure rendering are more important than premature optimization.

### React Internals Summary

Fiber represents schedulable work; reconciliation preserves identity through type, position, and key; commit changes the host DOM; and the browser turns those changes into pixels. Render work may be restarted, so it must remain pure.

### Beginner Questions

1. **What is React?** A declarative UI library based on components and one-way data flow.
2. **What is JSX?** Syntax transformed into React element-creation instructions.
3. **Element vs component?** An element describes desired output; a component is code React calls to produce elements.
4. **What are props?** Read-only inputs owned by the caller.
5. **What is state?** React-managed data whose update schedules rendering.
6. **What is a controlled input?** A form control whose value comes from React state.
7. **Why use keys?** To match sibling identity across renders.
8. **How are events passed?** As callback functions such as `onClick={save}`.
9. **What does `createRoot` do?** It creates a React 18 root associated with a host container.
10. **Why must render be pure?** React may invoke or restart render work without committing it.

### Intermediate Questions

1. Explain state as a snapshot and why logs show an old value after a setter.
2. Compare controlled and uncontrolled forms by ownership and rendering cost.
3. Explain why copied or derived state can become inconsistent.
4. Describe how stable keys preserve state during list reordering.
5. Compare SPA and MPA navigation and failure boundaries.
6. Explain why changing a component key resets state.
7. Compare class-instance state with function-component hook state.
8. Explain React's role versus the browser's layout and paint work.
9. Describe the purpose of development Strict Mode.
10. Compare CSS Modules, runtime CSS-in-JS, and utility-generated CSS.

### Advanced Questions

1. How do element type, key, Fiber, and DOM identity relate?
2. Where should state live in a multi-step checkout and why?
3. How can hydration fail when server and client output differ?
4. When does component composition produce a better API than configuration props?
5. How would you measure whether filtering needs memoization?
6. What memory remains while a component is mounted?
7. How can unstable object props defeat memoized children?
8. Which UI states should live in the URL instead of local state?
9. What accessibility responsibilities remain when using reusable components?
10. How would you migrate a CRA application to Vite safely?

### Coding Problems and Assignments

- **Easy:** Build a controlled quantity picker with minimum and maximum limits.
- **Medium:** Build a searchable, sortable order table using stable keys and an explicit empty state.
- **Hard:** Build an optimistic cart editor with rollback after simulated server rejection.
- **Internals assignment:** Profile a 20,000-row search, then add deferred rendering and virtualization.
- **Mini assignment:** Convert a class counter to a function component and compare where state is retained.
- **Mini assignment:** Fix a list that uses index or random keys and demonstrate preserved input state.
- **Mini project:** Build an inventory dashboard with product filters, create/edit forms, conditional status UI, reusable components, and feature-based folders.

### Detailed Interview Answers

**Why does state not change inside the current handler?** The handler closes over one render snapshot. A setter queues later work; a functional updater receives the pending queue value when next state depends on previous state.

**Why should props not be mutated?** The parent owns the value and other consumers may share its reference. Mutation hides the transition from React and breaks one-way reasoning, memoization, and debugging. Report an event to the owner or create a local editable copy for a deliberate draft.

**A reordered list moves typed input to another row. What is wrong?** The rows likely use array indexes as keys. React preserved state by position rather than record identity. Use a stable record ID so state follows the corresponding item.

**Does React update the entire DOM after every render?** No. React may call many components during render, then reconciliation identifies host differences. Commit applies necessary DOM changes. Rendering and DOM mutation are separate costs.

**When should state be lifted?** Lift state to the nearest common owner when multiple descendants need one synchronized source of truth. Do not automatically move transient state to the application root; broader ownership broadens update and coordination costs.

**A render sends duplicate network requests. What is the likely defect?** Network work is occurring during impure render logic. Move it to an event, an effect with cancellation and cleanup, or a dedicated data layer such as RTK Query.

## High-Value Theory Questions

### React and Rendering

**1. Render versus commit?** Render calls components and reconciles a candidate Fiber tree; it must be pure and may restart. Commit applies a finished tree to the DOM, updates refs, and runs layout work. Passive effects follow. A render can occur with no DOM mutation.

**2. What causes a render?** Initial mount, local state update, parent render (unless a valid bailout), consumed context change, or external-store subscription update. Changing a ref does not render.

**3. Why are keys important?** Type plus key identify siblings. Stable keys preserve component/Fiber/DOM state across movement; changed keys remount and reset. Index keys misassociate state when collections change.

**4. Virtual DOM versus Fiber?** "Virtual DOM" describes in-memory UI elements/tree comparison. Fiber is React's concrete work-unit/tree architecture for state, effects, reconciliation, and scheduling.

**5. What is concurrent rendering?** React may interrupt and supersede noncommitted render work according to priority. It is not automatic parallel JavaScript and never permits render side effects.

### Hooks

**6. Why exhaustive dependencies?** An effect closure uses reactive values from a render. Dependencies tell React when that synchronization process is stale. Omitting values produces stale behavior; restructure rather than silence the rule.

**7. Ref versus state?** State is an immutable render snapshot whose updates schedule UI work. A ref is a stable mutable cell invisible to rendering, suitable for DOM handles, timers, and instance-like bookkeeping.

**8. `useMemo` versus `useCallback`?** The first caches a calculation result; the second caches a function reference. Both are conditional performance tools, not semantic guarantees.

**9. Transition versus debounce?** A transition schedules React updates as non-urgent and can be interrupted. Debounce delays starting work until activity pauses. They solve different problems and can be combined.

**10. Why can an effect loop?** It updates state, that state changes an effect dependency (often due to unstable identity), and setup updates again. Remove unnecessary effect/state or stabilize the true dependency.

### Redux Toolkit and RTK Query

**11. Why Redux Toolkit?** It standardizes store setup, reducers/actions, immutable updates via Immer, middleware, serializability checks, async workflows, entities, and RTK Query while preserving Redux's event-driven model.

**12. Thunk versus RTK Query?** Thunks model arbitrary async workflows. RTK Query specializes in fetching/mutating cached server data with subscriptions, deduplication, invalidation, and generated hooks.

**13. Why normalize entities?** One canonical record per ID reduces duplication, enables direct updates, and supports stable selectors/order arrays.

**14. How do tags work?** Queries declare data they provide; mutations invalidate related tags; active affected queries refetch. Overly broad tags create unnecessary traffic.

**15. Describe optimistic update.** Patch the exact cached entry immediately, retain an undo patch, await server fulfillment, and rollback on failure. Handle overlapping mutation race policy deliberately.

### Routing, Axios, Authentication

**16. Is a protected route secure?** No. It prevents unauthorized UI navigation. The API must authenticate and authorize each protected operation.

**17. Axios interceptor risks?** Refresh loops, concurrent refresh storms, leaked interceptors, hidden global mutation, token logging, and retrying unsafe requests. Use one configured client, single-flight refresh, retry guard, and tests.

**18. Cookie versus local storage?** HttpOnly cookies reduce token theft through JavaScript but require CSRF/SameSite design. Local storage is simpler for headers but exposed to successful XSS. Choose from threat model, not convenience.

**19. What belongs in a URL?** Shareable/navigation state such as page, sort, query, tab, and filters. Do not put secrets or large private state in URLs.

**20. GET/PUT/PATCH/DELETE retry?** Retry only transient failures and operations known to be idempotent. GET/PUT/DELETE are defined as idempotent but application behavior still matters; POST needs idempotency keys or explicit guarantees.

## Scenario and Debugging Questions

**A search screen shows old results after fast typing.** Requests resolved out of order. Cancel obsolete requests with `AbortController`, track request identity, or use RTK Query keyed caching. Debounce may reduce requests but does not by itself prevent stale completion.

**A context update renders the whole dashboard.** The provider creates a new broad value and many consumers subscribe to it. Split contexts by update rate/concern, stabilize value where useful, move high-frequency state to a selector store, and profile.

**Typing freezes in a large table.** Keep input state local/urgent, defer or transition expensive results, optimize the algorithm, virtualize rows, and measure production. `useCallback` alone cannot fix excessive DOM.

**After deployment, refreshing `/orders/42` returns 404.** The static host looks for that file. Configure a history fallback rewrite to the SPA entry while allowing real assets/API routes through.

**Users see an endless spinner after API failure.** Loading is modeled as a boolean without terminal failure or cancellation. Use an explicit state machine (`idle/pending/succeeded/failed`), normalize error, offer retry, and log correlation context.

**A list input moves to another item after deletion.** Index keys associate state with positions. Use stable item IDs.

**The app sends two requests in development.** Strict Mode may test effect setup/cleanup. Ensure cleanup cancels the first request and fetching is idempotent/cached; do not disable Strict Mode to hide the defect.

**A memoized child still renders.** Its local state/context changed, or a prop has new identity. Use Profiler, inspect object/function creation, and optimize only if the render is expensive.

**An optimistic update remains after failure.** The mutation did not retain/apply its inverse patch, patched the wrong query args, or overlapping mutations invalidated assumptions. Roll back or invalidate/refetch with an explicit concurrency policy.

**A production secret was placed in `VITE_API_KEY`.** Assume compromise, rotate it, remove privileged use from the browser, move the operation behind a trusted service, and audit logs/history. Prefixes expose variables; they do not secure them.

## Output-Based Questions

```jsx
setCount(count + 1);
setCount(count + 1);
setCount((current) => current + 1);
```

Starting from `0`, the common result is `2`: two replacement updates both request `1`; the functional updater then transforms pending `1` to `2`.

```jsx
const [value, setValue] = useState(0);
function click() {
	setValue(1);
	console.log(value);
}
```

The log is `0` for that render's handler. The setter queues a render; it does not mutate the captured snapshot.

```jsx
{show ? <Counter /> : <Counter />}
```

State is normally preserved because the same component type occupies the same position. Props may differ, but identity remains. Giving branches different keys intentionally resets it.

## Module Exercise Matrix

Every module should finish with this 30-question drill: ten beginner questions defining its public APIs, ten intermediate questions tracing execution and failures, and ten advanced questions defending architecture/performance/security tradeoffs. Add one easy reproduction, one medium integration, one hard production scenario, and one mini project with tests and measurements.

| Module | Easy | Medium | Hard production exercise |
|---|---|---|---|
| Fundamentals | Controlled counter | Keyed filter list | Optimistic accessible cart |
| Internals | Trace one render | Profile commits | Diagnose scheduler/browser bottleneck |
| Lifecycle | Timer cleanup | Subscription replacement | Boundary + cancellation architecture |
| Hooks | Custom debounce | Reducer workflow | External store without tearing |
| Communication | Callback props | Compound tabs | Controlled/uncontrolled component library |
| Router | Dynamic route | Nested guarded routes | Lazy route system with deep-link hosting |
| Forms | Controlled login | Dynamic fields/upload | Accessible async enterprise form |
| Axios | CRUD service | Cancellation/pagination | Single-flight refresh/retry layer |
| Context | Theme provider | Split auth contexts | Render-frequency redesign |
| RTK | Slice/selectors | RTKQ tags | Optimistic normalized CRM |
| Performance | Profiler trace | Route splitting | Budgeted virtual catalog |
| Environment | Validate URL | Mode switching | Runtime config and promotion |
| Webpack | Entry/output | loaders/plugins | cache/analyzer production build |
| Vite | Scaffold | plugin/proxy | CRA migration and parity checks |
| Tree shaking | Named export | analyze barrel | package side-effects audit |
| Authentication | Guard | bootstrap/logout | rotating session threat model |
| Errors | Fallback | normalized errors | monitoring/retry/offline design |
| Architecture | Folder map | feature boundary | enterprise dependency governance |
| Deployment | Local build | SPA rewrite | canary, observability, rollback |

## Final Production Checklist

1. Rendering is pure; effects have symmetric cleanup and complete dependencies.
2. State has one deliberate owner; server data uses a cache rather than copied local state.
3. Routes, forms, loading, errors, empty states, and accessibility are tested.
4. Authentication and authorization follow a documented threat model; APIs enforce permissions.
5. Requests are cancellable, errors normalized, retries bounded, and mutations idempotent where needed.
6. Performance decisions have profiler/bundle evidence and budgets.
7. Configuration is validated and contains no browser secrets.
8. Production assets are hashed, compressed, cached correctly, and deep links resolve.
9. Monitoring links errors to release/source maps without leaking personal or secret data.
10. Deployment uses immutable artifacts, smoke checks, canary/approval policy, and tested rollback.

---

## Closing Summary

Production React is less about memorizing APIs than maintaining correct boundaries: render versus effect, client state versus server state, authentication versus authorization, development server versus production artifact, and optimization hypothesis versus measured evidence. Use the diagrams to trace work, the examples as adaptable patterns, and the exercise matrix to turn reading into implementation.

[Back to Top](#top)