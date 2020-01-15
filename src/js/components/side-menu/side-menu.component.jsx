import React from "react";
import "./side-menu.styles.css";
import logo from "../../../img/aniTracker32.png";

export const SideMenu = props => (
    <div className="side-menu">
        <h1>
            <img src={logo} alt="aniTrack Logo" />
            aniTracker
        </h1>
    </div>
);
