import Navbar from "../components/comunes/NavbarInicio";
import Breadcrumbs from "../components/comunes/Breadcrumbs";
import SobreNosotros from "../components/otros/SobreNosotros";
const Nosotros = () => {
    const trail = [{nombre: 'Inicio',url:'/'},{nombre: 'Acerca de nosotros',url:'/sobre-nosotros'}];
    return (
        <>  
            <Navbar/>
            <Breadcrumbs trail={trail}/>
            <SobreNosotros /> 
        </>
   );
}
  
  export default Nosotros;