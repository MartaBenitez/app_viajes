import React, {useState} from 'react';
import { useDisclosure, ChakraProvider, Button, Drawer, DrawerCloseButton, DrawerOverlay, DrawerContent, DrawerHeader, DrawerFooter, DrawerBody } from '@chakra-ui/react';
import CrearEvento from './CreacionEvento';
import moment from 'moment';
import MapaMarcadores from '../mapas/MapaMarcadores';
import DesplegableEventos from '../desplegables/DesplegableEventos';

const Evento = ({ listaDias, listaEventos }) => {

  console.log(listaEventos)

  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef()


  const data = listaEventos.map((evento) => {
    let fecha = moment(evento.fechaInicio).format('DD/MM/YYYY HH:mm');
    const registro = {
      nombre: evento.nombre,
      fechaInicio: fecha,
      id: evento._id
    };
    return registro;
  });

  return (
    <div>
      <h4>Eventos</h4>

      <div>
        <Button colorScheme='teal' onClick={onOpen}>
          Crear nuevo evento
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          initialFocusRef={firstField}
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>
              Cree un evento
            </DrawerHeader>

            <DrawerBody>
              <CrearEvento listaDias={listaDias} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
      {listaEventos.length > 0 && (
        <ChakraProvider>
          <div>
            <DesplegableEventos listaDias={listaDias} listaEventos={listaEventos}/>
          </div>
        </ChakraProvider>
      )}

      <div>
    <MapaMarcadores listaEventos={listaEventos}/>
      </div>
    </div>


  );
};

export default Evento;
