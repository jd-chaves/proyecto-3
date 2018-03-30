import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Input extends Component {

	constructor(props){
		super(props);
		this.state = {
			text: ""
		}
		this.manejarCambioInput = this.manejarCambioInput.bind(this);

	}

	manejarCambioInput(e)
	{
		const text = ReactDOM.findDOMNode(this.refs.textInput).value;
	if(text.endsWith(" "))
		{
			ReactDOM.findDOMNode(this.refs.textInput).value = "";
			this.props.handleInput(text.trim());
			
		}
	}

  render() {
    return 	<input type="text" ref="textInput" placeholder=""  onChange={this.manejarCambioInput}/>;
  }
}