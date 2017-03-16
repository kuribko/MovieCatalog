const syncReducer = (state = {
    syncEvent: {},
    started: false
}, action) => {
    switch (action.type) {
        case "SYNC_EVENT_RECEIVED":
            state = {
                ...state,
                syncEvent: action.payload,
            };
            break;
        case "SYNC_STATUS_CHANGED":
            state = {
                ...state,
                started: action.payload
            };
            break;
        case "SYNC_LISTENER_INITIALIZED":
            console.log("sync initialized");
            break;
        
    }
    return state;
}

export default syncReducer;