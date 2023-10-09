import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [err,setErr] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make an API request to register the user
      console.log(formData,"formData")
      const response = await axios.post('http://localhost:4000/signup', formData);
      if(response.data.success)
      {
        localStorage.setItem("SavedToken", 'Bearer ' + response.data.token);
        navigate('/');
      }
      else{
        setErr(response.data.message)
      }
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      // Handle registration error (e.g., display an error message)
      setErr("Some internal error occured")
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="register-page">
      <h2>Register User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className='form-control'
            placeholder='Enter your name'
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className='form-control'
            placeholder='Enter your email'
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className='form-control'
            placeholder='Enter your email'
          />
        </div>
        <p>{err}</p>
         <p>Have a account? <Link to={'/login'}>Login</Link></p>        
        <div className="form-group">
          <button type="submit" 
          className="btn btn-outline-primary">
            Sign up
            </button>
        </div>
      </form>
    </div>
  );
}
export default RegisterPage;