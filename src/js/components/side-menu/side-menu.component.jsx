import React from "react";
import "./side-menu.styles.css";

import { MenuLink } from "../menu-link/menu-link.components";

import logo from "../../../img/aniTracker32.png";

export const SideMenu = (props) => (
	<div className='side-menu'>
		<h1>
			<img src={logo} />
			aniTracker
		</h1>
		<nav>
			{props.links.map(({ icon, iconAlt, text, className, key }) => (
				<MenuLink
					icon={icon}
					iconAlt={iconAlt}
					text={text}
					className={className}
					key={key}
					view={key}
					currentView={props.currentView}
					onClick={props.handleLinkClick}
				/>
			))}
		</nav>
	</div>
);
