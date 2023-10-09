import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { login } from '../state/action-creators';

function Login() {

 const dispatch = useDispatch();
 const navigate = useNavigate(); 
 const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [err,setErr] = useState("");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/login', formData);
      if(response.data.success)
      {
        localStorage.setItem("SavedToken", 'Bearer ' + response.data.token);
        dispatch(login(response.data.user));
        navigate('/');
      }else{
        setErr(response.data.message);
      }
      setFormData({ email: '', password: '' });
    } catch (error) {
      setErr('Some internal error occured')
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
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
          />
        </div>
        <p>{err}</p>
        <p>Don't have a account <Link to='/register'>Create account</Link></p>
        <div className="form-group">
          <button  className="btn btn-outline-primary" type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;