# PowerShell Single-Command Runner
Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "LOAN DEFAULT PREDICTION - FULL STACK LAUNCHER" -ForegroundColor Green
Write-Host "Starting Flask Backend (Port 5000) and React Frontend (Port 5173)..." -ForegroundColor Yellow
Write-Host "======================================================================" -ForegroundColor Cyan

$pythonExe = if (Test-Path "Backend\venv\Scripts\python.exe") { "Backend\venv\Scripts\python.exe" } else { "python" }
& $pythonExe run.py
