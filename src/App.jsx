import './App.css';
import BookingSystem from './components/DateSelect';
import { DateUtilsTest } from '../dateutils.test';
import { useEffect } from 'react';
import BookingWidget from './components/BookingWidget';
import Modal from './messy/Modal';

function App() {

  // useEffect(() => {
  //   DateUtilsTest();
  // } , [])
  return (
    <div className='flex flex-col items-center'>
     <Modal 
        title="Delete Account"
        body="Are You Sure You Want To Delete This Account?"
        primaryAction={<button>Delete</button>}
        secondaryAction={<button>Cancel</button>}
        />
    </div>
  )
}

export default App
