import { Grid, GridItem, IconButton } from '@chakra-ui/react';
import React from 'react';
import desplazamiento from '../../assets/images/coche.png';
import visita from '../../assets/images/castillo.png';
import comida from '../../assets/images/coco.png';
import alojamiento from '../../assets/images/hotel.png';

const ImageSelector = ({selectedImage, onTipoChange}) => {

  const handleImageClick = (event,tipo) => {
    event.preventDefault();
    onTipoChange(tipo);
  };

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={3} justifyContent='center'>
      <GridItem>
        <IconButton
          aria-label="Select Image"
          width='20px'
          marginLeft='17px'
          icon={<img src={desplazamiento} alt='icono de un desplazamiento que indica que el tipo desplazamiento' />}
          onClick={(event) => handleImageClick(event,'desplazamiento')}
          borderRadius="md"
          boxShadow={selectedImage === "desplazamiento" ? 'outline' : 'none'}
        />
        <p className='mt-1' style={{ textAlign: 'center', fontSize: '12px'}}>Desplazamiento</p>
      </GridItem>
      <GridItem>
        <IconButton
          aria-label="Select Image"
          width='20px'
          icon={<img src={visita} alt='icono de un desplazamiento que indica que el tipo desplazamiento' />}
          onClick={(event) => handleImageClick(event,'visita')}
          borderRadius="md"
          boxShadow={selectedImage === "visita" ? 'outline' : 'none'}
        />
        <p className='mt-1' style={{ textAlign: 'center', fontSize: '12px' }}>Visita</p>
      </GridItem>
      <GridItem>
        <IconButton
          aria-label="Select Image"
          width='20px'
          marginLeft='13px'
          icon={<img src={alojamiento} alt='icono de un desplazamiento que indica que el tipo desplazamiento' />}
          onClick={(event) => handleImageClick(event,'alojamiento')}
          borderRadius="md"
          boxShadow={selectedImage === "alojamiento" ? 'outline' : 'none'}
        />
        <p className='mt-1' style={{ textAlign: 'center', fontSize: '12px'}}>Alojamiento</p>
      </GridItem>

      <GridItem>
        <IconButton
          aria-label="Select Image"
          width='20px'
          icon={<img src={comida} alt='icono de un desplazamiento que indica que el tipo desplazamiento' />}
          onClick={(event) => handleImageClick(event,'comida')}
          borderRadius="md"
          boxShadow={selectedImage === "comida" ? 'outline' : 'none'}
        />
        <p className='mt-1' style={{ textAlign: 'center', fontSize: '12px'}}>Comida</p>
      </GridItem>

    </Grid>
  );
};

export default ImageSelector;
