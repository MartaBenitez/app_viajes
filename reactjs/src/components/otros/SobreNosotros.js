import React from 'react';
import { Box, Heading, Text, Flex } from '@chakra-ui/react';

export default function Informacion() {
    return (
        <div className='container-fluid pb-3'>
            <div className='row justify-content-center'>
                <div className='col-12 pt-2 pb-2 justify-content-center'>
                <Flex justifyContent="center">
                    <Box
                        maxH="280px"
                        p="6"
                        bg='#ED7C6F'
                        color="white"
                        borderRadius="md"
                        boxShadow="lg"
                    >
                        <Heading as='h4' fontSize="xl" fontWeight="bold" textAlign='center' mb="4">
                            Sobre esta página web
                        </Heading>
                        <Text mb="4">
                            <p><b>Planiviaje.eu</b> es una página web desarrollada como trabajo de fin de ciclo del grado superior de desarrollo de aplicaciones web. </p>
                            <p>El objeto de la página es planificar tus próximos viajes con calendarios y mapas para guardar las visitas que harás, donde comerás o donde te alojarás. </p>
                            <p>Espero que te guste la página y si tienes cualquier duda sobre el funcionamiento o reportar errores puedes hacerlo mandando un correo a <a href='mailto:administracion@planiviaje.eu' style={{fontWeight:'bold'}}>adiminstracion@planiviaje.eu</a>.</p>
                            <p>Un saludo, Marta</p>
                        </Text>
                    </Box>
                    </Flex>
                </div>
            </div>
        </div>
    );
};
