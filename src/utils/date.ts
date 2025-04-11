import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

/**
 * zibird 服务端统一走 UTC，所以可以默认转换 UTC 时间
 */
export function formatDate(
  date: dayjs.ConfigType,
  template: 'YYYY/MM/DD h:mm A' = 'YYYY/MM/DD h:mm A'
) {
  if (!date) return '';
  return dayjs.utc(date).local().format(template);
}

export function isAfter(diffDays: number, date: number) {
  const diffDate = dayjs(date)
    .millisecond(0)
    .second(0)
    .minute(0)
    .hour(0)
    .add(diffDays, 'day');
  return diffDate.isBefore(dayjs());
}