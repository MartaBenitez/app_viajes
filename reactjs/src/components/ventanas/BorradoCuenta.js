import { useToast, Button, Popover, PopoverTrigger, PopoverFooter, PopoverBody, PopoverHeader, PopoverArrow, PopoverCloseButton, Portal, PopoverContent } from '@chakra-ui/react';
import {borrarCuenta} from '../../api/Usuario';

export default function BorradoCuenta({usuario}) {
    const toast = useToast();

    function borrar(){
        borrarCuenta(usuario) 
        .then((res)=> {
            if(res.status===200){
                toast({
                    title: 'Cuenta eliminada. Hasta pronto',
                    status: 'success',
                    duration: 3000,
                    isClosable: true
                });
                sessionStorage.removeItem('token');
                setTimeout(() => {window.location.href='/';}, 1000);
            }else{
                toast({
                    title: 'Error al borrar',
                    description: 'Hubo un error al intentar borrar su cuenta',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  });
            }
        })
        .catch(() => {
            toast({
                title: 'Error al borrar',
                description: 'Hubo un error al intentar borrar su cuenta',
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
        });
    }
    return (
        <Popover>
            <PopoverTrigger>
            <Button bg='white' color='#70AC62'>Eliminar cuenta</Button>
            </PopoverTrigger>
            <Portal>
                <PopoverContent>
                    <PopoverHeader fontWeight='semibold'>Confirmación de borrado</PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                        <p>¿Está seguro de querer borrar su cuenta en Planiviaje? <br /> Una vez borrada no podrá recuperar sus viajes ni eventos aunque si podrá volver a registarse con el mismo correo</p>
                    </PopoverBody>
                    <PopoverFooter display='flex' justifyContent='flex-end'>
                            <Button colorScheme='red' onClick={borrar}>Borrar</Button>
                    </PopoverFooter>
                </PopoverContent>
            </Portal>
        </Popover>
    );
}