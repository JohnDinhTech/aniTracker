import React from "react";
import "./side-menu.styles.css";

import { MenuLink } from "../menu-link/menu-link.components";

import logo from "../../../img/aniTracker32.png";

import homeIcon from "../../../img/icons/home.svg";
import copyIcon from "../../../img/icons/copy.svg";
import heartIcon from "../../../img/icons/heart.svg";
import settingsIcon from "../../../img/icons/settings.svg";

const links = [
    {
        icon: homeIcon,
        iconAlt: "Home Icon",
        text: "Home",
        className: "home-icon"
    },
    {
        icon: copyIcon,
        iconAlt: "Copy Icon",
        text: "Sync With MyAnimeList",
        className: "copy-icon"
    },
    {
        icon: heartIcon,
        iconAlt: "Heart Icon",
        text: "Support",
        className: "heart-icon"
    },
    {
        icon: settingsIcon,
        iconAlt: "Settings Icon",
        text: "Settings",
        className: "settings-icon"
    }
];

export const SideMenu = props => (
    <div className="side-menu">
        <h1>
            <img src={logo} />
            aniTracker
        </h1>
        <nav>
            {links.map(({ icon, iconAlt, text, className }) => (
                <MenuLink
                    key={icon}
                    icon={icon}
                    iconAlt={iconAlt}
                    text={text}
                    className={className}
                />
            ))}
        </nav>
    </div>
);
