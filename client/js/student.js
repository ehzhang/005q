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
