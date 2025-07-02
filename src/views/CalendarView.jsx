// Persian FullCalendar assets are loaded globally via script tags in index.html
import { useEffect, useRef } from 'react';
import useLocal from '@/store/useLocal.js';

export default function CalendarView() {
  const calendarRef = useRef(null);
  const { events, setEvents } = useLocal();

  useEffect(() => {
    const $ = window.jQuery;
    $(calendarRef.current).fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,basicWeek,basicDay'
      },
      locale: 'fa',
      isJalaali: true,
      isRTL: true,
      editable: true,
      events,
      eventDrop: ({ event }) => handleChange(event),
      eventResize: ({ event }) => handleChange(event)
    });
  }, []);

  const handleChange = (event) => {
    const updated = events.map((e) => (e.id === event.id ? {
      ...e,
      start: event.start.format(),
      end: event.end ? event.end.format() : undefined
    } : e));
    setEvents(updated);
  };

  return <div id="calendar" ref={calendarRef} />;
}
