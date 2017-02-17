/*
 *
 * QuoteAppointmentScheduler
 *
 */
import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
// import selectQuoteAppointmentScheduler from './selectors';
import { createStructuredSelector } from 'reselect';
import selectVehicleDomain from 'containers/QuoteAddVehicle/selectors';
import 'browsernizr/test/touchevents';
import Modernizr from 'browsernizr';
import BigCalendar from 'react-big-calendar-touch';
import events from './events';
import withDragAndDropTouch from 'react-big-calendar-touch/lib/addons/dragAndDropTouch';
import withDragAndDropMouse from 'react-big-calendar-touch/lib/addons/dragAndDropMouse';
import { Button, Segment, Dimmer, Loader, Image, Message } from 'semantic-ui-react';
import moment from 'moment';

BigCalendar.momentLocalizer(moment);
let DragAndDropCalendar;
Modernizr.touchevents ? DragAndDropCalendar = withDragAndDropTouch(BigCalendar) : DragAndDropCalendar = withDragAndDropMouse(BigCalendar); // eslint-disable-line no-unused-expressions

// TODO: fix styling of toolbar for mobile
// TODO: Convert array of appointments and schedules to an array of events to render to the calendar
export class QuoteAppointmentScheduler extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      events,
    };

    this.moveEvent = this.moveEvent.bind(this);
    this.changeStyling = this.changeStyling.bind(this);
  }

  changeStyling(e) {
    console.log('in changeStlying');
    console.log(e);
  }
// get all the dates of the month for the day associated with the schedule and attach the schedule to it
  // TODO: use switch instead of conditionals
  getDays(schedule) {
    const d = new Date();
    const month = d.getMonth();
    const days = [];
    if (schedule.day_of_week === 'Monday') {
      d.setDate(1);

    // Get the first Monday in the month
      while (d.getDay() !== 1) {
        d.setDate(d.getDate() + 1);
      }

    // Get all the other Mondays in the month
      while (d.getMonth() === month) {
        days.push({
          schedule,
          date: new Date(d.getTime()),
        });
        d.setDate(d.getDate() + 7);
      }

      return days;
    } else if (schedule.day_of_week === 'Tuesday') {
      d.setDate(1);

    // Get the first Tuesday in the month
      while (d.getDay() !== 2) {
        d.setDate(d.getDate() + 2);
      }

    // Get all the other Tuesdays in the month
      while (d.getMonth() === month) {
        days.push({
          schedule,
          date: new Date(d.getTime()),
        });
        d.setDate(d.getDate() + 7);
      }
      return days;
    }
  }

  checkGoogleCalendarConflict(date) {
    const hasConflict = false;
    const GoogleCalenderAppointments = null;
    if (!GoogleCalenderAppointments) {
    // logic to get scheduled appointments
    }

  // iterate through relevant scheduled appointments
  // if argument `date` has conflict, return true
  // else, return false

    return hasConflict;
  }

  getTimeSlotsForDay(date, startTime, endTime, laborTime) {
    const timeSlots = [];
    const dayStart = new Date(date);
    const dayEnd = new Date(date);

    dayStart.setHours(startTime, 0, 0, 0);
    dayEnd.setHours(endTime, 0, 0, 0);
    do {
      if (!this.checkGoogleCalendarConflict(dayStart)) {
        const endDateTime = new Date(dayStart);
        endDateTime.setHours(dayStart.getHours(), dayStart.getMinutes() + (laborTime * 60));

        timeSlots.push({
          title: 'Click Me',
          start: new Date(dayStart),
          end: endDateTime,
          category: 'appointment',
        });
      }
      dayStart.setHours(dayStart.getHours(), dayStart.getMinutes() + (laborTime * 60));
    } while (dayStart < dayEnd);

    return timeSlots;
  }

  moveEvent() {
    return;
  }

  render() {
    let renderCalendar = null;
    const loadingMessage = 'Loading your calendar...';
    const formats = {
      dateFormat: 'MMM Do YYYY',

      dayFormat: (date, culture, localizer) =>
        localizer.format(date, 'Do', culture),
    };
    if (this.props.allNearAppointmentsAndSchedulesLoading) {
      renderCalendar =
        (
          <Segment>
            <Dimmer active inverted>
              <Loader inverted content={loadingMessage} />
            </Dimmer>
            <Image src="http://semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        );
    } else {
      const unavailableTimeSlots = this.props.allNearAppointmentsAndSchedules.appointments.map((appt) => {
        // take date and estimated start and end time and make it into a javascript start and endtime
        const unavailable = {
          title: 'N/A',
          start: moment(appt.estimated_start_time).toDate(),
          end: moment(appt.estimated_end_time).toDate(),
          category: 'unavailable',
        };
        return unavailable;
      });

      const schedules = this.props.allNearAppointmentsAndSchedules.schedules;
      // console.log(schedules)
      const availableDays = schedules
        .map((schedule) =>
         this.getDays(schedule)
      )
        .reduce((acc, scheduleWithDay) =>
         acc.concat(scheduleWithDay)
    , []);

      const availableAppointments = availableDays
        .map((day) => {
          const startTime = moment(day.schedule.start_time, 'HH:mm:ss');
          const endTime = moment(day.schedule.end_time, 'HH:mm:ss');
          return this.getTimeSlotsForDay(day.date, moment(startTime).hours(), moment(endTime).hours(), 0.5);
        })
        .reduce((acc, appointmentArr) =>
       acc.concat(appointmentArr)
    , []);

      console.log(availableAppointments);

      renderCalendar = (
        <DragAndDropCalendar
          formats={formats}
          selectable
          events={availableAppointments}
          onSelectEvent={(event) => { // eslint-disable-line consistent-return
            if (event.category !== 'appointment') {
              return false;
            }
            console.log(`${event.category} with ${event.start} and ${event.end} chosen`);
          }}
          onEventDrop={this.moveEvent}
          eventPropGetter={
            (event) => ({ className: `category-${event.category.toLowerCase()}` })
          }
          views={['month', 'week', 'day']}
          defaultView="day"
          min={new Date(1970, 1, 1, 8)}
          max={new Date(1970, 1, 1, 19)}
        />
      );
    }
    return (
      <div>
        <h3 className="callout">
          Schedule Appointment
        </h3>
        Click on an available time slot
        {renderCalendar}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  vehicle: selectVehicleDomain(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

QuoteAppointmentScheduler.propTypes = {
  vehicle: React.PropTypes.object,
  allNearAppointmentsAndSchedules: React.PropTypes.object,
  allNearAppointmentsAndSchedulesLoading: React.PropTypes.bool,

};

const AppointmentsAndSchedulesQuery = gql`
  query allNearAppointmentsAndSchedules($zipOrCoordinates: String) {
    allNearAppointmentsAndSchedules(zipOrCoordinates: $zipOrCoordinates){
        appointments {
          id
          estimated_start_time
          estimated_end_time
        }
        schedules {
          id
          day_of_week
          start_time
          end_time
          break_start
          break_end
          available
          fk_mechanic_id
        }
      }
    }
`;

const QuoteAppointmentSchedulerRedux = connect(mapStateToProps, mapDispatchToProps);

const withAppointmentsAndSchedulesData = graphql(AppointmentsAndSchedulesQuery, {
  options: (ownProps) => ({ variables: { zipOrCoordinates: ownProps.vehicle.location } }),
  props: ({ ownProps, data: { loading, allNearAppointmentsAndSchedules } }) => ({
    allNearAppointmentsAndSchedulesLoading: loading,
    allNearAppointmentsAndSchedules,
    ownProps,
  }),
});

export default compose(
  QuoteAppointmentSchedulerRedux,
  withAppointmentsAndSchedulesData,
)(QuoteAppointmentScheduler);
