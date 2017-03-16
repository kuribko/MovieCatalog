import Constants from "../Constants";
import Axios from 'axios';

var eSource;

export function startSync() {
    return invokeSync(Constants.URLS.SSE.start);
}

export function stopSync() {
    return invokeSync(Constants.URLS.SSE.stop);
}

function invokeSync(url) {
    return (dispatch) => {
        Axios.get(url)
            .then(response => {
                let result = response.data;
                console.log("SYNC status: ", result);

                dispatch({
                    type: "SYNC_STATUS_CHANGED",
                    payload: result === "started"
                })
            })
            .catch(error => {
                throw(error);
            });
    };
}

export function initSyncEventListener() {
    return (dispatch, getState) => {
        if (typeof(EventSource) !== "undefined") {
            console.log("sse-url", Constants.URLS.SSE.events)
            eSource = new EventSource(Constants.URLS.SSE.events);
            eSource.onmessage = function (event) {
                var syncEvent = JSON.parse(event.data);
                dispatch({
                    type: "SYNC_EVENT_RECEIVED",
                    payload: syncEvent
                })
            };

            dispatch({
                type: "SYNC_LISTENER_INITIALIZED",
                payload: event
            })

        }
        else {
            console.error("Your browser doesn't receive server-sent events.");
        }
    }


}