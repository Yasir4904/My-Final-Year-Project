import React from "react"
import img1 from './images/Hotel1.jpeg';
import img2 from './images/Hotel2.jpeg';
import img3 from './images/Hotel3.jpeg';
import img4 from './images/Hotel4.jpeg';
import img5 from './images/Hotel5.jpeg';
import img6 from './images/Hotel6.jpeg';
import img7 from './images/Hotel7.jpeg';
import img8 from './images/Hotel8.jpeg';
import img9 from './images/Hotel9.jpeg';
import img10 from './images/Hotel10.jpeg';
import img11 from './images/Hotel11.jpeg';
import img12 from './images/Hotel12.jpeg';
import img13 from './images/Hotel13.jpeg';
import img14 from './images/Hotel14.jpeg';
import img15 from './images/Hotel15.jpeg';
import img16 from './images/Hotel16.jpeg';
import img17 from './images/Hotel17.jpeg';
import img18 from './images/Hotel18.jpeg';
import img19 from './images/Hotel19.jpeg';
import img20 from './images/Hotel20.jpeg';
import img21 from './images/Hotel21.jpeg';
import img22 from './images/Hotel22.jpeg';
import img23 from './images/Hotel23.jpeg';
import img24 from './images/Hotel24.jpeg';

// hotel function  which takes hotel as a prop

const Hotel = ({ hotel }) => {
  console.log(hotel)
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22, img23, img24];
  const randomImg = images[Math.floor(Math.random() * images.length)];
  return (
    // displays the hotels details such as name adress latitude and longtitude 
    <div className='hotel'>
      <h3>{hotel.name}</h3>
      <p>{hotel.address.countryCode}</p>
      <p>Latitude: {hotel.geoCode.latitude}</p>
      <p>Longitude: {hotel.geoCode.longitude}</p>
      <img src={randomImg} alt={hotel.name} />
    </div>
  )
}

export default Hotel
