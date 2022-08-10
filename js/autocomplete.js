const search = document.getElementById('nombre-paciente');
const matchList = document.getElementById('pacientes');

const searchStates = async searchText =>{
    const res = await fetch('data/states.json');
    const states = await res.json();

    let matches = states.filter(state=>{
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regex) || state.abbr.match(regex);
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
            <option value="${match.name}">
        `).join('');
        matchList.innerHTML = html;
    }
}

search.addEventListener('keypress', function (e) {
    if(e.key !== 'Enter') searchStates(search.value);
});

//search.addEventListener('input', ()=> searchStates(search.value));

search.addEventListener('input', function (e) {
    if(e.inputType===undefined){
        console.log("Ah que loco");
    }
    console.log(document.getElementById("fecha").value)
});