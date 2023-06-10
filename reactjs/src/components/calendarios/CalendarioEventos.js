import React, { useEffect, useRef, useState } from 'react';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import momentPlugin from '@fullcalendar/moment';
import interactionPlugin from '@fullcalendar/interaction';

import 'moment/locale/es';
import Evento from '../formularios/Evento';

export default function CalendarioEventos({listaDias, listaEventos}) {
  const calendarRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const eventosCalendario = listaEventos.map(evento => ({
    title: evento.nombre,
    color:evento.color,
    textColor:'black',
    start: evento.fechaInicio,
    end: evento.fechaFin
  }));
  console.log(eventosCalendario)
  useEffect(() => {
    if (listaDias.length === 0) {
      return;
    }

    const primerDia = new Date(listaDias[0].fecha);
    const primerDiaF = primerDia.toISOString().split('T')[0];
    const ultimoDia = new Date(listaDias[listaDias.length - 1].fecha);
    ultimoDia.setDate(ultimoDia.getDate()+1);
    const ultimoDiaF = ultimoDia.toISOString().split('T')[0];

    const calendarEl = calendarRef.current;
    const calendar = new Calendar(calendarEl, {
      plugins: [timeGridPlugin, momentPlugin, interactionPlugin],
      locale: 'es',
      initialView: 'timeGridDay',
      events:eventosCalendario,
      validRange: {
        start: primerDiaF,
        end: ultimoDiaF,
      },
      headerToolbar: {
        start: 'prev,next',
        center: 'title',
        end: '',
      },
      views: {
        timeGridDay: {
          type: 'timeGrid',
          duration: { days: 1 },
        },
      },
      selectable: true,
      select: handleDateSelect
    });

    calendar.render();


    return () => {
      calendar.destroy();
    };
  }, [listaDias,eventosCalendario]);

  function handleDateSelect(info) {
    const { startStr, endStr } = info;
    setSelectedDate({ start: startStr, end: endStr })
  }


  return (
    <>
    <div className="col-12 col-md-6">
      <div id="calendar" ref={calendarRef}></div>
    </div>
    <div className="col-12 col-md-6">
      <Evento listaDias={listaDias} listaEventos={listaEventos}/>
    </div>
    </>
  );
}
