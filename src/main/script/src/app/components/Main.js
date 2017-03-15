import React from "react";
import MovieTable from "./MovieTable";
import Filters from "./Filters";

export default class Main extends React.Component{

    onFiltersChanged(filtersString){
        this.props.onFilterChanged(filtersString);
    }
    
    render(){
        return(
            <div className="main container">
                <MovieTable searchResults={this.props.searchResults}/>
                <Filters onFiltersChanged={this.onFiltersChanged.bind(this)}/>
            </div>
        )
    }
}