import React, { useState } from 'react';
import Slider from 'react-slick';
import './Login.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const images = [
    'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
    'https://t4.ftcdn.net/jpg/06/32/19/51/360_F_632195151_xTnjr4xGYG3oGyHiSWeCLLdWTKIVCpfY.jpg',
    'https://www.hostelworld.com/blog/wp-content/uploads/2018/09/hostel-room-types-5.jpg',
    'https://images.squarespace-cdn.com/content/v1/5696733025981d28a35ef8ab/954e09df-1889-4c41-906d-e857673711d9/new+123+1.jpg'
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/student/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/student-dashboard'); // Redirect to the student dashboard page
        console.log('Login successful');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="container1">
      <div className="leftSide1">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Hostel ${index + 1}`} className="image1" />
            </div>
          ))}
        </Slider>
        <p className='my-4'>GoodDay Hostels</p>
      </div>

      <div className="rightSide1">
        <h2 className="heading1">Hello There</h2>
        <p className="subHeading1">Sign in and get started with Hostel Management</p>
        <form className="form1" onSubmit={handleLogin}>
          <div className="inputGroup1">
            <input
              type="email"
              placeholder="Email Address"
              className="input1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="inputGroup1">
            <input
              type="password"
              placeholder="Password"
              className="input1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <div className="inputGroup1">
            <button type="submit" className="button1">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
