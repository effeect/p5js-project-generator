// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
// Some data that will be sent to the main process
const { ipcRenderer } = require('electron')
const {dialog} = require('electron').remote;

let folderButton = document.getElementById("folderSelect");
let button = document.getElementById("createFolder");

let readOnlyInput = document.getElementById("filePathShow");

let pathName;

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

//Function to allow for folder selection, cross platform
folderButton.addEventListener('click', () => {
    dialog.showOpenDialog({properties:['openDirectory']}).then(result => {
        //Selects the file path, the folder is not created, it just points
        pathName = result;
        readOnlyInput.value = pathName.filePaths[0];
        console.log(pathName);
    });
}
    
)

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
    let data = {path : pathName, solution : fileName, values : values}

    //Sending info to MAIN
    ipcRenderer.send("folderSelection",data)
})

