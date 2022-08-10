// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {

  const { ipcRenderer } = require('electron');
  document.getElementById('close-button').addEventListener('click', () => {
  ipcRenderer.invoke('close-app');
  });
  document.getElementById('max-button').addEventListener('click', () => {
    ipcRenderer.invoke('max-app');
    document.body.classList.add('maximized');
  });
  document.getElementById('min-button').addEventListener('click', () => {
    ipcRenderer.invoke('min-app');
  });
  document.getElementById('restore-button').addEventListener('click', () => {
    ipcRenderer.invoke('restore-app');
    document.body.classList.remove('maximized');
  });


})