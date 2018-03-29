import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor"; 
import { Competitions } from "../api/competitions.js"; 
import Competition from "./Competition.js";
import AccountsUIWrapper from "./AccountsUIWrapper.js";
 
// App component - represents the whole app
class App extends Component {
   
    constructor(props){

      super(props);
      this.state = {
        current_search: "",
        competition_selected:false 
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.agregarPartida = this.agregarPartida.bind(this);
    }


     handleSubmit(e) {
     this.setState({current_search: e.target.value});
    }
      agregarPartida(){
        
    }
  render() {

    return (
      <div className="container">
        <header>
          <h1>Typing Test</h1>

          <AccountsUIWrapper /> 
          { (this.props.currentUser&&!this.state.competition_selected) ?
            <div className="search-competitions">
            <input  type="text" placeholder="Search for competitions"  onChange={this.handleSubmit}/> 
            </div>: ""
          }
        </header>
        
        <ul>
          {this.props.competitions.filter((comp)=> comp.text.includes(this.state.current_search) )
                                    .map((c)=>
                                          <Competition
                                              key={c._id}
                                              competition={c}
                                           />
                                          )}
        </ul>
        <button onClick = {this.agregarPartida}></button>
        </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("competitions");
  return {
    competitions: Competitions.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(App);