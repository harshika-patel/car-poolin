
import './App.scss'

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import PassengerRegister from './components/PassengerRegister/PassengerRegister';
import SearchFunctionality from './components/SearchFunctionality/SearchFunctionality';
import RiderRegister from './components/RiderRegister/RiderRegister';
import PostRideCards from './components/PostRideForm/PostRideForm';
import HomePage from './Pages/HomePage/HomePage';
import MainPage from './Pages/MainPage/MainPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
 

  return (
    <>
      <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/RiderRegister" element={<RiderRegister/>}/>
        <Route path="/PassengerRegister" element={<PassengerRegister/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/MainPage" element={<MainPage/>}/>
      </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App

     