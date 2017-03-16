import Constants from "../Constants";
import Axios from 'axios';


export function changeSearchString(searchString) {

    return (dispatch, getState) => {
        dispatch({
            type: "SEARCH_STRING_CHANGED",
            payload: searchString
        })

        dispatch(
            getMovies(
                searchString,
                getState().filterReducer.filters,
                getState().filterReducer.currentPage
            )
        );
    };
}

export function changeFilter(name, value) {

    return (dispatch, getState) => {
        let filters = getState().filterReducer.filters;

        let items = filters[name].items;
        // let items = this.props.movies.filter.filters[]
        let selected = filters[name].selected;

        let index = items.indexOf(value);

        if (index >= 0) {
            items.splice(index, 1);
            selected.push(value);
            selected.sort();
        } else {
            items.push(value);
            selected.splice(selected.indexOf(value), 1);
            items.sort();
        }

        filters[name] = {
            items: items,
            selected: selected
        }

        dispatch({
            type: "FILTERS_CHANGED",
            payload: filters
        })

        dispatch(
            getMovies(
                getState().filterReducer.searchString,
                filters,
                getState().filterReducer.currentPage)
        );

    };
}

export function getMovies(searchString, filters, currentPage) {
    return (dispatch) => {

        let filterString = "";
        for (var key in filters) {
            filterString = filterString + getFiltersString(key, filters[key].selected);
        }
        let url = Constants.URLS.movies + searchString + filterString+"&p="+currentPage;

        console.log("GET from ", url);
        // Returns a promise
        return Axios.get(url)
            .then(response => {
                let result = response.data;
                console.log("GET result: ", result);

                let e = {
                    type: "MOVIES_CHANGED",
                    payload: result
                }

                dispatch(e)
            })
            .catch(error => {
                throw(error);
            });
    };
}

function getFiltersString(fieldName, items) {
    let filter = items.join("&" + fieldName + "=");
    if (filter !== "") {
        filter = "&" + fieldName + "=" + filter;
    }
    return filter;
}

export function downloadFilterValues(fieldName, url) {
    return (dispatch) => {
        // let url = Constants.URLS.movies + searchString;
        console.log("GET from ", url);
        // Returns a promise
        return Axios.get(url)
            .then(response => {
                let result = response.data;
                // console.log("GET result: ", result);

                let e = {
                    type: "FILTERS_INITIALIZED",
                    fieldName: fieldName,
                    payload: {
                        items: result,
                        selected: []
                    }
                }

                dispatch(e)
            })
            .catch(error => {
                throw(error);
            });
    };
}

export function changePage(pageNumber) {
    return (dispatch, getState) => {
        if (pageNumber < 1) {
            pageNumber = 1;
        }

        dispatch({
            type: "PAGE_CHANGED",
            payload: pageNumber
        })

        dispatch(getMovies(getState().filterReducer.searchString, getState().filterReducer.filters, pageNumber));
    }
}