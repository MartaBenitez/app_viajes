import { Box, Select, Input, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import React, { useState } from 'react';
import moment from 'moment';
import SuspensionCuenta from "../ventanas/SuspensionCuenta";

export default function TablaDatos({ datosUsuarios }) {

    const [filtroEstado, setFiltroEstado] = useState("todos");
    const [busquedaEmail, setBusquedaEmail] = useState("");
    const [ordenFecha, setOrdenFecha] = useState("ascendente");


    const ordenarDatos = (a, b) => {
        if (ordenFecha === "ascendente") {
            return a.fechaAlta.localeCompare(b.fechaAlta);
        } else {
            return b.fechaAlta.localeCompare(a.fechaAlta);
        }
    };

    const filtrarDatos = (elemento) => {
        if (filtroEstado === "todos" || elemento.estado === filtroEstado) {
            if (busquedaEmail === "" || elemento.email.includes(busquedaEmail)) {
                return true;
            }
        }
        return false;
    };
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                <Box p={4}>
            <Box mb={4} display="flex" alignItems="center">
                <Select
                    mr={2}
                    value={ordenFecha}
                    onChange={(e) => setOrdenFecha(e.target.value)}
                >
                    <option value="ascendente">Fecha de alta (Ascendente)</option>
                    <option value="descendente">Fecha de alta (Descendente)</option>
                </Select>
                <Select
                    mr={2}
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                >
                    <option value="todos">Filtre por estado</option>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                </Select>
                <Input
                    placeholder="Buscar por email"
                    value={busquedaEmail}
                    onChange={(e) => setBusquedaEmail(e.target.value)}
                />
            </Box>
            <Box overflowX="auto">
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Email</Th>
                        <Th>Nombre</Th>
                        <Th>Apellidos</Th>
                        <Th>Fecha Nacimiento</Th>
                        <Th>Fecha Alta</Th>
                        <Th>Fecha Baja</Th>
                        <Th>Estado</Th>
                        <Th>Acciones</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {datosUsuarios.filter(filtrarDatos).sort(ordenarDatos).map((usuario) => (
                        <Tr key={usuario._id}>
                            <Td>{usuario.email}</Td>
                            <Td>{usuario.nombre}</Td>
                            <Td>{usuario.apellidos}</Td>
                            <Td>{moment(usuario.fechaNacimiento).format('DD/MM/YYYY')}</Td>
                            <Td>{moment(usuario.fechaAlta).format('DD/MM/YYYY HH:MM')}</Td>
                            <Td>{usuario.fechaBaja === undefined ? "" : moment(usuario.fechaBaja).format('DD/MM/YYYY HH:MM')}</Td>
                            <Td>{usuario.estado}</Td>
                            <Td>{(usuario.estado === "activo" && usuario.rol === "user") ? <SuspensionCuenta usuario={usuario} /> : ""}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            </Box>
        </Box>
                </div>
            </div>
        </div>
        
    );
}