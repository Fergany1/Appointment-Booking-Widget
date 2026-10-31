
export default function DateSelect({ bookingDays, selectedDate, onSelectDate }){

  return(
    <div>
      <h2>Select Date: </h2>

      {/**Date Picker */}
      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '12px' }}>        
        {bookingDays.map((day) => {
          const isSelected = selectedDate === day.dateStr;


          return(
            <button key={day.dateStr}
            disabled={!day.isAvaliable}
            onClick={() => onSelectDate(day.dateStr)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '12px',
                minWidth: '75px',
                borderRadius: '8px',
                cursor: !day.isAvaliable ? 'not-allowed' : 'pointer',
                opacity: !day.isAvaliable ? 0.4 : 1,
                border: isSelected ? '2px solid #0070f3' : '1px solid #ddd',
                backgroundColor: !day.isAvaliable ? '#f5f5f5' : isSelected ? '#e6f0ff' : '#fff',
                transition: 'all 0.2s'
            }}>
              <span style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#666' }}>
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