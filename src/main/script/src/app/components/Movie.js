import React from "react";

export const Movie = (props)=> {

    let movie = props.movie;

    let coverStyle = {
        backgroundImage: 'url(' + movie.cover + ')'
    }

    return (
        <div className="movie-cell col-lg-3 col-md-4 col-sm-4">

            <div className="movie text-center">

                <div className="imdb">{movie.imdbRating}</div>
                <div className="kp">{movie.kinopoiskRating}</div>
                <div className="year">{movie.year}</div>

                <a href={movie.fullInfoUrl}>
                    <div className="cover" style={coverStyle}>
                        <div className="extended">
                            <small>
                                {movie.genres.join(", ")}
                                <br/><br/>
                                {movie.countries.join(", ")}
                                <br/><br/>
                                Актеры: {movie.actors !== null ? movie.actors.slice(0, 5).join(", ") : ""}
                            </small>
                        </div>
                    </div>
                </a>
                
                <b>{movie.russianName}</b>
                <br/>
                <b><span className="originalName">{movie.originalName}</span></b>
  
            </div>

        </div>
    )
}