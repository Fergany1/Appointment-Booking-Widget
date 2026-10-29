import React, { useMemo, useState } from 'react';

// 1. MOCK CONFIGURATION (This would normally come from your database/API)
const BLOCKED_DATES = ['2026-10-29', '2026-11-02']; // Days completely closed

const BUSINESS_HOURS = { open: 9, close: 17 }; // 9:00 AM to 5:00 PM

const BLOCKED_HOURS_BY_DATE = {
  '2026-10-27': ['10:00', '10:30', '14:00'], // Taken slots for today
  '2026-10-28': ['09:00', '09:30', '16:30'], // Taken slots for tomorrow
};

export default function BookingSystem({ totalDays = 10 }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // 2. GENERATE DAYS & MARK THEM AS OPEN OR BLOCKED
  const bookingDays = useMemo(() => {
    const daysArray = [];
    const today = new Date();

    for (let i = 0; i < totalDays; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);

      // Unique format: YYYY-MM-DD
      const year = futureDate.getFullYear();
      const month = String(futureDate.getMonth() + 1).padStart(2, '0');
      const dateVal = String(futureDate.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${dateVal}`;

      const dayNumeric = futureDate.toLocaleDateString('en-US', { day: 'numeric' });
      const dayText = futureDate.toLocaleDateString('en-US', { weekday: 'short' });
      const monthText = futureDate.toLocaleDateString('en-US', { month: 'short' });

      // Check if this specific string is in our blocked list
      const isBlocked = BLOCKED_DATES.includes(dateStr);

      daysArray.push({
        id: dateStr,
        dayNumeric,
        dayText,
        monthText,
        isBlocked,
      });
    }
    return daysArray;
  }, [totalDays]);

  // Reset selected time if user changes the date
  const handleDateSelect = (dateId) => {
    setSelectedDate(dateId);
    setSelectedTime(null); 
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Select Date & Time</h2>
      
      {/* --- DATE PICKER RAIL --- */}
      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '12px' }}>
        {bookingDays.map((day) => {
          const isSelected = selectedDate === day.id;
          
          return (
            <button
              key={day.id}
              disabled={day.isBlocked}
              onClick={() => handleDateSelect(day.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '12px',
                minWidth: '75px',
                borderRadius: '8px',
                cursor: day.isBlocked ? 'not-allowed' : 'pointer',
                opacity: day.isBlocked ? 0.4 : 1,
                border: isSelected ? '2px solid #0070f3' : '1px solid #ddd',
                backgroundColor: day.isBlocked ? '#f5f5f5' : isSelected ? '#e6f0ff' : '#fff',
                transition: 'all 0.2s'
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#666' }}>{day.monthText}</span>
              <span style={{ fontSize: '20px', fontWeight: 'bold', margin: '4px 0' }}>{day.dayNumeric}</span>
              <span style={{ fontSize: '12px', color: '#666' }}>{day.dayText}</span>
              {day.isBlocked && <span style={{ fontSize: '9px', color: '#d9383a', fontWeight: 'bold', marginTop: '2px' }}>CLOSED</span>}
            </button>
          );
        })}
      </div>

      {/* --- TIME SLOT PICKER --- */}
      {selectedDate ? (
        <TimeSlotPicker 
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onSelectTime={setSelectedTime}
        />
      ) : (
        <p style={{ color: '#666', marginTop: '20px', textAlign: 'center' }}>Please choose an available date above to see time slots.</p>
      )}

      {/* --- BOOKING SUMMARY --- */}
      {selectedDate && selectedTime && (
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #b9e6fe' }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: '#0369a1' }}>
            🎉 Confirmed Appointment: {selectedDate} at {selectedTime}
          </p>
        </div>
      )}
    </div>
  );
}

// 3. TIME SLOT COMPONENT
function TimeSlotPicker({ selectedDate, selectedTime, onSelectTime }) {
  
  // Dynamically calculate time blocks for the selected day
  const slots = useMemo(() => {
    const timeSlots = [];
    const startHour = BUSINESS_HOURS.open;
    const endHour = BUSINESS_HOURS.close;
    
    // Get list of blocked hours specifically for this day (fallback to empty array if none)
    const takenHours = BLOCKED_HOURS_BY_DATE[selectedDate] || [];

    for (let hour = startHour; hour < endHour; hour++) {
      // Create slots for top of the hour (:00) and half hour (:30)
      ['00', '30'].forEach((minute) => {
        const formattedHour = String(hour).padStart(2, '0');
        const timeString = `${formattedHour}:${minute}`;
        
        const isTimeBlocked = takenHours.includes(timeString);
        
        timeSlots.push({
          time: timeString,
          isBlocked: isTimeBlocked
        });
      });
    }
    return timeSlots;
  }, [selectedDate]);

  return (
    <div style={{ marginTop: '24px' }}>
      <h3>Available Times for {selectedDate}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '10px' }}>
        {slots.map((slot) => {
          const isSelected = selectedTime === slot.time;
          
          return (
            <button
              key={slot.time}
              disabled={slot.isBlocked}
              onClick={() => onSelectTime(slot.time)}
              style={{
                padding: '10px 0',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: slot.isBlocked ? 'not-allowed' : 'pointer',
                opacity: slot.isBlocked ? 0.4 : 1,
                border: isSelected ? '2px solid #0070f3' : '1px solid #ccc',
                backgroundColor: slot.isBlocked ? '#f5f5f5' : isSelected ? '#e6f0ff' : '#fff',
                textDecoration: slot.isBlocked ? 'line-through' : 'none',
                transition: 'all 0.15s'
              }}
            >
              {slot.time}
            </button>
          );
        })}
      </div>
    </div>
  );
}
