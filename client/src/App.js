import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Componentes/JSX/landingPage.jsx";
import Home from "./Componentes/JSX/home.jsx";
import VideogameCreate from "./Componentes/JSX/vCreate.jsx";
import Detail from "./Componentes/JSX/detail.jsx";

//Tengo que envolver en el BrowserRouter para usar el ROUTE y setear las rutas
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/videogame" element={<VideogameCreate />} />
          <Route exact path="/home/:id" element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;