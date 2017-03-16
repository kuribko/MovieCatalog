import React from "react";

export const Movie = (props)=> {

    let movie = props.movie;

    let coverStyle = {
        backgroundImage: 'url(' + movie.cover + ')'
    }

    return (
        <div className="movie-cell col-md-3">
            <a href={movie.fullInfoUrl}>
                <div className="movie text-center">

                    <div className="imdb">{movie.imdbRating}</div>
                    <div className="kp">{movie.kinopoiskRating}</div>

                    <div className="cover" style={coverStyle}>
                        <div className="extended">
                            <small>
                                {movie.genres.join(", ")}
                                <br/><br/>
                                {movie.countries.join(", ")}
                                <br/><br/>
                                Режиссеры: {movie.producers !== null ? movie.producers.join(", ") : ""}
                            </small>
                        </div>
                    </div>

                    <b>{movie.russianName}</b>
                    <br/>
                    <b><span className="originalName">{movie.originalName}</span></b>
                    <br/>

                    <small>
                        {movie.year}
                    </small>
                </div>
            </a>
        </div>
    )
}