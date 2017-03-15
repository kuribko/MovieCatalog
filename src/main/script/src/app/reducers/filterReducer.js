const filterReducer = (state = {
    searchString: "",
    filters: {},
    searchResults: {movies: []},
}, action) => {
    switch (action.type) {
        case "SEARCH_STRING_CHANGED":
            state = {
                ...state,
                searchString: action.payload
            };
            break;
        case "MOVIES_CHANGED":
            state = {
                ...state,
                searchResults: action.payload
            };
            break;
        case "FILTERS_CHANGED":
            state = {
                ...state,
                filters: action.payload
            };
            break;
        case "FILTERS_INITIALIZED":
            state = {
                ...state,
            };
            state.filters[action.fieldName] = action.payload
            break;
    }
    return state;
};

export default filterReducer;