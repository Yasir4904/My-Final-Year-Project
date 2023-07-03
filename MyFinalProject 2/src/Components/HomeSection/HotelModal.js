import React from 'react';

const HotelModal = ({ hotel, formData, closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>{hotel.name}</h2>
        <p>Country Code: {hotel.countryCode}</p>
        <h3>Form Data:</h3>
        <p>Name: {formData.name}</p>
        <p>Email: {formData.email}</p>
        <p>Check-in Date: {formData.checkinDate}</p>
        <p>Check-out Date: {formData.checkoutDate}</p>
      </div>
    </div>
  );
};

export default HotelModal;
