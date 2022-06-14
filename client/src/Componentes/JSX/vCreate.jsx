import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postVideogame, getGenres, getVideogames } from "../../Acciones/Acciones.js";
import { useDispatch, useSelector } from "react-redux";
import "../CSS/vCreate.css";

export default function VideogameCreate() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const videogames = useSelector((state) => state.videogames);
  console.log(genres);

  const platformsArr = [
    "PC",
    "PlayStation 5",
    "Xbox One",
    "PlayStation 4",
    "Xbox Series S/X",
    "Nintendo Switch",
    "iOS",
    "Android",
    "Nintendo 3DS",
    "Nintendo DS",
    "Nintendo DSi",
    "macOS",
    "Linux",
    "Xbox 360",
    "Xbox",
    "PlayStation 3",
    "PlayStation 2",
    "PlayStation",
    "PS Vita",
    "PSP",
    "Wii U",
    "Wii",
    "GameCube",
    "Nintendo 64",
    "Game Boy Advance",
    "Game Boy Color",
    "Game Boy",
    "SNES",
    "NES",
    "Classic Macintosh",
    "Apple II",
    "Commodore / Amiga",
    "Atari 7800",
    "Atari 5200",
    "Atari 2600",
    "Atari Flashback",
    "Atari 8-bit",
    "Atari ST",
    "Atari Lynx",
    "Atari XEGS",
    "Genesis",
    "SEGA Saturn",
    "SEGA CD",
    "SEGA 32X",
    "SEGA Master System",
    "Dreamcast",
    "3DO",
    "Jaguar",
    "Game Gear",
    "Neo Geo",
  ];

  const [error, setError] = useState({});
  const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
          ...input,
      [e.target.name]:e.target.value})
  );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      genres: input.genres.includes(e.target.value)
        ? input.genres
        : [...input.genres, e.target.value],
    });
    setError(
      validate({
        ...input,
        genres: input.genres.includes(e.target.value)
          ? input.genres
          : [...input.genres, e.target.value],
    })
  );
  }

  function handleSelect2(e) {
    setInput({
      ...input,
      platforms: input.platforms.includes(e.target.value)
        ? input.platforms
        : [...input.platforms, e.target.value],
    });
    setError(
      validate({
        ...input,
      platforms: input.platforms.includes(e.target.value)
        ? input.platforms
        : [...input.platforms, e.target.value],
      })
    )
  }

  function handleSubmit(e) {
    e.preventDefault();
    // if (input.name.trim() === "") {
    //   return alert("A name must be input");
    // } else if (
    //   videogames.find(
    //     (e) => e.name.toLowerCase().trim() === input.name.toLowerCase().trim()
    //   )
    // ) {
    //   return alert(`The name ${input.name} already exists`);
    // } else if (input.description.trim() === "") {
    //   return alert("A description is required");
    // } else if (input.released.trim() === "") {
    //   return alert("A release date is required");
    // } else if (input.released < "1951-05-03") {
    //   return alert("Please insert a date after 03/05/1951");
    // } else if (
    //   input.rating.trim() === "" ||
    //   input.rating < 1 ||
    //   input.rating > 10
    // ) {
    //   return alert("Choose a rating between 1 - 10");
    // } else if (input.genres.length === 0) {
    //   return alert("Choose a genre or more");
    // } else if (input.platforms.length === 0) {
    //   return alert("Choose a platform or more");
    // } else {
      let newError = validate(input);
      if (newError.submit) {
        dispatch(postVideogame(input))
        alert('Videogame created successfully')
     setInput({
       name: "",
       image: "",
       description: "",
       released: "",
       rating: "",
       genres: [],
       platforms: [],
     });
     document.getElementById("formulario").reset();
      }
      else {
        return alert('Must fill all fields')
      }
      
  }

  let validate = (input) => {
    let error = {};
    if (!input.name || input.name.length > 40) {
      error.name = "A name must be input (max 40 characters)";
    } else if (videogames.find(
           (e) => e.name.toLowerCase().trim() === input.name.toLowerCase().trim()
         )) {
           error.name = `The name "${input.name}" already exists`;
         }
    else if (!input.description) {
          error.description = "A description is required";
        } else if (!input.released || input.released < "1951-05-03") {
      error.released = "A release date is required (any date after 03/05/1951)";
    } else if (!input.rating || input.rating < 1 || input.rating > 10) {
      error.rating = "Choose a rating between 1 - 10";
    } else if (!input.genres.length > 0) {
        error.genres = "Choose at least 1 genre";
    } else if (!input.platforms.length > 0) {
      error.platforms = "Choose at least 1 platform";
  }
    else { error.submit = "Videogame created";}
    return error;
}

  function handleDelete(e) {
    setInput({
      ...input,
      genres: input.genres.filter((el) => el !== e),
    });
    setError(
      validate({
        ...input,
      genres: input.genres.filter((el) => el !== e),
      })
    )
  }

  function handleDelete2(e) {
    setInput({
      ...input,
      platforms: input.platforms.filter((el) => el !== e),
    });
    setError(
      validate({
        ...input,
      platforms: input.platforms.filter((el) => el !== e),
      })
    )
  }

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getVideogames());
  }, [dispatch]);

  return (
    <div className="FormBackground">
      <div className="Form-container">
        <h1 className="Form-title">Build your own game!</h1>
        <form id="formulario" onSubmit={(e) => handleSubmit(e)}>
          <div className="Form-item">
            <label className="Form-label">Name:</label>
            <br></br>
            <input
              className="Form-input"
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
          </div>
          {error.name && <p className="validateForm">{error.name}</p>}
          <br></br>
          <div className="Form-item">
            <label className="Form-label">Description: </label>
            <br></br>
            <input
              className="Form-input"
              type="text"
              value={input.description}
              name="description"
              onChange={(e) => handleChange(e)}
            />
          </div>
          {error.description && <p className="validateForm">{error.description}</p>}
          <br></br>
          <div className="Form-item">
            <label className="Form-label">Release date:</label>
            <br></br>
            <input
              className="Form-input"
              type="date"
              value={input.released}
              name="released"
              onChange={(e) => handleChange(e)}
            />
          </div>
          {error.released && <p className="validateForm">{error.released}</p>}
          <br></br>
          <div className="Form-item">
            <label className="Form-label">Rating:</label>
            <br></br>
            <input
              className="Form-input"
              type="number"
              value={input.rating}
              name="rating"
              onChange={(e) => handleChange(e)}
            />
          </div>
          {error.rating && <p className="validateForm">{error.rating}</p>}
          <br></br>
          <div className="Form-item">
            <label className="Form-label">Image:</label>
            <br></br>
            <input
              className="Form-input"
              type="text"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <br></br>
          <div className="Form-item">
            <label className="Form-label">Genres:</label>
            <br></br>
            <select
              className="Form-input"
              defaultValue="Choose"
              onChange={(e) => handleSelect(e)}
            >
              <option disabled>Choose</option>
              {genres?.map((e) => (
                <option value={e.name} key={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
            
            <ul className="ul">
              <li className="listaGP">
                {input.genres.map((e) => (
                  <div className="divGP" key={e}>
                    {e + " "}
                    <button type="button" onClick={() => handleDelete(e)}>
                      X
                    </button>
                  </div>
                ))}
              </li>
            </ul>
          </div>
          {error.genres && <p className="validateForm">{error.genres}</p>}
          <div className="Form-item">
            <label className="Form-label">Platforms:</label>
            <br></br>
            <select
              className="Form-input"
              defaultValue="Choose"
              onChange={(e) => handleSelect2(e)}
            >
              <option disabled>Choose</option>
              {platformsArr?.map((e) => (
                <option value={e} key={e}>
                  {e}
                </option>
              ))}
            </select>
            
            <ul className="ul">
              <li className="listaGP">
                {input.platforms.map((e) => (
                  <div className="divGP" key={e}>
                    {e + " "}
                    <button type="button" onClick={() => handleDelete2(e)}>
                      X
                    </button>
                  </div>
                ))}
              </li>
            </ul>
          </div>
          {error.platforms && <p className="validateForm">{error.platforms}</p>}
          <div>
            <button className="button" type="submit">
              Create Game
            </button>
          </div>
          <div>
            <Link to="/home">
              <button className="button">Go Back</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}