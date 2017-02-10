/*
 *
 * QuoteAppointmentScheduler
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectQuoteAppointmentScheduler from './selectors';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from './events';

BigCalendar.momentLocalizer(moment);
// TODO: limit selections to what available time slots or disable certain times
// a. disable filled time slots
// b. use onSelecting to return false if dragging a selection through an existing slot
//
// TODO: disable selecting alldays across


export class QuoteAppointmentScheduler extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const todaysDate = moment().format('MMMM Do YYYY');
    let formats = {
      dateFormat: 'MMM Do',

      dayFormat: (date, culture, localizer) =>
        localizer.format(date, 'MMM Do', culture),
    }
    console.log(todaysDate);
    return (
      <div>
        <h3 className="callout">
          Click an event to see more info, or
          drag the mouse over the calendar to select a date/time range.
        </h3>
        <BigCalendar
          formats={formats}
          selectable={'ignoreEvents'}
          events={events}
          defaultView='week'
          views={['week', 'day']}
          scrollToTime={new Date(1970, 1, 1, 6)}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={(slotInfo) => alert(
            `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
            `\nend: ${slotInfo.end.toLocaleString()}`
          )}
          min={new Date(1970, 1, 1, 7) }
          max={new Date(1970, 1, 1, 19) }
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
