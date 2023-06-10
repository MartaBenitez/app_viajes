import React from 'react';
import { Box, Container, Stack, Text, Link } from '@chakra-ui/react';


export default function Footer() {
  return (
    <Box
      bg={'#FFDB70'}
      color='black'
    >
<Container maxW="container.lg">
        <Stack direction="row" spacing={4} justify="center">
          <Link href="/">Inicio</Link>
          <Link href="">Mapa web</Link>
          <Link href="/sobre-nosotros">Acerca de nosotros</Link>
          <Link href="/acceso">Acceso</Link>
        </Stack>
        <Text mt={4} textAlign="center" fontSize="sm">
          © 2023 Planiviaje S.L. Todos los derechos reservados
        </Text>
      </Container>
    </Box>
  );
}
