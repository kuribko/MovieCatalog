const filterReducer = (state = {
    searchString: "",
    filters: {},
    currentPage: 1,
    searchResults: {movies: []},
    filtersVisible: false
}, action) => {
    switch (action.type) {
        case "SEARCH_STRING_CHANGED":
            state = {
                ...state,
                searchString: action.payload,
                currentPage: 1
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
                filters: action.payload,
                currentPage: 1
            };
            break;
        case "FILTERS_INITIALIZED":
            state = {
                ...state
            };
            state.filters[action.fieldName] = action.payload
            break;
        case "PAGE_CHANGED":
            let maxPage = Math.ceil(state.searchResults.count / state.searchResults.pageSize);
            if(action.payload>maxPage){
                break
            }
            
            state = {
                ...state,
                currentPage: action.payload
            };
            break;
        case "TOGGLE_FILTER_VISIBILITY":
            state = {
                ...state,
                filtersVisible: !state.filtersVisible
            };
            break;
    }
    return state;
};

export default filterReducer;