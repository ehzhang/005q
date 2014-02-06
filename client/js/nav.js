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