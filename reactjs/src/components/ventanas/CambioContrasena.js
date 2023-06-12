import { Stack, FormControl, FormErrorMessage, FormLabel, Input, useToast, Button, Popover, PopoverTrigger, PopoverBody, PopoverHeader, PopoverArrow, PopoverCloseButton, Portal, PopoverContent } from '@chakra-ui/react';
import { cambiarContrasena } from '../../api/Usuario';
import { useForm } from 'react-hook-form'

export default function CambioContrasena({ usuario }) {
    const toast = useToast();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()


    function onSubmit(values) {

        let objContrasena = {
            contrasena:values.contrasena
        }
        cambiarContrasena(objContrasena)
        .then((res) => {
            if (res.status === 200) {
                toast({
                    title: 'Contraseña cambiada correctamente. Se va a cerrar la sesión',
                    status: 'success',
                    duration: 3000,
                    isClosable: true
                });
                sessionStorage.removeItem('token');
                setTimeout(() => { window.location.href = '/' }, 3000);
            } else {
                toast({
                    title: 'Error al cambiar la contraseña',
                    description: 'Hubo un error al intentar borrar la contraseña',
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

    return (
        <Popover>
            <PopoverTrigger>
                <Button bg='white' color='#70AC62'>Cambiar contraseña</Button>
            </PopoverTrigger>
            <Portal>
                <PopoverContent>
                    <PopoverHeader fontWeight='semibold'>Editar contraseña</PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={4}>
                                <FormControl isInvalid={errors.contrasena}>
                                    <FormLabel htmlFor="contrasena">Nueva contraseña</FormLabel>
                                    <Input type="password" id="contrasena" {...register('contrasena', {
                                        required: 'Contraseña requerida', 
                                        pattern: {
                                            value: /[a-zA-Z0-9*?#@$]{8,25}/,
                                            message: 'Contraseña incorrecta. Solo puede contener letras, números y/o los caracteres *?#@$. Entre 8 y 25 caracteres en total.',
                                          },
                                    })} />
                                     <FormErrorMessage>{errors.contrasena && errors.contrasena.message}</FormErrorMessage>
                                </FormControl>
                                <Button type="submit" isLoading={isSubmitting} bg='#ED7C6F' color='white'
                                    _hover={{ bg: '#F4AFAA' }}>
                                    Cambiar contraseña
                                </Button>
                            </Stack>
                        </form>
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>
    );
}