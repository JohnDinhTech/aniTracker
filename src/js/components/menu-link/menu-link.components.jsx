import React from "react";
import "./menu-link.styles.css";

export const MenuLink = ({ icon, iconAlt, text }) => (
    <a href="#">
        <img src={icon} alt={iconAlt} />
        {text}
    </a>
);
