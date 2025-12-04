@echo off
echo Installing dependencies...
call npm install
echo.
echo Starting development server...
echo.
echo FrenBase will be available at http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
call npm run dev

