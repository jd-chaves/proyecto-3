import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor"; 
import { Competitions } from "../api/competitions.js"; 
import Competition from "./Competition.js";
import Game from "./Game.js";
import AccountsUIWrapper from "./AccountsUIWrapper.js";
 
// App component - represents the whole app
class App extends Component {
   
    constructor(props){

      super(props);
      this.state = {
        current_search: "",
        competition_selected:false, 
        competition: null
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.agregarPartida = this.agregarPartida.bind(this);
      this.join = this.join.bind(this);
    }


     handleSubmit(e) {
     this.setState({current_search: e.target.value});
    }
      agregarPartida(){
        var arr_users = ReactDOM.findDOMNode(this.refs.usernamesInput).value.split(",").map((n)=>n.trim().toLowerCase());
        Meteor.call("competitions.insert",ReactDOM.findDOMNode(this.refs.textInput).value,"Spanish", arr_users);
    }
      join(e){
        const comp_id = e.target.key;
        let comp = null;

        for(let p in this.props.competitions)
        {
          if(p._id===comp_id){
            comp=p;
          }
        }

        this.setState({competition: comp,  competition_selected: true});

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
        
        { (this.props.currentUser&&!this.state.competition_selected) ?
          <div>
        <ul>
          {this.props.competitions.filter((comp)=> comp.name.includes(this.state.current_search) )
                                    .map((c)=><div>
                                          <Competition
                                              
                                              competition={c}
                                           />
                                           <button key={c._id} onClick={this.join}>Join</button> 
                                           </div>
                                          )}
        </ul>

        <h2>Add Competition</h2>

      
          <div className="row">
              <div className="col-sm-6">
                <label className="form-label"><strong>Name: </strong></label>
                <input
                  type="text"
                  ref="textInput"
                  placeholder="Name of your competition"
                />

               <label className="form-label"><strong>Language: </strong></label>

                 <select name="cars">
                    <option value="english">English</option>
                    <option value="french">French</option>
                    <option value="spanish">Spanish</option>
                 </select>
              </div>
              <div className="col-sm-6"> 
                <label className="form-label"><strong>Users: </strong></label>
                <input
                   type="text"
                   ref="usernamesInput"
                   placeholder="Type usernames"
                />
                <button className="btn btn-info" type="button" onClick={this.agregarPartida}>Add</button>
              </div>
            </div>
        </div> :
        <div>

           <Game words={[["hola", 0],["como", 0],["esta", 0],["sol", 0],["luna", 0],
           ["casa", 0],["silla", 0],["equipo", 0],["pantalon", 0],["lorem", 0],["ipsum", 0],["hola", 0],["prueba", 0],["sistema", 0],["pagina", 0],
           ["español", 0],["idioma", 0],["lenguaje", 0],["saber", 0],["comer", 0],["hablar", 0],["verbo", 0],["tres", 0],["numero", 0],["liquidar", 0]]}/>
        </div>
         }
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