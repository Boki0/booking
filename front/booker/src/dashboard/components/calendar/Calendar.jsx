import "./calendar.scss";
import React from 'react';

import {Scheduler, Resource} from 'devextreme-react/scheduler';
import { resourcesData } from './data.js';

const Calendar = ({data}) => {

  const currentDate = Date.now();
  const views = [{
    type: 'week',
    name: 'Week',
  }, {
    type: 'month',
    name: 'Month',
    maxAppointmentsPerCell: 1,
  }];

  const onAppointmentFormOpening = (e) => {
    e.cancel = true
  }

  return (
    <Scheduler id="scheduler"
      dataSource={data}
      views={views}
      defaultCurrentView='Month'
      defaultCurrentDate={currentDate}
      firstDayOfWeek={1}
      startDayHour={9}
      endDayHour={19}
      editing={false}
      onAppointmentFormOpening={onAppointmentFormOpening}>

        <Resource
          dataSource={resourcesData}
          fieldExpr="typeId"
          label="Type"
        />  

    </Scheduler>  
  )
}

export default Calendar
