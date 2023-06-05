import { Button, Popover, PopoverTrigger, ButtonGroup, PopoverFooter, PopoverBody, PopoverHeader, PopoverArrow, PopoverCloseButton, Portal, PopoverContent } from '@chakra-ui/react';
import {borrarEvento} from '../../api/Eventos';
export default function BorradoEvento({evento}) {
    console.log(evento)
    function borrar(){
        borrarEvento(evento) 
        .then(response => {
        })
        .catch(error => {
            
        });
    }
    return (
        <Popover>
            <PopoverTrigger>
                <Button>Borrar</Button>
            </PopoverTrigger>
            <Portal>
                <PopoverContent>
                    <PopoverHeader fontWeight='semibold'>Confirmación de borrado</PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                        <p>¿Está seguro de querer borrar el evento seleccionado? <br /> Una vez borrado no podrá recuperarlo</p>
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