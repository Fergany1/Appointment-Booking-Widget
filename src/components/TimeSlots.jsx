import { useMemo } from "react";
import { TimeSlots } from "../utils/dateUtils";

export default function TimeSlotsPicker({ selectedDate , selectedTime , onSelectTime , closeTime }) {
    const slots = useMemo(() => {
        const takenSlots = ['10:00' , '12:00'];

        return TimeSlots(openTime, closeTime ,30 , takenSlots);
    }  , [selectedDate , openTime , closeTime]);

    return(
        <div>
            <h3>Available Times For {selectedDate} </h3>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '10px' }}>
                {slots.map((slot) => {
                    const isSelected = selectedTime === slot.displayTime;

                    return(
                        <button
                        key={slot.time24}
                        disabled={slot.isTaken}
                        onClick={() => onSelectTime(slot.displayTime)}
                        style={{
                            padding: '10px 0',
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: slot.isTaken ? 'not-allowed' : 'pointer',
                            opacity: slot.isTaken ? 0.4 : 1,
                            border: isSelected ? '2px solid #0070f3' : '1px solid #ccc',
                            backgroundColor: slot.isTaken ? '#f5f5f5' : isSelected ? '#e6f0ff' : '#fff',
                            textDecoration: slot.isTaken ? 'line-through' : 'none',
                            transition: 'all 0.15s'
                        }}>
                            {slot.displayTime}
                        </button>
                    )
                })}
            </div>
        </div>
    )

}