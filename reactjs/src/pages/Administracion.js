import Navbar from '../components/comunes/NavbarUser';
import Breadcrumbs from "../components/comunes/Breadcrumbs";
import React, { useState, useEffect } from 'react';
import { Alert, AlertIcon } from '@chakra-ui/react';
import { pedirUsuarios } from '../api/Usuario';
import TablaUsuarios from '../components/otros/TablaUsuarios';

const Administracion = () => {
  const trail = [{ nombre: 'Inicio', url: '/' }, { nombre: 'Administracion', url: '/admin' }];
  const [datosUsuarios, setDatosUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    pedirUsuarios()
      .then(response => {
        if (response.status === 200) {
          setDatosUsuarios(response.data);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Breadcrumbs trail={trail} />
      {isLoading && <div>Cargando datos...</div>}
      {error && (
        <Alert status='error'>
          <AlertIcon />
          Error al obtener los datos de los usuarios
        </Alert>
      )}
      {!isLoading && !error && (
        <TablaUsuarios datosUsuarios={datosUsuarios} />
      )}
    </>
  );
}

export default Administracion;
