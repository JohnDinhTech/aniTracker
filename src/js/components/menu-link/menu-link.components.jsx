import React from "react";
import "./menu-link.styles.css";

export const MenuLink = ({ icon, iconAlt, text, className }) => (
    <a href="#">
        <img className={className} src={icon} alt={iconAlt} />
        {text}
    </a>
);
