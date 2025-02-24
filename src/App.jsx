
import './App.scss'
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import PassengerRegister from './components/PassengerRegister/PassengerRegister';
import SearchFunctionality from './components/SearchFunctionality/SearchFunctionality';
import RiderRegister from './components/RiderRegister/RiderRegister';
import PostRideCards from './components/PostRideForm/PostRideForm';
import HomePage from './Pages/HomePage/HomePage';
import MainPage from './Pages/MainPage/MainPage';
import PostRideForm from './components/PostRideForm/PostRideForm';
import CardDetails from './components/CardDetails/CardDetails';
import RideDetails from './components/RideDetails/RideDetails';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
 

  return (
    <>
      <AuthProvider>
      <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/RiderRegister" element={<RiderRegister/>}/>
        <Route path="/PassengerRegister" element={<PassengerRegister/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/MainPage" element={<MainPage/>}/>
        <Route path="/post-ride" element={<PostRideForm />} />
        <Route path="/ride/:id" element={<RideDetails />} />
      </Routes>
      </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App

     
