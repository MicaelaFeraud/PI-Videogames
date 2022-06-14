import React from "react";
import {Link} from 'react-router-dom';
import SearchBar from "./searchBar"
import "../CSS/nav.css";
export default function Nav() {
    
    return <div className="cont">
        <div className="nav">
            <Link to = '/'>
                <button className="button">Landing page</button>
            </Link>
            <SearchBar/>
        </div>

    </div>
}