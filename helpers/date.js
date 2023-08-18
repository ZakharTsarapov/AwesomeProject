export function getDateFormat() {
    const date = new Date();
  
    const months = [
      'січня',
      'лютого',
      'березня',
      'квітня',
      'травня',
      'червня',
      'липня',
      'серпня',
      'вересня',
      'жовтня',
      'листопада',
      'грудня',
    ];
  
    const addLeadingZero = value => String(value).padStart(2, '0');
  
    const day = addLeadingZero(date.getDate());
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hour = addLeadingZero(date.getHours());
    const minutes = addLeadingZero(date.getMinutes());
  
    const result = `${day} ${month}, ${year} | ${hour}:${minutes}`;
  
    return result;
}