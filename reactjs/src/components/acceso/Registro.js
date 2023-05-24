import React, { useState } from 'react';
import {MDBInput, MDBBtn, MDBValidationItem, MDBValidation} from 'mdb-react-ui-kit';
import {registrarUsuario} from '../../api/Acceso'
import {validacionRegistro} from './Validacion'


export default function Login() {
 const fechaMaxima= `${(new Date().getFullYear())-14}-${String((new Date().getMonth())+1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`
 const [formValue, setFormValue]=useState({
    email:'',
    contrasena:'',
    nombre:'',
    apellidos:'',
    fechanac:'',
    repcontrasena:'',
  })

  function handleSubmit(e) {
    e.preventDefault();
    let errores=validacionRegistro(formValue);
    if(!errores){
      registrarUsuario(formValue)
    }else{
      alert("Error")
    }
   
  }

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
      <MDBValidation className='row g-3' isValidated>
        <MDBValidationItem className='col-md-12 my-2' feedback='Nombre incorrecto. No puede contener números ni caracteres especiales excepto -.' invalid>
            <MDBInput className='form-control' id='nombre' name='nombre' label='Nombre' onChange={onChange} pattern='[a-zA-Z\s-]{3,25}' required />
        </MDBValidationItem>
        <MDBValidationItem className='col-md-12 my-2' feedback='Apellidos incorrectos. No puede contener números ni caracteres especiales excepto -.' invalid>
            <MDBInput className='mb-4' id='apellidos' name='apellidos' label='Apellidos' onChange={onChange} pattern='[a-zA-Z\s-]{3,25}' required />
        </MDBValidationItem>
        <MDBValidationItem className='col-md-12 my-2' feedback='Fecha inválida. Tiene que tener al menos 14 años para registrarse.' invalid>
            <MDBInput className='mb-4' type='date' id='fechanac' name='fechanac' label='Fecha de nacimiento' onChange={onChange} min='1900-01-01' max={fechaMaxima} required/>
        </MDBValidationItem>
        <MDBValidationItem className='col-md-12 my-2' feedback='Email incorrecto.' invalid>
          <MDBInput className='form-control' type='email' id='email' name='email' label='Email' onChange={onChange} required />
        </MDBValidationItem>
        <MDBValidationItem className='col-md-12 my-2' feedback='Contraseña incorrecta. Solo puede contener letras, números y/o los caracteres *?#@$. Entre 8 y 25 caracteres en total.' invalid>
          <MDBInput className='form-control' type='password' id='contrasena' name='contrasena' label='Contraseña' onChange={onChange} pattern="[a-zA-Z0-9*?#@$]{8,25}" required/>
        </MDBValidationItem>
        <MDBValidationItem className='col-md-12 my-2' feedback='Contraseña incorrecta.' invalid>
          <MDBInput className='form-control' type='password' id='repcontrasena' name='repcontrasena' label='Repetir contraseña' onChange={onChange} pattern="[a-zA-Z0-9*?#@$]{8,25}" required/>
        </MDBValidationItem>

      <MDBBtn type='submit' block onClick={handleSubmit}>Enviar</MDBBtn>
      <div className='text-center my-5'>
        <p>
          ¿Ya está registrado? <a href='/acceso'>Acceda con su cuenta</a>
        </p>
      </div>
      </MDBValidation>
  );
}

