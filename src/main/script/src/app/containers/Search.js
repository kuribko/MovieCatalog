import React from "react";
import {connect} from "react-redux";
import {changeSearchString} from "../actions/filterActions";

 class Search extends React.Component {
    handleChange(e){
        this.props.changeSearchString(e.target.value)
    }
    
    render() {
        return (
            <div id="search" className="input-group col-md-6">
                <input onChange={this.handleChange.bind(this)}type="text" className="form-control" placeholder="Что ищем?"/>
                <span className="input-group-btn">
                    <button className="btn btn-default" type="submit">
                        <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)