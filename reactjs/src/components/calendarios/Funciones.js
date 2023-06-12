export function crearEventos(lista){
    let listaViajesEsquema = [];
    lista.forEach(viaje=> {
        let viajeEsquema= {};
        viajeEsquema.title=viaje.nombre;
        viajeEsquema.start=viaje.fechaInicio;
        let fecha=new Date(viaje.fechaInicio);
        fecha.setDate(fecha.getDate()+viaje.numDias);
        viajeEsquema.end=fecha.toISOString().split('T')[0] + ' ' + fecha.toTimeString().split(' ')[0];
        viajeEsquema.allDay=true;
        viajeEsquema.display='auto';
        viajeEsquema.color=viaje.color;
        viajeEsquema.textColor='black';
        listaViajesEsquema.push(viajeEsquema);
    });

    return listaViajesEsquema;
}