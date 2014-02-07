Session.setDefault("page", "staff");

Template.app.page = function (page) {
  return Session.equals("page", page);
}

Template.nav.events({
  'click .login.item': function () {
    $('#login')
      .dimmer('show')
      .find('input').focus();
  },
  'click .logout.item': function () {
    Meteor.logout();
  },
  'click .report.item': function () {
    Session.set("page", "report");
  },
  'click .queue.item': function () {
    Session.set("page", "queue");
  }

});