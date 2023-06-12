import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import BorradoEvento from '../ventanas/BorradoEvento';
import EdicionEvento from '../formularios/EdicionEvento';
import moment from 'moment';

const itemsPerPage = 3;

export default function DesplegableEventos({listaDias, listaEventos }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] =useState();
  const totalPages = Math.ceil(listaEventos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEvents = listaEventos.slice(startIndex, endIndex);

  const handleAccordionButtonClick = (index) => {
    setSelectedItem(selectedItem === index ? null : index);
  };


  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <Accordion>
        {currentEvents.map((evento, index) => (
          <AccordionItem key={evento._id}>
            <h2>
              <AccordionButton
                onClick={() => {
                  handleAccordionButtonClick(index);
                }}
                style={{ backgroundColor: evento.color }}
              >
                <Box as="span" flex="1" textAlign="left">
                  {evento.nombre}
                </Box>
                <ChevronDownIcon />
              </AccordionButton>
            </h2>
            {selectedItem === index && (
              <AccordionPanel pb={4}>
                <ul style={{listStyle:'none'}}>
                  <li>Inicio: {moment(evento.fechaInicio).format('DD/MM/YYYY HH:mm')}</li>
                  <li>Fin: {moment(evento.fechaFin).format('DD/MM/YYYY HH:mm')}</li>
                  <li>Tipo de evento: {evento.tipo}</li>
                  <li>Lugar: {evento.ubicacion}</li>
                  <li>Descripcion: {evento.descripcion}</li>
                  <li>Enlace: <a href={evento.enlace}  target="_blank">{evento.enlace}</a></li>
                  <li>Precio: {evento.precio}€</li>
                </ul>
                <EdicionEvento listaDias={listaDias} evento={evento} />
                <BorradoEvento evento={evento}/>
              </AccordionPanel>
            )}
          </AccordionItem>
        ))}
      </Accordion>
        <Button
          isDisabled={currentPage === 1}
          onClick={() => handleChangePage(currentPage - 1)}
        >
          Página anterior
        </Button>
        <span>
          Página {currentPage} de {totalPages}
          </span>
        <Button
          isDisabled={currentPage === totalPages}
          onClick={() => handleChangePage(currentPage + 1)}
        >
          Siguiente página
        </Button>
    </div>
  );
}
