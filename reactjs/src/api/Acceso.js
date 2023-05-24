import axios from 'axios';
import {urlPeticiones} from './Conf'

export function registrarUsuario(datos){
    axios.post({urlPeticiones}+'/registro', datos)
    .then(res => {
      console.log(res.status);
      console.log(res.data);
    });
}

export function logearUsuario(datos){
  axios.post({urlPeticiones}+'/login', datos)
    .then(res => {
      console.log(res.status);
      console.log(res.data);
    });
}