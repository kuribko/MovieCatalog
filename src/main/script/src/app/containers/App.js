import React from "react";
import {render} from "react-dom";
import {connect} from "react-redux";

import Config from 'Config';

import {Header} from "../components/Header";
import {Main} from "../components/Main";
import {changeSearchString} from "../actions/filterActions";
import MovieTable from "../containers/MovieTable";
import {Filters} from "../components/Filters";
import Paginator from "./Paginator";

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
                <Main>
                    <Paginator/>
                    <MovieTable/>
                    <Filters/>
                </Main>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filterReducer: state.filterReducer
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