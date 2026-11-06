import './App.css';
import BookingSystem from './components/DateSelect';
import { DateUtilsTest } from '../dateutils.test';
import { useEffect, useState } from 'react';
import BookingWidget from './components/BookingWidget';
// import Modal from './messy/Modal';
import Modal from './with-pattern/Modal';

function App() {

  const [ isOpen , setIsOpen ] = useState(false)

  // useEffect(() => {
  //   DateUtilsTest();
  // } , [])
  return (
    <div className='flex flex-col items-center'>
      <button onClick={() => setIsOpen(true)}>Open</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>

       <Modal.Header><h2>Welcome</h2></Modal.Header>
       <Modal.Body><p>Are You Sure You Want To Delete THis Modal!!</p></Modal.Body>
       <Modal.Footer>
        <button>Help!</button>
        <button onClick={() => setIsOpen(false)}>Close</button>
        <button onClick={() => alert("Do Some Action!!")}>DO Some Action!!</button>
       </Modal.Footer>

      </Modal>

    </div>
  )
}

export default App
