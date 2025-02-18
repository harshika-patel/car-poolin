
import './App.scss'

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import PassengerRegister from './components/PassengerRegister/PassengerRegister';
import RiderRegister from './components/RiderRegister/RiderRegister';
import HomePage from './Pages/HomePage/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
 

  return (
    <>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/RiderRegister" element={<RiderRegister/>}/>
        <Route path="/PassengerRegister" element={<PassengerRegister/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App

     