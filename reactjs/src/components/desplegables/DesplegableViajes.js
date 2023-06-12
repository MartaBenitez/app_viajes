import React, { useState } from 'react';
import BorradoViaje from '../ventanas/BorradoViaje'
import NuevoViaje from '../formularios/NuevoViaje';
import EdicionViaje from '../formularios/EdicionViaje';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, Button, Heading } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'


export default function DesplegableViajes({ listaViajes }) {

    const [selectedItem, setSelectedItem] = useState(null);
    const handleAccordionButtonClick = (index) => {
        setSelectedItem(selectedItem === index ? null : index);
    };

    function parsearFecha(fecha){
        let fechaCompleta=new Date(fecha);
        return fechaCompleta.getDate()+'-'+(fechaCompleta.getMonth()+1)+'-'+fechaCompleta.getFullYear();
    }

    function planificar(event,viaje){
        event.preventDefault();
        window.location.href='/eventos?viaje='+viaje.nombre+'&id='+viaje._id;
    }
    
    return (
        <div className="col-12 col-md-4 col-lg-6">
            <Heading as='h3' className='mb-4'>Mis viajes</Heading>
            <NuevoViaje />
            <Accordion>
                {listaViajes.length===0 &&(
                    <p>No hay viajes todavía</p>
                )}
                {listaViajes.map((viaje, index) => (
                    <AccordionItem key={viaje._id}>
                        <h2>
                            <AccordionButton onClick={() =>{ handleAccordionButtonClick(index)}} style={{ backgroundColor: viaje.color }}>
                                <Box as="span" flex='1' textAlign='left' >
                                    {viaje.nombre}
                                </Box>
                                <ChevronDownIcon />
                            </AccordionButton>
                        </h2>
                        {selectedItem === index && (
                            <AccordionPanel pb={4}>
                                <ul style={{listStyle: 'none'}}>
                                    <li>Fecha inicio: {parsearFecha(viaje.fechaInicio)}</li>
                                    <li>Origen: {viaje.origen}</li>
                                    <li>Destino: {viaje.destino}</li>
                                    <li>Número personas: {viaje.numPersonas}</li>
                                    <li>Presupuesto: {viaje.presupuesto} €</li>
                                </ul>
                                <EdicionViaje viaje={viaje} />
                                <Button bg='#6CC6E9' className='mx-2' color='black' onClick={(event)=>{planificar(event,viaje)}}>Planificar</Button>
                                <BorradoViaje viaje={viaje}/>
                            </AccordionPanel>
                        )}
                    </AccordionItem>
                ))}
            </Accordion>

        </div>
    );
}