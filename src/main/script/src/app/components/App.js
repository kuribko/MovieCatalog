import React from "react";
import {render} from "react-dom";
import {connect} from "react-redux";

import Config from 'Config';

import Header from "./Header";
import Main from "./Main";
import {changeSearchString} from "../actions/filterActions";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: "",
            searchResults: {movies: []},
            filtersString: ""
        };
        // this.download();
        // console.log("a rgs: ", Config.args);
        console.log("ENV: ", Config.env);
    }

    componentDidMount() {
        this.download("");
        this.props.changeSearchString("");
    }

    download(searchWord = "", filtersString = "") {
        // let url = Constants.URLS.movies + searchWord + filtersString;
        // console.log("GET from ", url);
        // axios.get(url)
        //     .then(res => {
        //         let result = res.data;
        //         // console.log("GET result: ", result);
        //         this.setState({searchResults: result});
        //     });

    }

    onSearchChanged(searchWord) {
        this.download(searchWord, this.state.filtersString);
    }

    onFiltersChanged(filtersString) {
        this.setState({
            filtersString: filtersString
        })

        this.download(this.state.searchString, filtersString);
    }

    render() {
        // console.log("filters", this.props.filters);
        return (
            <div>
                <Header onSearchChanged={this.onSearchChanged.bind(this)}/>
                <Main searchResults={this.props.movies.searchResults}
                      onFilterChanged={this.onFiltersChanged.bind(this)}
                      />
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