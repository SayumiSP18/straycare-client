# 🐾 StrayCare – Frontend

**StrayCare: Community Animal Rescue, Care and Adoption System**


React + TypeScript web client for StrayCare, where citizens report stray cats and dogs, rescuers care for them, and adopters give them a home. 

## 🔗 Links

| | URL |
|---|---|
| Frontend (Vercel) | https://straycare-client.vercel.app |
| Backend API (Railway) | https://straycare-server-production.up.railway.app |
| Frontend repo | https://github.com/SayumiSP18/straycare-client |
| Backend repo | https://github.com/SayumiSP18/straycare-server |

## 🛠 Tech Stack

- **Framework:** React (functional components + Hooks) with Vite
- **Language:** TypeScript
- **State management:** Redux Toolkit
- **Styling:** TailwindCSS (responsive, mobile-first)
- **Routing:** React Router
- **HTTP client:** Axios
- **Deployment:** Vercel

## ✨ Main Features

- Bilingual interface: **English and Sinhala**
- Home page with live dashboard: animals saved, found a home, in care, fundraiser
- Browse **strays waiting for a home** with full details
- Report a stray cat or dog
- Secure login and registration with JWT, protected routes and role-based dashboards (**Admin / Rescuer / Citizen**)
- Adoption requests and status tracking
- Post-adoption welfare check-ins
- Donations and fundraiser page
- PDF adoption certificate download
- "What to do when you see a stray" and "How can you help" guides
- Fully responsive design for mobile, tablet and desktop

## 📁 Project Structure

```
straycare-client/
├── public/
│   └── fonts/              # custom fonts
├── src/
│   ├── components/
│   │   ├── common/         # reusable UI (buttons, cards, modals)
│   │   ├── forms/          # form components
│   │   └── layout/         # Navbar, Footer, layouts
│   ├── hooks/              # custom React hooks
│   ├── pages/              # route pages
│   ├── router/             # route config and protected routes
│   ├── service/            # API calls (Axios)
│   ├── store/              # Redux store and slices
│   ├── types/              # TypeScript interfaces
│   ├── App.tsx
│   └── main.tsx
├── vercel.json             # SPA rewrite rules
├── package.json
└── tsconfig.json
```

## ⚙️ Setup and Run Locally

### Prerequisites
- Node.js 18+
- The StrayCare backend running locally or the deployed API URL

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/SayumiSP18/straycare-client.git
cd straycare-client

# 2. Install dependencies
npm install

# 3. Create your .env file (see below)

# 4. Start the dev server
npm run dev

# 5. Build for production
npm run build
```

The app runs on `http://localhost:5173`.

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000/api
```

For production (Vercel), set:

```env
VITE_API_URL=https://straycare-server-production.up.railway.app/api
```

## 👥 User Roles

| Role | What they can do |
|---|---|
| **Citizen / Adopter** | Report strays, browse animals, request adoption, submit welfare check-ins, donate |
| **Rescuer** | Manage reports and animals in care (account needs admin approval) |
| **Admin** | Approve rescuers, manage users, reports, animals and adoptions |

## 🚀 Deployment

- **Frontend:** Vercel (auto-deploys on push to `main`)
- Framework preset: Vite, build command `npm run build`, output directory `dist`
- `vercel.json` rewrites all routes to `index.html` so page refreshes work

## 📸 Screenshots

> Add screenshots here for each main page.

| Home | Strays waiting for a home |
|---|---|
| ![Home](./screenshots/home.png) | ![Animals](./screenshots/animals.png) |

| Login | Dashboard |
|---|---|
| ![Login](./screenshots/login.png) | ![Dashboard](./screenshots/dashboard.png) |

## 👩‍💻 Author

**Sayumi Perera**

Rapid Application Development



****











# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
