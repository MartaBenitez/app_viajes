import { NumberInput, NumberInputField, useDisclosure, Drawer, DrawerBody, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerOverlay, FormControl, FormLabel, Input, Stack, Button } from '@chakra-ui/react';
import SelectorColor from './SelectorColor';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { editarViaje } from '../../api/Viajes';

export default function EdicionViaje({ viaje }) {
  const [colorViaje, setColorViaje] = useState("#FFC0CB");

  let manana = new Date();
  manana.setDate(manana.getDate() + 1);
  const fechaManana = manana.toISOString().split("T")[0];

  let dia = new Date(viaje.fechaInicio);

  let diaFormateado=dia.getDate()+"/"+(dia.getMonth()+1)+"/"+dia.getFullYear();

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
    values._id = viaje._id; // Agrega el ID del viaje para la edición

    editarViaje(values)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          alert('Viaje actualizado correctamente');
        }
      })
      .catch(res => {
        console.log(res); // Maneja el error de la petición
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
          <FormControl isInvalid={errors.fechaInicio}>
            <FormLabel htmlFor="fechaInicio">Fecha de inicio</FormLabel>
            <Input
              type="date"
              id="fechaInicio"
              defaultValue={fechaManana}
              min={fechaManana}
              {...register('fechaInicio', {
                required: 'This is required'
              })}
            />
          </FormControl>
          <FormControl isInvalid={errors.numDias}>
            <FormLabel htmlFor="numDias">Número de días</FormLabel>
            <NumberInput id='numDias' defaultValue={viaje.numDias} min={1} max={100} clampValueOnBlur={false}>
              <NumberInputField {...register('numDias', {
                required: 'This is required'
              })} />
            </NumberInput>
          </FormControl>
          <FormControl isInvalid={errors.numPersonas}>
            <FormLabel htmlFor="numPersonas">Número de viajeros</FormLabel>
            <NumberInput id='numPersonas' defaultValue={viaje.numPersonas} min={1} max={100} clampValueOnBlur={false}>
              <NumberInputField {...register('numPersonas')} />
            </NumberInput>
          </FormControl>
          <FormControl isInvalid={errors.presupuesto}>
            <FormLabel htmlFor="presupuesto">Presupuesto total</FormLabel>
            <NumberInput id='presupuesto' defaultValue={viaje.presupuesto} min={0} clampValueOnBlur={false}>
              <NumberInputField {...register('presupuesto')} />
            </NumberInput>
          </FormControl>
            <Button type="submit" isLoading={isSubmitting} colorScheme='teal'>
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
    <Button colorScheme='teal' onClick={onOpen}>
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
