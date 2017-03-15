import Constants from "../components/Constants";
import Axios from 'axios';


export function changeSearchString(searchString) {

    return (dispatch, getState) => {
        dispatch(getMovies(searchString, getState().filterReducer.filters));

        dispatch({
            type: "SEARCH_STRING_CHANGED",
            payload: searchString
        })
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

        dispatch(getMovies(getState().filterReducer.searchString, filters));

        dispatch({
            type: "FILTERS_CHANGED",
            payload: filters
        })
    };
}

// export function changeSearchString(filter) {
//     return (dispatch, getState) => {
//         let url = Constants.URLS.movies + filter.searchString;
//         console.log("GET from ", url);
//         console.log("ge tState: ", getState());
//         // Returns a promise
//         return Axios.get(url)
//             .then(response => {
//                 let result = response.data;
//                 console.log("GET result: ", result);
//
//                 let e = {
//                     type: "SEARCH_STRING_CHANGED",
//                     payload: {
//                         filter: filter,
//                         searchResults: result
//                     }
//                 }
//
//                 dispatch(e)
//             })
//             .catch(error => {
//                 throw(error);
//             });
//     };
// }

export function getMovies(searchString, filters) {
    return (dispatch) => {

        let filterString = "";
        for (var key in filters) {
            filterString = filterString + getFiltersString(key, filters[key].selected);
        }
        let url = Constants.URLS.movies + searchString + filterString;

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