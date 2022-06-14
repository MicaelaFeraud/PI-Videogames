import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../../Acciones/Acciones";
import "../CSS/searchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      return alert("Debe ingresar un nombre");
    } else {
      dispatch(getNameVideogames(name));
      setName("");
      document.getElementById("search").value = "";
    }
  }

  return (
    <div className="searchBar">
      <input
        className="inputS"
        id="search"
        type="text"
        placeholder="Search Game..."
        onChange={(e) => handleInputChange(e)}
      />
      <button className="botonS" type="submit" onClick={(e) => handleSubmit(e)}>
       Search
      </button>
    </div>
  );
}