import { NumberInput, NumberInputField, useDisclosure, FocusLock, FormControl, FormLabel, Input, Stack, Button, Popover, PopoverTrigger, ButtonGroup, PopoverArrow, PopoverCloseButton, PopoverContent } from '@chakra-ui/react';
import SelectorColor from './SelectorColor';
import React, {useState} from 'react';
import { useForm } from 'react-hook-form'
import { guardarViaje } from '../../api/Viajes';


export default function NuevoViaje() {

    let manana = new Date();
    manana.setDate(manana.getDate() + 1);
    const fechaManana = manana.toISOString().split("T")[0];
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

    function onSubmit(values) {
        values.color=colorViaje;
        console.log(values.color)
        guardarViaje(values)
        .then(res => {
            console.log(res);
            if(res.status===200){
                alert('viaje guardado correctamente');
            }
        }).catch(res => {
            console.log(res); // Maneja el error de la petición

        });

    }

    const [colorViaje, setColorViaje] = useState("#FFC0CB");

    const Form = ({ firstFieldRef }) => {
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <SelectorColor  selectedColor={colorViaje} onColorChange={setColorViaje}/>
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
                        <Input type="date" defaultValue={ fechaManana } id="fechaInicio" {...register('fechaInicio', {
                            required: 'This is required', min: { fechaManana }
                        })} />
                    </FormControl>
                    <FormControl isInvalid={errors.numDias}>
                        <FormLabel htmlFor="numDias">Número de días</FormLabel>
                        <NumberInput  id='numDias' defaultValue={1} max={100} clampValueOnBlur={false}>
                            <NumberInputField  {...register('numDias', {
                            required: 'This is required'})}/>
                        </NumberInput>
                    </FormControl>
                    <FormControl isInvalid={errors.numPersonas}>
                        <FormLabel htmlFor="numPersonas">Número de viajeros</FormLabel>
                        <NumberInput  id='numPersonas' defaultValue={1} max={100} clampValueOnBlur={false}>
                            <NumberInputField  {...register('numPersonas')}/>
                        </NumberInput>
                    </FormControl>
                    <FormControl isInvalid={errors.presupuesto}>
                        <FormLabel htmlFor="presupuesto">Presupuesto total</FormLabel>
                        <NumberInput  id='presupuesto' defaultValue={0} clampValueOnBlur={false}>
                            <NumberInputField  {...register('presupuesto')}/>
                        </NumberInput>
                    </FormControl>
                    <ButtonGroup display='flex' justifyContent='flex-end'>
                        <Button type="submit" isLoading={isSubmitting} colorScheme='teal'>
                            Guardar viaje
                        </Button>
                    </ButtonGroup>
                </Stack>
            </form>
        )
    };
    const { onOpen, onClose, isOpen } = useDisclosure();
    const firstFieldRef = React.useRef(null);

    return (
        <Popover
            isOpen={isOpen}
            initialFocusRef={firstFieldRef}
            onOpen={onOpen}
            onClose={onClose}
            closeOnBlur={false}
        >
            <PopoverTrigger>
                <Button>Crear viaje</Button>
            </PopoverTrigger>
            <PopoverContent p={5}>
                <FocusLock returnFocus persistentFocus={false}>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <Form firstFieldRef={firstFieldRef} onCancel={onClose} />
                </FocusLock>
            </PopoverContent>
        </Popover>
    );
}
