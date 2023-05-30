import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'


export default function DesplegableViajes({ listaViajes }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const handleAccordionButtonClick = (index) => {
        setSelectedItem(selectedItem === index ? null : index);
    };

    return (
        <div className="col-12 col-md-4 col-lg-6">
            <h3 className='mb-4'>Mis viajes</h3>
            <Accordion>
                {listaViajes.map((viaje, index) => (
                    <AccordionItem key={viaje._id}>
                        <h2>
                            <AccordionButton onClick={() => handleAccordionButtonClick(index)} style={{ backgroundColor: viaje.color }}>
                                <Box as="span" flex='1' textAlign='left' >
                                    {viaje.nombre}
                                </Box>
                                <ChevronDownIcon />
                            </AccordionButton>
                        </h2>
                        {selectedItem === index && (
                            <AccordionPanel pb={4}>
                                <ul>
                                    <li>Origen: {viaje.origen}</li>
                                    <li>Destino: {viaje.destino}</li>
                                    <li>Número personas: {viaje.numPersonas}</li>
                                    <li>Presupuesto: {viaje.presupuesto} €</li>
                                </ul>
                            </AccordionPanel>
                        )}
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}