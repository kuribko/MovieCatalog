import React from "react";
import {Movie} from "../components/Movie";
import {connect} from "react-redux";
import {changeSearchString} from "../actions/filterActions";

class MovieTable extends React.Component {
    componentDidMount() {
        this.props.changeSearchString("");
    }

    render() {
        return (
            <div className="col-md-12 movieTable">
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

const mapDispatchToProps = (dispatch) => {
    return {
        changeSearchString: (searchString) => {
            dispatch(changeSearchString(searchString));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieTable)