import React, { Component } from "react";

import { SideMenu } from "../components/side-menu/side-menu.component";
import "./App.css";

class App extends Component {
    constructor() {
        super();

        this.state = {
            listView: true,
            listItems: []
        };
    }

    render() {
        return (
            <div className="App">
                <SideMenu />
            </div>
        );
    }
}

export default App;
