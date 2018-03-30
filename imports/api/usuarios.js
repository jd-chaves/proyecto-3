import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
 
export const Usuarios = new Mongo.Collection("usuarios");

 
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("usuarios", function usersPublication() {
    return Usuarios.find({});
  });
}

Meteor.methods({
  "users.updatePermission"(username)
  {
    check(username, String);
  }
});