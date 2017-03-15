import React from "react";
import Movie from "./Movie";

export default class MovieTable extends React.Component {
    render() {
        // console.log("searchResults: ", this.props.searchResults);

        let movies = [];
        if (this.props.searchResults !== null) {
            movies = this.props.searchResults.movies;
        }

        return (
            <div className="col-md-10">
                {
                    movies.map((movie)=> {
                        return <Movie key={movie.id} movie={movie} />
                    })
                }
            </div>
        )
    }
}