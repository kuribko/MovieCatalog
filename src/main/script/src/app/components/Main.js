import React from "react";
import MovieTable from "../containers/MovieTable";
import {Filters} from "./Filters";

export const Main = (props)=> {
    return (
        <div className="main container">
            <MovieTable/>
            <Filters/>
        </div>
    )
}