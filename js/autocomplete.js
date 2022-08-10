const dao = require('./js/dao')

const search = document.getElementById('nombre');
const matchList = document.getElementById('pacientes');

var id_paciente = []
var nombre_paciente = []

function getPacientes(){
    //Función que llena el nombre de los pacientes y su ID en dos arrays globales
    conn = new dao('./sqlite/vaprethia.db')
    db = conn.db

    db.each("select id, nombre from pacientes", (err, row) => {
        id_paciente.push(row.id)
        nombre_paciente.push(row.nombre)
    });
}

const searchStates = async searchText =>{

    let matches = nombre_paciente.filter(nombre=>{
        const regex = new RegExp(`^${searchText}`, 'gi');
        return nombre.match(regex)
    });

    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }
    
    outputHtml(matches);
}

const outputHtml = matches =>{
    if (matches.length > 0) {
        const html = matches.map(
            match => `
            <option value="${match}">
        `).join('');
        matchList.innerHTML = html;
    }
}

search.addEventListener('keypress', function (e) {
    if(e.key !== 'Enter') searchStates(search.value);
});

search.addEventListener('input', ()=> searchStates(search.value));

getPacientes()