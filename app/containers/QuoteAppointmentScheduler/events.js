export default [
  {
    title: 'N/A',
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
    category: 'unavailable',
  },
  {
    title: 'N/A',
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10),
    category: 'unavailable',
  },

  {
    title: 'N/A',
    start: new Date(2017, 1, 10, 0, 0, 0),
    end: new Date(2017, 1, 12, 0, 0, 0),
    category: 'unavailable',
  },

  {
    title: 'N/A',
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
    category: 'unavailable',
  },

  {
    title: 'N/A',
    start: new Date(2015, 3, 9, 0, 0, 0),
    end: new Date(2015, 3, 9, 0, 0, 0),
    category: 'unavailable',
  },
  {
    title: 'N/A',
    start: new Date(2017, 1, 10, 10, 30, 0, 0),
    end: new Date(2017, 1, 10, 12, 30, 0, 0),
    category: 'unavailable',
  },
  {
    title: 'Drag Me',
    start: new Date(2015, 3, 12, 12, 0, 0, 0),
    end: new Date(2015, 3, 12, 13, 0, 0, 0),
    category: 'appointment',
  },
  {
    title: 'N/A',
    start: new Date(2015, 3, 12, 14, 0, 0, 0),
    end: new Date(2015, 3, 12, 15, 0, 0, 0),
    category: 'unavailable',
  },
  {
    title: 'N/A',
    start: new Date(2015, 3, 12, 17, 0, 0, 0),
    end: new Date(2015, 3, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day',
    category: 'unavailable',
  },
  {
    title: 'N/A',
    start: new Date(2015, 3, 12, 20, 0, 0, 0),
    end: new Date(2015, 3, 12, 21, 0, 0, 0),
    category: 'unavailable',
  },
  {
    title: 'N/A',
    start: new Date(2015, 3, 13, 7, 0, 0),
    end: new Date(2015, 3, 13, 10, 30, 0),
    category: 'unavailable',
  },
];
/////

var today = new Date();

function checkGoogleCalendarConflict(date) {
  var hasConflict = false;
  var GoogleCalenderAppointments = null;
  if (!GoogleCalenderAppointments) {
    //logic to get scheduled appointments
  }

  //iterate through relevant scheduled appointments
  //if argument `date` has conflict, return true
  //else, return false

  return hasConflict
}

function getTimeSlotsForDay(date, startTime, endTime, laborTime) {
  var timeSlots = []
  var dayStart = new Date(date)
  var dayEnd = new Date(date)

      dayStart.setHours(startTime, 0, 0, 0)
      dayEnd.setHours(endTime, 0, 0, 0)
  do {
    if (!checkGoogleCalendarConflict(dayStart)) {
      let endTime = new Date(dayStart);
      endTime.setHours(dayStart.getHours(), dayStart.getMinutes() + (laborTime * 60))

      timeSlots.push({
        title: 'Click Me',
        start: new Date(dayStart),
        end: endTime,
        category: 'appointment',
      })
    }
    dayStart.setHours(dayStart.getHours(), dayStart.getMinutes() + (laborTime * 60))
  } while (dayStart < dayEnd);

  return timeSlots
}

console.log(getTimeSlotsForDay(today, 12, 17, 0.5))