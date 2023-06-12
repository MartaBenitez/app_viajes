import React, { useState } from 'react';
import { Tabs, TabList,Tab } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { IoMdHome } from 'react-icons/io';


export default function Navbar() {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleTabClick = (index, path) => {
    setActiveTab(index);
    navigate(path);
  };

  return (
    <Tabs
    variant='enclosed'
    borderColor="#6CC6E9"
    isFitted
    index={activeTab}
  >
    <TabList mb="1em">
      <Tab onClick={() => handleTabClick(0, '/')} style={{ color: 'black', backgroundColor:'#6CC6E9'}} 
          _hover={{ boxShadow: 'inset 0px -4px 0px  #FFDB70' }}>
        <IoMdHome />
        Inicio
      </Tab>
      <Tab onClick={() => handleTabClick(1, '/sobre-nosotros')}
       _hover={{ boxShadow: 'inset 0px -4px 0px  #FFDB70' }}>
        Acerca de nosotros
      </Tab>
      <Tab onClick={() => handleTabClick(2, '/acceso')}
      _hover={{ boxShadow: 'inset 0px -4px 0px  #FFDB70' }}>
        Accede
      </Tab>
    </TabList>
  </Tabs>
  );
}
