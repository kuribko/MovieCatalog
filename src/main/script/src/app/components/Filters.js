import React from "react";
import Filter from "./Filter";
import Constants from "./Constants";

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

export default class Filters extends React.Component {

    constructor(props) {
        super(props);

        let filters = {};
        FILTERS.forEach((filter)=> {
            filters[filter.fieldName] = "";
        })

        this.state = {
            filters: filters
        }
    }

    onFilterChanged(fieldName, activeItems) {
        // let filterString = this.getFiltersString(fieldName, activeItems);
        //
        // let filters = this.state.filters;
        //
        // filters[fieldName] = filterString;
        // this.setState({
        //         filters: filters
        //     }
        // );
        //
        // filterString = "";
        //
        // for (var key in filters) {
        //     filterString = filterString + filters[key];
        // }
        //
        // this.props.onFiltersChanged(filterString);
    }


    getFiltersString(fieldName, items) {
        let filter = items.join("&" + fieldName + "=");
        if (filter !== "") {
            filter = "&" + fieldName + "=" + filter;
        }
        return filter;
    }

    render() {
        return (
            <div id="filterPanel" className="col-md-2">
                <div className="panel">
                    <div className="panel-body">
                        {FILTERS.map((filter, i)=> {
                            return (
                                <Filter key={i}
                                        listName={filter.fieldText}
                                        onFilterChanged={this.onFilterChanged.bind(this)}
                                        fieldName={filter.fieldName}
                                        url={filter.url}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
