import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Input extends Component {

	constructor(props){
		super(props);
		this.state = {
			text: ""
		}
	}

	manejarCambioInput(e)
	{
		this.setState({
			text: e.target.value
		});

		if(this.state.text.endsWith(" "))
		{
			this.props.handleInput(this.state.text.trim());
			e.target.value="";
		}
	}

  render() {
    return 	<input type="text" placeholder=""  onChange={this.manejarCambioInput}/>;
  }
}