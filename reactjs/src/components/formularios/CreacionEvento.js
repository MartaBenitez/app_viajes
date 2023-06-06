import { NumberInput, Select, Textarea, NumberInputField, FormControl, FormLabel, Input, Stack, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { guardarEvento } from '../../api/Eventos';
import SelectorImagenes from './SelectorImagenes';
import Geocoder from '../mapas/Geocoder';

export default function CrearEvento({ listaDias }) {

   let idDia = listaDias[0]._id;
   const {
      handleSubmit,
      register,
      formState: { errors, isSubmitting },
   } = useForm()

   function onSubmit(evento) {
      const fechaICombinada = new Date(evento.dia);
      const horaFormateada = evento.horaInicio;

      fechaICombinada.setHours(horaFormateada.split(':')[0]);
      fechaICombinada.setMinutes(horaFormateada.split(':')[1]);
      
      const fechaI = `${fechaICombinada.getFullYear()}-${(fechaICombinada.getMonth() + 1).toString().padStart(2, '0')}-${fechaICombinada.getDate().toString().padStart(2, '0')} ${fechaICombinada.getHours().toString().padStart(2, '0')}:${fechaICombinada.getMinutes().toString().padStart(2, '0')}:${fechaICombinada.getSeconds().toString().padStart(2, '0')}`;
      const [horas, minutos] = evento.duracion.split(':').map(part => parseInt(part, 10));

      // Sumar las horas y los minutos a la fechaICombinada
      fechaICombinada.setHours(fechaICombinada.getHours() + horas);
      fechaICombinada.setMinutes(fechaICombinada.getMinutes() + minutos);
      const fechaF = `${fechaICombinada.getFullYear()}-${(fechaICombinada.getMonth() + 1).toString().padStart(2, '0')}-${fechaICombinada.getDate().toString().padStart(2, '0')} ${fechaICombinada.getHours().toString().padStart(2, '0')}:${fechaICombinada.getMinutes().toString().padStart(2, '0')}:${fechaICombinada.getSeconds().toString().padStart(2, '0')}`;
      let objEvento = {
         nombre: evento.nombre,
         idDia: idDia,
         fechaInicio: fechaI,
         idViaje: listaDias[0].idViaje,
         fechaFin: fechaF,
         tipo: imagenTipo,
         descripcion: evento.descripcion,
         enlace: evento.enlace,
         ubicacion:selectedLocation.name,
         longitud: selectedLocation.longitude,
         latitud: selectedLocation.latitude,
         precio: evento.precio
      }
      guardarEvento(objEvento)
         .then(response => {
            console.log(response)
         }).catch(error => {
            console.log(error)
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

   const [selectedLocation, setSelectedLocation] = useState(null);

   const handleLocationSelect = (location) => {
     setSelectedLocation(location);
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <Stack spacing={4}>
            <FormControl isInvalid={errors.nombre}>
               <FormLabel htmlFor="nombre">Nombre</FormLabel>
               <Input type="text" id="nombre" {...register('nombre', {
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
            <FormLabel htmlFor="ubicacion">Lugar</FormLabel>
            <Geocoder onLocationSelect={handleLocationSelect.bind(this)} />
            <FormControl isInvalid={errors.descripcion}>
               <FormLabel htmlFor="descripcion">Descripción</FormLabel>
               <Textarea
                  id='descripcion'
                  placeholder='Utilice este campo para escribir los detalles que quiera sobre el evento...'
                  size='sm'
                  {...register('descripcion')} />
            </FormControl>
            <FormControl isInvalid={errors.enlace}>
               <FormLabel htmlFor="enlace">Enlace</FormLabel>
               <Input type='url' id='enlace' {...register('enlace')} />
            </FormControl>
            <FormControl isInvalid={errors.presupuesto}>
               <FormLabel htmlFor="presupuesto">Precio</FormLabel>
               <NumberInput id='presupuesto' defaultValue={0} clampValueOnBlur={false}>
                  <NumberInputField  {...register('presupuesto')} />
               </NumberInput>
            </FormControl>
         </Stack>
         <Button type="submit" isLoading={isSubmitting} colorScheme='teal'>
            Guardar evento
         </Button>
      </form>
   );
}