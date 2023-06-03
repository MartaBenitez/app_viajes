import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../components/comunes/Breadcrumbs';
import Calendario from '../components/calendarios/CalendarioViajes';
import Navbar from '../components/comunes/NavbarUser';
import DesplegableViajes from '../components/desplegables/DesplegableViajes';
import {pedirViajes} from '../api/Viajes';

const MisViajes = () => {

    const [listaViajes, setListaViajes] = useState([]);

    useEffect(() => {
        pedirViajes()
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
                    <Calendario listaViajes={listaViajes}/>
                    <DesplegableViajes listaViajes={listaViajes} />
                </div>
            </div>
        </>
    );
}

export default MisViajes;