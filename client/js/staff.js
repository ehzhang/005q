Template.staff.students = function () {
  if (Students.find({active: true}).count() > 0) {
    return Students.find({active: true}, {sort: {time: 1}})
  } else {
    return false;
  }
};

Template.queueItem.rendered = function () {
  if (!this._rendered) {
    this._rendered = true;
    $(this.find('.staff.queue.item')).transition('fade up in');
  }
};

Template.queueItem.destroyed = function () {
  this._rendered = false;
};

Template.queueItem.events({
  'click .checkoff.button': function () {
    Students.update(this._id,
      {
        $set: { active: false }
      });
  },
  'click .remove.icon': function () {
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
  return this.beingHelped ? "inverted purple blink" : false;
};
