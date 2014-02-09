// Server side collection of requests
Requests = new Meteor.Collection("requests");

// Define functions to get specific data
getAllRequests = function () {
  return Requests.find({});
};

getActiveRequests = function () {
  return Requests.find({active:true}, {fields: {topic: 0}});
};

// Publish record sets for certain info
Meteor.publish("allRequests", getAllRequests);

Meteor.publish("activeRequests", getActiveRequests);

// Don't let the client create Accounts!
Accounts.config({
  forbidClientAccountCreation: true
});

// Methods for the server to run.
Meteor.methods({
  addRequest: function (name, topic, loc) {
    // add a request!
    Requests.insert(
      {
        name: name,
        topic: topic,
        location: loc,
        active: true,
        time: new Date()
      })
  }
});

// Allow permissions for the server.
Requests.allow({
  insert: function () {
    // Don't fuck with the console, yo
    return false;
  },
  update: function () {
    return Meteor.user().username == "staff";
  },
  remove: function () {
    return Meteor.user().username == "staff";
  }
});
