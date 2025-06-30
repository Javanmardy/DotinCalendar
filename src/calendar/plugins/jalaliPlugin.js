// Jalali calendar plugin for FullCalendar
// پلاگین تقویم جلالی برای فول‌کلندر
import { createPlugin } from '@fullcalendar/core';
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
dayjs.extend(jalaliday);

export default createPlugin({
  name: 'jalaliPlugin'
});
