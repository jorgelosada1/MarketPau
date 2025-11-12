// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Body from "./components/Body";
import Category from "./components/Category";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Marcas from "./components/Marcas";
import Pagina from "./components/Pagina";
import ScrollToTop from "./components/ScrollToTop";
import { FaWhatsapp } from "react-icons/fa";
import "./app.css";

import { AuthProvider } from "./context/AuthContext"


function App() {
  const whatsappNumber = "573208620312";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=¡Hola!%20Estoy%20interesado%20en%20sus%20productos.`;

  return (
    <Router>
      <AuthProvider> 
        <ScrollToTop />
        <div className="app">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Nav />
                  <Body />
                  <Marcas />
                  <Category />
                  <Footer />
                </>
              }
            />
            <Route path="/marca/:nombre" element={<Pagina />} />
            <Route
              path="/login"
              element={
                <div className="page-login">
                  <Login />
                </div>
              }
            />
            <Route
              path="/register"
              element={
                <div className="page-register">
                  <Register />
                </div>
              }
            />
          </Routes>

          <a
            href={whatsappLink}
            className="whatsapp-float"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="whatsapp-icon" />
          </a>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;