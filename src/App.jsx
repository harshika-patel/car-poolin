<<<<<<< HEAD

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
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
>>>>>>> b5c2a7bed85c0e2df2ae95c9017d7dc10a14da24
    </>
  )
}

export default App
<<<<<<< HEAD

     
=======
>>>>>>> b5c2a7bed85c0e2df2ae95c9017d7dc10a14da24
