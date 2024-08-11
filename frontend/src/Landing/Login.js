import React from 'react';
import Slider from 'react-slick';
import './Login.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const LoginPage = () => {
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

  return (
    <div className="container">
      {/* Left side with slideshow */}
      <div className="leftSide">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Hostel ${index + 1}`} className="image" />
            </div>
          ))}
        </Slider>
        <p className='my-4'>GoodDay Hostels</p>
      </div>

      {/* Right side with login form */}
      <div className="rightSide">
        <h2 className="heading">Hello There</h2>
        <p className="subHeading">Sign in and get started with Hostel Management</p>
        <form className="form">
          <div className="inputGroup">
            <input
              type="email"
              placeholder="Email Address"
              className="input"
              required
            />
          </div>
          <div className="inputGroup">
            <input
              type="password"
              placeholder="Password"
              className="input"
              required
            />
          </div>
          <div className="inputGroup">
            <button type="submit" className="button">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
