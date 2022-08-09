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

  function zfill(number, width) {
    var numberOutput = Math.abs(number); /* Valor absoluto del número */
    var length = number.toString().length; /* Largo del número */ 
    var zero = "0"; /* String de cero */  
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }
    }
  }

  const d = new Date();
  let hour = zfill(d.getHours(), 2) + ':' + zfill(d.getMinutes(), 2);
  var timeControl = document.getElementById("hora");
  timeControl.value = hour;

  timeControl = document.getElementById("fecha");
  var date = d.getFullYear()+'-'+zfill((d.getMonth()+1), 2)+'-'+zfill(d.getDate(), 2);
  timeControl.value = date;
})