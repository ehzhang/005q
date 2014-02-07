Template.student.events({
  'keyup #login input': function (event) {
    var $loginInput = $('#login').find('input');
    if (event.keyCode == 13) {
      Meteor.loginWithPassword("staff", $loginInput.val());
      $loginInput.val("");
    }
  },
  'click .help.button': function () {
    var $nameInput = $('#name'),
        $topicInput = $('#topic'),
        $locInput = $('#location');
    if (!$('.help.button').hasClass("disabled")) {
      Meteor.call("addStudent", $nameInput.val(), $topicInput.val(), $locInput.val());
      $nameInput.val("");
      $topicInput.val("");
      $locInput.val("");
    }
  },
  'keyup #name, #topic': function () {
    var $nameInput = $('#name'),
        $helpButton = $('.help.button');
    if ($nameInput.val()) {
      $helpButton.removeClass("disabled");
    } else {
      $helpButton.addClass("disabled");
    }
  }
});

Template.student.people = function () {
  var count = Students.find({active: true}).count();
  return (count == 1 ? "is " : "are ") + count + " " + (count == 1 ? "person" : "people");
};

Template.student.students = function () {
  return Students.find({active: true}, {sort: {time: 1}});
};
