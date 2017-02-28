/**
*
* Appointments
*
*/

import React from 'react';
import { Segment } from 'semantic-ui-react';
import moment from 'moment';

// restyle appointments
class Appointments extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }
  renderAppointments() {
    return this.props.allUserAppointments.map((appointment) =>
       (
         <Segment key={appointment.id}>
           <div>
            Appointment Time:        {moment(appointment.estimated_start_time).format('MMM D @ h:mm A')} - {moment(appointment.estimated_end_time).format('MMM D @ h:mm A')}
           </div>
           <div>
            Mechanic:        {appointment.fk_mechanic_id}
           </div>
           <div>
            Status:        {appointment.status}
           </div>
         </Segment>
      )
    );
  }

  render() {
    return (
      <div>
        <ul>
          {this.renderAppointments()}
        </ul>
      </div>
    );
  }
}

export default Appointments;
