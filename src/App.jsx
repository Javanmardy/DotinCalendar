import React, { useEffect } from 'react';
import Calendar from './calendar/Calendar.jsx';
import useStore from './state/store.js';
import fa from './i18n/fa.ts';

export default function App() {
  const { loadHolidays } = useStore();

  useEffect(() => {
    loadHolidays();
  }, [loadHolidays]);

  return (
    <div className="p-4">
      <h1 className="text-2xl text-brand-primary mb-4">{fa.title}</h1>
      <Calendar />
    </div>
  );
}
