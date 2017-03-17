import React from "react";
import {connect} from "react-redux";
import {changeFilter, downloadFilterValues} from "../actions/filterActions";

class Filter extends React.Component {

    componentDidMount() {
        this.props.downloadFilterValues(this.props.fieldName, this.props.url);
    }

    onItemClick(e) {
        this.props.changeFilter(this.props.fieldName, e.target.text);
    }

    clearSelected() {
        console.log("clear selected");
        this.props.changeFilter(this.props.fieldName, "");
    }

    render() {
        let filters;
        if (this.props.fieldName in this.props.filterReducer.filters) {
            filters = this.props.filterReducer.filters[this.props.fieldName];
        } else {
            filters = {items: [], selected: []};
        }

        return (

            <div className="filter col-md-6">
                <span className="filterTitle">
                    <b>{this.props.listName}</b>
                    <button type="button"
                            className="close"
                            aria-label="Close"
                            onClick={this.clearSelected.bind(this)}
                    >
                        <span className="filterClear" aria-hidden="true">&times;</span>
                    </button>
                </span>

                <div>
                    <ul className="filterList">
                        {filters.selected.map((item, i)=> {
                            return (
                                <li key={i} className="active filterItem small">
                                    <a href="#" onClick={this.onItemClick.bind(this)}>{item}</a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <ul className="filterList">
                        {filters.items.map((item, i)=> {
                            return (
                                <li className="filterItem small" key={filters.selected.length+i}>
                                    <a href="#" onClick={this.onItemClick.bind(this)}>{item}</a>
                                </li>
                            )
                        })}
                    </ul>
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

const mapDispatchToProps = (dispatch) => {
    return {
        changeFilter: (name, value) => {
            dispatch(changeFilter(name, value));
        },
        downloadFilterValues: (fieldName, url)=> {
            dispatch(downloadFilterValues(fieldName, url))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)