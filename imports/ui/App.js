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
        competition: null,
        time:0,
        running:0,
        mins:0,
        secs:0,
        tenths:0,
        pag_act: 1
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.agregarPartida = this.agregarPartida.bind(this);
      this.join = this.join.bind(this);
      this.startPause = this.startPause.bind(this);
      this.increment = this.increment.bind(this);
      this.aumentar_pag = this.aumentar_pag.bind(this);
      this.reducir_pag = this.reducir_pag.bind(this);
      }


     handleSubmit(e) {
     this.setState({current_search: e.target.value});
    }
      agregarPartida(){
        var arr_users = ReactDOM.findDOMNode(this.refs.usernamesInput).value.split(",").map((n)=>n.trim().toLowerCase());
        Meteor.call("competitions.insert",ReactDOM.findDOMNode(this.refs.textInput).value,"Spanish", arr_users);
    }
      join(e){
        const comp_id = e.target.value;
        let comp = null;

        for(let p of this.props.competitions)
        {
          if(p._id===comp_id){
            comp=p;
          }
        }
        this.setState({competition: comp,  competition_selected: true});

      }
       startPause() {
    if (this.state.running == 0) {
        this.setState({running:1});
        this.increment(this);
    } 
}

 reset(){
    this.setState({running:0});
    this.setState({time:0});
}

aumentar_pag(e)
  {
    var a = this.state.pag_act+1;
    
    if(!(a>Math.ceil(this.props.competitions.
                                  filter((comp)=> (comp.name.includes(this.state.current_search)||comp.user.includes(this.state.current_search))).length/6)))
    this.setState({ pag_act:a ,
    });
  }
reducir_pag(e)
  {
    
        var a = this.state.pag_act-1;
if(!(a<=0))
    this.setState({
      pag_act: a,
    });
  }
increment(obj) {
    if (obj.state.running == 0) {
        setTimeout(function() {
            var a = obj.state.time ++;
            obj.setState({time:a})
           
            obj.setState({mins:Math.floor(a/10/60)});
            obj.setState({secs:Math.floor(a/10 % 60)});
            obj.setState({tenths:a % 10});

         //   if (mins < 10) {
         //     mins = "0" + mins;
         //   } 
         //  if (secs < 10) {
         //     secs = "0" + secs;
         //   }
            obj.increment(obj);
        },100);
    }
}

  render() {
    const ultimo_pag_index=this.state.pag_act*6;
    const primer_pag_index=ultimo_pag_index - 6;
    const items_ahora = this.props.competitions.
                                  filter((comp)=> (comp.name.includes(this.state.current_search)||comp.user.includes(this.state.current_search)))
                                  .slice(primer_pag_index, ultimo_pag_index);


    
   
    const pags = [...Array(2).keys()].map(i =>i+1);
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
          {items_ahora.map((c)=><div>
                                          <Competition
                                              
                                              competition={c}
                                           />
                                           <button key={c._id}  value={c._id} onClick={this.join}>Join</button> 
                                           </div>
                                          )}
        </ul>

      <h3>Pagina: {this.state.pag_act}</h3>
        <button onClick={this.reducir_pag}>Previous</button>
        <button onClick={this.aumentar_pag}>Next</button>
        <br/>
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

                 <select name="language">
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
        </div> : ""}
        {(this.props.currentUser&&this.state.competition_selected)?
        <div>
           <Game words={this.state.competition.words}/>
       

          
        <p>{this.state.mins}:{this.state.secs}:0{this.state.tenths}</p>   
        <button onClick={this.startPause}>start</button>

        </div> :""
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