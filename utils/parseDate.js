import dateFormatTypes from 'constants/dateFormatTypes';
import moment from 'moment';
import 'moment/locale/pl';

export const parseDate = (dateFormat, date) => {
  moment.locale('pl');
  switch (dateFormat) {
  case dateFormatTypes.HOW_LONG_AGO:
    return moment(date).fromNow();
  case dateFormatTypes.DATE:
    return moment(date).format('DD.MM.YYYY');
  case dateFormatTypes.TIME:
    return moment(date).format('HH:MM');
  case dateFormatTypes.DATE_TIME:
    return `${moment(date).format('DD.MM.YYYY')} o ${moment(date).format('HH:MM')}`;
  default:
    return moment(date).format('DD.MM.YYYY');
  }
};
