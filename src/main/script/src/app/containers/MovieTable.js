import React from "react";
import {Movie} from "../components/Movie";
import {connect} from "react-redux";

class MovieTable extends React.Component {
    render() {
        return (
            <div className="col-md-10">
                {
                    this.props.movies.map((movie)=> {
                        return <Movie key={movie.id} movie={movie}/>
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.filterReducer.searchResults.movies
    }
}

export default connect(mapStateToProps)(MovieTable)