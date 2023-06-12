import React from 'react';
import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import Breadcrumbs from '../components/comunes/Breadcrumbs';
import Navbar from '../components/comunes/NavbarInicio';
export default function MapaWeb() {
    const trail = [{ nombre: 'Inicio', url: '/' }, { nombre: 'Mapa web', url: '/mapaweb' }];
    return (
        <>
        <Navbar />
            <Breadcrumbs trail={trail} />
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
                                    <li><a href="/acceso">Acceso a la aplicación</a></li>
                                </ul>
                            </Text>
                        </Box>
                    </Flex>
                </div>
            </div>
        </div>
        </>

    );
}
