import React from "react";
import Filter from "./Filter";
import Constants from "../Constants";
import {connect} from "react-redux";

const FILTERS = [
    {
        fieldName: "genre",
        fieldText: "Жанры",
        url: Constants.URLS.genres
    },
    {
        fieldName: "country",
        fieldText: "Страны",
        url: Constants.URLS.countries
    }
];

class Filters extends React.Component {
    render() {
        let visible = this.props.filterReducer.filtersVisible ? "show" : "hidden";

        return (
            <div id="filterPanel" className={"col-md-12 panel "+visible}>

                <div className="panel-body">
                    {FILTERS.map((filter, i)=> {
                        return (
                            <Filter key={i}
                                    listName={filter.fieldText}
                                    fieldName={filter.fieldName}
                                    url={filter.url}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filterReducer: state.filterReducer
    }
}

export default connect(mapStateToProps)(Filters)