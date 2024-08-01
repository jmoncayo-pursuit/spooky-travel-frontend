// src/Components/ReviewForm.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ReviewForm({
  reviewDetails,
  handleSubmit,
  toggleView,
  children,
}) {
  const { id: tourId } = useParams(); // Renamed id to tourId for clarity

  const [review, setReview] = useState({
    reviewer: '',
    title: '',
    content: '',
    rating: '',
    tour_id: tourId, // Changed bookmark_id to tour_id
  });

  const handleTextChange = (event) => {
    setReview({ ...review, [event.target.id]: event.target.value });
  };

  useEffect(() => {
    if (reviewDetails) {
      setReview(reviewDetails);
    }
  }, [tourId, reviewDetails]); // Updated dependency to tourId

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(review, tourId); // Pass tourId to handleSubmit
    if (reviewDetails) {
      toggleView();
    }
    setReview({
      reviewer: '',
      title: '',
      content: '',
      rating: '',
      tour_id: tourId, // Reset tour_id after submission
    });
  };

  return (
    <div className='Edit'>
      {children}
      <form onSubmit={onSubmit}>
        <label htmlFor='reviewer'>Your Name:</label>
        <input
          id='reviewer'
          value={review.reviewer}
          type='text'
          onChange={handleTextChange}
          placeholder='Your name'
          required
        />
        <label htmlFor='title'>Review Title:</label>
        <input
          id='title'
          type='text'
          required
          value={review.title}
          onChange={handleTextChange}
        />
        <label htmlFor='rating'>Rating (1-5):</label>
        <input
          id='rating'
          type='number'
          name='rating'
          min='1'
          max='5'
          step='1'
          required
          placeholder='Enter a rating between 1 and 5'
          value={review.rating}
          onChange={handleTextChange}
        />
        <label htmlFor='content'>Your Review:</label>
        <textarea
          id='content'
          type='text'
          name='content'
          value={review.content}
          placeholder='Write your review here...'
          onChange={handleTextChange}
        />

        <br />

        <input type='submit' value='Submit Review' />
      </form>
    </div>
  );
}

export default ReviewForm;
