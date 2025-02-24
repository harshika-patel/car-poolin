import './Login.scss';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from "../Header/Header";
import { useAuth } from '../../contexts/AuthContext';
import Footer from '../Footer/Footer';
const Login = () => {
    const { loginUser } = useAuth(); 
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful!');
        await loginUser(formData.username, formData.password);
        navigate('/MainPage');
      } else {
        setError(data.message); // Show backend error message
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <section>
      <Header />
      <form onSubmit={handleSubmit} className='login'>
        <h2>User Login</h2>
        {error && <p className="error">{error}</p>}
        <div className='login__row'>
          <label className='login__label'>
            Username</label>
            <input className='login__input'
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          
        </div>
        <div  className='login__row'>
          <label className='login__label'>
            Password  </label>
            <input className='login__input'
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
        
        </div>
        <div className='login__btns'>
        <button className='login__btn' type="submit">Login</button>

        <Link to="/" ><button type="button"  className='login__backBtn'>Back</button></Link>
        </div>
      </form>
      
    </section>
  );
};

export default Login;
