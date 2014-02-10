// Return the active requests for the staff to see!
Template.staff.requests = function () {
  if (Requests.find({active: true}).count() > 0) {
    return Requests.find({active: true}, {sort: {time: 1}})
  } else {
    return false;
  }
};

// When the queueItem is rendered
Template.queueItem.rendered = function () {
  // On the first time, transition up!
  if (!this._rendered) {
    this._rendered = true;
    $(this.find('.staff.queue.item')).transition('fade up in');
  }
};

// Reset the _renderd flag when the queueItem template is destroyed
Template.queueItem.destroyed = function () {
  this._rendered = false;
};

// Manage events for the queueItem
Template.queueItem.events({
  'click .remove.icon': function () {
    // Remove the entry from the database
    Requests.remove(this._id);
    return false;
  },
  'click .help.button': function () {
    // Update the database entry to beingHelped
    Requests.update(this._id,
      {
        $set: { beingHelped: true }
      });
    return false;
  },
  'click .checkoff.button': function (event) {
    // Checkoff for when a student has been marked as helped, and checked off
    // Get the notes, from the textarea within the parent container.
    var notes = $(event.target).parent().find('textarea[type=notes]').val();
    Requests.update(this._id,
      {
        $set:
        {
          active: false,
          notes: notes
        }
      });
    return false;
  }
});

// CSS classes. If being helped, cause it to blink purple!
Template.queueItem.beingHelped = function () {
  return this.beingHelped ? "inverted orange blink" : false;
};
