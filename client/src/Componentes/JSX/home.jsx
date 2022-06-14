import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getVideogames,
    filterVideogamesByGenres,
    orderByName,
    filterCreated,
    orderByRating,
} from "../../Acciones/Acciones";
import { Link } from "react-router-dom";
import Card from "./card";
import Paginado from "./paginado";
// import SearchBar from "./SearchBar";
import Nav from "./nav";
import {Footer} from "./footer.jsx";
import "../CSS/home.css";
import loadingbar from "../Extras/loading gif.gif"

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);

  //Defino estados locales
  const [, /*orden*/ setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage /*setVideogamesPerPage*/] = useState(15);

  const indexOfLastVideogame = currentPage * videogamesPerPage; // 15
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; // 0
  //Videojuegos que estan en la pagina actual
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    dispatch(getVideogames())
      .then((response) => {
        setLoading(false);
      })
      .catch((error) => setError(error.message));
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
    setCurrentPage(1);
  }

 function handleFilterGenres(e) {
    dispatch(filterVideogamesByGenres(e.target.value));
    setCurrentPage(1);
  }

 function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }

  function handleSort2(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }

  if (error) {
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-background">
        <img src={loadingbar} className="loading" alt="Please wait"/>
        <br/>
      </div>
    );
  }

  return (
    <div className="fondoH">
         <Nav/> 
      <div className="barraSup">
        <h1 className="Title">VIDEOGAMES APP</h1>

        <button className="Button Button_Reload"onClick={(e) => 
          {handleClick(e); }}> Reload </button>

        <Link to="/videogame">
          <button className="Button Button_Create"> Create </button>
        </Link>
<br/>
<br/>
        <select
          className="selector"
          defaultValue="Genres"
          onChange={(e) => handleFilterGenres(e)}
        >
          <option disabled>Genres</option>
          <option value="All">All</option>
          <option value="Action">Action</option>
          <option value="Indie">Indie</option>
          <option value="Adventure">Adventure</option>
          <option value="RPG">RPG</option>
          <option value="Strategy">Strategy</option>
          <option value="Shooter">Shooter</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Casual">Casual</option>
          <option value="Simulation">Simulation</option>
          <option value="Arcade">Arcade</option>
          <option value="Platformer">Platformer</option>
          <option value="Racing">Racing</option>
          <option value="Massively Multiplayer">Multiplayer</option>
          <option value="Sports">Sports</option>
          <option value="Fighting">Fighting</option>
          <option value="Family">Family</option>
          <option value="Educational">Educational</option>
          <option value="Card">Card</option>
        </select>

        <select
          className="selector"
          defaultValue="From"
          onChange={(e) => handleFilterCreated(e)}
        >
          <option disabled>From</option>
          <option value="All">All</option>
          <option value="created">DB</option>
          <option value="api">Api</option>
        </select>

        <select
          className="selector"
          defaultValue="Sort By"
          onChange={(e) => handleSort(e)}
        >
          <option disabled>Sort By</option>
          <option value="asc">A to Z</option>
          <option value="desc">Z to A</option>
        </select>

        <select
          className="selector"
          defaultValue="Rating"
          onChange={(e) => handleSort2(e)}
        >
          <option disabled>Rating</option>
          <option value="high">HIGH</option>
          <option value="low">LOW</option>
        </select>
      </div>

      <div>
        <Paginado
        videogamesPerPage={videogamesPerPage}
        allVideogames={allVideogames.length}
        paginado={paginado}/>

        <div className="card_contenedor">
          {currentVideogames.length > 0 ? (
            currentVideogames.map((e) => {
              return (
                <div key={e.id}>
                  <Link to={"/home/" + e.id}>
                    <Card
                      name={e.name}
                      image={e.image}
                      genres={e.genres}
                      rating={e.rating}
                    />
                  </Link>
                </div>
              );
            })
          ) : (
            <div>
              <h1 className="error">No games were found</h1>
            </div>
          )}
        </div>

        <Paginado
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          paginado={paginado}
        />
        <Footer/>
      </div>
    </div>
  );
}