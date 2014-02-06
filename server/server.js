Students = new Meteor.Collection("students");

Accounts.config({
  forbidClientAccountCreation: true
});

Meteor.methods({
  addStudent: function (name, topic) {
    Students.insert(
      {
        name: name,
        topic: topic,
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
