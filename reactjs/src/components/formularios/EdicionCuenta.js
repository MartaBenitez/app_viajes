import {useToast, useDisclosure, Drawer, FormErrorMessage, DrawerBody, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerOverlay, FormControl, FormLabel, Input, Stack, Button } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import {cambiarDatos} from '../../api/Usuario';

export default function EdicionCuenta({ usuario }) {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();


  function onSubmit(values) {
    let objUsuario = {
        nombre:values.nombre,
        apellidos:values.apellidos,
        email:values.email
    }
    cambiarDatos(objUsuario)
    .then((res) => {
        if (res.status === 200) {
            toast({
                title: 'Datos cambiados correctamente. Se va a cerrar la sesión',
                status: 'success',
                duration: 3000,
                isClosable: true
            });
            sessionStorage.removeItem('token');
            setTimeout(() => { window.location.href = '/' }, 3000);
        } else {
            toast({
                title: 'Error al cambiar los datos personales',
                description: 'Hubo un error al intentar cambiar sus datos personales',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    })
    .catch(() => {
        toast({
            title: 'Error al cambiar la contraseña',
            description: 'Hubo un error al intentar borrar la contraseña',
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
    });
  }

  const Form = ({ firstFieldRef }) => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4} mt={4}>
          <FormControl isInvalid={errors.nombre}>
            <FormLabel htmlFor="nombre">Nombre</FormLabel>
            <Input
              type="text"
              ref={firstFieldRef}
              id="nombre"
              defaultValue={usuario.nombre}
              {...register('nombre', {
                required: 'This is required'
              })}
            />
          </FormControl>
          <FormControl isInvalid={errors.apellidos}>
            <FormLabel htmlFor="apellidos">Apellidos</FormLabel>
            <Input
              type="text"
              id="apellidos"
              defaultValue={usuario.apellidos}
              {...register('apellidos', {
                required: 'This is required'
              })}
            />
          </FormControl>
          <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input type='email' id='email' defaultValue={usuario.email}
             {...register('email', { required: 'Email incorrecto'})} />
         <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>
            <Button type="submit" isLoading={isSubmitting} bg='#ED7C6F' color='white'hover={{bg:'#F4AFAA'}}>
              Guardar cambios
            </Button>
        </Stack>
      </form>
    )
  };

  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstField = React.useRef(null);

  return (
    <>
    <Button bg='white' color='#70AC62' onClick={onOpen}>Cambiar datos</Button>
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
                    Edite sus datos personales
                    </DrawerHeader>
                    <DrawerBody>
                        <Form firstFieldRef={firstField} onCancel={onClose} />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            </>
  );
}
