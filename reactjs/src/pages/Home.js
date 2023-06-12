import Navbar from "../components/comunes/NavbarInicio";
import Breadcrumbs from "../components/comunes/Breadcrumbs";
import Informacion from "../components/otros/Informacion";
const Home = () => {
    const trail = [{nombre: 'Inicio',url:'/'}];
    return (
        <>
            <Navbar/>
            <Breadcrumbs trail={trail}/>
            <Informacion />
        </>
   );
}
  
  export default Home;