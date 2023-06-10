import './assets/styles/App.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/comunes/Header'
import Footer from './components/comunes/Footer'
import Home from "./pages/Home";
import Acceso from "./pages/Acceso";
import Nosotros from "./pages/Nosotros";
import MisViajes from "./pages/MisViajes";
import Viaje from "./pages/Viaje";
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
      </Routes>
      <Footer />
    </>
  );
}

export default App;


/*<Route path="/miperfil" element={<MiPerfil />} />
<Route path="/usuarios" element={<Usuarios />} />
<Route path="/estadisticas" element={<Estadisticas />} />*/