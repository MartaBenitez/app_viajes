import React from 'react';
import { useDisclosure, Box, Heading, Text, Button, Drawer, DrawerCloseButton, DrawerOverlay, DrawerContent, DrawerHeader, DrawerFooter, DrawerBody} from '@chakra-ui/react';
import CrearEvento from './CreacionEvento'; 

const Evento = ({listaDias, listaEventos}) => {


  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef()

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
           <CrearEvento listaDias={listaDias}/>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      </div>
      <div>
      {listaEventos.length > 0 && (
          <div>
            {listaEventos.map((evento) => {
              return (
                <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md">
                <Heading as="h3" size="lg" mb={4}>
                  {evento.nombre}
                </Heading>
                <Text>
                  Descripción: <strong>{evento.descripcion}</strong>
                </Text>
                <Text>
                  Precio: <strong>{evento.precio}</strong>
                </Text>
                {/* Agrega más propiedades del objeto aquí */}
              </Box>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};

export default Evento;
