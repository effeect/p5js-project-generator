const { app, BrowserWindow,ipcMain } = require('electron')
// const {fs} = require('fs') //File System 

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule : true
    }
  })

  win.loadFile('index.html')

  //Opens up the development console by default
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)


// ipcMain.on('folderSelection', (event, arg) => {
//   console.log(arg) // prints "ping"
// })


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
