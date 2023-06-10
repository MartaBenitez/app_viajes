import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../components/comunes/Breadcrumbs';
import Calendario from '../components/calendarios/CalendarioViajes';
import Navbar from '../components/comunes/NavbarUser';
import DesplegableViajes from '../components/desplegables/DesplegableViajes';
import {pedirViajes} from '../api/Viajes';

const MisViajes = () => {
    const trail = [{nombre: 'Inicio',url:'/'},{nombre: 'Mis viajes',url:'/viajes'}];
    const [listaViajes, setListaViajes] = useState([]);

    useEffect(() => {
        pedirViajes()
            .then(response => {
                const listaViajes = response.data;
                if (listaViajes.length === 0) {
                    console.log("no hay viajes")
                } else { ordenarViajes(listaViajes)}
            })
            .catch(error => {
                console.log('Error:', error);
            });
    }, []);

    function ordenarViajes(lista){
        lista.sort((a, b)=>a.fechaInicio>b.fechaInicio);
        setListaViajes(lista);
    }
    
    return (
        <>  <Navbar />
            <Breadcrumbs trail={trail}/>
            <div class="container text-center bg-light">
                <div className="row justify-content-left mb-5">
                    <Calendario listaViajes={listaViajes}/>
                    <DesplegableViajes listaViajes={listaViajes} />
                </div>
            </div>
        </>
    );
}

export default MisViajes;