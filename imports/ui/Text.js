import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Competition.js extends Component {

	render() {

		let cp = this.props.currentPage;

		return (
			<div>
			<ul> 
			{this.props.words.slice(cp*10, (cp*10)+this.props.currentWord)}
			</ul>
			<ul>
			{this.props.words.slice(cp*10+this.props.currentWord,(cp+1)*10)}
			</ul>
			</div>

			);
		}
	}