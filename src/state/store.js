import create from 'zustand';
import { persist } from 'zustand/middleware';
import Dexie from 'dexie';
import fa from '../i18n/fa.ts';

// ایجاد دیتابیس داخلی
const db = new Dexie('dotin-calendar');
db.version(1).stores({ events: '++id,title,date' });

const useStore = create(persist((set, get) => ({
  calendarType: 'jalali',
  events: [],
  switchCalendar: (type) => set({ calendarType: type }),
  loadHolidays: async () => {
    const data = await import('../data/holidays-1404.json');
    set({ events: data.default });
  },
}), { name: 'dotin-storage' }));

export default useStore;
