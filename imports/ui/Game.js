import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Text from "./Text.js";

export default class Game extends Component {

	constructor(props)
	{
		super(props);
		this.state = {
			words: [],
			currentPage: 0,
			currentWord:0,
			correct: 0
		}
	};


	handleInput(text){
		if(text === words[currentPage*10+currentWord])
		{
			let temp = this.state.correct + 1;
			this.setState({correct:temp});
		}

		if(this.state.currentWord===9)
		{
			let temp2 = this.state.currentPage +1; 
			this.setState({currentPage: temp2});
		}
		let temp3 = (this.state.currentWord +1)%10;
		this.setState({currentWord:temp3});
	}

  render() {
    return <Text words = {this.state.words} currentPage = {this.state.currentPage} currentWord = {this.state.currentWord} handleInput={this.handleInput}/>;
  }
}