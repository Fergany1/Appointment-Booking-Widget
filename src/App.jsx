import './App.css';
import BookingSystem from './components/DateSelect';
import { DateUtilsTest } from '../dateutils.test';
import { useEffect } from 'react';
import DateSelect from './components/DateSelect';

function App() {

  // useEffect(() => {
  //   DateUtilsTest();
  // } , [])
  return (
    <>
      <DateSelect />
    </>
  )
}

export default App
