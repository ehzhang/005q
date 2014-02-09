// Manage pages using routing.
// Pages: "staff", "report"
Session.setDefault("page", "queue");

// Check to see if we're at a certain page.
Template.app.page = function (page) {
  return Session.equals("page", page);
};

// Manage the nav bar events.
Template.nav.events({
  'click .login.item': function () {
    // Show the login dimmer.
    $('#login')
      .dimmer('show')
      .find('input').focus();
  },
  'click .logout.item': function () {
    // Well, log out.
    Meteor.logout();
  },
  'click .report.item': function () {
    // Change the page to report.
    Session.set("page", "report");
  },
  'click .queue.item': function () {
    // Change the page to the queue.
    Session.set("page", "queue");
  },
  'click .changelog.item': function () {
    // Show the changelog modal.
    $('.changelog.modal').modal('show');
    return false;
  }
});