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
    const passwordPattern =  /^[a-z0-9*?#@$]{8,25}$/i

    if(values.email === "" || values.contrasena === "" ||!emailPattern.test(values.email) || !passwordPattern.test(values.contrasena)){
        errors=true
    }

    return errors;
}
