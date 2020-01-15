import React, { Component } from "react";

import { SideMenu } from "../components/side-menu/side-menu.component";
import "./App.css";

import homeIcon from "../../img/icons/home.svg";
import copyIcon from "../../img/icons/copy.svg";
import heartIcon from "../../img/icons/heart.svg";
import settingsIcon from "../../img/icons/settings.svg";

class App extends Component {
    constructor() {
        super();

        this.state = {
            listView: true,
            currentView: "home",
            listItems: []
        };

        this.links = [
            {
                icon: homeIcon,
                iconAlt: "Home Icon",
                text: "Home",
                className: "home-icon",
                key: "home"
            },
            {
                icon: copyIcon,
                iconAlt: "Copy Icon",
                text: "Sync With MyAnimeList",
                className: "copy-icon",
                key: "sync"
            },
            {
                icon: heartIcon,
                iconAlt: "Heart Icon",
                text: "Support",
                className: "heart-icon",
                key: "support"
            },
            {
                icon: settingsIcon,
                iconAlt: "Settings Icon",
                text: "Settings",
                className: "settings-icon",
                key: "settings"
            }
        ];
    }

    render() {
        return (
            <div className="App">
                <SideMenu
                    links={this.links}
                    currentView={this.state.currentView}
                />
            </div>
        );
    }
}

export default App;
