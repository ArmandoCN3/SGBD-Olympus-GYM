@echo off

REM Ejecutar app.js en segundo plano
start /B node app.js

REM Esperar un momento para asegurarse de que app.js se inicie completamente
timeout /nobreak /t 2 >nul

REM Abrir index.html en Opera GX
start "" "./web/index.html"