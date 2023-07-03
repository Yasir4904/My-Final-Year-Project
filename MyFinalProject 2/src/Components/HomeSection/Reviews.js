import React, { useState } from 'react';
import './Reviews.css';
// state to store name, email, hotel, rating. comment and reviews
const Review = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [hotel, setHotel] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);

  //creates a new review object with the values of the input fields (name, email, hotel, rating, and comment), adds the new review object to the existing reviews array, and resets the input fields to empty values.
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newReview = {
      name,
      email,
      hotel,
      rating,
      comment
    };
    setReviews([...reviews, newReview]);
    setName('');
    setEmail('');
    setHotel('');
    setRating(0);
    setComment('');
  };
// delete reviews
  const handleDeleteReview = (index) => {
    const updatedReviews = [...reviews];
    updatedReviews.splice(index, 1);
    setReviews(updatedReviews);
  };
//form for user to input their review
  return (
    <div className="review">
      <h1>Hotel Reviews</h1>
      <div className="review-form">
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} required />

          <label htmlFor="hotel">Hotel:</label>
          <input type="text" id="hotel" value={hotel} onChange={(event) => setHotel(event.target.value)} required />

          <label htmlFor="rating">Rating:</label>
          <input type="number" id="rating" min="0" max="5" value={rating} onChange={(event) => setRating(parseInt(event.target.value))} required />

          <label htmlFor="comment">Comment:</label>
          <textarea id="comment" value={comment} onChange={(event) => setComment(event.target.value)} required />

          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="review-list">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div className="review-item" key={index}>
              <button className="delete-btn" onClick={() => handleDeleteReview(index)}>X</button>
              <h3>{review.hotel}</h3>
              <p>Rating: {review.rating}/5</p>
              <p>{review.comment}</p>
              <p>Reviewed by {review.name} ({review.email})</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default Review;
