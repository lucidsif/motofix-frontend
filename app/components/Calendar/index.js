/**
*
* Calendar
*
*/

import React from 'react';
import { browserHistory } from 'react-router';
import 'browsernizr/test/touchevents';
import Modernizr from 'browsernizr';
import BigCalendar from 'react-big-calendar-touch';
import withDragAndDropTouch from 'react-big-calendar-touch/lib/addons/dragAndDropTouch';
import withDragAndDropMouse from 'react-big-calendar-touch/lib/addons/dragAndDropMouse';
import { Button, Segment, Dimmer, Loader, Image, Message, Form, Input } from 'semantic-ui-react';
import moment from 'moment';
import Geosuggest from 'react-geosuggest';
import StripeCheckout from 'components/StripeCheckout';

BigCalendar.momentLocalizer(moment);

BigCalendar.momentLocalizer(moment);
let DragAndDropCalendar;
Modernizr.touchevents ? DragAndDropCalendar = withDragAndDropTouch(BigCalendar) : DragAndDropCalendar = withDragAndDropMouse(BigCalendar); // eslint-disable-line no-unused-expressions

// TODO: add validation for phone number and address fields
// TODO: require phone and address field before paying with card. render error messages if not filled


class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTimeSlot: null,
      motorcycle_address: null
    };

    this.onSelect = this.onSelect.bind(this);
    this.onSuggestSelect = this.onSuggestSelect(this);
  }

  moveEvent() {

  }
  // check if user is authenticated. if authenticated, save event to state. otherwise reroute.
  onSelect(event) {
    console.log(this.props.authenticated);

    if (!this.props.authenticated) {
      browserHistory.push('/login');
    }

    this.setState({ selectedTimeSlot: event });
  }

  onSuggestSelect(mapsObj) {
    this.setState({ motorcycle_address: mapsObj})
  }

  render() {
    console.log(this.props.authenticated);
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
            <Form>
                <div className="ui large icon input calendarGeosuggestMargin">
                  <Geosuggest
                    placeholder="Where should we meet you?"
                    country="us"
                    types={['geocode']}
                    onSuggestSelect={(mapObj) => this.onSuggestSelect(mapObj)}
                    onBlur={() => this.onBlurError}
                  />
                  <i className="location arrow icon"></i>
                </div>
              <div className="phoneNumberMarginBottom">
                <Input
                  icon="mobile"
                  placeholder="What's your mobile number?"
                  size="large"
                />
              </div>
            </Form>
            <div className="payTextMarginBottom">
            Pre-authorize your card for the quote total to schedule your appointment.
            </div>
          </Message.Content>
          <StripeCheckout />
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
          onSelectEvent={this.onSelect}
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