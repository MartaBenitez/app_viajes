import { useToast, InputRightAddon,InputGroup, NumberInput, Select, Textarea, NumberInputField, useDisclosure, Drawer, DrawerBody, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerOverlay, FormControl, FormLabel, Input, Stack, Button } from '@chakra-ui/react';
import React, { useState} from 'react';
import { useForm } from 'react-hook-form';
import { editarEvento } from '../../api/Eventos';
import SelectorImagenes from './SelectorImagenes';

export default function EdicionEvento({listaDias, evento }) {
   const toast = useToast();
    let idDia = listaDias[0]._id;
    let idEvento=evento._id;
    const {
       handleSubmit,
       register,
       formState: { errors, isSubmitting },
    } = useForm()
 
    function onSubmit(values) {
       const fechaICombinada = new Date(values.dia);
       const horaFormateada = values.horaInicio;
       var color;

      switch (imagenTipo) {
         case "desplazamiento": color = '#6CC6E9';
            break;
         case "comida": color = '#FFDB70';
            break;
         case "visita": color = '#70AC62';
            break;
         case "alojamiento": color = '#ED7C6F';
            break;
         default: color = '#6CC6E9';
      }
 
       fechaICombinada.setHours(horaFormateada.split(':')[0]);
       fechaICombinada.setMinutes(horaFormateada.split(':')[1]);
       
       const fechaI = `${fechaICombinada.getFullYear()}-${(fechaICombinada.getMonth() + 1).toString().padStart(2, '0')}-${fechaICombinada.getDate().toString().padStart(2, '0')} ${fechaICombinada.getHours().toString().padStart(2, '0')}:${fechaICombinada.getMinutes().toString().padStart(2, '0')}:${fechaICombinada.getSeconds().toString().padStart(2, '0')}`;
       const [horas, minutos] = values.duracion.split(':').map(part => parseInt(part, 10));
 
       fechaICombinada.setHours(fechaICombinada.getHours() + horas);
       fechaICombinada.setMinutes(fechaICombinada.getMinutes() + minutos);
       const fechaF = `${fechaICombinada.getFullYear()}-${(fechaICombinada.getMonth() + 1).toString().padStart(2, '0')}-${fechaICombinada.getDate().toString().padStart(2, '0')} ${fechaICombinada.getHours().toString().padStart(2, '0')}:${fechaICombinada.getMinutes().toString().padStart(2, '0')}:${fechaICombinada.getSeconds().toString().padStart(2, '0')}`;
       let objEvento = {
          nombre: values.nombre,
          idDia: idDia,
          fechaInicio: fechaI,
          idViaje: listaDias[0].idViaje,
          fechaFin: fechaF,
          tipo: imagenTipo,
          descripcion: values.descripcion,
          enlace: values.enlace,
          precio: values.precio,
          color: color
       }
       editarEvento(objEvento, idEvento)
          .then(res => {
            if (res.status === 200) {
               toast({
                 title: 'Evento editado correctamente',
                 status: 'success',
                 duration: 3000,
                 isClosable: true
             });
             setTimeout(() => { window.location.reload(); }, 1000);
             }else{
               toast({
                 title: 'Error al editar el evento',
                 description: 'Hubo un error al editar el evento',
                 status: 'error',
                 duration: 3000,
                 isClosable: true,
             });
             }
          }).catch(() => {
            toast({
               title: 'Error al editar el evento',
               description: 'Hubo un error al editar el evento',
               status: 'error',
               duration: 3000,
               isClosable: true,
           });
          });
    }
 
    const opcionesDuracion = [];
 
    for (let minutos = 30; minutos <= 8 * 60; minutos += 30) {
       const horas = Math.floor(minutos / 60);
       const minutosRestantes = minutos % 60;
       const duracion = `${horas.toString().padStart(2, '0')}:${minutosRestantes.toString().padStart(2, '0')}`;
       opcionesDuracion.push(
          <option key={duracion} value={duracion}>
             {duracion}
          </option>
       );
    }
 
    function formatearDia(dia) {
       dia = new Date(dia);
       return dia.getDate() + "-" + (dia.getMonth() + 1) + "-" + dia.getFullYear();
    }
 
    const [imagenTipo, setImagenTipo] = useState("desplazamiento");
 
 
  const Form = ({ firstFieldRef }) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
           <FormControl isInvalid={errors.nombre}>
              <FormLabel htmlFor="nombre">Nombre</FormLabel>
              <Input type="text" id="nombre" defaultValue={evento.nombre}{...register('nombre', {
                 required: 'This is required'
              })} />
           </FormControl>
           <FormControl isInvalid={errors.tipo}>
              <FormLabel htmlFor="tipo">Tipo de evento</FormLabel>
              <SelectorImagenes selectedImage={imagenTipo} onTipoChange={setImagenTipo} />
           </FormControl>
           <FormControl isInvalid={errors.dia}>
              <FormLabel htmlFor="dia">Dia</FormLabel>
              <Select id="dia"  {...register('dia', {
                 required: 'This is required'
              })}>
                 <option value="">Selecciona un día</option>
                 {listaDias.map((dia, index) => (
                    <option key={index} value={dia.fecha}>
                       {formatearDia(dia.fecha)}
                    </option>
                 ))}
              </Select>
           </FormControl>
           <FormControl isInvalid={errors.horaInicio}>
              <FormLabel htmlFor="horaInicio">Hora de inicio</FormLabel>
              <Input type='time' id='horaInicio' {...register('horaInicio', {
                 required: 'This is required'
              })} />
           </FormControl>
           <FormControl isInvalid={errors.duracion}>
              <FormLabel htmlFor="duracion">Duración</FormLabel>
              <Select id="duracion"  {...register('duracion', {
                 required: 'This is required'
              })}>
                 <option value="">Selecciona la duración del evento</option>
                 {opcionesDuracion.map((opcion, index) => (
                    <option key={index} value={opcion.value}>
                       {opcion}
                    </option>
                 ))}
              </Select>
           </FormControl>
           <FormControl isInvalid={errors.descripcion}>
              <FormLabel htmlFor="descripcion">Descripción</FormLabel>
              <Textarea
                 id='descripcion'
                 defaultValue={evento.descripcion}
                 placeholder='Utilice este campo para escribir los detalles que quiera sobre el evento...'
                 size='sm'
                 {...register('descripcion')} />
           </FormControl>
           <FormControl isInvalid={errors.enlace}>
              <FormLabel htmlFor="enlace">Enlace</FormLabel>
              <Input type='url' id='enlace'  defaultValue={evento.enlace}{...register('enlace')} />
           </FormControl>
           <FormControl isInvalid={errors.presupuesto}>
               <InputGroup>
               <FormLabel htmlFor="precio">Precio</FormLabel>
               <NumberInput id='precio' defaultValue={evento.precio} clampValueOnBlur={false}>
                  <NumberInputField  {...register('precio')} />
               </NumberInput>
               <InputRightAddon children='€' />
               </InputGroup>
            </FormControl>
           <Button type="submit" isLoading={isSubmitting} bg='#ED7C6F' color='white'
               _hover={{ bg: '#F4AFAA' }}>
               Editar evento
            </Button>
        </Stack>
     </form>
    )
  };

  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstField = React.useRef(null);

  return (
    <>
    <Button className='mx-2' color='black' bg='#6CC6E9' onClick={onOpen}>
    Editar evento
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
                    Edite {evento.nombre}
                    </DrawerHeader>

                    <DrawerBody>
                        <Form firstFieldRef={firstField} onCancel={onClose} />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            </>
  );
}
