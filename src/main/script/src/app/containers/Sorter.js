import React from "react";
import {connect} from "react-redux";
import {changeSort} from "../actions/filterActions";

class Sorter extends React.Component {

    render() {
        return (

        <span className="dropdown sorter input-group-addon">
            <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                <span className="glyphicon glyphicon-sort" aria-hidden="true"></span>
            </button>
            <ul className="dropdown-menu">
                <li><a href="#">рейтинг IMDB</a></li>
                <li><a href="#">рейтинг КиноПоиска</a></li>
                <li><a href="#">год</a></li>
            </ul>
        </span>


        )
    }
}



const mapStateToProps = (state) => {
    return {
        movies: state.filterReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeSort: (fieldName) => {
            dispatch(changeSort(fieldName));
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sorter)