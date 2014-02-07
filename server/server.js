Students = new Meteor.Collection("students");

Accounts.config({
  forbidClientAccountCreation: true
});

Meteor.methods({
  addStudent: function (name, topic, loc) {
    Students.insert(
      {
        name: name,
        topic: topic,
        location: loc,
        time: new Date()
      })
  },
  clearQueue: function () {
    Students.remove({});
  }
});

Students.allow({
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
