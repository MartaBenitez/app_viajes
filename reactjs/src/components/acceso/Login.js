import React from 'react';
import { useState } from 'react';
import { MDBValidationItem, MDBRow, MDBCol, MDBInput, MDBCheckbox, MDBBtn, MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane, MDBValidation } from 'mdb-react-ui-kit';

export default function App() {
  const [loginRegisterActive, setState] = useState('login');
  const handleLoginRegisterClick=(dato)=>{
    setState(dato)
  }
  const [formValue, setFormValue] = useState({
    email:'',
    contraseña:'',
  });
  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
    return (
    <div>
      <MDBTabs pills justify className='mb-3 align-content-center'>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleLoginRegisterClick('login')}
            active={loginRegisterActive === 'login'}
          >
            Inicie sesión
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleLoginRegisterClick('register')}
            active={loginRegisterActive === 'register'}
          >
            Regístrese
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent className='mb-3'>
        <MDBTabsPane show={loginRegisterActive === 'login'}>
          <form>
          <MDBValidation isValidated>
            <MDBValidationItem tooltip>
                <MDBInput className='mb-4' type='email' name='email' id='form7Example1' label='Email' value={formValue.email} onChange={onChange} required/>
            </MDBValidationItem>
            <MDBValidationItem>
                <MDBInput className='mb-4' type='password' name='contraseña' id='form7Example2' label='Contraseña' value={formValue.contraseña} onChange={onChange} required/>
            </MDBValidationItem>
          </MDBValidation>
            <MDBRow className='mb-4'>
              <MDBCol className='d-flex justify-content-center'>
                <MDBCheckbox id='form7Example3' label='Recordar datos de acceso' />
              </MDBCol>
              <MDBCol>
                <a href='#!'>¿Olvidó su contraseña?</a>
              </MDBCol>
            </MDBRow>

            <MDBBtn type='submit' className='mb-4' block>
              Entrar
            </MDBBtn>

            <div className='text-center'>
              <p>
                ¿No es miembro? <a href='#!'>Regístrese</a>
              </p>
            </div>
          </form>
        </MDBTabsPane>
        <MDBTabsPane show={loginRegisterActive === 'register'}>
          <form>

            <MDBInput className='mb-4' id='form8Example1' label='Nombre' />
            <MDBInput className='mb-4' id='form8Example2' label='Apellidos' />
            <MDBInput className='mb-4' type='date' id='form8Example2' label='Fecha de nacimiento' />
            <MDBInput className='mb-4' type='email' id='form8Example3' label='Email' />
            <MDBInput className='mb-4' type='password' id='form8Example4' label='Contraseña' />
            <MDBInput className='mb-4' type='password' id='form8Example5' label='Repetir contraseña' />

            <MDBCheckbox
              wrapperClass='d-flex justify-content-center mb-4'
              id='form8Example6'
              label='He leído y estoy de acuerdo con los términos y condiciones del servicio'
            />

            <MDBBtn type='submit' className='mb-4' block>
              Darse de alta
            </MDBBtn>
          </form>
        </MDBTabsPane>
      </MDBTabsContent>
    </div>
  );
}