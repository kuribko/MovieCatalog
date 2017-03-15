import React from "react";
import MovieTable from "./MovieTable";
import Filters from "./Filters";

export default class Main extends React.Component{
    render(){
        return(
            <div className="main container">
                <MovieTable searchResults={this.props.searchResults}/>
                <Filters/>
            </div>
        )
    }
}