/*
 *
 * QuoteAppointmentScheduler
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectQuoteAppointmentScheduler from './selectors';

import BigCalendar from 'react-big-calendar';
import events from './events';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import moment from 'moment';

BigCalendar.momentLocalizer(moment);
// a. disable filled time slots/change stlying
//
// TODO: disable selecting alldays across

// import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

export class QuoteAppointmentScheduler extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
    this.state = {
      events,
    }

    this.moveEvent = this.moveEvent.bind(this);
    this.changeStyling = this.changeStyling.bind(this);
  }

  moveEvent({ event, start, end }) {
    console.log(event);
    const { events } = this.state;
    if(event.category === 'appointment') {
      const idx = events.indexOf(event);
      const updatedEvent = { ...event, start, end };

      const nextEvents = [...events]
      nextEvents.splice(idx, 1, updatedEvent);

      this.setState({
        events: nextEvents,
      });
      console.log(`${event.title} was dropped onto ${event.start}`);
    }
    else {
      console.log(`${event.title} cannot be selected!`);
    }
  }

  changeStyling(e) {
    console.log('in changeStlying');
    console.log(e);
  }

  render() {
    const todaysDate = moment().format('MMMM Do YYYY');
    let formats = {
      dateFormat: 'MMM Do',

      dayFormat: (date, culture, localizer) =>
        localizer.format(date, 'MMM Do', culture),
    }
    return (
      <div>
        <h3 className="callout">
          Schedule Appointment
        </h3>
        <DragAndDropCalendar
          formats={formats}
          selectable
          events={this.state.events}
          onSelectEvent={event => {
            if(event.category !== 'appointment'){
              return false;
            }
          }}
          onEventDrop={this.moveEvent}
          eventPropGetter={
            event => ({className: 'category-' + event.category.toLowerCase()})
          }
          views={['week', 'day']}
          defaultView='week'
          defaultDate={new Date(2015, 3, 12)}
          min={new Date(1970, 1, 1, 7) }
          max={new Date(1970, 1, 1, 19) }
          onHover={(e) => console.log(e)}
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
