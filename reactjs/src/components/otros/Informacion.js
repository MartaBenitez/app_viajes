import React from 'react';
import { Box, Heading, Text, Button, Image, Flex } from '@chakra-ui/react';
import gifviaje from "../../assets/images/gifviaje.gif";
import {useNavigate} from 'react-router-dom';

export default function Informacion() {
    const navigate = useNavigate();

    const handleClick = (event) => {
      event.preventDefault();
      navigate('/acceso');
    };
    
    return (
        <div className='container-fluid pb-3'>
            <div className='row justify-content-center'>
                <div className='col-12 col-md-4 pt-2 pb-2 justify-content-center'>
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
                            ¿Pensando en tus próximas vacaciones?
                        </Heading>
                        <Text mb="4">
                            Con Planiviaje podrás planificar todo lo que vas a hacer para que no pierdas ni un segundo.
                        </Text>
                        <Button bg='white' color='#70AC62' onClick={handleClick}>EMPIEZA YA</Button>
                    </Box>
                    </Flex>
                </div>
                <div className='col-12 col-md-4 pb-2 pt-2 justify-content-center'>
                <Flex justifyContent="center">
                <Image src={gifviaje} alt="Gif animado" maxH="260px"  borderRadius="md" />
                </Flex>
                </div>
            </div>
        </div>
    );
};
