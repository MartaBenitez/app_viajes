import React, { useState } from 'react';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBIcon, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBCollapse,} from 'mdb-react-ui-kit';

export default function Navbar() {
    const [showBasic, setShowBasic] = useState(false);
  
    return (
      <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer fluid className='mx-5'>
          <MDBNavbarBrand href='/'>Logo</MDBNavbarBrand>
  
          <MDBNavbarToggler
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
  
          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0 mx-5'>
              <MDBNavbarItem>
                <MDBNavbarLink active aria-current='page' href='/'><i class="fas fa-house"></i></MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/acceso'>Acceder</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <MDBNavbarNav  right fullWidth={false} className='mb-2 mb-lg-0'>
                <MDBNavbarItem className='d-flex w-auto'>
                <MDBNavbarLink href='#'><i class="far fa-bell"></i></MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem className='d-flex w-auto'>
                <MDBNavbarLink href='#'>
                    <img 
                     src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg"
                     class="rounded-circle"
                     height="30"
                     alt="mi cuenta"
                     loading="lazy"
                     />
                </MDBNavbarLink>
                </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    );
  }