import './PassengerRegister.scss';
import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Header from "../Header/Header";

const PassengerRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    age: '',
    phone_number: '',
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/passengers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Passenger registered successfully!');
        setFormData({ username: '', password: '', age: '', phone_number: '' });
        navigate('/MainPage'); 
      } else {
        alert(data.message); // Show backend error message
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <section>
      <Header />
      <form onSubmit={handleSubmit} className='passengerRegister'>
        <h2>Passenger Registration</h2>
        <div className='passengerRegister__row'>
          <label className='passengerRegister__label'>
            Username</label>
            <input
              className='passengerRegister__input'
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
         
        </div>
        <div className='passengerRegister__row'>
          <label className='passengerRegister__label'>
            Password  </label>
            <input
            className='passengerRegister__input'
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
         
        </div>
        <div className='passengerRegister__row'>
          <label className='passengerRegister__label'>
            Age </label>
            <input
            className='passengerRegister__input'
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          
        </div>
        <div className='passengerRegister__row'>
          <label className='passengerRegister__label'>
            Phone Number </label>
            <input
            className='passengerRegister__input'
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          
        </div>
        <div className='passengerRegister__btns'>
        <button type="submit" className='passengerRegister__btn'> Register</button> 
        <Link to="/"><button type="button"className='passengerRegister__backBtn'>Back</button></Link>
        </div>
      </form>
      
    </section>
  );
};

export default PassengerRegister;
