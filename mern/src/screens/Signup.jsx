import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
     
    const [credential, setCredential] = useState({ name: "", email: "", password: "", geolocation: "" });
    const [errors, setErrors] = useState({}); // To hold validation error messages
    const navigate = useNavigate();
    const validateForm = () => {
        const newErrors = {};

        // Validate name (min length 5)
        if (credential.name.length < 5) {
            newErrors.name = "Name must be at least 5 characters long.";
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(credential.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        // Validate password (min length 6, at least one special character)
        const passwordRegex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
        if (credential.password.length < 6 || !passwordRegex.test(credential.password)) {
            newErrors.password = "Password must be at least 6 characters long and contain at least one special character.";
        }

        // Validate geolocation (if required, here I'm just checking if it's not empty)
        if (!credential.geolocation) {
            newErrors.geolocation = "Geolocation is required.";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Run validations
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return; // Don't submit the form if there are errors
        }

        // If form is valid, send the request
        const response = await fetch('http://localhost:5000/api/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: credential.name,
                email: credential.email,
                password: credential.password,
                location: credential.geolocation,
            }),
        });
        const data = await response.json();
        console.log(data);

        if (data.success) {
            alert('User has been registered successfully');
            navigate('/login');
        } else {
            alert('Invalid Credentials or User already exists');
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
                        <label htmlFor="name" className="form-label">Enter Your Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="name" 
                            value={credential.name} 
                            onChange={onChange} 
                        />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            name="email" 
                            value={credential.email} 
                            onChange={onChange} 
                            id="exampleInputEmail1" 
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            name="password" 
                            value={credential.password} 
                            onChange={onChange} 
                            id="exampleInputPassword1" 
                        />
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="geolocation" 
                            value={credential.geolocation} 
                            onChange={onChange} 
                            id="exampleInputPassword1" 
                        />
                        {errors.geolocation && <div className="text-danger">{errors.geolocation}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to='/login' className='m-3 btn btn-danger'>Sign In</Link>
                </form>
            </div>
        </>
    );
};

export default Signup;
