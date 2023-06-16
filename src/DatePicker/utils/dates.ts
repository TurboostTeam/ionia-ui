export interface Range {
  start: Date;
  end: Date;
}

export type Week = Array<Date | null>;

const WEEK_LENGTH = 7;

export function getWeeksForMonth(
  month: number,
  year: number,
  weekStartsOn = 0
): Week[] {
  const firstOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = firstOfMonth.getDay();
  const weeks: Week[] = [[]];

  let currentWeek = weeks[0];
  let currentDate = firstOfMonth;

  const orderedWeekday = getOrderedWeekdays(weekStartsOn);
  for (let i = 0; i < orderedWeekday.indexOf(firstDayOfWeek); i++) {
    currentWeek.push(null);
  }

  while (currentDate.getMonth() === month) {
    if (currentWeek.length === WEEK_LENGTH) {
      currentWeek = [];
      weeks.push(currentWeek);
    }

    currentWeek.push(currentDate);
    currentDate = new Date(year, month, currentDate.getDate() + 1);
  }

  while (currentWeek.length < 7) {
    currentWeek.push(null);
  }

  return weeks;
}

export function dateIsInRange(day: Date | null, range: Range): boolean {
  if (day == null) {
    return false;
  }

  const { start, end } = range;

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  return Boolean(start && day > start && end && day < end);
}

export function dateIsSelected(day: Date | null, range: Range): boolean {
  if (day == null) {
    return false;
  }
  const { start, end } = range;

  return Boolean(
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    (start && isSameDay(start, day)) || (end && isSameDay(end, day))
  );
}

export function isSameDay(day1: Date, day2: Date): boolean {
  return (
    day1.getDate() === day2.getDate() &&
    day1.getMonth() === day2.getMonth() &&
    day1.getFullYear() === day2.getFullYear()
  );
}

export function getNewRange(range: Range | undefined, selected: Date): Range {
  if (range == null) {
    return { start: selected, end: selected };
  }

  const { start, end } = range;

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (end && (isDateAfter(start, end) || isDateBefore(start, end))) {
    return { start: selected, end: selected };
  }

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (start) {
    if (isDateBefore(selected, start)) {
      return { start: selected, end: selected };
    }
    return { start, end: selected };
  }

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (end) {
    if (isDateBefore(selected, end)) {
      return { start: selected, end };
    }
    return { start: start || end, end: selected };
  }

  return { start: selected, end: selected };
}

export function getNextDisplayMonth(month: number): number {
  if (month === 11) {
    return 0;
  }
  return month + 1;
}

export function getNextDisplayYear(month: number, year: number): number {
  if (month === 11) {
    return year + 1;
  }
  return year;
}

export function getPreviousDisplayMonth(month: number): number {
  if (month === 0) {
    return 11;
  }
  return month - 1;
}

export function getPreviousDisplayYear(month: number, year: number): number {
  if (month === 0) {
    return year - 1;
  }
  return year;
}

export function isDateAfter(date: Date, dateToCompare: Date): boolean {
  return date.getTime() > dateToCompare.getTime();
}

export function isDateBefore(date: Date, dateToCompare: Date): boolean {
  return date.getTime() < dateToCompare.getTime();
}

export function isDateDisabled(date: Date, datesToCompare: Date[]): boolean {
  return datesToCompare.some((dateToCompare) => {
    return date.getTime() === dateToCompare.getTime();
  });
}

const WEEKDAYS: number[] = [0, 1, 2, 3, 4, 5, 6];

export function getOrderedWeekdays(weekStartsOn: number): number[] {
  const weekDays = [...WEEKDAYS];
  const restOfDays = weekDays.splice(weekStartsOn);
  return [...restOfDays, ...weekDays];
}

export function monthName(month: number): string | undefined {
  switch (month) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
  }
}

export function weekdayName(weekday: number): string | undefined {
  switch (weekday) {
    case 0:
      return "Su";
    case 1:
      return "Mo";
    case 2:
      return "Tu";
    case 3:
      return "We";
    case 4:
      return "Th";
    case 5:
      return "Fr";
    case 6:
      return "Sa";
  }
}
