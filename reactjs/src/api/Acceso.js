import axios from 'axios';
import {urlPeticiones} from './Conf'

export function registrarUsuario(datos){
    return axios.post(urlPeticiones+'/registro', datos)
}

export function logearUsuario(datos){
    return axios.post(urlPeticiones + '/login', datos).then(res =>{guardarToken(res.data);})
}

function guardarToken(datos){
  sessionStorage.setItem("token",datos.token);
}

