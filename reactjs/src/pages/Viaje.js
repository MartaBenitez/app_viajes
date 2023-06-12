import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../components/comunes/Breadcrumbs';
import Navbar from '../components/comunes/NavbarUser';
import {pedirDiasViaje, pedirEventos} from '../api/Eventos';
import { useLocation } from 'react-router-dom';
import CalendarioEventos from '../components/calendarios/CalendarioEventos';
import { Heading, Alert, AlertIcon } from '@chakra-ui/react';

const Viaje = () => {
    const location = useLocation();
    const idViaje = new URLSearchParams(location.search).get('id');
    const nombre = new URLSearchParams(location.search).get('viaje');
    const [listaDias, setListaDias] = useState([]);
    const [listaEventos, setListaEventos] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
            pedirDiasViaje(idViaje)
            .then(response => {
                const listaDias= response.data;
                if (listaDias.length != 0) { setListaDias(listaDias);}
            })
            .catch(()=> {
                setError(true);
            });
            pedirEventos(idViaje)
            .then(response => {
                const listaEventos= response.data;
                if (listaEventos.length != 0) {ordenarEventos(listaEventos);}
            })
            .catch(() => {
                setError(true);
            });
    }, []);

    function ordenarEventos(lista){
        lista.sort((a, b)=>a.fechaInicio>b.fechaInicio);
        setListaEventos(lista);
    }
    const trail = [{nombre: 'Inicio',url:'/'},{nombre: 'Mis viajes',url:'/viajes'},{nombre: 'Mis eventos',url:'/eventos'}];
    return (
        <>  <Navbar />
            <Breadcrumbs trail={trail}/>
            <div class="container text-center bg-light" style={{marginBottom:"5rem"}}>
                <div className="row justify-content-left">
                {error && (
                        <Alert status='error'>
                            <AlertIcon />
                            Error al obtener sus eventos de este viaje. Lo sentimos.
                        </Alert>
                    )}
                    {!error &&(
                        <>
                         <Heading as='h4'>{nombre}</Heading>
                        <CalendarioEventos listaDias={listaDias} listaEventos={listaEventos}/>
                        </>
                    )}
               
                </div>
            </div>
        </>
    );
}

export default Viaje;