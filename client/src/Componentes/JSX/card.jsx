import React from "react";
import "../CSS/card.css"

export default function Card({ name, image, genres, rating, id }) {
  return (
    <div className="C-body">
    <div className="card">
   <img className="card-imagen" src={image} alt="img not found">
    </img>
        <div className="card-content">
        <h2 className="card-title"> {name} </h2>
        
        <p className="card-body">
            Genres: {genres.join(", ")} <br></br>
            Rating: {rating}
        </p>
        <button href={id} className="button">Details</button>
        </div>
    </div>
    </div>
    
  );
}