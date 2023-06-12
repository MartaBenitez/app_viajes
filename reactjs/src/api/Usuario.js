import axios from 'axios';
import {urlPeticiones} from '../Conf';
import * as jose from 'jose';

export function pedirUsuario(){
    const token = sessionStorage.getItem('token');
    const decodedToken = jose.decodeJwt(token);
    const id = decodedToken._id;
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return axios.get(urlPeticiones+'/usuarios/'+id)
}

export function pedirUsuarios(){
    const token = sessionStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return axios.get(urlPeticiones+'/usuarios/admin')
}

export function borrarCuenta(){
    const token = sessionStorage.getItem('token');
    const decodedToken = jose.decodeJwt(token);
    const id = decodedToken._id;
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return axios.delete(urlPeticiones+'/usuarios/'+id)
}

export function suspenderCuenta(usuario){
    const token = sessionStorage.getItem('token');
    let id=usuario._id;
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return axios.delete(urlPeticiones+'/usuarios/admin/'+id)
}

export function cambiarContrasena(contrasena){
    const token = sessionStorage.getItem('token');
    const decodedToken = jose.decodeJwt(token);
    const id = decodedToken._id;
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return axios.put(urlPeticiones+'/usuarios/contrasena/'+id,contrasena)
}

export function cambiarDatos(usuario){
    const token = sessionStorage.getItem('token');
    const decodedToken = jose.decodeJwt(token);
    const id = decodedToken._id;
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return axios.put(urlPeticiones+'/usuarios/'+id,usuario)
}
