import Navbar from "../components/comunes/NavbarInicio";
import Breadcrumbs from "../components/comunes/Breadcrumbs";
import MapaWeb from "../components/otros/MapaWeb";

const Mapaweb = () => {
    const trail = [{nombre: 'Inicio',url:'/'},{nombre: 'Mapa web',url:'/mapaweb'}];
    return (
        <>  
            <Navbar/>
            <Breadcrumbs trail={trail}/>
            <MapaWeb />
        </>
   );
}
  
  export default Mapaweb;