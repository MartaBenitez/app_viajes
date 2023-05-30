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