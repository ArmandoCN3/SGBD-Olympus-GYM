const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  // Crea la ventana principal
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 1000,
    webPreferences: {
      nodeIntegration: true, // Habilita Node.js en la vista de la ventana
    },
  });

  // Carga tu archivo HTML principal (index.html)
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './web/index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // Abre las herramientas de desarrollo (comenta esta línea en producción)
  mainWindow.webContents.openDevTools();

  // Maneja el evento cuando la ventana se cierra
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// Llama a createWindow cuando la aplicación esté lista
app.whenReady().then(createWindow);

// Sal cuando todas las ventanas estén cerradas (excepto en macOS)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// Crea una nueva ventana cuando la aplicación se active (en macOS)
app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
