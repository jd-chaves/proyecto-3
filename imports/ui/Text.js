import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Text extends Component {

	render() {
		let cp = this.props.currentPage;
		return (

			<div>
				<label>
					{this.props.words.slice(cp*16,(cp+1)*16).map(t=>
						{  	
							if(t[1]===0)
								return <h2>{t[0]}</h2>;
							
							else if(t[1]===1)
								return <h2 className="typedCorrect">{t[0]}</h2>;

							else if(t[1]===2)
								return <h2 className="typedWrong">{t[0]}</h2>;

					}
						)}
				</label>
			</div>

			);
		}
	}