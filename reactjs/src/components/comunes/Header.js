import React from 'react';
import logo from '../../assets/images/logo.png';

export default function Navbar() {
    return (
        <header>
            <div fluid>
                <div className='bg-light'>
                    <img src={logo} width="500px" className="mx-auto d-block" alt='Logo de planiviaje. Describe un cuadero con el planeta tierra, un avión y unos sellos además de el nombre Planiviaje.' />
                </div>
            </div>
        </header>
    );
}
