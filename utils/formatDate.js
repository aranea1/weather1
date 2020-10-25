const dateWithoutTime = (strDate, limitType = 'from') => {
   if (!strDate) return;
   const offset = (limitType === 'to') ? 24 : 0;
   const date = new Date(strDate);
   const formatted = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      offset
   );
   return isNaN(formatted) ? null : formatted;
}

module.exports = dateWithoutTime;
