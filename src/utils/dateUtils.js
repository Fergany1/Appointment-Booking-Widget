/**
 * Generates dates for the next N days. 
 * Blocks Mondays (day 1) and keeps all other days open (Tuesday through Sunday).
 * 
 * @param {number} totalDays - Number of days to generate starting from today
 * @returns {Array} Array of day objects with date strings and availability flags
 */
export const AvaliableDays = ({ totalDays = 14 }) =>{
  const days = [];
  const today = new Date();

  for (let i = 0 ; i < totalDays ; i++){
    const futureDate = new Date(); //
    futureDate.setDate(today.getDate() + 1);

    const year = futureDate.getFullYear();
    const month = String(futureDate.getMonth() + 1 ).padStart(2 ,'0');
    const dateVal = String(futureDate.getDate()).padStart(2 , '0');
    const dateStr = `${year}-${month}-${dateVal}`;
    
    const dayOfWeek = futureDate.getDay(); // 0 -> Sun , 1 -> Mon , 2 -> Tues ...etc 

    const isAvaliable = dayOfWeek !== 1;

    days.push({
        dateStr,
        dayNumeric: futureDate.getDate(),
        dayTxt: futureDate.toLocaleDateString('en-US', { weekday: 'short'}),
        monthTxt: futureDate.toLocaleDateString('en-US',{ month:'short'}),
        isAvaliable,
        openTime: '09:00',
        closeTime: '17:00',
    });
  }
  return days;
}