'use client';
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar';
import moment from 'moment';
import { calendarEvents } from '@/constants/data';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';

// Start week from Monday
moment.updateLocale('en', {
  week: {
    dow: 1,
  },
});

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.MONTH);
  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };
  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor='start'
      endAccessor='end'
      views={['month', 'week', 'day']}
      view={view}
      style={{ height: '98%' }}
      onView={handleOnChangeView}
    />
  );
};
export default BigCalendar;
