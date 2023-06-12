import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../components/comunes/Breadcrumbs';
import Calendario from '../components/calendarios/CalendarioViajes';
import Navbar from '../components/comunes/NavbarUser';
import DesplegableViajes from '../components/desplegables/DesplegableViajes';
import { pedirViajes } from '../api/Viajes';
import {Alert, AlertIcon} from '@chakra-ui/react';

const MisViajes = () => {
    const trail = [{ nombre: 'Inicio', url: '/' }, { nombre: 'Mis viajes', url: '/viajes' }];
    const [listaViajes, setListaViajes] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
            pedirViajes()
            .then(response => {
                const listaViajes = response.data;
                if (listaViajes.length != 0) { ordenarViajes(listaViajes); }
            })
            .catch(()=> {
                setError(true);
            });
        
    }, []);

    function ordenarViajes(lista) {
        lista.sort((a, b) => a.fechaInicio > b.fechaInicio);
        setListaViajes(lista);
    }

    return (
        <>  <Navbar />
            <Breadcrumbs trail={trail} />
            <div class="container text-center bg-light">
                <div className="row justify-content-left mb-5">
                    {error && (
                        <Alert status='error'>
                            <AlertIcon />
                            Error al obtener sus viajes. Lo sentimos.
                        </Alert>
                    )}
                    {!error &&(
                        <>
                        <Calendario listaViajes={listaViajes} />
                        <DesplegableViajes listaViajes={listaViajes} />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default MisViajes;