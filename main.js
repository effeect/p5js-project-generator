const { app, BrowserWindow,ipcMain } = require('electron')
const fs = require('fs')
const path = require('path');

//Global Variables
let filePath;

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

function buildHTML(array){
  filename = "index.html"
  let header = ""
  let body = ""
  for(let i = 0; i < array.length; i++)
  {
    if(array[i].value == true)
    {
      let link = `<script src="${array[i].link}"></script>`
      console.log("Link Value " + link);
      header += link;
    }
    else
    {
      console.log("False")
    }
  }

  return '<!DOCTYPE html>'
  + '<html><head>' + header + '</head><body>' + body + '</body></html>';
}

// https://www.geeksforgeeks.org/node-js-fs-mkdir-method/
ipcMain.on('folderSelection', (event, arg) => {
    //Grabs the file path
    console.log(arg);
    filePath = path.join(arg.path.filePaths[0],arg.solution);

    //Creates Root Folder
    fs.mkdir(filePath,function(err){
      if (err) { 
        return console.error(err); 
    } 
    console.log('Directory created successfully!');
    console.log(buildHTML(arg.values)); 
    })

    // fs.mkdir(path.join(path.join(filePath,"Test"),"lib")),function(err){
    //   if(err){
    //     return console.error(err);
    //   }
    //   console.log("Inner Directory created")
    // }
})

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
