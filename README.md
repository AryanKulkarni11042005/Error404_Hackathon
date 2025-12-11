
# IdeaForge AI - Startup Evaluation & Matching Platform

IdeaForge AI is a comprehensive platform that allows entrepreneurs to battle-test their startup ideas using multi-agent AI competitions, generate professional pitch decks, and match with suitable investors using advanced AI scoring.

The project is divided into two main components:
- **Backend (`error404-backend`)**: A FastAPI server that handles AI model interactions (OpenRouter), rate limiting, and business logic.
- **Frontend (`error404-frontend`)**: A modern React + Vite application with Glassmorphism UI, animations, and interactive dashboards.

---

## 📂 Project Structure

```bash
/project-root
    ├── error404-backend/    # FastAPI Server (Python)
    └── error404-frontend/   # React Client (Vite)
```

---

## 🚀 1. Backend Setup (`error404-backend`)

The backend is built with **FastAPI** and uses **AsyncIO** to manage concurrent AI model requests while adhering to strict rate limits.

### Prerequisites

- Python 3.8+
- API Keys from [OpenRouter](https://openrouter.ai/) (You need 3 distinct keys for load balancing).

### Installation

1. Navigate to the backend directory:

        ```bash
        cd error404-backend
        ```

2. Create a virtual environment (optional but recommended):

        ```bash
        python -m venv venv
        # Windows
        venv\Scripts\activate
        # Mac/Linux
        source venv/bin/activate
        ```

3. Install dependencies:

        ```bash
        pip install fastapi uvicorn httpx python-dotenv
        ```

### Configuration

Create a `.env` file in the `error404-backend` directory and add your OpenRouter API keys. We use three keys to rotate requests and avoid rate limits on the free tier.

```env
# error404-backend/.env
key_1=sk-or-v1-xxxxxxxx...  # Key for Contestant 1 & Deck Gen
key_2=sk-or-v1-yyyyyyyy...  # Key for Contestant 2 & Matching
ref_key=sk-or-v1-zzzzzzzz... # Key for the Referee Judge
```

### Running the Server

Start the backend server on port `5000`:

```bash
uvicorn server:app --reload --port 5000
```

The API will be available at `http://localhost:5000`.

- Health Check: `http://localhost:5000/`
- Documentation: `http://localhost:5000/docs`

---

## 🎨 2. Frontend Setup (`error404-frontend`)

The frontend is a high-performance **React** app built with **Vite**, **Tailwind CSS**, and **Framer Motion**.

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Navigate to the frontend directory:

        ```bash
        cd error404-frontend
        ```

2. Install dependencies:

        ```bash
        npm install
        ```

### Configuration

Create a `.env` file in the `error404-frontend` directory to point to your backend.

```env
# error404-frontend/.env
VITE_BACKEND_URL=http://localhost:5000
```

### Running the Application

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to the URL shown (usually `http://localhost:5173`).

---

## 🌟 Key Features

1. **AI Model Competition**:
     - Select two different LLMs (e.g., Llama 3 vs. Mistral) to generate pitches for your idea.
     - A third "Referee" model judges them on **Innovation**, **Market Fit**, and **Feasibility**.
     - View detailed scorecards and the winning pitch.

2. **Pitch Deck Generator**:
     - Input your startup details.
     - AI generates a structured, slide-by-slide text outline for your presentation.

3. **Investor Matching**:
     - AI acts as an investment banker to find 5 perfect VC matches.
     - Provides "Fit Scores" and detailed reasoning for why they match your specific startup.

4. **Robust Error Handling**:
     - Backend includes smart backoff timers (20s wait) to handle API rate limits automatically.
     - Frontend handles loading states and errors gracefully.

---

## 🛠️ Tech Stack

**Backend:**
- Python, FastAPI
- Uvicorn (Server)
- HTTPX (Async Requests)
- OpenRouter API (LLM Access)

**Frontend:**
- React, Vite
- Tailwind CSS (Styling)
- Framer Motion (Animations)
- Lucide React (Icons)
- React Router DOM (Navigation)

