import React from 'react';
import * as jose from 'jose';
import { Menu, MenuButton, Button, MenuList, MenuItem, WrapItem, Avatar, Text} from '@chakra-ui/react';



export default function Navbar() {
  const token = sessionStorage.getItem('token');
  const decodedToken = jose.decodeJwt(token);
  const nombre = decodedToken.nombre;

  return (
   <div>
    <Menu>
      <MenuButton as={Button} colorScheme='none'  rightIcon={<i class="fa-solid fa-chevron-down" style={{color:"black"}} ></i>}>
        <WrapItem>
          <Avatar name={nombre} />
          <Text className="mt-3 mx-2" fontSize='lg' color='black'>{nombre}</Text>
        </WrapItem>
      </MenuButton>
      <MenuList>
          <MenuItem><a href='/perfil'>Mi perfil</a></MenuItem>
          <MenuItem>Cerrar sesión</MenuItem>
      </MenuList>
    </Menu>
    </div> 
  );
}