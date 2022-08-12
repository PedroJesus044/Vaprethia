function generatePDF(elemento) {
    variables = ['diag_preoper','oper_proy','otras','originario','residente','religion','frecuencia_tab','frecuencia_alc','aseo_dental','toxicom_desc','anestesico_quir','complic_desc','transfunc_desc','alergicos','asmaticos','diabetes','tratamiento_diab','hipertension','tratamiento_hiper','cardiopatias','hepaticos','neurologicos','traumaticos','nefropatias','endocrinopatias','obesidad','neoplasicos','evc_desc','obs_per_pat','ta','fc','fr','temperatura','craneo','pupilas','conjuntivas','narinas','mucosa_oral','cuello','traquea','cardiopulmonar','abdomen','extremidades','resto_ef','hb','hto','leucocitos','plaquetas','glucosa','urea','creatinina','tp','ttpa','inr','otros','ecg','rx_torax','cv','cvf','vmv','vef1','fef25_75','ph','pco2','po2','hco3','eb','sato2','goldman','asa','plan_anest_suger','obs_lab_gab','obs_recom_oper',
    'dm','has','cardiopatas','ca','tb','evc','grupo','rh','tabaquismo','alcoholismo','habitos_diet','toxicomanias','complicaciones','transfuncionales','protesis_dentales','tipo_pro_dent','mallampati','patil_aldretti','apertura_oral','espirometria','gasometria','riesgo_tromboemb','raq_ue','raq_16','raq_ab','se_recom_operar','sexo','pro_int_dif',
    'clave','nombre','nombre_medico','edad','talla','peso','cama','no_expediente',
    'fecha','fecha_realiza','fecha_val_cardvsc']

    html = '<div style = "color: black;">'
    valores = ''
    variables.forEach(element => {
        if(document.getElementById(element).value == 'No especificado' || document.getElementById(element).value == ''){
            console.log('No imprimir')
        }else {
            valores = valores + '<p>' + element + ": " + document.getElementById(element).value + "</p>"
        }
    });
    html = html + valores
    html = html + "</div>"
    console.log(html)

    html2pdf().from(html).save();
}