import React from "react";
import {render} from "react-dom";
import {connect} from "react-redux";

import Config from 'Config';

import {Header} from "../components/Header";
import Main from "../components/Main";
import {changeSearchString} from "../actions/filterActions";

class App extends React.Component {
    constructor(props) {
        super(props);
        console.log("ENV: ", Config.env);
    }

    componentDidMount() {
        this.props.changeSearchString("");
    }

    render() {
        return (
            <div>
                <Header/>
                <Main searchResults={this.props.movies.searchResults}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(App)