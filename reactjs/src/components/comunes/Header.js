import React from 'react';
import { MDBContainer } from 'mdb-react-ui-kit';
import logo from '../../assets/images/logo.png';

export default function Navbar() {
    return (
        <header>
            <MDBContainer fluid>
                <div className='p-2 bg-light'>
                    <img src={logo} width="500px" className="mx-auto d-block"/>
                </div>
            </MDBContainer>
        </header>
    );
}
