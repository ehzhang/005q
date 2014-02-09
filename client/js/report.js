//groupSortedByTime = function (data, groupFunc, name) {
//  var groups = [];
//
//  // Group the sorted data.
//  for(var i = 0; i < data.length; i++) {
//    var group = groupFunc(data[i]);
//    if (groups.length > 0 &&
//        groups[groups.length - 1].group == group) {
//      // Add the data to the group array!
//      groups[groups.length - 1].getPropertyValue(name).push(data[i]);
//    } else {
//      groups.push({group: group, requests: [requests[i]]});
//    }
//  }
//  return days;
//}

// Return an array of Objects that represent groups by day.
Template.report.days = function () {
  var requests = Requests.find({active: false}, {sort: {time: -1}}).fetch(),
      days = [];

  // Group the sorted data.
  for(var i = 0; i < requests.length; i++) {
    var day = requests[i].time.toDateString();
    if (days.length > 0 && days[days.length - 1].day == day) {
      days[days.length - 1].requests.push(requests[i]);
    } else {
      days.push({day: day, requests: [requests[i]]});
    }
  }
  return days;
};

// Return the total number of requests for a day.
Template.day.totalRequests = function () {
  var count = this.requests.length;
  return count + " " + (count == 1 ? "request" : "requests")
}

// Returns an array of Objects that represent groups by hour.
Template.day.hours = function () {
  var requests = this.requests,
      hours = [];
  for(var i = 0; i < requests.length; i++) {
    var hour = requests[i].time.getHours();
    hour = hour < 12 ? hour + " AM" : hour % 12 + " PM";
    if (hours.length > 0 && hours[hours.length - 1].hour == hour) {
      hours[hours.length - 1].requests.push(requests[i]);
    } else {
      hours.push({hour: hour, requests: [requests[i]]});
    }
  }
  return hours;
};

// Allow one to selectively remove data in the reoprt section.
Template.reportRow.events({
  'click .remove.icon': function () {
    Requests.remove(this._id);
  }
});

// Return the total requests per hour.
Template.hour.totalRequests = function () {
  var count = this.requests.length;
  return count + " " + (count == 1 ? "person" : "people");
}