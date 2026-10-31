import DateSelect from './DateSelect';
import TimeSlotsPicker from './DateSelect';
import { AvaliableDays } from '../utils/dateUtils';
import { useState , useMemo } from 'react';


export default function BookingWidget(){
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
            <h2>Appointment Booking Widget</h2>

            {/**Date Picker */}
            <DateSelect
                bookingDays={bookingDays}
                selectedDate={selectedDate}
                onSelectDate={handleSelectedDate}
            />

            {/**Time Slot Picker */}
            {selectedDate && selectedDayDate ? (
            <TimeSlotsPicker 
                selectedDate={selectedDate}
                openTime={selectedDayDate.openTime}
                closeTime={selectedDayDate.closeTime}
                selectedTime={selectedTime}
                onSelectTime={setSelectedTime}
            />

            ) : (
                <p style={{ color: '#666', marginTop: '20px', textAlign: 'center' }}>
                Please choose an available date above to see time slots.
                </p>
            )}

            {/* 3. Booking Confirmation Summary Preview */}
            {selectedDate && selectedTime && (
            <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #b9e6fe' }}>
            <p style={{ margin: 0, fontWeight: 'bold', color: '#0369a1' }}>
                🎉 Selected Appointment: {selectedDate} at {selectedTime}
            </p>
            </div>
        )}
        </div>
    )
}