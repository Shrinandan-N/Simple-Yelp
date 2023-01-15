import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useState } from "react";
import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        console.log(response);
        setSelectedRestaurant(response.data.data);
        setName(response.data.data.restaurant.name);
      } catch (err) {}
    };
    fetchData();
  }, []);

  return (
    <div>
      {selectedRestaurant && (
        <div className="mt-3">
          <h1 className="text-center">{name}</h1>
          <Reviews reviews={selectedRestaurant.reviews} />
        </div>
      )}
      <AddReview />
    </div>
  );
};

export default RestaurantDetailPage;
