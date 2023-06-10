import React from 'react';
import logo from '../../assets/images/logo.png';
import { Button} from '@chakra-ui/react';

export default function Navbar() {
    return (
        <header>
            <div fluid>
                <div className='bg-light'>
                    <img src={logo} width="500px" className="mx-auto d-block"/>
                </div>
            </div>
        </header>
    );
}
