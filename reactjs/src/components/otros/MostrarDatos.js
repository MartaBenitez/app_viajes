import React from 'react';
import moment from 'moment';
import { Box, VStack, Flex, Heading, Text } from '@chakra-ui/react';
import BorradoCuenta from '../ventanas/BorradoCuenta';
import EdicionCuenta from '../formularios/EdicionCuenta';
import CambioContrasena from '../ventanas/CambioContrasena';

export default function MostrarDatos({ dataUsuario }) {
    
    let usuario = dataUsuario;


    return (

        <div className='container-fluid pb-3 '>
            <div className='row justify-content-center'>
                <div className='col-12 pt-2 pb-2 justify-content-center'>
                    <Flex justifyContent="center">
                        <Box
                            minW="100px"
                            p="6"
                            bg='#ED7C6F'
                            color="white"
                            borderRadius="md"
                            boxShadow="lg"
                        >
                            <Heading as='h4' fontSize="xl" fontWeight="bold" textAlign='center' mb="4">
                                Mis datos
                            </Heading>
                            <Text mb="4" textAlign="center">
                                <p>Nombre: {usuario.nombre}</p>
                                <p>Apellidos: {usuario.apellidos}</p>
                                <p>Email: {usuario.email}</p>
                                <p>Fecha de nacimiento: {moment(usuario.fechaNacimiento).format('DD/MM/YYYY')}</p>
                                <p>Fecha de alta: {moment(usuario.fechaAlta).format('DD/MM/YYYY HH:mm')}</p>
                            </Text>
                            <VStack spacing={2} align="center">
                                <CambioContrasena usuario={usuario}/>
                                <EdicionCuenta usuario={usuario}/>
                                <BorradoCuenta usuario={usuario}/>
                            </VStack>

                        </Box>
                    </Flex>
                </div>
            </div>
        </div>

    );
};
