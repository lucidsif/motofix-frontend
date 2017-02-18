/**
*
* Calendar
*
*/

import React from 'react';
import 'browsernizr/test/touchevents';
import Modernizr from 'browsernizr';
import BigCalendar from 'react-big-calendar-touch';
import withDragAndDropTouch from 'react-big-calendar-touch/lib/addons/dragAndDropTouch';
import withDragAndDropMouse from 'react-big-calendar-touch/lib/addons/dragAndDropMouse';
import moment from 'moment';
BigCalendar.momentLocalizer(moment);

BigCalendar.momentLocalizer(moment);
let DragAndDropCalendar;
Modernizr.touchevents ? DragAndDropCalendar = withDragAndDropTouch(BigCalendar) : DragAndDropCalendar = withDragAndDropMouse(BigCalendar); // eslint-disable-line no-unused-expressions

function Calendar(props) {
  const formats = {
    dateFormat: 'MMM Do YYYY',

    dayFormat: (date, culture, localizer) =>
      localizer.format(date, 'Do', culture),
  };
  return (
    <DragAndDropCalendar
      formats={formats}
      selectable
      events={props.availableAppointments}
      onSelectEvent={(event) => { // eslint-disable-line consistent-return
        if (event.category !== 'appointment') {
          return false;
        }
        console.log(event);
        // console.log(`${event.category} with ${event.start} and ${event.end} chosen`);
      }}
      onEventDrop={this.moveEvent}
      eventPropGetter={
        (event) => ({ className: `category-${event.category.toLowerCase()}` })
      }
      views={['month', 'week', 'day']}
      defaultView="week"
      min={new Date(1970, 1, 1, 8)}
      max={new Date(1970, 1, 1, 19)}
    />
  );
}

export default Calendar;
