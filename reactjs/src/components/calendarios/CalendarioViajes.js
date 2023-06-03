import React from 'react';
import { crearEventos } from './Funciones';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import momentPlugin from '@fullcalendar/moment';

import 'moment/locale/es'; // Importa el archivo de idioma que deseas utilizar

export default function Calendario({ listaViajes }) {
  let calendarOptions;
  if (listaViajes.length > 0) {
    const listaViajesEsquema = crearEventos(listaViajes);
    calendarOptions = {
      plugins: [dayGridPlugin, momentPlugin],
      locale: 'es',
      firstDay: 1,
      initialView: 'dayGridMonth',
      height: 'auto',
      events: listaViajesEsquema,
    }
    console.log(listaViajesEsquema)
  } else {
    calendarOptions = {
      plugins: [dayGridPlugin, momentPlugin],
      locale: 'es',
      firstDay: 1,
      initialView: 'dayGridMonth',
      height: 'auto',
      buttonText: { today: 'Hoy' },
    }
  }


  return (
    <div className="col-12 col-md-8 col-lg-6">
      <FullCalendar {...calendarOptions} />
    </div>
  )
};
