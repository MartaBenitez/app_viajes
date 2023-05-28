import React, { useState } from 'react';
import { Tabs, TabList,Tab } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleTabClick = (index, path) => {
    setActiveTab(index);
    navigate(path);
  };

  return (
    <Tabs variant='enclosed' className="bg-light" isFitted index={activeTab}>
      <TabList mb='1em'>
        <Tab onClick={() => handleTabClick(0, '/')}>
        <i class="fas fa-house-chimney"></i>
        </Tab>
        <Tab onClick={() => handleTabClick(1, '/sobre-producto')}>
          Sobre el producto
        </Tab>
        <Tab onClick={() => handleTabClick(2, '/sobre-nosotros')}>
          Sobre nosotros
        </Tab>
        <Tab onClick={() => handleTabClick(3, '/acceso')}>
          Accede
        </Tab>
      </TabList>
    </Tabs>
  );
}
