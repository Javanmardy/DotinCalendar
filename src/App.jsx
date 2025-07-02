import React, { useState, useEffect } from 'react';
import CalendarView from './views/CalendarView.jsx';
import KanbanView from './views/KanbanView.jsx';
import GanttView from './views/GanttView.jsx';
import useLocal from './store/useLocal.js';

export default function App() {
  const [tab, setTab] = useState('calendar');
  const init = useLocal(state => state.init);

  useEffect(() => { init(); }, [init]);

  const renderTab = () => {
    switch (tab) {
      case 'kanban':
        return <KanbanView />;
      case 'gantt':
        return <GanttView />;
      default:
        return <CalendarView />;
    }
  };

  return (
    <div className="container mx-auto p-4" dir="rtl">
      <div className="mb-4 flex gap-4 text-center">
        <button onClick={() => setTab('calendar')} className="bg-brand-primary text-white px-4 py-2 rounded">
          تقویم
        </button>
        <button onClick={() => setTab('kanban')} className="bg-brand-primary text-white px-4 py-2 rounded">
          کانبان
        </button>
        <button onClick={() => setTab('gantt')} className="bg-brand-primary text-white px-4 py-2 rounded">
          گانت
        </button>
      </div>
      {renderTab()}
    </div>
  );
}
