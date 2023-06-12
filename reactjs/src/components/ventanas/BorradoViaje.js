import { useToast, Button, Popover, PopoverTrigger, ButtonGroup, PopoverFooter, PopoverBody, PopoverHeader, PopoverArrow, PopoverCloseButton, Portal, PopoverContent } from '@chakra-ui/react';
import {borrarViaje} from '../../api/Viajes';
export default function BorradoViaje({viaje}) {
    const toast = useToast();

    function borrar(){
        borrarViaje(viaje) 
        .then((res)=> {
            if(res.status===200){
                toast({
                    title: 'Viaje borrado con éxito',
                    status: 'success',
                    duration: 3000,
                    isClosable: true
                });
                setTimeout(() => {window.location.reload();}, 1000);
            }else{
                toast({
                    title: 'Error al borrar',
                    description: 'Hubo un error al intentar borrar el viaje',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  });
            }
        })
        .catch(() => {
            toast({
                title: 'Error al borrar',
                description: 'Hubo un error al intentar borrar el viaje',
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
        });
    }
    return (
        <Popover>
            <PopoverTrigger>
            <Button  className='mx-2' color='black' bg='#6CC6E9'>
    Borrar viaje
  </Button>
            </PopoverTrigger>
            <Portal>
                <PopoverContent>
                    <PopoverHeader fontWeight='semibold'>Confirmación de borrado</PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                        <p>¿Está seguro de querer borrar el viaje seleccionado? <br /> Una vez borrado no podrá recuperarlo</p>
                    </PopoverBody>
                    <PopoverFooter display='flex' justifyContent='flex-end'>
                        <ButtonGroup size='sm'>
                            <Button variant='outline'>Cancelar</Button>
                            <Button colorScheme='red' onClick={borrar}>Borrar</Button>
                        </ButtonGroup>
                    </PopoverFooter>
                </PopoverContent>
            </Portal>
        </Popover>
    );
}