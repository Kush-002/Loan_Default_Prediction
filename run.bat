@echo off
TITLE Loan Default Prediction - Unified Runner
echo ======================================================================
echo LOAN DEFAULT PREDICTION - FULL STACK LAUNCHER
echo Starting both Flask Backend (Port 5000) and React Frontend (Port 5173)...
echo ======================================================================

IF EXIST "Backend\venv\Scripts\python.exe" (
    SET PYTHON_EXEC=Backend\venv\Scripts\python.exe
) ELSE (
    SET PYTHON_EXEC=python
)

%PYTHON_EXEC% run.py
pause
