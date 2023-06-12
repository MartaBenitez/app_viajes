import React from 'react';
import { Box, Heading, Text, Flex } from '@chakra-ui/react';

export default function MapaWeb() {
    return (

        <div className='container-fluid pb-3'>
            <div className='row justify-content-center'>
                <div className='col-12 pt-2 pb-2 justify-content-center'>
                    <Flex justifyContent="center">
                        <Box
                            maxH="280px"
                            p="6"
                            mb='2rem'
                        >
                            <Heading as="h4" >Mapa del sitio Web</Heading>
                            <Text mb="4">
                                <ul>
                                    <li><a href="/">Inicio</a></li>
                                    <li><a href="/sobre-nosotros">Acerca de nosotros</a></li>
                                    <li><a href="/acceso">Acceso</a></li>
                                </ul>
                            </Text>
                            <Text mb="4"> 
                            <Heading as="h4"  fontSize="lg">Aplicación:</Heading>
                                <ul>
                                    <li><a href="/viajes">Mis viajes</a></li>
                                    <li><a href="/eventos">Eventos</a></li>
                                    <li><a href="/perfil">Perfil de usuario</a></li>
                                </ul>
                            </Text>
                        </Box>
                    </Flex>
                </div>
            </div>
        </div>

    );
}
