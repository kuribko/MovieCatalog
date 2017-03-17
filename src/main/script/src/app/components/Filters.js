import React from "react";
import Filter from "../containers/Filter";
import Constants from "../Constants";

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

        this.state = {
            visible: false
        }
    }

    toggleVisibility() {
        this.setState({visible: !this.state.visible})
    }

    render() {
        let visible = this.state.visible ? "show" : "hidden";

        return (
            <div id="filterPanel" className="col-md-12 panel">

                <div className="panel-heading">
                    <div className="pull-right" style={{paddingBottom:10}}>
                        <button onClick={this.toggleVisibility.bind(this)} className="btn btn-primary pull-right">
                            <span className="glyphicon glyphicon-filter" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>

                <div className={visible}>
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
}
