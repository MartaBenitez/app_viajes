import React, {useState} from 'react';
import * as jose from 'jose';
import { Menu, MenuButton, Button, MenuList, MenuItem, WrapItem, Avatar, Text, Alert, AlertIcon, AlertDescription, AlertTitle, CircularProgress } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate=useNavigate();
  const [sesionActiva, setSesionActiva]=useState(true);
 let nombre='';
  if(sesionActiva){
    const token = sessionStorage.getItem('token');
    const decodedToken = jose.decodeJwt(token);
    nombre = decodedToken.nombre;
  }

  function cerrarSesion() {
    sessionStorage.removeItem('token');
    setSesionActiva(false);
    window.setTimeout(function () { window.location = "/"; }, 5000)
  }

  function irPerfil() {
    navigate('/perfil');
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '60px', paddingBottom: '10px' }}>
        <Menu>
          <MenuButton as={Button} colorScheme="none" rightIcon={<i class="fa-solid fa-chevron-down" style={{ color: "black" }} ></i>}>
            <WrapItem>
              <Avatar name={nombre} />
              <Text className="mt-3 mx-2" fontSize='lg' color='black'>{nombre}</Text>
            </WrapItem>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={irPerfil}>Mi perfil</MenuItem>
            <MenuItem onClick={cerrarSesion}>Cerrar sesión</MenuItem>
          </MenuList>
        </Menu>
      </div>
      <hr style={{
        borderTop: '4px solid #FFDB70',
        width: '100%',
        margin: '0 auto',
        paddinBottom: '5px'
      }} />
      {!sesionActiva && (
        <div>
          <Alert
            status='success'
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height='200px'
          >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg'>
              Sesión cerrada correctamente
            </AlertTitle>
            <AlertDescription maxWidth='sm'>
              En unos segundos será redirigido
            </AlertDescription>
            <CircularProgress isIndeterminate color='green.300' />
          </Alert>
        </div>
      )}
    </>
  );
}
