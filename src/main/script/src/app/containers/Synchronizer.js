import React from "react";
import Constants from "../Constants";
import Axios from 'axios';

export default class Synchronizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            syncStarted: false,
            syncEvent: {}
        }

    }

    componentDidMount() {
        this.initSSE(this);

    }

    initSSE(that) {
        if (typeof(EventSource) !== "undefined") {
            console.log("sse-url", Constants.URLS.SSE.events)
            var eSource = new EventSource(Constants.URLS.SSE.events);
            eSource.onmessage = function (event) {
                var syncEvent = JSON.parse(event.data);
                console.log("sse:", syncEvent);
                that.setState({syncEvent: syncEvent});
            };
        } else {
            document.getElementById("serverData").innerHTML = "Whoops! Your browser doesn't receive server-sent events.";
        }
    }

    startSSE() {
        Axios.get(Constants.URLS.SSE.start);
        this.setState({syncStarted: true});
        // .then(response => {
        //     let result = response.data;
        //     console.log("GET result: ", result);
        //
        //     let e = {
        //         type: "MOVIES_CHANGED",
        //         payload: result
        //     }
        //
        //     dispatch(e)
        // })
        // .catch(error => {
        //     throw(error);
        // });
    }

    stopSSE() {
        Axios.get(Constants.URLS.SSE.stop);
        this.setState({syncStarted: false});
        // .then(response => {
        //     let result = response.data;
        //     console.log("GET result: ", result);
        //
        //     let e = {
        //         type: "MOVIES_CHANGED",
        //         payload: result
        //     }
        //
        //     dispatch(e)
        // })
        // .catch(error => {
        //     throw(error);
        // });
    }

    render() {

        return (
            <div id="synchronizer">
                {!this.state.syncStarted &&
                <button onClick={this.startSSE.bind(this)} className="btn btn-primary">
                    <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
                </button>
                }

                {
                    this.state.syncStarted &&
                    <button onClick={this.stopSSE.bind(this)} className="btn btn-danger">
                        <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"
                              aria-hidden="true"></span>
                    </button>
                }
                <div id="syncText">
                    <small data-toggle="tooltip" title="обработано/всего/новых">
                        {this.state.syncEvent.parsedMoviesCount}&nbsp;
                        {this.state.syncEvent.parsedMoviesCount && "/"}&nbsp;
                        {this.state.syncEvent.totalMoviesCount}&nbsp;&nbsp;
                        <span className="badge">{this.state.syncEvent.newMoviesCount}</span>
                    </small>
                </div>
            </div>
        )
    }
}