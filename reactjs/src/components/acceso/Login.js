import React, { useState } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBCheckbox, MDBBtn, MDBValidationItem, MDBValidation} from 'mdb-react-ui-kit';
import {logearUsuario} from '../../api/Acceso'
import {validacionLogin} from './Validacion'


export default function Login() {

 const [formValue, setFormValue]=useState({
    email:'',
    contrasena:'',
  })

  function handleSubmit(e) {
    e.preventDefault();
    let errores=validacionLogin(formValue);
    if(!errores){
      logearUsuario(formValue)
    }else{
      alert("Error")
    }
   
  }

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
      <MDBValidation className='row g-3' isValidated>
        <MDBValidationItem className='col-md-12 my-2' feedback='Email incorrecto.' invalid>
          <MDBInput className='form-control' type='email' id='email' name='email' label='Email' onChange={onChange} required />
        </MDBValidationItem>
        <MDBValidationItem className='col-md-12 my-2' feedback='Contraseña incorrecta. Solo puede contener letras, números y/o los caracteres *?#@$. Entre 8 y 25 caracteres en total.' invalid>
          <MDBInput className='form-control' type='password' id='contrasena' name='contrasena' label='Contraseña' onChange={onChange} pattern="[a-zA-Z0-9*?#@$]{8,25}" required/>
        </MDBValidationItem>
      <MDBRow className='mb-4'>
        <MDBCol className='d-flex justify-content-center'>
          <MDBCheckbox id='recuerdame' label='Recordar datos acceso' />
        </MDBCol>
        <MDBCol>
          <a href='#!'>¿Olvidó su contraseña?</a>
        </MDBCol>
      </MDBRow>

      <MDBBtn type='submit' block onClick={handleSubmit}>Enviar</MDBBtn>
      <div className='text-center my-5'>
        <p>
          ¿No está registrado? <a href='/registro'>Regístrese</a>
        </p>
      </div>
      </MDBValidation>
  );
}

