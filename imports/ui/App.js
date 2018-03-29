import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor"; 
import { Competitions } from "../api/competitions.js"; 
import Competition from "./Competition.js";
import AccountsUIWrapper from "./AccountsUIWrapper.js";
 
// App component - represents the whole app
class App extends Component {
   
     handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    Meteor.call("competitions.insert", text);

 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = "";
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Typing Test</h1>

          <AccountsUIWrapper />
          { this.props.currentUser ?
            <form className="search-competitions" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Search for competitions"
              />
            </form> : ""
          }
        </header>
        
        <ul>
          {this.props.competitions.map((c)=>
            <Competition
              key={c._id}
              competition={c}
            />
        )}
        </ul>
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