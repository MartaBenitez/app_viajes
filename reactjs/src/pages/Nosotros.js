import Navbar from "../components/comunes/NavbarInicio";
import Breadcrumbs from "../components/comunes/Breadcrumbs";
const Nosotros = () => {
    const trail = [{nombre: 'Inicio',url:'/'},{nombre: 'Acerca de nosotros',url:'/sobre-nosotros'}];
    return (
        <>  
            <Navbar/>
            <Breadcrumbs trail={trail}/>
        </>
   );
}
  
  export default Nosotros;