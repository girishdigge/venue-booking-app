'use client';
import {
  Calendar,
  EventProps,
  momentLocalizer,
  View,
  Views,
} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';

// Start week from Monday
moment.updateLocale('en', {
  week: {
    dow: 1,
  },
});

const localizer = momentLocalizer(moment);

type EventItem = {
  title: string;
  start: Date;
  end: Date;
  hall: string;
  client: string;
};

const BigCalendar = ({ data }: { data: EventItem[] }) => {
  console.log(data);
  const [view, setView] = useState<View>(Views.MONTH);
  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  const EventComponent = ({ event }: EventProps<EventItem>) => (
    <div className='flex flex-col text-xs'>
      <strong>{event.title}</strong>
      <span>🏛️ {event.hall}</span>
      <span>👤 {event.client}</span>
    </div>
  );
  return (
    <Calendar
      localizer={localizer}
      events={data}
      startAccessor='start'
      endAccessor='end'
      components={{ event: EventComponent }}
      views={['month', 'week', 'day']}
      view={view}
      style={{ height: 'calc(100vh - 64px)' }}
      onView={handleOnChangeView}
      min={new Date(2025, 1, 0, 6, 0, 0)}
      max={new Date(2050, 1, 0, 23, 59, 59)}
    />
  );
};
export default BigCalendar;
