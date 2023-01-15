import React from "react";
import ReactStars from "react-stars";
const StarRating = ({ rating }) => {
  return (
    <ReactStars
      count={5}
      half={true}
      color1={"#D3D3D3"}
      value={rating}
      edit={false}
    />
  );
};

export default StarRating;
