import { Breadcrumb, BreadcrumbItem, BreadcrumbLink} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const BreadcrumbTrail = ({ trail }) => {
  return (
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
      {trail.map((item, index) => (
        <BreadcrumbItem key={index}>
          {index === trail.length - 1 ? (
            <BreadcrumbLink as={Link} to={item.url} fontWeight="bold" color="#70AC62">
              {item.nombre}
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink as={Link} to={item.url}>
              {item.nombre}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbTrail;
