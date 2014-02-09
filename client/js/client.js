// Client side Collection of requests
Requests = new Meteor.Collection("requests");

Deps.autorun(function () {
  if (Meteor.user()) {
    // If the user is logged in, load all of the requests.
    Meteor.subscribe("allRequests");
  } else {
    // If not logged in, only load active queue requests.
    Meteor.subscribe("activeRequests");
  };
});