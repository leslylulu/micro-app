# Microfrontend Demo — Module Federation + Style Isolation

A hands-on demo project built to understand and demonstrate core microfrontend concepts using **Module Federation** and **Modern.js**.

---

## What This Project Demonstrates

### 1. Module Federation (Runtime Sharing)
The Provider exposes a Button component at runtime. The Consumer dynamically loads it without bundling it in — meaning if the Provider updates, every Consumer gets the latest version immediately, no reinstall needed.

### 2. Style Isolation (CSS Modules)
The Consumer has a global `.button` style that turns buttons red. The Provider's Button component uses CSS Modules, which compiles class names into unique hashes like `.Button_button__xxxx` at build time. The global style can never accidentally match the hashed class name — so the Provider's button stays purple while the Consumer's plain button turns red.

---

## Project Structure

```
/
├── my-provider/        # Provider (port 3000)
│   └── src/
│       └── components/
│           └── IsolatedButton/
│               ├── Button.tsx          # Exposes this component
│               └── Button.module.css   # CSS Modules — style isolation
│
└── my-consumer/       # Consumer (port 8080)
    └── src/
        └── routes/
            └── page.tsx    # Dynamically imports Button from Provider
```

---

## Key Concepts

### Provider vs Consumer

| | Provider | Consumer |
|---|---|---|
| Role | Exposes components | Loads components at runtime |
| Config | `exposes: { './Button': '...' }` | `remotes: { provider: '...@localhost:3000/mf-manifest.json' }` |
| Port | 3000 | 8080 |

### Why CSS Modules?

```
Without CSS Modules:
.button { background: red }   ← Consumer global style
.button { background: purple } ← Provider style
→ Last one wins, unpredictable ❌

With CSS Modules:
.button              → .Button_button__xxxx (Provider, purple) ✅
.button { color:red} → only matches plain .button (Consumer) ✅
→ Never conflict ✅
```

---

## How to Run

> Both apps must run simultaneously. Start Provider first.

**Terminal 1 — Provider:**
```bash
cd my-provider
pnpm install
pnpm dev
# Running at http://localhost:3000
```

**Terminal 2 — Consumer:**
```bash
cd my-consumer
pnpm install
pnpm dev
# Running at http://localhost:8080
```

Open **http://localhost:8080** to see the demo.

---

## What You Should See

```
http://localhost:8080

[ I am a button from Consumer ]   ← Red, no border-radius (polluted by global style)

[ I am from Provider ]            ← Purple, rounded (CSS Modules protected)
From Provider                     ← Pink small text (from Provider's styles)
```

---

## What I Learned

**Module Federation vs npm packages:**
npm packages are frozen at install time. Module Federation loads components at runtime — the Consumer always gets the latest Provider version on page load without any reinstall.

**Style isolation the hard way:**
I wrote a global `.button` style in the Consumer and watched it break the Provider's button. That bug made me truly understand why CSS Modules matters — it's not just good practice, it's necessary in a multi-team microfrontend environment where you can't control what styles other teams write.

**Why Provider must start first:**
The Consumer fetches `mf-manifest.json` from the Provider at runtime. If Provider isn't running, Consumer throws `RUNTIME-003: Failed to get manifest` — which is exactly what happened during development.




## Tech Stack

- [Modern.js](https://modernjs.dev/) — Full-stack React framework by ByteDance
- [Module Federation](https://module-federation.io/) — Webpack 5 runtime code sharing
- CSS Modules — Scoped styles with build-time hashing
- TypeScript
- pnpm