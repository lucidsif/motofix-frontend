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
import { Button, Segment, Dimmer, Loader, Image, Message } from 'semantic-ui-react';
import moment from 'moment';

BigCalendar.momentLocalizer(moment);

BigCalendar.momentLocalizer(moment);
let DragAndDropCalendar;
Modernizr.touchevents ? DragAndDropCalendar = withDragAndDropTouch(BigCalendar) : DragAndDropCalendar = withDragAndDropMouse(BigCalendar); // eslint-disable-line no-unused-expressions

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTimeSlot: null,
    };
  }

  moveEvent() {

  }
  render() {
    const formats = {
      dateFormat: 'MMM Do YYYY',

      dayFormat: (date, culture, localizer) =>
        localizer.format(date, 'Do', culture),
    };
    let timeSlotSelectedMessage = null;
    if (this.state.selectedTimeSlot) {
      timeSlotSelectedMessage = (
        <Message positive>
          <Message.Header>
            Appointment was selected for <span>{moment(this.state.selectedTimeSlot.start).format('MMM-DD h A')} to {moment(this.state.selectedTimeSlot.end).format('MMM-DD h A')}</span>
          </Message.Header>
          <Message.Content>
            Pre-authorize your card for the quote total to schedule your appointment.
          </Message.Content>
          <Button color="teal">Book Appointment</Button>
        </Message>
      )
    }

    return (
      <div>
        {timeSlotSelectedMessage}
        <DragAndDropCalendar
          formats={formats}
          selectable
          events={this.props.availableAppointments}
          onSelectEvent={(event) => { // eslint-disable-line consistent-return
            if (event.category !== 'appointment') {
              return false;
            }
            //(moment(event.start).format());
            this.setState({ selectedTimeSlot: event });
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
      </div>
    );
  }
}

Calendar.propTypes = {
  availableAppointments: React.PropTypes.array,
};

export default Calendar;
