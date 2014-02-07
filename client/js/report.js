/**
 * Get a list of documents organized by day.
 * @returns {*|Cursor|219|1103|79|590}
 */
Template.report.days = function () {
  var students = Students.find({active: false}, {sort: {time: -1}}).fetch(),
      days = [];

  for(var i = 0; i < students.length; i++) {
    var day = students[i].time.toDateString();
    if (days.length > 0 && days[days.length - 1].day == day) {
      days[days.length - 1].students.push(students[i]);
    } else {
      days.push({day: day, students: [students[i]]});
    }
  }
  return days;
};

Template.day.hours = function () {
  var students = this.students,
      hours = [];
  for(var i = 0; i < students.length; i++) {
    var hour = students[i].time.getHours();
    hour = hour < 12 ? hour + " AM" : hour % 12 + " PM";
    if (hours.length > 0 && hours[hours.length - 1].hour == hour) {
      hours[hours.length - 1].students.push(students[i]);
    } else {
      hours.push({hour: hour, students: [students[i]]});
    }
  }
  return hours;
};

Template.day.rendered = function () {
  $('.ui.accordion').accordion();
}

Template.reportItem.events({
  'click .remove.icon': function () {
    Students.remove(this._id);
  }
})