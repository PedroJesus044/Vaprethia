const dao = require('./js/dao')

const search = document.getElementById('nombre');
const matchList = document.getElementById('pacientes');

var paciente = []
var nombre_paciente = []

function getPacientes(){
    //Función que llena el nombre de los pacientes y su ID en dos arrays globales
    conn = new dao('./sqlite/vaprethia.db')
    db = conn.db

    db.each("select id, nombre from pacientes", (err, row) => {
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
            match => 
            `
            <option value="${match}" label = "${match}">
        `).join('');
        matchList.innerHTML = html;
    }
}

search.addEventListener('keypress', function (e) {
    if(e.key !== 'Enter') searchStates(search.value)
});

function clearList(){
    matches = [];
    matchList.innerHTML = '';
}

const getPaciente = (name) => {
	return new Promise((resolve, reject) => {
		db.serialize(() => {
			db.get('SELECT * FROM pacientes WHERE nombre = ?', name, (err, rows) => {
				if (err) reject(err);
				resolve(rows);
			});
		});
	});
};

function llenaCampos(name){
    textos = ['id','diag_preoper','oper_proy','otras','originario','residente','religion','frecuencia_tab','frecuencia_alc','aseo_dental','toxicom_desc','anestesico_quir','complic_desc','transfunc_desc','alergicos','asmaticos','diabetes','tratamiento_diab','hipertension','tratamiento_hiper','cardiopatias','hepaticos','neurologicos','traumaticos','nefropatias','endocrinopatias','obesidad','neoplasicos','evc_desc','obs_per_pat','ta','fc','fr','temperatura','craneo','pupilas','conjuntivas','narinas','mucosa_oral','cuello','traquea','cardiopulmonar','abdomen','extremidades','resto_ef','hb','hto','leucocitos','plaquetas','glucosa','urea','creatinina','tp','ttpa','inr','otros','ecg','rx_torax','cv','cvf','vmv','vef1','fef25_75','ph','pco2','po2','hco3','eb','sato2','goldman','asa','plan_anest_suger','obs_lab_gab','obs_recom_oper']
    selects = ['dm','has','cardiopatas','ca','tb','evc','grupo','rh','tabaquismo','alcoholismo','habitos_diet','toxicomanias','complicaciones','transfuncionales','protesis_dentales','tipo_pro_dent','mallampati','patil_aldretti','apertura_oral','espirometria','gasometria','riesgo_tromboemb','raq_ue','raq_16','raq_ab','se_recom_operar','sexo','pro_int_dif']
    varchars = ['clave','nombre','nombre_medico','edad','talla','peso','cama','no_expediente']
    fechas = ['fecha','fecha_realiza','fecha_val_cardvsc']

    let datos = getPaciente(name)
	.then((results) => {
		textos.forEach(element => {
            document.getElementById(element).value = results[element]
        });

        selects.forEach(element => {
            document.getElementById(element).value = results[element]
        });

        varchars.forEach(element => {
            document.getElementById(element).value = results[element]
        });

        fechas.forEach(element => {
            document.getElementById(element).value = results[element]
        });
	});
}

function despliegaPaciente(){
    clearList();
    llenaCampos(search.value)

}

search.addEventListener('input', ()=> searchStates(search.value));

search.addEventListener('change', (event) => despliegaPaciente());
matchList.addEventListener('onclick', ()=> despliegaPaciente());

getPacientes()