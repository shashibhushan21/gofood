import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [credential, setCredential] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/loginuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credential.email, password: credential.password })
      });
      const data = await response.json();
      console.log(data);

      if (data.success) {
        alert('User Login successfully');
        localStorage.setItem('userEmail', credential.email);
        localStorage.setItem('authToken', data.authToken);
        navigate('/');
      } else {
        alert('Invalid Credentials or User not found');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while logging in');
    }
  };

  const onChange = (event) => {
    setCredential({ ...credential, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Navbar />
      <div className='container bg-light mt-5 p-5'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name="email" value={credential.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={credential.password} onChange={onChange} id="exampleInputPassword1" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to='/signup' className='m-3 btn btn-danger'>New Registration</Link>
        </form>
      </div>
    </>
  );
};

export default Login;