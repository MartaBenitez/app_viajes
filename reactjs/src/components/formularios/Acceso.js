import React, { useState } from 'react';
import { logearUsuario, registrarUsuario } from '../../api/Acceso';
import { validacionLogin, validacionRegistro } from './Validacion';
import * as jose from 'jose';
import { MDBInput, MDBValidation, MDBValidationItem, MDBBtn, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit';
import { Button, HStack, Alert, AlertIcon, AlertDescription, AlertTitle, CircularProgress, Heading } from '@chakra-ui/react';

export default function App() {
    const [loginRegisterActive, setLoginRegisterActive] = useState('login');

    const handleLoginRegisterClick = (type) => {
        setLoginRegisterActive(type);
    };

    //Login
    const [formValueLogin, setFormValueLogin] = useState({
        email: '',
        contrasena: '',
    })
    const [isLogged, setIsLogged] = useState(false);
    const [errorLogged, setErrorLogged] = useState(false);

    function handleSubmitLogin(e) {
        e.preventDefault();
        let errores = validacionLogin(formValueLogin);
        if (!errores) {
            logearUsuario(formValueLogin)
                .then(res => {
                    console.log(res);
                    setIsLogged(true)
                    setErrorLogged(false);
                    const token = sessionStorage.getItem('token');
                    if (token) {
                        const decodedToken = jose.decodeJwt(token);
                        const rol = decodedToken.rol;
                        if (rol === 'admin') {
                            window.setTimeout(function () { window.location = "/admin"; }, 5000)
                        } else {
                            window.setTimeout(function () { window.location = "/viajes"; }, 5000)
                        }
                    }
                })
                .catch(res => {
                    console.log(res); // Maneja el error de la petición
                    setErrorLogged(true);
                    setIsLogged(false)
                });
        } else {
            setErrorLogged(true);
            setIsLogged(false)
        }
    }

    const onChangeLogin = (e) => {
        setFormValueLogin({ ...formValueLogin, [e.target.name]: e.target.value });
    };


    //Registro
    const fechaMaxima = `${(new Date().getFullYear()) - 14}-${String((new Date().getMonth()) + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`
    const [formValueRegistro, setFormValueRegistro] = useState({
        email: '',
        contrasena: '',
        nombre: '',
        apellidos: '',
        fechaNacimiento: '',
    })
    const [isRegistred, setIsRegistred] = useState(false);
    const [errorRegistred, setErrorRegistred] = useState(false);

    function handleSubmitRegistro(e) {
        e.preventDefault();
        let errores = validacionRegistro(formValueRegistro);
        if (!errores) {
            registrarUsuario(formValueRegistro)
                .then(res => {
                    console.log(res);
                    setIsRegistred(true)
                    setErrorRegistred(false);
                    window.setTimeout(function () { window.location = "/acceso"; }, 5000)
                })
                .catch(res => {
                    console.log(res); // Maneja el error de la petición
                    setErrorRegistred(true);
                    setIsRegistred(false)
                });
        } else {
            setErrorRegistred(true);
            setIsRegistred(false)
        }
    }
    const onChangeRegistro = (e) => {
        setFormValueRegistro({ ...formValueRegistro, [e.target.name]: e.target.value });
    };


    return (
        <div class="container text-center bg-light">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 mb-4 align-self-center">
                    <HStack spacing={4} className='pb-4' justify="center">
                        <Button
                            variant="solid"
                            flex={1}
                            bg="#ED7C6F"
                            onClick={() => handleLoginRegisterClick('login')}
                            isActive={loginRegisterActive === 'login'}
                        >
                            Entra
                        </Button>
                        <Button
                            variant="solid"
                            flex={1}
                            bg="#ED7C6F"
                            onClick={() => handleLoginRegisterClick('register')}
                            isActive={loginRegisterActive === 'register'}
                        >
                            Regístrate
                        </Button>
                    </HStack>
                    <MDBTabsContent>
                        <MDBTabsPane show={loginRegisterActive === 'login'}>
                            <MDBValidation className='row g-3' isValidated>
                                <label>Email</label>
                                <MDBValidationItem className='col-md-12 my-2' feedback='Email incorrecto.' invalid>
                                    <MDBInput className='form-control' type='email' name='email' onChange={onChangeLogin} required />
                                </MDBValidationItem>
                                <label>Contraseña</label>
                                <MDBValidationItem className='col-md-12 my-2' feedback='Contraseña incorrecta. Solo puede contener letras, números y/o los caracteres *?#@$. Entre 8 y 25 caracteres en total.' invalid>
                                    <MDBInput className='form-control' type='password' id='contrasena' name='contrasena' onChange={onChangeLogin} pattern="[a-zA-Z0-9*?#@$]{8,25}" required />
                                </MDBValidationItem>
                                {isLogged && (
                                    <div>
                                        <Alert
                                            status='success'
                                            variant='subtle'
                                            flexDirection='column'
                                            alignItems='center'
                                            justifyContent='center'
                                            textAlign='center'
                                            height='200px'
                                        >
                                            <AlertIcon boxSize='40px' mr={0} />
                                            <AlertTitle mt={4} mb={1} fontSize='lg'>
                                                Sesión iniciada correctamente
                                            </AlertTitle>
                                            <AlertDescription maxWidth='sm'>
                                                En unos segundos será redirigido
                                            </AlertDescription>
                                            <CircularProgress isIndeterminate color='green.300' />
                                        </Alert>
                                    </div>
                                )}
                                {errorLogged && (
                                    <Alert status='error'>
                                        <AlertIcon />
                                        Error al iniciar sesión
                                    </Alert>
                                )}
                                <Button
                                    variant="solid"
                                    flex='full'
                                    bg='#70AC62'
                                    type='submit'
                                    onClick={handleSubmitLogin}
                                >
                                    Enviar
                                </Button>

                            </MDBValidation>
                        </MDBTabsPane>
                        <MDBTabsPane show={loginRegisterActive === 'register'}>
                            <MDBValidation className='row g-3' isValidated>
                                <MDBValidationItem className='col-md-12 my-3' feedback='Nombre incorrecto. No puede contener números ni caracteres especiales excepto -' invalid>
                                    <MDBInput className='form-control' id='nombre' name='nombre' label='Nombre' onChange={onChangeRegistro} pattern='[a-zA-Z\u00C0-\u017F\s-]{3,25}' required />
                                </MDBValidationItem>
                                <MDBValidationItem className='col-md-12 my-3' feedback='Apellidos incorrectos. No puede contener números ni caracteres especiales excepto -' invalid>
                                    <MDBInput className='mb-4' id='apellidos' name='apellidos' label='Apellidos' onChange={onChangeRegistro} pattern='[a-zA-Z\u00C0-\u017F\s-]{3,50}' required />
                                </MDBValidationItem>
                                <MDBValidationItem className='col-md-12 my-3' feedback='Fecha inválida. Tiene que tener al menos 14 años para registrarse.' invalid>
                                    <MDBInput className='mb-4' type='date' id='fechaNacimiento' name='fechaNacimiento' label='Fecha de nacimiento' onChange={onChangeRegistro} min='1900-01-01' max={fechaMaxima} required />
                                </MDBValidationItem>
                                <MDBValidationItem className='col-md-12 my-3' feedback='Email incorrecto.' invalid>
                                    <MDBInput className='form-control' type='email' id='email' name='email' label='Email' onChange={onChangeRegistro} required />
                                </MDBValidationItem>
                                <MDBValidationItem className='col-md-12 my-3' feedback='Contraseña incorrecta. Solo puede contener letras, números y/o los caracteres *?#@$. Entre 8 y 25 caracteres en total.' invalid>
                                    <MDBInput className='form-control' type='password' id='contrasena' name='contrasena' label='Contraseña' onChange={onChangeRegistro} pattern="[a-zA-Z0-9*?#@$]{8,25}" required />
                                </MDBValidationItem>
                                {isRegistred && (
                                    <div>
                                        <Alert
                                            status='success'
                                            variant='subtle'
                                            flexDirection='column'
                                            alignItems='center'
                                            justifyContent='center'
                                            textAlign='center'
                                            height='200px'
                                        >
                                            <AlertIcon boxSize='40px' mr={0} />
                                            <AlertTitle mt={4} mb={1} fontSize='lg'>
                                                Sesión iniciada correctamente
                                            </AlertTitle>
                                            <AlertDescription maxWidth='sm'>
                                                En unos segundos será redirigido
                                            </AlertDescription>
                                            <CircularProgress isIndeterminate color='green.300' />
                                        </Alert>
                                    </div>
                                )}
                                {errorRegistred && (
                                    <Alert status='error'>
                                        <AlertIcon />
                                        Error al iniciar sesión
                                    </Alert>
                                )}
                                <MDBBtn className="mb-4" type='submit' block onClick={handleSubmitRegistro}>Enviar</MDBBtn>
                            </MDBValidation>
                        </MDBTabsPane>
                    </MDBTabsContent>
                </div>
            </div>
        </div>
    );
}