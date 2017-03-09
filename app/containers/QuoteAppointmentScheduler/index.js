/*
 *
 * QuoteAppointmentScheduler
 *
 */
import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { createStructuredSelector } from 'reselect';
import { selectAuthenticated, selectUserId } from 'containers/App/selectors';
import selectVehicleDomain from 'containers/QuoteAddVehicle/selectors';
import { selectCart, selectPart, selectVoucherCodeStatus } from 'containers/QuoteCentral/selectors';
import { selectPaid } from './selectors';
import services from 'containers/QuoteCentral/reducerServices';
import Calendar from 'components/Calendar';
import moment from 'moment';
import { Segment, Dimmer, Loader, Image, Button } from 'semantic-ui-react';

// TODO: fix bug that prevents from rendering time slots on friday
// TODO: fix bug that prevents rendering time slots on weekends
// TODO: 6.5/10 allow to only schedule appointment once - create appointmentSchedule state, action creator, and reducer
// TODO: exclude break times from available appointments
// TODO: test for multiple mechanics. How can multiple mechanic time slots be rendered?
// TODO: fix styling of toolbar for mobile
export class QuoteAppointmentScheduler extends React.Component { // eslint-disable-line react/prefer-stateless-function

  // get all the dates of the month for the day associated with the schedule and attach the schedule to it
  getDays(schedule) {
    const d = new Date();
    const month = d.getMonth();
    const days = [];

    switch (schedule.day_of_week) {
      case 'Monday':
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
        break;
      case 'Tuesday':
        d.setDate(1);

        // Get the first Tuesday in the month
        while (d.getDay() !== 2) {
          d.setDate(d.getDate() + 1);
        }

        // Get all the other Tuesdays in the month
        while (d.getMonth() === month) {
          days.push({
            schedule,
            date: new Date(d.getTime()),
          });
          d.setDate(d.getDate() + 7);
        }
        break;
      case 'Wednesday':
        d.setDate(1);

        // Get the first Wednesday in the month
        while (d.getDay() !== 3) {
          d.setDate(d.getDate() + 1);
        }

        // Get all the other Wednesdays in the month
        while (d.getMonth() === month) {
          days.push({
            schedule,
            date: new Date(d.getTime()),
          });
          d.setDate(d.getDate() + 7);
        }
        break;
      case 'Thursday':
        d.setDate(1);

        // Get the first Thursday in the month
        while (d.getDay() !== 4) {
          d.setDate(d.getDate() + 1);
        }
        // Get all the other Thursdays in the month
        while (d.getMonth() === month) {
          days.push({
            schedule,
            date: new Date(d.getTime()),
          });
          d.setDate(d.getDate() + 7);
        }
        break;
      case 'Friday':
        d.setDate(1);

        // Get the first Friday in the month
        while (d.getDay() !== 5) {
          d.setDate(d.getDate() + 1);
        }

        // Get all the other Fridays in the month
        while (d.getMonth() === month) {
          days.push({
            schedule,
            date: new Date(d.getTime()),
          });
          d.setDate(d.getDate() + 7);
        }
        break;
      case 'Saturday':
        d.setDate(1);

        // Get the first Saturday in the month
        while (d.getDay() !== 6) {
          d.setDate(d.getDate() + 1);
        }

        // Get all the other Saturdays in the month
        while (d.getMonth() === month) {
          days.push({
            schedule,
            date: new Date(d.getTime()),
          });
          d.setDate(d.getDate() + 7);
        }
        break;
      case 'Sunday':
        d.setDate(1);

        // Get the first Sunday in the month
        while (d.getDay() !== 0) {
          d.setDate(d.getDate() + 1);
        }

        // Get all the other Sunday in the month
        while (d.getMonth() === month) {
          days.push({
            schedule,
            date: new Date(d.getTime()),
          });
          d.setDate(d.getDate() + 7);
        }
        break;
      default:
        console.log('error, a valid day has not been sent to getDays()');
        console.log(schedule, schedule.day_of_week);
    }
    // filter for all dates that are after right now
    const startOfToday = new Date();
    const noPastDays = days.filter((day) =>
       moment(day.date).isAfter(startOfToday)
    );
    return noPastDays;
  }

// TODO: ensure that the minutes is also calculated for
// TODO: Make sure user selects a diagnosis if they want an appointment and have unknown services selected
  getTimeSlotsForDay(date, startTime, endTime, sumOfLaborTimes, mechanic) {
    let estimatedLaborTime = sumOfLaborTimes;
    if (estimatedLaborTime <= 0) {
      estimatedLaborTime = 1.0;
    }
    const timeSlots = [];
    const dayStart = new Date(date);
    const dayEnd = new Date(date);

    dayStart.setHours(startTime, 0, 0, 0);
    dayEnd.setHours(endTime, 0, 0, 0);
    do {
      if (!this.checkAppointmentConflict(dayStart, estimatedLaborTime)) {
        const endDateTime = new Date(dayStart);
        endDateTime.setHours(dayStart.getHours(), dayStart.getMinutes() + (estimatedLaborTime * 60));

        timeSlots.push({
          title: 'Click Me',
          start: new Date(dayStart),
          end: endDateTime,
          category: 'appointment',
          mechanic,
        });
      }
      dayStart.setHours(dayStart.getHours(), dayStart.getMinutes() + (estimatedLaborTime * 60));
    } while (dayStart < dayEnd);
    return timeSlots;
  }

  checkAppointmentConflict(date, sumOfLaborTimes) {
    let hasConflict = false;
    const pendingAppointments = this.props.allNearAppointmentsAndSchedules.appointments;

    // convert date to a new appointment start and new appointment end
    const newAppointmentStart = date;
    const newAppointmentEnd = new Date(date);
    newAppointmentEnd.setHours(newAppointmentStart.getHours(), newAppointmentStart.getMinutes() + (sumOfLaborTimes * 60));

    const conflictedAppointments = pendingAppointments.filter((pendingAppointment) => { // eslint-disable-line consistent-return
      // console.log(moment(newAppointmentStart).format("YYYY-MM-DD HH:mm:ss"))
      // console.log(moment(pendingAppointment.estimated_start_time).format("YYYY-MM-DD HH:mm:ss"))

      // console.log(moment(newAppointmentStart).format("YYYY-MM-DD HH:mm:ss"))
      // console.log(moment(pendingAppointment.estimated_end_time).format("YYYY-MM-DD HH:mm:ss"))
      if (moment(newAppointmentStart).isSame(pendingAppointment.estimated_start_time) && moment(newAppointmentEnd).isSame(pendingAppointment.estimated_end_time)) {
        return pendingAppointment;
      }
      if (moment(newAppointmentStart).isBefore(pendingAppointment.estimated_end_time) && moment(newAppointmentEnd).isAfter(pendingAppointment.estimated_start_time)) {
        return pendingAppointment;
      }
      return null;
    });

    if (conflictedAppointments.length > 0) {
      console.log('conflict');
      hasConflict = true;
    }

    // iterate through relevant scheduled appointments
    // if argument `date` has conflict, return true
    // else, return false

    return hasConflict;
  }

  render() {
    let renderCalendar = null;
    const loadingMessage = 'Getting available appointments near you...';
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
      const sumOfLaborTimes = services.map((service) => {
        const regexedService = service.replace(/\s/g, '');
        return regexedService;
      })
        .reduce((acc, curr) => {
          if (this.props.cart[curr].selected && typeof this.props.cart[curr].laborTime === 'number') {
            const laborTime = this.props.cart[curr].laborTime;
            return acc + laborTime;
          }
          return acc + 0;
        }, 0) * 2;

      const schedules = this.props.allNearAppointmentsAndSchedules.schedules;
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
          return this.getTimeSlotsForDay(day.date, moment(startTime).hours(), moment(endTime).hours(), sumOfLaborTimes, day.schedule.fk_mechanic_id);
        })
        .reduce((acc, appointmentArr) =>
       acc.concat(appointmentArr)
    , []);


      renderCalendar = (
        <Calendar
          availableAppointments={availableAppointments}
          authenticated={this.props.authenticated}
          paid={this.props.paid}
          voucherCodeStatus={this.props.voucherCodeStatus}
          userId={this.props.userId}
        />
      );
    }
    return (
      <div>
        <h3 className="callout">
          Schedule Appointment
        </h3>
        Coming Soon..
        {renderCalendar}
        {/* this btn should be floated left in the future? */}
        <Button
          onClick={browserHistory.goBack}
          size="large"
          className="calendarButtonMarginTop"
        >Back</Button>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  paid: selectPaid(),
  authenticated: selectAuthenticated(),
  vehicle: selectVehicleDomain(),
  cart: selectCart(),
  part: selectPart(),
  voucherCodeStatus: selectVoucherCodeStatus(),
  userId: selectUserId(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

QuoteAppointmentScheduler.propTypes = {
  paid: React.PropTypes.bool,
  authenticated: React.PropTypes.bool,
  cart: React.PropTypes.object,
  allNearAppointmentsAndSchedules: React.PropTypes.object,
  allNearAppointmentsAndSchedulesLoading: React.PropTypes.bool,
  userId: React.PropTypes.number,
  voucherCodeStatus: React.PropTypes.bool,
};

const AppointmentsAndSchedulesQuery = gql`
  query allNearAppointmentsAndSchedules($zipOrCoordinates: String!) {
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
  options: (ownProps) => ({
    variables: { zipOrCoordinates: ownProps.vehicle.location },
    forceFetch: true,
  }),
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
