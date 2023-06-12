import {useToast, NumberInput, InputRightAddon, NumberInputField, useDisclosure, Drawer, DrawerBody, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerOverlay, FormControl, FormLabel, Input, Stack, Button, InputGroup } from '@chakra-ui/react';
import SelectorColor from './SelectorColor';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { editarViaje } from '../../api/Viajes';

export default function EdicionViaje({ viaje }) {
  const [colorViaje, setColorViaje] = useState("#FFC0CB");
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (viaje) {
      setColorViaje(viaje.color);
    }
  }, [viaje]);

  function onSubmit(values) {
    values.color = colorViaje;
    values._id = viaje._id;
    editarViaje(values)
      .then(res => {
        if (res.status === 200) {
          toast({
            title: 'Viaje editado correctamente',
            status: 'success',
            duration: 3000,
            isClosable: true
        });
        setTimeout(() => { window.location.reload(); }, 1000);
        }else{
          toast({
            title: 'Error al editar el viaje',
            description: 'Hubo un error al editar el viaje',
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
        }
      })
      .catch(()=> {
        toast({
          title: 'Error al editar el viaje',
          description: 'Hubo un error al editar el viaje',
          status: 'error',
          duration: 3000,
          isClosable: true,
      });
    });
  }

  const Form = ({ firstFieldRef }) => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <SelectorColor selectedColor={colorViaje} onColorChange={setColorViaje} />
        <Stack spacing={4} mt={4}>
          <FormControl isInvalid={errors.nombre}>
            <FormLabel htmlFor="nombre">Nombre</FormLabel>
            <Input
              type="text"
              ref={firstFieldRef}
              id="nombre"
              defaultValue={viaje.nombre}
              {...register('nombre', {
                required: 'This is required'
              })}
            />
          </FormControl>
          <FormControl isInvalid={errors.origen}>
            <FormLabel htmlFor="origen">Origen</FormLabel>
            <Input
              type="text"
              id="origen"
              defaultValue={viaje.origen}
              {...register('origen', {
                required: 'This is required'
              })}
            />
          </FormControl>
          <FormControl isInvalid={errors.destino}>
            <FormLabel htmlFor="destino">Destino</FormLabel>
            <Input
              type="text"
              id="destino"
              defaultValue={viaje.destino}
              {...register('destino', {
                required: 'This is required'
              })}
            />
          </FormControl>
          <FormControl isInvalid={errors.numPersonas}>
            <FormLabel htmlFor="numPersonas">Número de viajeros</FormLabel>
            <NumberInput id='numPersonas' defaultValue={viaje.numPersonas} min={1} max={100} clampValueOnBlur={false}>
              <NumberInputField {...register('numPersonas')} />
            </NumberInput>
          </FormControl>
          <FormControl isInvalid={errors.presupuesto}>
            <InputGroup>
            <FormLabel htmlFor="presupuesto">Presupuesto total</FormLabel>
            <NumberInput id='presupuesto' defaultValue={viaje.presupuesto} min={0} clampValueOnBlur={false}>
              <NumberInputField {...register('presupuesto')} />
            </NumberInput>
            <InputRightAddon children='€' />
            </InputGroup>
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
    <Button  className='mx-2' color='black' bg='#6CC6E9' onClick={onOpen}>
    Editar viaje
  </Button>
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
                    Edite el viaje a {viaje.destino}
                    </DrawerHeader>

                    <DrawerBody>
                        <Form firstFieldRef={firstField} onCancel={onClose} />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            </>
  );
}
