const { ipcRenderer } = require('electron');
const fs = require('fs');
const {dialog} = require('electron').remote;

//Global Variables
let folderButton = document.getElementById("folderSelect");
let button = document.getElementById("createFolder");
let readOnlyInput = document.getElementById("filePathShow");

//PathName
let pathName;
let values = [];

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

function createOptions(string){
    let temp = "";
    //Formatting HTML Loop
    string.forEach((i) =>{
        temp += `<td>` + 
        `<label class="checkbox">` + 
        `<input type="checkbox" id="${i}" name="${i}" value="${i}"> ` + 
        `${i}` + 
        `</label></td>`

    })
    document.getElementById("tableBody").innerHTML = temp;

    //Loop for data gathering



}

fs.readdir('./libs', (err, files) => {
    console.log(files);
    createOptions(files);
  });

button.addEventListener('click', ()=>{
    //Grabbing Values of
    fs.readdir('./libs', (err, files) => {
        
        files.forEach((i) =>{
            let checkboxValue = document.getElementById(i).checked;
            values.push(createP5jsLib(i,checkboxValue,`libs/${i}`))
        })

        var fileName = document.getElementById("solutionName").value;
        let data = {path : pathName, solution : fileName, values : values}
        console.log("Values : " + values.length);
        //Sending info to MAIN
        ipcRenderer.send("folderSelection",data)
      });

    
    // //Grab values of documents
    // var p5js = document.getElementById("p5js").checked;
    // var p5jsSound = document.getElementById("p5jsSound").checked;

    // //Formatting into objects, need to be reworked to allow for 
    // values.push(createP5jsLib("p5js",p5js,p5jsLink));
    // values.push(createP5jsLib("p5jsSound",p5jsSound,p5jsSoundLink));
    

})

