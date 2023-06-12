import axios from 'axios';
import {urlPeticiones} from '../Conf';

export function pedirDiasViaje(idViaje){
    const token = sessionStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return axios.get(urlPeticiones+'/dias/todos/'+ idViaje)
};

export function guardarEvento(evento){
    const token = sessionStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return axios.post(urlPeticiones+'/eventos', evento)
}
export function editarEvento(evento,id){
    const token = sessionStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return axios.put(urlPeticiones+'/eventos/'+id, evento)
}

export function pedirEventos(idViaje){
    const token = sessionStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return axios.get(urlPeticiones+'/eventos/miseventos/'+idViaje)
}

export function borrarEvento(evento){
    const token = sessionStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return axios.delete(urlPeticiones+'/eventos/'+ evento._id)
}
