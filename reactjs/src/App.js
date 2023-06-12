import './assets/styles/App.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/comunes/Header'
import Footer from './components/comunes/Footer'
import Home from "./pages/Home";
import Acceso from "./pages/Acceso";
import Nosotros from "./pages/Nosotros";
import MisViajes from "./pages/MisViajes";
import Viaje from "./pages/Viaje";
import Mapaweb from "./pages/MapaWeb";
import DatosUsuario from "./pages/DatosUsuario";
import Administracion from "./pages/Administracion";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/acceso" element={<Acceso />} />
        <Route path="/sobre-nosotros" element={<Nosotros />} />
        <Route path="/viajes" element={<MisViajes />} />
        <Route path="/eventos" element={<Viaje />} />
        <Route path="/mapaweb" element={<Mapaweb />} />
        <Route path="/perfil" element={<DatosUsuario/>} />
        <Route path="/admin" element={<Administracion/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
