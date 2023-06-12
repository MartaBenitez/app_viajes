import React from 'react';
import { useDisclosure, ChakraProvider, Heading, Button, Drawer, DrawerCloseButton, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody } from '@chakra-ui/react';
import CrearEvento from './CreacionEvento';
import moment from 'moment';
import MapaMarcadores from '../mapas/MapaMarcadores';
import DesplegableEventos from '../desplegables/DesplegableEventos';

const Evento = ({ listaDias, listaEventos }) => {


  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef()


 listaEventos.map((evento) => {
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
      <Heading as='h4' fontSize='xl'>Eventos</Heading>

      <div>
      <Button bg='#ED7C6F' className='mb-2' color='white' onClick={onOpen}>
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
      {listaEventos.length===0 &&(
            <p>No hay eventos todavía</p>
        )}
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
