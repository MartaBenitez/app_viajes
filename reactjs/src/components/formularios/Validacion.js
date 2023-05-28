export function validacionLogin(values){
    let errors = false

    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const passwordPattern =  /^[a-z0-9*?#@$]{8,25}$/i

    if(values.email === "" || values.contrasena === "" ||!emailPattern.test(values.email) || !passwordPattern.test(values.contrasena)){
        errors=true
    }

    return errors;
}

export function validacionRegistro(values){
    let errors = false

    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const passwordPattern = /^[a-z0-9*?#@$]{8,25}$/i
    const nombre = /^[a-zA-Z\u00C0-\u017F\s-]{3,25}$/
    const apellidos = /^[a-zA-Z\u00C0-\u017F\s-]{3,50}$/
    const fecha = /^(\d{4}-\d{2}-\d{2})$/

    if(values.email === "" || values.contrasena === "" || values.nombre === "" || values.apellidos === "" || values.fechaNacimiento === "" ||!emailPattern.test(values.email) || !passwordPattern.test(values.contrasena) 
    || !nombre.test(values.nombre) || !apellidos.test(values.apellidos) || !fecha.test(values.fechaNacimiento)){
        errors=true
    }else{
        if(!comprobarValidezFecha(values.fechaNacimiento)){
            errors=true
        }
    }

    return errors;
}

function comprobarValidezFecha(fecha){
    let fechaMax = `${(new Date().getFullYear())-14}-${String((new Date().getMonth())+1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`
    fechaMax = new Date(fechaMax);
    let fechaMin = new Date('1900-01-01');
    
    if (Date.parse(fecha) === 'NaN') {
        return false;
    }else if (new Date(fecha) >= fechaMin && new Date(fecha) <= fechaMax) {
        return true;
    }else return false;
}
