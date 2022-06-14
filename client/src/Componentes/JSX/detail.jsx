import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail, vaciarDetail } from "../../Acciones/Acciones";
import "../CSS/detail.css";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
    return function () {
      dispatch(vaciarDetail());
    };
  }, [dispatch, id]);

  const myVideogame = useSelector((state) => state.detail);
  const predeterminada= 'https://images.unsplash.com/photo-1635321593217-40050ad13c74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1748&q=80'
  return (
    <div className="Fondo-Detail">
      {myVideogame ? (
        <div className="Conte-General">
          <h1 className="TituloDetail">{myVideogame.name}</h1>
          <img className="ImagenDetail" src={myVideogame.image ? 
          myVideogame.image : predeterminada} alt="Pic not found" />

          <div className="Conte-Sub">
            <h4 className="detailTitle"> Rating: {myVideogame.rating}</h4>
        
            <h4 className="detailTitle">
               Release Date: {myVideogame.released}
            </h4>
        
            <h4 className="detailTitle">
               Platforms: {myVideogame.platforms?.join(",  ")}
            </h4>

            <h4 className="detailTitle">
               Genres: {myVideogame.genres?.join(",  ")}
            </h4>
        
            <h4 className="detailTitle"> Description: </h4>
            <p
              className="Detail-Description"
              dangerouslySetInnerHTML={{ __html: myVideogame.description }}
            />
          </div>
          <Link to="/home">
            <button className="button">Back</button>
          </Link>
        </div>
      ) : (
        console.log("nada")
      )}
    </div>
  );
}