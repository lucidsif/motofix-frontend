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
import { Message, Form, Input } from 'semantic-ui-react';
import moment from 'moment';
import Geosuggest from 'react-geosuggest';
import StripeCheckout from 'components/StripeCheckout';

BigCalendar.momentLocalizer(moment);

BigCalendar.momentLocalizer(moment);
let DragAndDropCalendar;
Modernizr.touchevents ? DragAndDropCalendar = withDragAndDropTouch(BigCalendar) : DragAndDropCalendar = withDragAndDropMouse(BigCalendar); // eslint-disable-line no-unused-expressions

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTimeSlot: null,
      motorcycle_address: null,
      contact_name: null,
      contact_number: null,
    };

    this.moveEvent = this.moveEvent.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
    this.onSuggestChange = this.onSuggestChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPhoneChange = this.onPhoneChange.bind(this);
  }

  // check if user is authenticated. if authenticated, save event to state. otherwise reroute.
  onSelect(event) {
    if (!this.props.authenticated) {
      browserHistory.push('/login');
    }
    this.setState({ selectedTimeSlot: event });
  }

  onSuggestSelect(mapsObj) {
    this.setState({ motorcycle_address: mapsObj.label });
  }

  onSuggestChange() {
    this.setState({ motorcycle_address: null });
  }

  onNameChange(e) {
    this.setState({ contact_name: e.target.value });
  }

  onPhoneChange(e) {
    const phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if (phoneNumberPattern.test(e.target.value)) {
      this.setState({ contact_number: e.target.value });
    } else {
      this.setState({ contact_number: null });
    }
  }

  moveEvent() {

  }

  render() {
    let conditionallyRenderStripeButton = null;
    if (this.state.motorcycle_address && this.state.contact_name && this.state.contact_number) {
      conditionallyRenderStripeButton = (
        <div>
          <div className="payTextMarginBottom">
          Pre-authorize your card for the quote total to schedule your appointment.
          </div>
          <StripeCheckout calendarAppointmentState={this.state} />
        </div>
      );
    } else {
      conditionallyRenderStripeButton = null;
    }

    const formats = {
      dateFormat: 'MMM Do YYYY',

      dayFormat: (date, culture, localizer) =>
        localizer.format(date, 'Do', culture),
    };
    let timeSlotSelectedMessage = null;
    let paymentResponseMessage = null;
    if (this.props.paid) {
      paymentResponseMessage = (
        <Message positive>
          <Message.Content>
            Thank you for your payment! Routing you in just a sec...
          </Message.Content>
        </Message>
      );
    } else if (this.props.paid === false) {
      paymentResponseMessage = (
        <Message negative>
          <Message.Content>
            Oh no :( Something went wrong with the payment. Please check your card details and try again.
          </Message.Content>
        </Message>
      );
    }
    if (this.state.selectedTimeSlot) {
      timeSlotSelectedMessage = (
        <div>
        {paymentResponseMessage}
        <Message positive>
          <span>{moment(this.state.selectedTimeSlot.start).format('MMM D @ h:mm A')} to {moment(this.state.selectedTimeSlot.end).format('MMM D @ h:mm A')}</span>
          <Message.Content>
            <Form>
              <div className="ui large icon input calendarGeosuggestMargin">
                <Geosuggest
                  placeholder="Where should we meet you?"
                  country="us"
                  types={['geocode']}
                  onSuggestSelect={(mapObj) => this.onSuggestSelect(mapObj)}
                  onChange={this.onSuggestChange}
                />
                <i className="location arrow icon"></i>
              </div>
              <div className="phoneNumberMarginBottom">
                <Input
                  icon="user"
                  placeholder="What's your name?"
                  size="large"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="phoneNumberMarginBottom">
                <Input
                  icon="mobile"
                  placeholder="What's your mobile number?"
                  size="large"
                  onChange={this.onPhoneChange}
                />
              </div>
            </Form>
            {conditionallyRenderStripeButton}
          </Message.Content>
        </Message>
        </div>
      );
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
  authenticated: React.PropTypes.bool,
};

export default Calendar;
