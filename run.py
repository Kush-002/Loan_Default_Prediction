"""
Unified Full-Stack Application Launcher
Project: Loan Default Prediction Using Machine Learning

Starts BOTH the Flask Backend and React Frontend concurrently with a single command:
    python run.py

Features:
  - Detects Python virtual environment or system Python automatically
  - Starts Flask API on http://127.0.0.1:5000
  - Starts React/Vite development server on http://localhost:5173
  - Automatically opens your default web browser to the dashboard
  - Gracefully stops both servers when you press Ctrl+C
"""

import os
import sys
import time
import subprocess
import webbrowser
import threading
import signal

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(ROOT_DIR, "Backend")
FRONTEND_DIR = os.path.join(ROOT_DIR, "frontend")


def get_python_executable():
    """Detects venv Python or falls back to current Python."""
    venv_win = os.path.join(BACKEND_DIR, "venv", "Scripts", "python.exe")
    venv_unix = os.path.join(BACKEND_DIR, "venv", "bin", "python")
    if os.path.exists(venv_win):
        return venv_win
    if os.path.exists(venv_unix):
        return venv_unix
    return sys.executable


def stream_logs(pipe, prefix, color_code):
    """Streams stdout/stderr from child process with color prefix."""
    reset = "\033[0m"
    try:
        for line in iter(pipe.readline, ''):
            if not line:
                break
            clean_line = line.rstrip()
            if clean_line:
                print(f"{color_code}[{prefix}]{reset} {clean_line}")
    except (ValueError, IOError):
        pass


def main():
    print("=" * 70)
    print("LOAN DEFAULT PREDICTION - UNIFIED APPLICATION LAUNCHER")
    print("=" * 70)

    python_exe = get_python_executable()
    print(f"[+] Python Runtime: {python_exe}")
    print(f"[+] Project Root:   {ROOT_DIR}")

    # Check node modules
    if not os.path.exists(os.path.join(FRONTEND_DIR, "node_modules")):
        print("\n[!] Installing frontend dependencies (first-time setup)...")
        subprocess.run(["npm", "install"], cwd=FRONTEND_DIR, shell=True, check=True)

    print("\n[1/2] Starting Flask Backend API on port 5000...")
    backend_env = os.environ.copy()
    backend_env["PYTHONUNBUFFERED"] = "1"
    backend_env["PORT"] = "5000"

    # Launch Backend process
    backend_proc = subprocess.Popen(
        [python_exe, "app.py"],
        cwd=BACKEND_DIR,
        env=backend_env,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1
    )

    # Launch log streamer for backend (cyan)
    threading.Thread(
        target=stream_logs,
        args=(backend_proc.stdout, "BACKEND", "\033[96m"),
        daemon=True
    ).start()

    print("[2/2] Starting React Vite Frontend on port 5173...")
    npm_cmd = "npm.cmd" if sys.platform == "win32" else "npm"
    frontend_proc = subprocess.Popen(
        [npm_cmd, "run", "dev"],
        cwd=FRONTEND_DIR,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1
    )

    # Launch log streamer for frontend (green)
    threading.Thread(
        target=stream_logs,
        args=(frontend_proc.stdout, "FRONTEND", "\033[92m"),
        daemon=True
    ).start()

    time.sleep(2)
    frontend_url = "http://localhost:5173"
    print("\n" + "=" * 70)
    print(">> FULL APPLICATION RUNNING SUCCESSFULLY!")
    print(f">> Web Dashboard:  {frontend_url}")
    print(f">> REST API Docs:  http://127.0.0.1:5000")
    print(">> Press Ctrl+C at any time to shut down both servers.")
    print("=" * 70 + "\n")

    # Automatically open browser
    try:
        webbrowser.open(frontend_url)
    except Exception:
        pass

    def shutdown(sig, frame):
        print("\n[!] Shutting down Flask Backend and React Frontend...")
        try:
            backend_proc.terminate()
            frontend_proc.terminate()
            backend_proc.wait(timeout=3)
            frontend_proc.wait(timeout=3)
        except Exception:
            backend_proc.kill()
            frontend_proc.kill()
        print("[v] Both servers stopped cleanly.")
        sys.exit(0)

    signal.signal(signal.SIGINT, shutdown)
    if hasattr(signal, "SIGTERM"):
        signal.signal(signal.SIGTERM, shutdown)

    # Keep main thread alive
    try:
        while True:
            if backend_proc.poll() is not None:
                print("[!] Backend process exited unexpectedly.")
                break
            if frontend_proc.poll() is not None:
                print("[!] Frontend process exited unexpectedly.")
                break
            time.sleep(1)
    except KeyboardInterrupt:
        shutdown(None, None)


if __name__ == "__main__":
    main()
