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

// TODO: Convert array of appointments and schedules to an array of events to render to the calendar
// TODO: Determine how to drag appointment to next week
export class QuoteAppointmentScheduler extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      events,
    };

    this.moveEvent = this.moveEvent.bind(this);
    this.changeStyling = this.changeStyling.bind(this);
  }
// if endtime of updated event (my appointment) is between the start and endtime of any event in events, prevent appointment from being moved
  moveEvent({ event, start, end }) {
    const { events } = this.state; // eslint-disable-line no-shadow
    if (event.category === 'appointment') {
      const idx = events.indexOf(event);
      const updatedEvent = { ...event, start, end };
      const overLappedEvents = events.filter((eventObj) => (moment(updatedEvent.start).isBefore(eventObj.end) && moment(updatedEvent.end).isAfter(eventObj.start)));
      if (overLappedEvents.length > 0) {
        return;
      }
      const nextEvents = [...events];
      nextEvents.splice(idx, 1, updatedEvent);

      this.setState({
        events: nextEvents,
      });
    }
  }

  changeStyling(e) {
    console.log('in changeStlying');
    console.log(e);
  }

  render() {
    let renderCalendar = null;
    const loadingMessage = 'Loading your calendar...';
    const formats = {
      dateFormat: 'MMM Do',

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
      renderCalendar = (
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
      );
    }
    return (
      <div>
        <h3 className="callout">
          Schedule Appointment
        </h3>
        Drag and drop your time slot to an available slot
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
          date
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
