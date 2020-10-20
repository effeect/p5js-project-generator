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

let button = document.getElementById("createFolder");

//List of CDNS
const p5jsLink = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.js"
const p5jsSoundLink = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/addons/p5.sound.js"

function createP5jsLib(name,value,link){
    let object = {
        name : name,
        value : value,
        link : link
    };
    return object
}

button.addEventListener('click', ()=>{
    //Grabbing Values of
    let values = [];
    
    var fileName = document.getElementById("solutionName").value;
    
    //Grab values of documents
    var p5js = document.getElementById("p5js").checked;
    var p5jsSound = document.getElementById("p5jsSound").checked;

    //Formatting into objects, need to be reworked to allow for 
    values.push(createP5jsLib("p5js",p5js,p5jsLink));
    values.push(createP5jsLib("p5jsSound",p5jsSound,p5jsSoundLink));
    console.log(values);


    dialog.showOpenDialog({properties:['openDirectory']}).then(result => {
        let data = {path : result, solution : fileName, values : values}
        ipcRenderer.send("folderSelection",data)
    })
})
