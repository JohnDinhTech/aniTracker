import React, { Component } from "react";

import { InputSlider } from "../components/input-slider/input-slider.component";

import { Button } from "../components/button/button.component";

import ChromeStorage from "../modules/ChromeStorage";

import "./popup.styles.css";

class Popup extends Component {
	constructor() {
		super();
		this.storage = new ChromeStorage();

		this.state = {
			tracking: true
		};
	}

	openOptionsPage() {
		chrome.runtime.openOptionsPage(() => {
			console.log("opening options page");
			chrome.tabs.query(
				{
					active: true,
					currentWindow: true
				},
				(tabs) => {
					chrome.tabs.reload(tabs[0].id);
				}
			);
		});
	}

	sliderHandler = (e) => {
		if (e.target.checked) {
			this.setState({ tracking: true });
			this.storage.saveTracking(true);
			chrome.tabs.query(
				{
					active: true,
					currentWindow: true
				},
				(tabs) => {
					chrome.tabs.reload(tabs[0].id);
				}
			);
		} else {
			this.setState({ tracking: false });
			this.storage.saveTracking(false);
		}
	};

	async componentDidMount() {
		const isTracking = await this.storage.get("tracking");
		this.setState({ tracking: isTracking });
	}

	render() {
		const status = this.state.tracking
			? {
					text: "Currently Tracking",
					color: "#11cdef"
			  }
			: {
					text: "Extension Is Off",
					color: "rgb(204, 63, 41)"
			  };

		return (
			<div className='popup'>
				<h1 style={{ color: status.color }}>{status.text}</h1>
				<div className='track-status'>
					<h2>Tracking</h2>
					<InputSlider
						tracking={this.state.tracking}
						checkHandler={this.sliderHandler}
					/>
				</div>
				<Button
					text='View List'
					color='#11cdef'
					handler={this.openOptionsPage}
				/>
			</div>
		);
	}
}

export default Popup;
