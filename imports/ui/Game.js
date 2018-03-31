import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Text from "./Text.js";
import Input from "./Input.js";

export default class Game extends Component {

	constructor(props)
	{
		super(props);

		var arr = this.props.words.map(w=>[w,0]);
		console.log(arr);
		this.state = {
			words: arr,
			currentPage: 0,
			currentWord:0,
			correct: 0,
			tried: 0
		}
		this.handleInput = this.handleInput.bind(this);
	};


	handleInput(text){
		if(text === this.state.words[this.state.currentPage*16+this.state.currentWord][0])
		{
			let temp = this.state.correct + 1;
			this.setState({correct:temp});
			this.state.words[this.state.currentPage*16+this.state.currentWord][1]=1;
		}
		else{
			this.state.words[this.state.currentPage*16+this.state.currentWord][1]=2;
		}
		if(this.state.currentWord===15)
		{
			let temp2 = this.state.currentPage +1; 
			this.setState({currentPage: temp2});
		}
		let temp3 = (this.state.currentWord +1)%16;
		this.setState({currentWord:temp3});
		let temp4 = this.state.tried +1;
		this.setState({tried:temp4});
	}

  render() {
    return (<div>
    	<Text words = {this.state.words} currentPage = {this.state.currentPage} 
    	currentWord = {this.state.currentWord} handleInput={this.handleInput}/>
		<Input handleInput={this.handleInput}/>
		<p>Correct Words: {this.state.correct}</p>
  			</div>)
  }
}