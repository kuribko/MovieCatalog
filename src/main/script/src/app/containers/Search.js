import React from "react";
import {connect} from "react-redux";
import {changeSearchString} from "../actions/filterActions";
import {toggleFilterVisibility} from "../actions/filterActions";

class Search extends React.Component {
    handleChange(e) {
        this.props.changeSearchString(e.target.value)
    }

    render() {
        return (
            <div id="search" className="input-group col-lg-6 col-md-6 col-sm-6 col-xs-6">

                <div id="count" className="input-group-addon">
                    <span className="small">
                        {this.props.movies.searchResults.count}
                    </span>
                </div>

                <input onChange={this.handleChange.bind(this)}
                       type="text" className="form-control"
                       data-toggle="tooltip"
                       title="Пример запроса: джекки чан комедия 2000-2017 kp>7.5 imdb>8.5"
                       placeholder="Что ищем?">

                </input>



                <span className="input-group-btn">
                    <button className="btn btn-default hidden" type="submit">
                        <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                    </button>

                    <button onClick={this.props.toggleFilterVisibility} className="btn btn-primary">
                        <span className="glyphicon glyphicon-filter" aria-hidden="true"></span>
                    </button>
                </span>


            </div>
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
        changeSearchString: (searchString) => {
            dispatch(changeSearchString(searchString));
        },
        toggleFilterVisibility: () => {
            dispatch(toggleFilterVisibility());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)