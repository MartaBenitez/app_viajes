import './assets/styles/App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/Navbar'
import Breadcrumbs from './components/navbar/Breadcrumbs'
import Footer from './components/footer/Footer'
//import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
//import Contact from "./pages/Contact";
//import NoPage from "./pages/NoPage";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Navbar />
      <Breadcrumbs />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/acceso" element={<Login/>} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
