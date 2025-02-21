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
      <form onSubmit={handleSubmit}>
        <h2>Rider Registration</h2>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <div>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Phone Number:
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Car Name:
            <input
              type="text"
              name="car_name"
              value={formData.car_name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Model:
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Color:
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            License Plate Number:
            <input
              type="text"
              name="license_plate_number"
              value={formData.license_plate_number}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
      <Link to="/"><button type="button">Back</button></Link>
    </section>
  );
};

export default RiderRegister;
