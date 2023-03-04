import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (index) => {
    setRating(index + 1);
    onRatingChange(index + 1);
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        return (
          <FaStar
            key={index}
            size={24}
            color={index < rating ? "#ffc107" : "#e4e5e9"}
            onClick={() => handleRating(index)}
            style={{ cursor: "pointer" }}
          />
        );
      })}
    </div>
  );
};

export default StarRating;