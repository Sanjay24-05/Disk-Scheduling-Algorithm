# Backend Documentation

## Setup
1. Create a virtual environment: `python -m venv venv`
2. Activate it: `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (macOS/Linux)
3. Install dependencies: `pip install -r requirements.txt`
4. Run the server: `uvicorn app.main:app --reload`

## API Endpoints
- `POST /api/simulate`: Run a single algorithm.
- `POST /api/compare`: Compare multiple algorithms.
