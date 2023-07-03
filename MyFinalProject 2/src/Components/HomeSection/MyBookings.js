import { useEffect, useState } from 'react';
import './MyBooking.css';

const MyBookings = () => {
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const bookingData = localStorage.getItem('bookings');
    if (bookingData) {
      setBooking(JSON.parse(bookingData));
    }
  }, []);

  const handleDeleteBooking = () => {
    localStorage.removeItem('bookings');
    setBooking(null);
  };

  return (
    <div className="my-booking-container">
      <h2>My Bookings</h2>
      {booking ? (
        <>
          <table>
            <tbody>
              <tr>
                <td>Hotel:</td>
                <td>{booking.hotelName}</td>
              </tr>
              <tr>
                <td>Name:</td>
                <td>{booking.name}</td>
              </tr>
              <tr>
                <td>Number of rooms:</td>
                <td>{booking.rooms}</td>
              </tr>
              <tr>
                <td>Number of guests:</td>
                <td>{booking.guests}</td>
              </tr>
              <tr>
                <td>Check-in date:</td>
                <td>{booking.checkinDate}</td>
              </tr>
              <tr>
                <td>Check-out date:</td>
                <td>{booking.checkoutDate}</td>
              </tr>
              <tr>
                <td>Confirmation email:</td>
                <td>{booking['confirmation-email']}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <button onClick={handleDeleteBooking}>Delete Booking</button>
          </div>
        </>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default MyBookings;

