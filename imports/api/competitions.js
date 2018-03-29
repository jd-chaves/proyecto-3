import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
 
export const Competitions = new Mongo.Collection("competitions");

 
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("competitions", function competitionsPublication() {
    return Competitions.find({});
  });
}

Meteor.methods({
  "competitions.insert"(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a competition
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }
 
    Competitions.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  "competitions.remove"(competitionId) {
    check(competitionId, String);

    const competition = Competitions.findOne(competitionId);
    if (competition.owner !== this.userId) {
      // If the competition is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }
 
    Competitions.remove(competitionId);
  },
});