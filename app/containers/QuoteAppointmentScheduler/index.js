/*
 *
 * QuoteAppointmentScheduler
 *
 */
import React from 'react';
import { connect } from 'react-redux';
import selectQuoteAppointmentScheduler from './selectors';

import 'browsernizr/test/touchevents';
import Modernizr from 'browsernizr';
import BigCalendar from 'react-big-calendar-touch';
import events from './events';
import withDragAndDropTouch from 'react-big-calendar-touch/lib/addons/dragAndDropTouch';
import withDragAndDropMouse from 'react-big-calendar-touch/lib/addons/dragAndDropMouse';

import moment from 'moment';

BigCalendar.momentLocalizer(moment);

let DragAndDropCalendar;
Modernizr.touchevents ? DragAndDropCalendar = withDragAndDropTouch(BigCalendar) : DragAndDropCalendar = withDragAndDropMouse(BigCalendar); // eslint-disable-line no-unused-expressions

export class QuoteAppointmentScheduler extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      events,
    };

    this.moveEvent = this.moveEvent.bind(this);
    this.changeStyling = this.changeStyling.bind(this);
  }

  moveEvent({ event, start, end }) {
    console.log(event);
    const { events } = this.state; // eslint-disable-line no-shadow
    if (event.category === 'appointment') {
      const idx = events.indexOf(event);
      const updatedEvent = { ...event, start, end };

      const nextEvents = [...events];
      nextEvents.splice(idx, 1, updatedEvent);

      this.setState({
        events: nextEvents,
      });
      console.log(`${event.title} was dropped onto ${event.start}`);
    } else {
      console.log(`${event.title} cannot be selected!`);
    }
  }

  changeStyling(e) {
    console.log('in changeStlying');
    console.log(e);
  }

  render() {
    const formats = {
      dateFormat: 'MMM Do',

      dayFormat: (date, culture, localizer) =>
        localizer.format(date, 'Do', culture),
    };
    return (
      <div>
        <h3 className="callout">
          Schedule Appointment
        </h3>
        Drag and drop your time slot to an available slot
        <DragAndDropCalendar
          formats={formats}
          selectable
          events={this.state.events}
          onSelectEvent={(event) => { // eslint-disable-line consistent-return
            if (event.category !== 'appointment') {
              return false;
            }
          }}
          onEventDrop={this.moveEvent}
          eventPropGetter={
            (event) => ({ className: `category-${event.category.toLowerCase()}` })
          }
          views={['week', 'day']}
          defaultView="day"
          defaultDate={new Date(2015, 3, 12)}
          min={new Date(1970, 1, 1, 7)}
          max={new Date(1970, 1, 1, 19)}
        />
      </div>
    );
  }
}

const mapStateToProps = selectQuoteAppointmentScheduler();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuoteAppointmentScheduler);
