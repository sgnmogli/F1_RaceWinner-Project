# Environment Setup & Version Details

This document tracks the technical requirements and current versions for the F1 Race Winner Prediction project.

## 🏁 Operating System
- **OS**: Windows

## 🐍 Python Environment
- **Python Version**: 3.10.11
- **Virtual Environment**: `venv` (located in project root)

### Key Python Packages
| Package | Version | Purpose |
| :--- | :--- | :--- |
| `fastf1` | 3.5.0 | Data collection from F1 sessions |
| `scikit-learn` | 1.6.1 | Machine Learning model (GradientBoostingRegressor) |
| `fastapi` | 0.115.11 | Professional backend API |
| `uvicorn` | 0.34.0 | ASGI server for FastAPI |
| `streamlit` | 1.43.0 | Initial GUI Dashboard prototype |
| `pandas` | (Managed) | Data manipulation and engineering |
| `joblib` | (Managed) | Model persistence (`.pkl` files) |

## 🌐 Web Development (Frontend & Database)
- **Node.js**: v24.14.1 (Ready for Next.js 14/15)
- **Frontend Framework**: Next.js (App Router)
- **Styling & UI**: Tailwind CSS, Shadcn UI, Framer Motion
- **Data Visualization**: Recharts / Apache ECharts
- **Database**: Supabase (PostgreSQL - Free Cloud Tier)
- **State Management & Caching**: TanStack Query (React Query)

## 📂 Project Structure
```text
F1_RaceWinner Project/
├── app.py               # Streamlit prototype entry
├── src/
│   ├── api/             # FastAPI backend logic
│   ├── predictor.py     # ML inference pipeline
│   ├── train_model.py   # Training script
│   └── ...              # Preprocessing & engineering
├── models/              # Saved model (.pkl)
├── data/                # CSV datasets & cache
└── learnings.md         # Documentation & architecture notes
```

## 🛠️ Global Tools
- **NPM/NPX**: Latest version (bundled with Node.js)
- **Git**: (Optional, for version control)
