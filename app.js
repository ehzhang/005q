Students = new Meteor.Collection("students");

if (Meteor.isClient) {

  Template.app.staff = function () {
    return Meteor.user().staff;
  }

  Template.nav.events({
    'click .login.item': function () {
      $('#login')
        .dimmer('show')
        .find('input').focus();
    },
    'click .logout.item': function () {
      Meteor.logout();
    }
  });

  Template.student.events({
    'keyup #login input': function (event) {
      var $loginInput = $('#login').find('input');
      if (event.keyCode == 13) {
        Meteor.loginWithPassword("staff", $loginInput.val());
        $loginInput.val("");
      }
    },
    'click .help.button': function (event) {
      var $nameInput = $('#name'),
          $topicInput = $('#topic');
      if (!$('.help.button').hasClass("disabled")) {
        Meteor.call("addStudent", $nameInput.val(), $topicInput.val());
        $nameInput.val("");
        $topicInput.val("");
      }
    },
    'keyup #name, #topic': function (event) {
      var $nameInput = $('#name'),
          $topicInput = $('#topic'),
          $helpButton = $('.help.button');
      if ($nameInput.val()) {
        $helpButton.removeClass("disabled");
      } else {
        $helpButton.addClass("disabled");
      }
    }
  });

  Template.student.qlength = function () {
    return Students.find({}).count();
  };

  Template.student.students = function () {
    return Students.find({}, {sort: {time: 1}});
  };

  Template.staff.students = function () {
    return Students.find({}, {sort: {time: 1}});
  };

  Template.queueItem.rendered = function () {
    $(this.find('.staff.queue.item')).transition('fade up in');
  }

  Template.queueItem.events({
    'click .remove.button': function () {
      Students.remove(this._id);
    },
    'click .help.button': function () {
      Students.update(this._id,
      {
        $set: { beingHelped: true }
      })
    }
  });

  Template.queueItem.beingHelped = function () {
    return this.beingHelped ? "inverted purple blink" : "";
  }

}

if (Meteor.isServer) {

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
    insert: function (userId, doc) {
      // Don't fuck with the console, yo
      return false;
    },
    update: function (userId, doc) {
      return Meteor.user().username == "staff";
    },
    remove: function (userId, doc) {
      return Meteor.user().username == "staff";
    }
  });

}
