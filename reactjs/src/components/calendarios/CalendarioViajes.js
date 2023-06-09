import React from 'react';
import { crearEventos } from './Funciones';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' 
import momentPlugin from '@fullcalendar/moment';
import 'moment/locale/es';

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
      buttonText: {
        today: 'Hoy'
      },
    }
  } else {
    calendarOptions = {
      plugins: [dayGridPlugin, momentPlugin],
      locale: 'es',
      firstDay: 1,
      initialView: 'dayGridMonth',
      height: 'auto',
      buttonText: { today: 'Hoy' },
      themeSystem: 'bootstrap'
    }
  }


  return (
    <div className="col-12 col-md-8 col-lg-6">
      <FullCalendar {...calendarOptions} />
    </div>
  )
};
