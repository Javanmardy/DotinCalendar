import React from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import useLocal from '@/store/useLocal.js';

export default function GanttView() {
  const { events } = useLocal();
  const resources = events.map(e => ({ id: e.id, title: e.title }));

  return (
    <FullCalendar
      plugins={[resourceTimelinePlugin, interactionPlugin]}
      initialView="resourceTimelineDay"
      headerToolbar={{ left: 'prev,next today', center: 'title', right: '' }}
      resources={resources}
      events={events}
      height="auto"
      locale="fa"
      direction="rtl"
    />
  );
}
