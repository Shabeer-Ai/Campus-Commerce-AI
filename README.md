# Campus Commerce AI 🎓💼

Welcome to **Campus Commerce AI**, a futuristic, highly polished collegiate peer-to-peer marketplace designed specifically for verified university students to buy, sell, rent, exchange, and donate goods safely on-campus!

---

## ⚡ Key Features

1. **AI-Guided Semantic Search**: Find any item by describing what you need in natural language (e.g. *"I need a study desk that fits a dorm corner under $50"*).
2. **Gemini Price & Safety Optimizer**: Get real-time price bracket suggestion and safety index audits using Gemini before listing.
3. **Double Verification**: Restricts access to students with verified educational `.edu` email domains.
4. **Collegiate Live Chats**: Interactive instant peer messaging to negotiate or finalize meeting spots securely on campus.
5. **Durable Local State**: Supports bookmarking, adding custom listings, and exchanging instant messages with real-time browser caching.

---

## 🚀 Deployment & Portability ("Not Working Through GitHub" Fixed!)

This application has been meticulously engineered with a **Dual-Mode Architecture**. It detects its host environment dynamically to provide a seamless user experience whether it is running as a **Full-Stack Application on Cloud Run**, **locally on your computer**, or **deployed as a static site on GitHub Pages / Vercel**:

### 1. Dynamic Routing (`HashRouter` vs `BrowserRouter`)
When hosted on `*.github.io` or `*.github.com`, the app automatically switches to **`HashRouter`**. This completely prevents standard static routing `404 Not Found` errors when you refresh pages or share links on GitHub Pages! It will use standard `BrowserRouter` on your local computer or on custom domains.

### 2. Relative Base Assets Path (`base: "./"`)
The Vite output has been configured with `base: "./"`. This means all generated compiled asset links (JS, CSS, images) are directory-relative, allowing the production bundle in the `dist` directory to be hosted from any subdirectory, deep folder, or static subpath without failing.

### 3. Automatic Client-Side Fallback Database
If the Express backend API is unreachable or if the app is hosted on a static-only provider (such as GitHub Pages or Netlify), a **client-side API interceptor** automatically takes over. It simulates the exact same endpoints (product searches, listings, profiles, message threads, and item wishlists) directly in the browser's memory and local storage. Even our AI pricing suggestions and semantic search will gracefully fall back to fully functional browser-based mock engines!

---

## 💻 Local Development Setup

To run this application locally on your computer with both the backend Express API (including Gemini) and the Vite React frontend:

1. **Clone the repository**:
   ```bash
   git clone <your-repository-url>
   cd campus-commerce-ai
   ```

2. **Install all dependencies**:
   ```bash
   npm install
   ```

3. **Set up your environment variables**:
   Create a `.env` file in the root directory and add your Google Gemini API Key:
   ```env
   GEMINI_API_KEY="your_actual_gemini_api_key_here"
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   *This starts the Express server which mounts Vite as middleware, running everything concurrently on [http://localhost:3000](http://localhost:3000).*

5. **Build for production**:
   ```bash
   npm run build
   ```
   *This compiles the Vite frontend into `/dist` and bundles the Express server into `dist/server.cjs` using `esbuild`.*

6. **Start the production server**:
   ```bash
   npm run start
   ```

---

## 🌐 Deploying to GitHub Pages

To host this application for free on GitHub Pages:

1. **Build the static files**:
   ```bash
   npm run build
   ```
2. **Publish the `/dist` folder** to the `gh-pages` branch of your GitHub repository.
3. Your app is live at `https://<username>.github.io/<repository-name>/` with **perfect page refresh routing and fully interactive mock storage and live chat flows**!
