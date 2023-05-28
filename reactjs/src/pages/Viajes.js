import  Breadcrumbs from '../components/comunes/Breadcrumbs';
import Calendario from '../components/calendarios/Calendario';
import Navbar from '../components/comunes/NavbarUser';

const Home = () => {
    return (
        <>  <Navbar/>
            <Breadcrumbs/>
            <Calendario />
        </>
   );
}
  
  export default Home;