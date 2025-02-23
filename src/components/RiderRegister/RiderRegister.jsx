import './RiderRegister.scss';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from "../Header/Header";

const RiderRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    age: '',
    phone_number: '',
    car_name: '',
    model: '',
    color: '',
    license_plate_number: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() }); // Trim input values
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:8080/drivers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Rider registered successfully!');
        setFormData({
          username: '',
          password: '',
          age: '',
          phone_number: '',
          car_name: '',
          model: '',
          color: '',
          license_plate_number: '',
        });
        navigate('/MainPage');
      } else {
        // Handle cases where the username, phone number, or license plate already exists
        if (data.message.includes("already exists")) {
          setErrorMessage(data.message);
        } else {
          alert(data.message);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <section>
      <Header />
      <form onSubmit={handleSubmit} className='riderRegister'>
        <h2>Rider Registration</h2>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <div className='riderRegister__row'>
          <label className='riderRegister__label'>
            Username:
            <input
            className='riderRegister__input'
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='riderRegister__row'>
          <label className='riderRegister__label'>
            Password:
            <input
             className='riderRegister__input'
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='riderRegister__row'>
          <label className='riderRegister__label'>
            Age:
            <input
             className='riderRegister__input'
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='riderRegister__row'>
          <label className='riderRegister__label'>
            Phone Number:
            <input
             className='riderRegister__input'
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='riderRegister__row'>
          <label className='riderRegister__label'>
            Car Name:
            <input
             className='riderRegister__input'
              type="text"
              name="car_name"
              value={formData.car_name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='riderRegister__row'>
          <label className='riderRegister__label'>
            Model:
            <input
             className='riderRegister__input'
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='riderRegister__row'>
          <label className='riderRegister__label'>
            Color:
            <input
             className='riderRegister__input'
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='riderRegister__row'>
          <label className='riderRegister__label'>
            LicensePlateNumber:
            <input
             className='riderRegister__input'
              type="text"
              name="license_plate_number"
              value={formData.license_plate_number}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit" className='riderRegister__btn'>Register</button>
      </form>
      <Link to="/"><button type="button" className='riderRegister__backBtn'>Back</button></Link>
    </section>
  );
};

export default RiderRegister;
