// Hijri calendar plugin for FullCalendar
// پلاگین تقویم هجری برای فول‌کلندر
import { createPlugin } from '@fullcalendar/core';
import dayjs from 'dayjs';
import Hijri from 'hijri-date/lib/safe';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export default createPlugin({
  name: 'hijriPlugin'
});
