import React, { useState } from 'react';
import Hotel from './Hotel';
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
import emailjs from 'emailjs-com';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';

// a function which displays hotels
const HotelList = ({ hotels }) => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const history = useHistory();

  
// function to send emails using emailjs library
  const sendEmail = (e, hotel, randomImg, randomDescription, randomRating, randomPrice) => {
    console.log(e.target)
    // takes data from the form 
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const rooms = formData.get("rooms");
    const guests = formData.get("guests");
    const startDate = formData.get("checkinDate"); 
    const endDate = formData.get("checkoutDate"); 
    const confirmationEmail = formData.get("confirmation-email"); 
    
    //an object that contains data that will be used as input for an email template
    const templateParams = {
      hotelName: hotel.name,
      hotelImg: randomImg,
      hotelDescription: randomDescription,
      hotelRating: randomRating,
      hotelPrice: randomPrice,
      name,
      rooms,
      guests,
      startDate,
      endDate,
      email: confirmationEmail,
    };

    console.log(templateParams)
    emailjs.send(
      "service_zugp8ai",
      "template_8x5xzvh",
      templateParams,
      "fJqu8nKRrWVkOj4B1",
    ).then(() => {
      alert("Booking successful!");
    })
  };
  
  // function which displays random rating and price when  a user clicks on a hotel
  const handleHotelClick = (hotel) => {
    const randomRating = Math.floor(Math.random() * 10) + 1;
    const randomPrice = Math.floor(Math.random() * 200) + 70;
    const descriptions = [
      "A beautiful, nice and relaxing hotel with a stunning view.",
      "luxorius hotel with incredibly nice and friendly staff  .",
      "Hotel with an enormous beach and many other fun joy rides with it .",
      "A calm and cozy hotel with services such as a spa and a pool.",
      "A Hotel which offers a breathtaking view along with superb service",
    ];
    const randomDescription =
      descriptions[Math.floor(Math.random() * descriptions.length)];
    const randomImg =
      [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22, img23, img24][
        Math.floor(Math.random() * 24)
      ];
    
      const newWindow = window.open("", "_blank", "width=500,height=500");
newWindow.document.write(`
  <html>
    <head>
      <title>Hotel Booking</title>
      <style>
        body {
          font-family: "Times New Roman", Times, serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        
        .container {
          max-width: 505px;
          margin: 0 auto;
          padding: 21px;
          background-color: #fff;
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
        }
        
        h3 {
          font-size: 28px;
          margin: 0 0 15px 0;
        }
        
        img {
          display: block;
          margin: 0 auto;
          max-width: 100%;
          height: auto;
        }
        
        p {
          font-size: 19px;
          margin: 10px 0;
        }
        
        table {
          border-collapse: collapse;
          width: 100%;
        }
        
        td {
          padding: 5px;
        }
        
        input[type="text"],
        input[type="number"],
        input[type="date"],
        input[type="email"] {
          padding: 5px;
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-sizing: border-box;
        }
        
        button {
          padding: 10px;
          margin: 10px 5px 0 0;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          color: #fff;
          background-color: #007bff;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        button:hover {
          background-color: #0062cc;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h3>${hotel.name}</h3>
        <img src="${randomImg}" alt="${hotel.name}">
        <p>${randomDescription}</p>
        <p>Rating: ${randomRating}/5</p>
        <p>Price per night: $${randomPrice}</p>
        <form id="bookingForm" action="javascript:void(0);" method="POST"  style="border-collapse: collapse; padding: 40px;">
        
                <label for="name">Name:</label>
                <input type="text" name="name" required>
                <label for="rooms">Number of rooms:</label>
                <input type="number" name="rooms" required min="1">
                <label for="guests">Number of guests:</label>
                <input type="number" name="guests" required min="1">
                <label for="checkinDate">Check-in date:</label>
                <input type="date" name="checkinDate" required>
                <label for="checkoutDate">Check-out date:</label>
                <input type="date" name="checkoutDate" required>
                <label for="confirmation-email">Confirmation email:</label>
                <input type="email" name="confirmation-email" required>

               

                <button type="submit">Book Now</button>
                <button type="button" onclick="cancelBooking()">Cancel</button>
              </form>
            </div>
          </body>
        </html>
      `);
      
      
      // This code listens for form submit events and saves booking data.
      const bookingForm = newWindow.document.querySelector('form');
      bookingForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(bookingForm);
        const booking = {};
        for (const [key, value] of formData.entries()) {
          booking[key] = value;
        } 
        booking.hotelName = hotel.name;
        localStorage.setItem('bookings', JSON.stringify(booking));
      // send the emAIL
        sendEmail(event,hotel,randomImg,randomDescription,randomPrice,randomRating,);
        newWindow.close();
        setTimeout(() => {
          window.location.href = '/MyBookings'; // redirects to mybookings  page
        }, 1000);
      });
      

    }
      
  // maps through the hotels displaying the details each hotels consist off when clicking on a hotel further details will be shown
  return (
    <div className='hotel-list'>
    {hotels && hotels.length > 0 ? (
      hotels.map((hotel) => (
        <div key={hotel.hotelId} onClick={() => handleHotelClick(hotel)}>
          <Hotel hotel={hotel} />
        </div>
      ))
    ) : (
      <p></p>
    )}
    {selectedHotel && (
      <div>
        <h3>{selectedHotel.name}</h3>
        <p>{selectedHotel.address.countryCode}</p>
        <p>Latitude: {selectedHotel.geoCode.latitude}</p>
        <p>Longitude: {selectedHotel.geoCode.longitude}</p>
        
      </div>
    )}
  </div>
);
};

export default HotelList;
