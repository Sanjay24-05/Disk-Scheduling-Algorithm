# Backend Documentation

## Setup
1. Create a virtual environment: `python -m venv venv`
2. Activate it: `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (macOS/Linux)
3. Install dependencies: `pip install -r requirements.txt`
4. Run the server: `uvicorn app.main:app --reload`
 
 ## API Endpoints
 - `POST /api/simulate`: Run a single algorithm.

 Run tests (from the `backend/` folder):

 ```bash
 cd backend
 .venv\Scripts\activate
 pytest
 ```

 Note: CORS middleware is configured to allow `http://localhost:3000` and `http://127.0.0.1:3000` for frontend development.
