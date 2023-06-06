import './App.css'
import {Routes, Route} from 'react-router-dom';
import Payment from './Pages/Payment';
import Home from './Pages/Home';

function App() {

  return (
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/payment/:dundieId" element={<Payment/>}/>
   </Routes>
  )
}

export default App
