import React from "react";
import "./menu-link.styles.css";

export const MenuLink = ({
	icon,
	iconAlt,
	text,
	className,
	currentView,
	view,
	onClick
}) => (
	<a
		href='#'
		style={
			currentView === view
				? { backgroundColor: "#f6f9fc", color: "#11cdef" }
				: {}
		}
		view={view}
		onClick={onClick}
	>
		<img className={className} src={icon} alt={iconAlt} />
		{text}
	</a>
);
