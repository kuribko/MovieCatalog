import React from "react";
import Client from "./Client";
import axios from 'axios';

export default class Greeting extends React.Component {

    constructor(props) {
        super(props);
        // this.client = new Client();
        this.state = {
            greeting: {
                id: -1,
                text: "not initialized"
            },
            name: "Bob"
        };
        // this.client.greeting().then(r => this.setState({greeting: r}));
        this.download();
    }

    download(n) {
        var name = this.state.name;
        axios.get("http://localhost:8080/greeting?name=" + name)
            .then(res => {
                let g = res.data;
                console.log("result: ", g);
                this.setState({greeting: g});
            });

    }

    handleChangeName(e) {
        console.log("handling: ", e);
        this.setState({name: e.target.value});
        console.log("state s: ", this.state.name);
        this.download(e.target.value);
    }

    componentDidMount() {
        this.download();
    }

    render() {
        return (
            <div>
                <div>
                    id={this.state.greeting.id}, text={this.state.greeting.text}
                </div>
                <input onChange={this.handleChangeName.bind(this)} type="text" value={this.state.name}/>
                <button onClick={this.download.bind(this)}>Download</button>
            </div>
        )
    }
}
