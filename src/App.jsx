import './App.css';
import BookingSystem from './components/DateSelect';
import { DateUtilsTest } from '../dateutils.test';
import { useEffect } from 'react';
import BookingWidget from './components/BookingWidget';

function App() {

  // useEffect(() => {
  //   DateUtilsTest();
  // } , [])
  return (
    <>
     <BookingWidget />
    </>
  )
}

export default App
