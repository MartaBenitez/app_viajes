import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../components/comunes/Breadcrumbs';
import Navbar from '../components/comunes/NavbarUser';
import {pedirDiasViaje, pedirEventos} from '../api/Eventos';
import { useLocation } from 'react-router-dom';
import CalendarioEventos from '../components/calendarios/CalendarioEventos';

const Viaje = () => {
    const location = useLocation();
    const idViaje = new URLSearchParams(location.search).get('id');
    const nombre = new URLSearchParams(location.search).get('viaje');
    const [listaDias, setListaDias] = useState([]);
    const [listaEventos, setListaEventos] = useState([]);

    useEffect(() => {
            pedirDiasViaje(idViaje)
            .then(response => {
                const listaDias= response.data;
                if (listaDias.length === 0) {
                    console.log("no hay viajes")
                } else { setListaDias(listaDias);}
            })
            .catch(error => {
                console.log('Error:', error);
            });
            pedirEventos(idViaje)
            .then(response => {
                const listaEventos= response.data;
                if (listaEventos.length === 0) {
                    console.log("no hay eventos")
                } else { ordenarEventos(listaEventos);}
            })
            .catch(error => {
                console.log('Error:', error);
            });
    }, []);

    function ordenarEventos(lista){
        lista.sort((a, b)=>a.fechaInicio>b.fechaInicio);
        setListaEventos(lista);
    }

    return (
        <>  <Navbar />
            <Breadcrumbs />
            <div class="container text-center bg-light">
                <div className="row justify-content-left">
                <h3>{nombre}</h3>
                    <CalendarioEventos listaDias={listaDias} listaEventos={listaEventos}/>
                </div>
            </div>
        </>
    );
}

export default Viaje;