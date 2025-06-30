import React, { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jalaliPlugin from './plugins/jalaliPlugin.js';
import hijriPlugin from './plugins/hijriPlugin.js';
import useStore from '../state/store.js';
import fa from '../i18n/fa.ts';

export default function Calendar() {
  const calendarRef = useRef(null);
  const { calendarType, switchCalendar, events } = useStore();

  const plugins = [dayGridPlugin, interactionPlugin];
  if (calendarType === 'jalali') plugins.push(jalaliPlugin);
  if (calendarType === 'hijri') plugins.push(hijriPlugin);

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button
          className="bg-brand-primary text-white px-2 py-1 rounded"
          onClick={() => switchCalendar('jalali')}
          aria-label={fa.toJalali}
        >
          {fa.toJalali}
        </button>
        <button
          className="bg-brand-primary text-white px-2 py-1 rounded"
          onClick={() => switchCalendar('hijri')}
          aria-label={fa.toHijri}
        >
          {fa.toHijri}
        </button>
        <button
          className="bg-brand-primary text-white px-2 py-1 rounded"
          onClick={() => switchCalendar('gregorian')}
          aria-label={fa.toGregorian}
        >
          {fa.toGregorian}
        </button>
      </div>
      <FullCalendar
        ref={calendarRef}
        plugins={plugins}
        initialView="dayGridMonth"
        locale="fa"
        events={events}
        buttonText={{ today: fa.today }}
        height="auto"
      />
    </div>
  );
}
