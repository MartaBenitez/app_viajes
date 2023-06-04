import axios from 'axios';
import {urlPeticiones} from './Conf';
import * as jose from 'jose';

export function pedirViajes(){
    const token = sessionStorage.getItem('token');
    const decodedToken = jose.decodeJwt(token);
    const id = decodedToken._id;
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return axios.get(urlPeticiones+'/viajes/misviajes/'+id)
}

export function borrarViaje(viaje){
    const token = sessionStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return axios.delete(urlPeticiones+'/viajes/'+ viaje._id)
}

export function guardarViaje(viaje){
    console.log(viaje)
    const token = sessionStorage.getItem('token');
    const decodedToken = jose.decodeJwt(token);
    const id = decodedToken._id;
    viaje.idUsuario=id;
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return axios.post(urlPeticiones+'/viajes', viaje);
}

export function editarViaje(viaje){
    const token = sessionStorage.getItem('token');
    const decodedToken = jose.decodeJwt(token);
    const id = decodedToken._id;
    viaje.idUsuario=id;
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return axios.put(urlPeticiones+'/viajes/'+viaje._id, viaje);
}