import { useToast, Button, Popover, PopoverTrigger, PopoverFooter, PopoverBody, PopoverHeader, PopoverArrow, PopoverCloseButton, Portal, PopoverContent } from '@chakra-ui/react';
import { suspenderCuenta } from '../../api/Usuario';

export default function SuspensionCuenta({ usuario }) {
    const toast = useToast();

    function borrar() {
        suspenderCuenta(usuario)
            .then((res) => {
                if (res.status === 200) {
                    toast({
                        title: 'Cuenta suspendida',
                        status: 'success',
                        duration: 3000,
                        isClosable: true
                    });
                    window.location.reload();
                } else {
                    toast({
                        title: 'Error al suspender la cuenta',
                        description: 'Hubo un error al intentar suspender la cuenta',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                }
            })
            .catch(() => {
                toast({
                    title: 'Error al suspender la cuenta',
                    description: 'Hubo un error al intentar suspender la cuenta',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            });
    }
    return (
        <Popover>
            <PopoverTrigger>
                <Button bg='white' color='#70AC62'>Suspender cuenta</Button>
            </PopoverTrigger>
            <Portal>
                <PopoverContent>
                    <PopoverHeader fontWeight='semibold'>Confirmación de suspensión</PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                        <p>¿Está seguro de querer suspender la cuenta con email {usuario.email}?</p>
                    </PopoverBody>
                    <PopoverFooter display='flex' justifyContent='flex-end'>
                    <Button colorScheme='red' onClick={borrar}>Supender cuenta</Button>
                    </PopoverFooter>
                </PopoverContent>
            </Portal>
        </Popover>
    );
}