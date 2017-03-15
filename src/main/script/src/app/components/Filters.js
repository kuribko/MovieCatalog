import React from "react";
import Filter from "../containers/Filter";
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

export const Filters = (props)=> {
    return (
        <div id="filterPanel" className="col-md-2">
            <div className="panel">
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
        </div>
    )
}
