# Dynamic Onboarding Wizard (Next.js + Strapi)

A dynamic flow application built with **Next.js 14 (App Router)** and **Strapi v4/5**.
The application allows non-technical editors to define flows, steps, and branching logic (Yes/No questions) via Strapi, which are then rendered dynamically on the frontend.

## 🚀 Features

* **Dynamic Routing:** Flows and steps are fetched purely from the CMS.
* **Branching Logic:** Supports linear flows and branching decisions (Yes/No questions).
* **Answer Tracking (Bonus):** Tracks user choices in-memory during the session and displays a summary at the end.
* **Optimized Performance:** Uses Server Components for initial data fetching and Client Components for interactivity.
* **Type Safety:** Fully typed with TypeScript using shared interfaces.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js 14, TypeScript, Tailwind CSS.
* **Backend:** Strapi (Headless CMS).
* **Communication:** REST API with `qs` for complex query stringifying.

---

## ⚙️ Setup Instructions

### 1. Backend (Strapi)

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Start the server:**
    * **Note:** The SQLite database is committed to the repository for your convenience. **No manual data import is required.**
    ```bash
    npm run strapi dev
    ```
    * The admin panel is available at `http://localhost:1337/admin`.
    * The API is available at `http://localhost:1337/api`.


### 2. Frontend (Next.js)

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open `http://localhost:3000` in your browser.

---

## 🧠 Architectural Decisions & Trade-offs

### Backend Modeling (Strapi)
* **Recursive Structure:** Modeled steps as a Linked List (`nextStep`, `nextStepNo`) rather than a flat array. This allows for complex branching logic where a single step can lead to different outcomes based on user input.
* **Separation of Concerns:** Steps are filtered by their parent `Flow` relation to keep the content organized.

### Frontend Architecture
* **Service Layer Pattern:** Implemented a dedicated `src/services/strapi.ts` to handle all API communications. This abstracts the fetch logic and query construction (using `qs`) from the UI components.
* **Server vs. Client Components:**
    * `page.tsx`: Acts as a **Server Component** to fetch the initial flow data securely and improve SEO.
    * `FlowManager.tsx`: Acts as a **Client Component** to handle the wizard state and user interactions.
* **In-Memory State (Bonus):** Used React's `useState` to track user answers as per the assignment requirements ("in memory"). For a production app requiring persistence across reloads, I would opt for `localStorage` or backend synchronization.

### Devops / Version Control
* **Database Inclusion:** I intentionally removed `.tmp/data.db` from `.gitignore` and committed the SQLite database directly to the repository. While this is not best practice for production environments, I chose this approach for this assignment to ensure a seamless "clone & run" experience for the reviewer without needing to run manual import scripts.