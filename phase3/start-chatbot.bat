@echo off
echo ========================================
echo   AI Todo Chatbot - Quick Start
echo   Using Google Gemini (FREE!)
echo ========================================
echo.

REM Check if Gemini API key is set
findstr /C:"GEMINI_API_KEY=your-gemini-api-key-here" backend\.env >nul
if %errorlevel% equ 0 (
    echo [ERROR] Please add your Google Gemini API key to backend\.env
    echo.
    echo 1. Open backend\.env in a text editor
    echo 2. Replace "your-gemini-api-key-here" with your actual Gemini API key
    echo 3. Get a FREE key from: https://aistudio.google.com/app/apikey
    echo 4. See GET_GEMINI_KEY.md for detailed instructions
    echo.
    pause
    exit /b 1
)

echo [OK] Gemini API key is configured
echo.

echo Installing dependencies...
cd backend
pip install google-generativeai --quiet
cd ..
echo [OK] Dependencies installed
echo.

echo Starting services...
echo.

REM Start main backend
echo [1/3] Starting Main Backend (Tasks API) on port 8000...
start "Main Backend" cmd /k "cd backend\src && python -m uvicorn main:app --reload --port 8000"
timeout /t 3 >nul

REM Start chatbot backend
echo [2/3] Starting Chatbot Backend (AI Chat) on port 8001...
start "Chatbot Backend" cmd /k "cd backend && python -m app.main"
timeout /t 3 >nul

REM Start frontend
echo [3/3] Starting Frontend on port 3000...
start "Frontend" cmd /k "cd frontend && npm run dev"
timeout /t 3 >nul

echo.
echo ========================================
echo   All services started!
echo ========================================
echo.
echo Main Backend:    http://localhost:8000
echo Chatbot Backend: http://localhost:8001 (Google Gemini)
echo Frontend:        http://localhost:3000
echo.
echo Next steps:
echo 1. Wait for all services to start (check the terminal windows)
echo 2. Open http://localhost:3000 in your browser
echo 3. Login to your account
echo 4. Click "AI Chat" in the navigation
echo 5. Try: "Add a task to buy groceries"
echo.
echo Press any key to open the app in your browser...
pause >nul

start http://localhost:3000

echo.
echo To stop all services, close the terminal windows.
echo.
pause
