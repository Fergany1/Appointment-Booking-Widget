import { useMemo, useState } from "react";
import { AvaliableDays , TimeSlots } from "../utils/dateUtils";

export default function DateSelect(){
  const [ selectedDate , setSelectedDate ] = useState(null);
  const [ selectedTime , setSelectedTime ] = useState(null);

  const bookingDays = useMemo(() => {
    return AvaliableDays(30);
  } , []);

  const handleSelectedDate = (dateStr , isAvaliable) => {
    if(!isAvaliable) return;
    setSelectedDate(dateStr);
    setSelectedTime(null);
  }

  const selectedDayDate = bookingDays.find((d) => d.dateStr === selectedDate);

  return(
    <div>
      <h2>Select Date: </h2>

      {/**Date Picker */}
      <div>
        {bookingDays.map((day) => {
          const isSelected = selectedDate === day.dateStr;


          return(
            <button key={day.dateStr}
            disabled={!day.isAvaliable}
            onClick={() => handleSelectedDate(day.dateStr, day.isAvaliable)}>
              <span pan style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#666' }}>
                {day.monthText}
              </span>
              <span style={{ fontSize: '20px', fontWeight: 'bold', margin: '4px 0' }}>
                {day.dayNumeric}
              </span>
              <span style={{ fontSize: '12px', color: '#666' }}>
                {day.dayTxt}
              </span>
              {!day.isAvaliable && (
                <span style={{ fontSize: '9px', color: '#d9383a', fontWeight: 'bold', marginTop: '2px' }}>
                  CLOSED
                </span>)}
            </button>
          )
        })}
      </div>
    </div>
  )
}