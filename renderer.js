// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

let RendererPathname;

document.getElementById('dirs').addEventListener('click', () => {
    window.postMessage({
      type: 'select-dirs'
    })
    
  })


btnCreate = document.getElementById('btnCreate')
btnCreate.addEventListener('click',function(){
    //Grabs filename from main

    console.log("Directory Recieved" + RendererPathname)
})