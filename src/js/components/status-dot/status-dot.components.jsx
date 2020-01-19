import React from "react";

import "./status-dot.styles.css";

export const StatusDot = ({ color }) => (
	<span className='status-dot' style={{ backgroundColor: color }}></span>
);
