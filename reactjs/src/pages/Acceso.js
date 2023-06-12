import Acceso from '../components/formularios/Acceso';
import Navbar from "../components/comunes/NavbarInicio";
import Breadcrumbs from "../components/comunes/Breadcrumbs";
const Accede = () => {
    const trail = [{nombre: 'Inicio',url:'/'},{nombre: 'Accede',url:'/acceso'}];
    return (
        <>  
            <Navbar/>
            <Breadcrumbs trail={trail}/>
            <Acceso />
        </>
   );
}
  
  export default Accede;