Template.student.events({
  'keyup #login input': function (event) {
    // Get the login input element
    var $loginInput = $('#login').find('input');
    if (event.keyCode == 13) {
      // If Enter, try to login under the staff username
      Meteor.loginWithPassword("staff", $loginInput.val());
      // Clear the login input
      $loginInput.val("");
    }
  },
  'click .help.button': function () {
    // Get all of the inputs for the request data.
    var $nameInput = $('#name'),
        $topicInput = $('#topic'),
        $locInput = $('#location');
    // Only if there is something in the name input
    if ($nameInput.val()) {
      Meteor.call("addRequest", $nameInput.val(), $topicInput.val(), $locInput.val());
//    // Clear all of the inputs
      $nameInput.val("");
      $topicInput.val("");
      $locInput.val("");
    }
  },
  'keyup #name, #topic': function () {
    // Handler disable/enable the help button.
    var $nameInput = $('#name'),
        $helpButton = $('.help.button');
    if ($nameInput.val()) {
      $helpButton.removeClass("disabled");
    } else {
      $helpButton.addClass("disabled");
    }
  }
});

// Return the number of people as a string (i.e 1 person, 2 people)
Template.student.people = function () {
  var count = Requests.find({active: true}).count();
  return (count == 1 ? "is " : "are ") + count + " " + (count == 1 ? "person" : "people");
};

// Get all of the requests that are currently active.
Template.student.requests = function () {
  return Requests.find({active: true}, {sort: {time: 1}});
};
