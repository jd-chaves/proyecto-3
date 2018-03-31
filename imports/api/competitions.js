import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
 
export const Competitions = new Mongo.Collection("competitions");
const Words = new Mongo.Collection("words");
 
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('competitions', function competitionsPublication() {
    return Competitions.find({
      $or: [
        { usernames : Meteor.users.findOne(this.userId).username  },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  "competitions.insert"(name, the_language, arr_users) {
    check(name, String);
    check(the_language, String);
    check(arr_users, Array);

 
    // Make sure the user is logged in before inserting a competition
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }
 
    arr_words = Words.find({language: the_language}).words;
    Competitions.insert({
      name,
      createdAt: new Date(),
      owner: this.userId,
      user: Meteor.users.findOne(this.userId).username ,
      usernames: arr_users,
      language: the_language,
      words: ["hola","como","esta","todo","bien", "o", "no", "esta", "es","una", "prueba", "de", "la", "competencia", "de", "la", "pagina", "que",
      "estamos","hacinedo", "para","el", "curso", "de", "desarrollo", "web", "si", "funciona", "sera", "severo","ya","no","se","que","mas","palabras",
      "poner"]
    });
  },
  "competitions.remove"(competitionId) {
    check(competitionId, String);

    const competition = Competitions.findOne(competitionId);
    if (competition.owner !==  this.userId) {
      // If the competition is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }
 
    Competitions.remove(competitionId);
  },
});