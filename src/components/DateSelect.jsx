import React, { useState, useMemo } from 'react';

export default function BookingDateList() {
  const [selectedDate, setSelectedDate] = useState(null);

  // Generate the next 14 bookable days dynamically
  const bookingDays = useMemo(() => {
    const daysArray = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);

      // Extract parts using native internationalization API
      daysArray.push({
        id: nextDate.toISOString().split('T')[0], // Use YYYY-MM-DD as a stable unique key
        dateObject: nextDate,
        dayNumeric: nextDate.getDate(), // e.g., 26
        dayText: nextDate.toLocaleDateString('en-US', { weekday: 'short' }), // e.g., "Mon"
        monthText: nextDate.toLocaleDateString('en-US', { month: 'short' }), // e.g., "Oct"
      });
    }
    return daysArray;
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h3>Select a Booking Date</h3>
      
      {/* Horizontal scrolling list container */}
      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px' }}>
        {bookingDays.map((day) => {
          const isSelected = selectedDate === day.id;
          
          return (
            <button
              key={day.id}
              onClick={() => setSelectedDate(day.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '70px',
                padding: '12px 8px',
                borderRadius: '8px',
                border: isSelected ? '2px solid #0070f3' : '1px solid #ccc',
                backgroundColor: isSelected ? '#e6f0ff' : '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {/* Month Text (e.g., OCT) */}
              <span style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#666' }}>
                {day.monthText}
              </span>
              
              {/* Day Numeric (e.g., 26) */}
              <span style={{ fontSize: '20px', fontWeight: 'bold', margin: '4px 0', color: '#111' }}>
                {day.dayNumeric}
              </span>
              
              {/* Day Text (e.g., Mon) */}
              <span style={{ fontSize: '12px', color: '#888' }}>
                {day.dayText}
              </span>
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <p style={{ marginTop: '15px', color: '#333' }}>
          Selected Booking Slot: <strong>{selectedDate}</strong>
        </p>
      )}
    </div>
  );
}
