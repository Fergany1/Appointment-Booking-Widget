import './App.css';
import BookingSystem from './components/DateSelect';
import { DateUtilsTest } from '../dateutils.test';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    DateUtilsTest();
  } , [])
  return (
    <>
      <h1> Check Console F12 For The Test Cases </h1>
    </>
  )
}

export default App
