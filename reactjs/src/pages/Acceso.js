import Acceso from '../components/formularios/Acceso';
import Navbar from "../components/comunes/NavbarInicio";
import Breadcrumbs from "../components/comunes/Breadcrumbs";
const Home = () => {
    return (
        <>  
            <Navbar/>
            <Breadcrumbs/>
            <Acceso />
        </>
   );
}
  
  export default Home;