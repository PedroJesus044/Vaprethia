// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

//Global variables
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 650,
    height: 725,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  //win.webContents.openDevTools()

  win.once('ready-to-show', () => {
    win.show()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  //Maximize-Minimize events
  /*win.on('maximize', (event) => {
    console.log("Cambiar botón a maximizar")
  })

  win.on('unmaximize', (event) => {
    console.log("Cambiar botón a minimizar")
  })*/
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle('close-app', () => {
  app.quit();
});

ipcMain.handle('min-app', () => {
  win.minimize();
});

ipcMain.handle('max-app', () => {
  win.maximize();
});

ipcMain.handle('restore-app', () => {
  win.restore();
});