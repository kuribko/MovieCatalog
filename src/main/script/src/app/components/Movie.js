import React from "react";

export default class Movie extends React.Component {
    render() {

        let movie = this.props.movie;

        let coverStyle = {
            backgroundImage: 'url(' + movie.cover + ')'
        }


        return (
            <div className="movie-cell col-md-3">
                <a href={movie.fullInfoUrl}>
                    <div className="movie text-center">

                        <div className="cover" style={coverStyle}>
                            <div className="extended">
                                <small>
                                    {movie.genres.join(", ")}
                                    <br/><br/>
                                    {movie.countries.join(", ")}
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
}