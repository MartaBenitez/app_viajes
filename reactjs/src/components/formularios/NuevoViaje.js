import { useToast, NumberInput, InputGroup, InputRightAddon, NumberInputField, useDisclosure, Drawer, DrawerBody, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerOverlay, FormControl, FormLabel, Input, Stack, Button } from '@chakra-ui/react';
import SelectorColor from './SelectorColor';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { guardarViaje } from '../../api/Viajes';


export default function NuevoViaje() {
    const toast = useToast();

    let manana = new Date();
    manana.setDate(manana.getDate() + 1);
    const fechaManana = manana.toISOString().split("T")[0];
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

    function onSubmit(values) {
        values.color = colorViaje;
        guardarViaje(values)
            .then(res => {
                if (res.status === 200) {
                    toast({
                        title: 'Viaje creado correctamente',
                        status: 'success',
                        duration: 3000,
                        isClosable: true
                    });
                    setTimeout(() => { window.location.reload(); }, 1000);
                } else {
                    toast({
                        title: 'Error al borrar',
                        description: 'Hubo un error al crear el viaje',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                }
            }).catch(() => {
                toast({
                    title: 'Error al borrar',
                    description: 'Hubo un error al crear el viaje',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });

            });

    }

    const [colorViaje, setColorViaje] = useState("#FFC0CB");

    const Form = ({ firstFieldRef }) => {
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <SelectorColor selectedColor={colorViaje} onColorChange={setColorViaje} />
                <Stack spacing={4} mt={4}>
                    <FormControl isInvalid={errors.nombre}>
                        <FormLabel htmlFor="nombre">Nombre</FormLabel>
                        <Input type="text" ref={firstFieldRef} id="nombre" {...register('nombre', {
                            required: 'This is required'
                        })} />
                    </FormControl>
                    <FormControl isInvalid={errors.origen}>
                        <FormLabel htmlFor="origen">Origen</FormLabel>
                        <Input type="text" id="origen" {...register('origen', {
                            required: 'This is required'
                        })} />
                    </FormControl>
                    <FormControl isInvalid={errors.destino}>
                        <FormLabel htmlFor="destino">Destino</FormLabel>
                        <Input type="text" id="destino" {...register('destino', {
                            required: 'This is required'
                        })} />
                    </FormControl>
                    <FormControl isInvalid={errors.fechaInicio}>
                        <FormLabel htmlFor="fechaInicio">Fecha de inicio</FormLabel>
                        <Input type="date" defaultValue={fechaManana} id="fechaInicio" {...register('fechaInicio', {
                            required: 'This is required', min: { fechaManana }
                        })} />
                    </FormControl>
                    <FormControl isInvalid={errors.numDias}>
                        <FormLabel htmlFor="numDias">Número de días</FormLabel>
                        <NumberInput id='numDias' defaultValue={1} max={100} clampValueOnBlur={false}>
                            <NumberInputField  {...register('numDias', {
                                required: 'This is required'
                            })} />
                        </NumberInput>
                    </FormControl>
                    <FormControl isInvalid={errors.numPersonas}>
                        <FormLabel htmlFor="numPersonas">Número de viajeros</FormLabel>
                        <NumberInput id='numPersonas' defaultValue={1} max={100} clampValueOnBlur={false}>
                            <NumberInputField  {...register('numPersonas')} />
                        </NumberInput>
                    </FormControl>
                    <FormControl isInvalid={errors.presupuesto}>
                        <InputGroup>
                            <FormLabel htmlFor="presupuesto">Presupuesto total</FormLabel>
                            <NumberInput id='presupuesto' defaultValue={0} clampValueOnBlur={false}>
                                <NumberInputField  {...register('presupuesto')} />
                            </NumberInput>
                            <InputRightAddon children='€' />
                        </InputGroup>
                    </FormControl>
                    <Button type="submit" isLoading={isSubmitting} bg='#ED7C6F' color='white'
                        _hover={{ bg: '#F4AFAA' }}>
                        Guardar viaje
                    </Button>
                </Stack>
            </form>
        )
    };
    const { onOpen, onClose, isOpen } = useDisclosure();
    const firstField = React.useRef(null);

    return (
        <>
            <Button bg='#ED7C6F' className='mb-2' color='white' onClick={onOpen}>
                Crear nuevo viaje
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
                        Cree un viaje
                    </DrawerHeader>

                    <DrawerBody>
                        <Form firstFieldRef={firstField} onCancel={onClose} />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}
