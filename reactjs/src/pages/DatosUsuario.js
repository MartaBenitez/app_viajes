import Navbar from '../components/comunes/NavbarUser';
import Breadcrumbs from "../components/comunes/Breadcrumbs";
import React, { useState, useEffect } from 'react';
import { Alert, AlertIcon } from '@chakra-ui/react';
import { pedirUsuario } from '../api/Usuario';
import MostrarDatos from '../components/otros/MostrarDatos';

const DatosUsuario = () => {
  const trail = [{ nombre: 'Inicio', url: '/' },{ nombre: 'Mi perfil', url: '/perfil' }];
  const [dataUsuario, setDataUsuario] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    pedirUsuario()
      .then(response => {
        if (response.status === 200) {
          setDataUsuario(response.data);
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
          Error al obtener los datos de usuario. Lo sentimos.
        </Alert>
      )}
      {!isLoading && !error && (
        <MostrarDatos dataUsuario={dataUsuario} />
      )}
    </>
  );
}

export default DatosUsuario;
