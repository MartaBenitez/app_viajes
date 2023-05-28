export function sacarFecha(date){
    const fechaLarga = date.toLocaleString("es-ES",
        {weekday: 'long', day: "2-digit", month: "long", year: "numeric"});
    return fechaLarga;
}
