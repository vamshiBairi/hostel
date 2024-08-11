import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Coursel.css';

function Slides() {
  const settings = {
    // dots: true,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 1,
    // slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 3000,
  };

  return (
    <div className="carousel">
      {/* <Slider {...settings}>
        <div className="carousel-item">
          <img src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg" alt="Slide 1" className="carousel-image" />
          <p className="carousel-text">Homely Food</p>
        </div>
        <div className="carousel-item">
          <img src="https://t4.ftcdn.net/jpg/06/32/19/51/360_F_632195151_xTnjr4xGYG3oGyHiSWeCLLdWTKIVCpfY.jpg" alt="Slide 2" className="carousel-image" />
          <p className="carousel-text">Spacious Rooms</p>
        </div>
        <div className="carousel-item">
          <img src="https://www.hostelworld.com/blog/wp-content/uploads/2018/09/hostel-room-types-5.jpg" alt="Slide 3" className="carousel-image" />
          <p className="carousel-text">Well Maintenance</p>
        </div>
        <div className="carousel-item">
          <img src="https://images.squarespace-cdn.com/content/v1/5696733025981d28a35ef8ab/954e09df-1889-4c41-906d-e857673711d9/new+123+1.jpg" alt="Slide 4" className="carousel-image" />
          <p className="carousel-text">Luxurious</p>
        </div>
      </Slider> */}
      <div className="carousel">
    <Slider {...settings}>
        <div className="carousel-item">
            <div style={{ height: '300px', background: 'red' }}>Slide 1</div>
        </div>
        <div className="carousel-item">
            <div style={{ height: '300px', background: 'blue' }}>Slide 2</div>
        </div>
    </Slider>
</div>

    </div>
  );
}

export default Slides;
