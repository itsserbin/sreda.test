export const getMonthName = (month) => {
    return [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ][month];
}

export const getShortMonthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]

export const getPrevMonthDay = (year, month, day) => {
    const prevMonth = (month - 1 + 12) % 12;
    const prevMonthLastDay = new Date(year, prevMonth + 1, 0).getDate();
    return prevMonthLastDay + day;
}

export const getNextMonthDay = (year, month, day) => {
    const nextMonth = (month + 1) % 12;
    const nextMonthFirstDay = new Date(year, nextMonth, 1).getDate();
    return nextMonthFirstDay + day - 1;
}

export const daysOfWeek = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
];
