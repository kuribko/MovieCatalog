import React from "react";
import {connect} from "react-redux";
import {initSyncEventListener, startSync, stopSync} from "../actions/syncActions";


class Synchronizer extends React.Component {

    componentDidMount() {
        this.props.initSyncEventListener();
    }

    render() {
        return (
            <div id="synchronizer">
                {!this.props.sync.started &&
                <button onClick={this.props.startSync} className="btn btn-primary">
                    <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
                </button>
                }

                {
                    this.props.sync.started &&
                    <button onClick={this.props.stopSync} className="btn btn-danger">
                        <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"
                              aria-hidden="true"></span>
                    </button>
                }

                <div id="syncText">
                    <small data-toggle="tooltip" title="обработано/всего/новых">
                        {this.props.sync.syncEvent.parsedMoviesCount}&nbsp;
                        {this.props.sync.syncEvent.parsedMoviesCount && "/"}&nbsp;
                        {this.props.sync.syncEvent.totalMoviesCount}&nbsp;&nbsp;
                        <span className="badge">{this.props.sync.syncEvent.newMoviesCount}</span>
                    </small>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sync: state.syncReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startSync: () => {
            dispatch(startSync());
        },
        stopSync: () => {
            dispatch(stopSync());
        },
        initSyncEventListener: ()=> {
            dispatch(initSyncEventListener())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Synchronizer)