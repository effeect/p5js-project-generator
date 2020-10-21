//REFACTOR NEEDED HERE

const { app, BrowserWindow,ipcMain } = require('electron')
const fs = require('fs')
const path = require('path');

//Global Variables
let filePath;

function createWindow () {
  const win = new BrowserWindow({
    resizable: false, // Makes the window not resizeable
    width: 600,
    height: 1000,
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

//Builds all the HTML
function buildHTML(array){
  filename = "index.html"
  let header = ""
  let body = ""

  for(let i = 0; i < array.length; i++)
  {
    if(array[i].value == true)
    {
      console.log("Path Value : " + path.join(filePath, array[i].link))

      console.log("Array value " + "./" + array[i].link)
      //Copies the source file to the new array
      fs.copyFile("./" + array[i].link, path.join(filePath,"/" + array[i].link),(err) => {if(err) throw err;})
      
      let link = `<script src="${array[i].link}"></script>`
      console.log("Link Value " + array[i].link);
      header += link;
    }
    else
    {
      console.log("False")
    }
  }

  //Linking the sketch file
  header += `<script src="sketch.js"></script>`

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
    })
    //Library creation
    fs.mkdir(path.join(filePath,'/libs'),function(err){
      if (err){
        return console.error(err);
      }
    })

    let HTMLContent = buildHTML(arg.values); 
    console.log(HTMLContent);

    fs.writeFile(path.join(filePath,"index.html"),HTMLContent,function (err) {
      if (err) throw err;
      console.log('File has been created');
    })
    fs.writeFile(path.join(filePath,"sketch.js"), "//Sketch.js file",function (err) {
      if (err) throw err;
      console.log('File has been created');
    })

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
