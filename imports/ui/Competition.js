import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Competitions } from '../api/competitions.js';
// Competition component - represents a single todo item
export default class Competition extends Component {
 
  deleteThisCompetition() {
    Meteor.call('competitions.remove', this.props.competition._id);
  }
 
  render() {
    
    return (
      <li >
        <button className="delete" onClick={this.deleteThisCompetition.bind(this)}>
          &times;
        </button>
        <span className="text">
           {this.props.competition.name}.  Created by <strong>{this.props.competition.user}</strong>.
        </span>
      </li>
    );
  }
}