// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
let pathnamestuff;

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

//Part of directory picker
const { ipcRenderer , remote} = require('electron')

process.once('loaded', () => {
  window.addEventListener('message', evt => {
    if (evt.data.type === 'select-dirs') {
      ipcRenderer.send('select-dirs')
    }
  })
})


//Event for the Pathname to be passed through 
ipcRenderer.on('pathName', function (event,pathName) {
  console.log(pathName);
  pathnamestuff = pathName
  RendererPathname = pathName;
});


