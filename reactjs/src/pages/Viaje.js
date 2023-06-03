import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../components/comunes/Breadcrumbs';
import Navbar from '../components/comunes/NavbarUser';
import {pedirDiasViaje} from '../api/Viajes';

const Viaje = () => {

    const [listaViajes, setListaViajes] = useState([]);

    useEffect(() => {
        pedirDiasViaje()
            .then(response => {
                const listaViajes = response.data;
                if (listaViajes.length === 0) {
                    console.log("no hay viajes")
                } else { setListaViajes(listaViajes)}
            })
            .catch(error => {
                console.log('Error:', error);
            });
    }, []);

    return (
        <>  <Navbar />
            <Breadcrumbs />
            <div class="container text-center bg-light">
                <div className="row justify-content-left">

                </div>
            </div>
        </>
    );
}

export default Viaje;