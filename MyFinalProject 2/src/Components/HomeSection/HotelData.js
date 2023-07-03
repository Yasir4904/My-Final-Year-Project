import React from "react";

const HotelData = ({ hotel, searchData }) => {
  return (
    <div>
      <h2>{hotel.name}</h2>
      <p>Check In: {searchData.checkIn}</p>
      <p>Check Out: {searchData.checkOut}</p>
      <p>Adults: {searchData.adults}</p>
      <p>Children: {searchData.children}</p>
      <p>Rooms: {searchData.rooms}</p>
    </div>
  );
};

export default HotelData;
