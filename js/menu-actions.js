//const dao = require('./js/dao')

function insertaQuery(query){
    conn = new dao('./sqlite/vaprethia.db')
    db = conn.db

    db.run(query)
}

function genquery(){
    var query = "insert into pacientes(";
    variables = ['diag_preoper','oper_proy','otras','originario','residente','religion','frecuencia_tab','frecuencia_alc','aseo_dental','toxicom_desc','anestesico_quir','complic_desc','transfunc_desc','alergicos','asmaticos','diabetes','tratamiento_diab','hipertension','tratamiento_hiper','cardiopatias','hepaticos','neurologicos','traumaticos','nefropatias','endocrinopatias','obesidad','neoplasicos','evc_desc','obs_per_pat','ta','fc','fr','temperatura','craneo','pupilas','conjuntivas','narinas','mucosa_oral','cuello','traquea','cardiopulmonar','abdomen','extremidades','resto_ef','hb','hto','leucocitos','plaquetas','glucosa','urea','creatinina','tp','ttpa','inr','otros','ecg','rx_torax','cv','cvf','vmv','vef1','fef25_75','ph','pco2','po2','hco3','eb','sato2','goldman','asa','plan_anest_suger','obs_lab_gab','obs_recom_oper',
    'dm','has','cardiopatas','ca','tb','evc','grupo','rh','tabaquismo','alcoholismo','habitos_diet','toxicomanias','complicaciones','transfuncionales','protesis_dentales','tipo_pro_dent','mallampati','patil_aldretti','apertura_oral','espirometria','gasometria','riesgo_tromboemb','raq_ue','raq_16','raq_ab','se_recom_operar','sexo','pro_int_dif',
    'clave','nombre','nombre_medico','edad','talla','peso','cama','no_expediente',
    'fecha','fecha_realiza','fecha_val_cardvsc']

    variables.forEach(element => {
        query = query + element + ','
    });

    query = query.slice(0, -1)
    query = query + ') values ('

    variables.forEach(element => {
        valor = "'" + document.getElementById(element).value + "'"
        query = query +  valor + ","
    });

    query = query.slice(0, -1)
    query = query + ')'

    return query;
}

function genqueryUp(){
    variables = ['diag_preoper','oper_proy','otras','originario','residente','religion','frecuencia_tab','frecuencia_alc','aseo_dental','toxicom_desc','anestesico_quir','complic_desc','transfunc_desc','alergicos','asmaticos','diabetes','tratamiento_diab','hipertension','tratamiento_hiper','cardiopatias','hepaticos','neurologicos','traumaticos','nefropatias','endocrinopatias','obesidad','neoplasicos','evc_desc','obs_per_pat','ta','fc','fr','temperatura','craneo','pupilas','conjuntivas','narinas','mucosa_oral','cuello','traquea','cardiopulmonar','abdomen','extremidades','resto_ef','hb','hto','leucocitos','plaquetas','glucosa','urea','creatinina','tp','ttpa','inr','otros','ecg','rx_torax','cv','cvf','vmv','vef1','fef25_75','ph','pco2','po2','hco3','eb','sato2','goldman','asa','plan_anest_suger','obs_lab_gab','obs_recom_oper',
    'dm','has','cardiopatas','ca','tb','evc','grupo','rh','tabaquismo','alcoholismo','habitos_diet','toxicomanias','complicaciones','transfuncionales','protesis_dentales','tipo_pro_dent','mallampati','patil_aldretti','apertura_oral','espirometria','gasometria','riesgo_tromboemb','raq_ue','raq_16','raq_ab','se_recom_operar','sexo','pro_int_dif',
    'clave','nombre','nombre_medico','edad','talla','peso','cama','no_expediente',
    'fecha','fecha_realiza','fecha_val_cardvsc']

    query = "update pacientes set "
    valor = ""
    variables.forEach(element => {
        valor = valor + element + " = '" + document.getElementById(element).value + "',"
    })
    valor = valor.slice(0, -1)
    query = query + valor

    query = query + ` where id = ${document.getElementById('id').value}`

    return query;
}

function limpiaCampos(){
    textos = ['id','diag_preoper','oper_proy','otras','originario','residente','religion','frecuencia_tab','frecuencia_alc','aseo_dental','toxicom_desc','anestesico_quir','complic_desc','transfunc_desc','alergicos','asmaticos','diabetes','tratamiento_diab','hipertension','tratamiento_hiper','cardiopatias','hepaticos','neurologicos','traumaticos','nefropatias','endocrinopatias','obesidad','neoplasicos','evc_desc','obs_per_pat','ta','fc','fr','temperatura','craneo','pupilas','conjuntivas','narinas','mucosa_oral','cuello','traquea','cardiopulmonar','abdomen','extremidades','resto_ef','hb','hto','leucocitos','plaquetas','glucosa','urea','creatinina','tp','ttpa','inr','otros','ecg','rx_torax','cv','cvf','vmv','vef1','fef25_75','ph','pco2','po2','hco3','eb','sato2','goldman','asa','plan_anest_suger','obs_lab_gab','obs_recom_oper']
    selects = ['dm','has','cardiopatas','ca','tb','evc','grupo','rh','tabaquismo','alcoholismo','habitos_diet','toxicomanias','complicaciones','transfuncionales','protesis_dentales','tipo_pro_dent','mallampati','patil_aldretti','apertura_oral','espirometria','gasometria','riesgo_tromboemb','raq_ue','raq_16','raq_ab','se_recom_operar','sexo','pro_int_dif']
    varchars = ['clave','nombre','nombre_medico','edad','talla','peso','cama','no_expediente']
    fechas = ['fecha','fecha_realiza','fecha_val_cardvsc']

    let datos = getPaciente(name)
	.then((results) => {
		textos.forEach(element => {
            document.getElementById(element).value = ''
        });

        selects.forEach(element => {
            document.getElementById(element).value = 'No especificado'
        });

        varchars.forEach(element => {
            document.getElementById(element).value = ''
        });
	});

    autodate()
}


document.getElementById('limpiar-campos').addEventListener('click', () => {
    limpiaCampos()
});

document.getElementById('guardar').addEventListener('click', () => {
    query = genquery();
    insertaQuery(query);
});

document.getElementById('actualizar').addEventListener('click', () => {
    query = genqueryUp();
    console.log(query)
    insertaQuery(query);
});

document.getElementById('exportar-pdf').addEventListener('click', () => {
    generatePDF('contenedor-de-todo')
});