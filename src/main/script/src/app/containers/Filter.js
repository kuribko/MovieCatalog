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


    render() {
        let filters;
        if (this.props.fieldName in this.props.allFilters) {
            filters = this.props.allFilters[this.props.fieldName];
        } else {
            filters = {items: [], selected: []};
        }

        return (

            <div>
                <b>{this.props.listName}</b>
                <ul className="filterList">
                    {filters.selected.map((item, i)=> {
                        return (
                            <li key={i} className="active">
                                <a href="#" onClick={this.onItemClick.bind(this)}>{item}</a>
                            </li>
                        )
                    })}
                    {filters.items.map((item, i)=> {
                        return (
                            <li key={filters.selected.length+i}>
                                <a href="#" onClick={this.onItemClick.bind(this)}>{item}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allFilters: state.filterReducer.filters
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