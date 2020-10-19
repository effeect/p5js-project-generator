// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
// Some data that will be sent to the main process
const { ipcRenderer } = require('electron')
const {dialog} = require('electron').remote;

console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

// ipcRenderer.on('asynchronous-reply', (event, arg) => {
//   console.log(arg) // prints "pong"
// })
// ipcRenderer.send('asynchronous-message', 'ping')

let button = document.getElementById("createFolder")

button.addEventListener('click', ()=>{
    let pathTest = dialog.showOpenDialog({properties:['openDirectory']})
    let pathName = document.getElementById("myFolder").files[0].path
    console.log(pathName)
    console.log(pathTest)

    // ipcRenderer.send('folderSelection', pathTest)
})
