import React from "react";
import {connect} from "react-redux";
import {changeFilter, downloadFilterValues} from "../actions/filterActions";

class Filter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            selected: []
        };
    }

    componentDidMount() {
        // this.download();
        this.props.downloadFilterValues(this.props.fieldName, this.props.url);
    }

    download() {
        // let url = this.props.url;
        // console.log("GET from ", url);
        // axios.get(url)
        //     .then(res => {
        //         let result = res.data;
        //         // console.log("GET result: ", result);
        //         this.setState({items: result});
        //     });

    }

    onItemClick(e) {
        let fieldName = this.props.fieldName;
        let item = e.target.text;
        // let items = this.state.items;
        // // let items = this.props.movies.filter.filters[]
        // let selected = this.state.selected;
        //
        // let index = items.indexOf(item);
        // // let index = this.state.items.indexOf(item);
        //
        //
        // if (index >= 0) {
        //     items.splice(index, 1);
        //     selected.push(item);
        //     selected.sort();
        // } else {
        //     items.push(item);
        //     selected.splice(selected.indexOf(item), 1);
        //     items.sort();
        // }
        //
        // this.setState({
        //     items: items,
        //     selected: selected
        // })

        // this.props.onFilterChanged(this.props.fieldName, this.state.selected);

        // let f = this.props.movies.filter.filters;
        // f[this.props.fieldName] = this.state.selec
        this.props.changeFilter(fieldName, item);
    }


    render() {
        let filters;
        if (this.props.fieldName in this.props.movies.filters) {
            filters = this.props.movies.filters[this.props.fieldName];
        } else {
            filters = {items: [], selected: []};
        }
        // console.log("FILTERS: ", filters);


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
        movies: state.filterReducer
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