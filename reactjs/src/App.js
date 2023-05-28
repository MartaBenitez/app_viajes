import './assets/styles/App.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/comunes/Header'
import Footer from './components/comunes/Footer'
//import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Acceso from "./pages/Acceso";
import Viajes from "./pages/Viajes";
//import Contact from "./pages/Contact";
//import NoPage from "./pages/NoPage";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/acceso" element={<Acceso />} />
        <Route path="/viajes" element={<Viajes />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
