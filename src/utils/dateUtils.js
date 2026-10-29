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

export function TimeSlots(openTime = '09:00' , closeTime = '12:00' , durationMin = 30 , takeSlots = []) {

    const slots = [] // to store all generated slots
    const [ startHour , startMin ] = openTime.split(':').map(Number);
    const [ endHour , endMin ] = closeTime.split(':').map(Number);

    let currentMin = startHour * 60 + startMin;
    const closingMin = endHour * 60 + endMin;

    // as long as the working time is before or equal to the closing time it continues to executs
    while (currentMin + durationMin <= closingMin){
        const h = Math.floor(currentMin / 60);
        const m = currentMin % 60;

        const time24 =`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;

        slots.push({
            time24:time24,
            displayTime: ForamtTimeTo12H,
            isTaken: takeSlots.includes(time24),
        });
        currentMin += durationMin; 
    }
    return slots;
};

export const ForamtTimeTo12H = (time24) => {
    if (!time24) return "" // preventing Errors by returning empty str

    const [ hourStr , minStr ] = time24.split(':');

    let hour = parseInt(hourStr , 10);
    const minute = minStr || '00';

    const ampm = hour >= 12 ? "PM" : "AM";

    // convert 24H to 12H
    hour = hour % 12;
    hour = hour ? hour : 12 // if '0' then covert it to '12'

    const formatedHour = String(hour).padStart(2 , '0');

    return `${hour}:${minute} ${ampm}`;
}