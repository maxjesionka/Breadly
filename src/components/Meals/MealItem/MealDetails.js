import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainNavigation from '../../Layout/MainNavigation';

const MealDetails = () => {
  const { id } = useParams();
  const [mealDetails, setMealDetails] = useState(null);

  useEffect(() => {
    // Assume you have a function to fetch meal details by ID
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(`https://react-http-cfd1b-default-rtdb.europe-west1.firebasedatabase.app/meals/${id}.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch meal details');
        }

        const data = await response.json();
        setMealDetails(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchMealDetails();
  }, [id]);

  if (!mealDetails) {
    return <p>Loading...</p>;
  }

  const { name, description, price, otherValue } = mealDetails;

  return (
    
    <div>
       <MainNavigation/>
      <h2>Meal Details</h2>
      <p>Meal ID: {id}</p>
      <p>Name: {name}</p>
      <p>Description: {description}</p>
      <p>Price: {price}</p>
      <p>Other Value: {otherValue}</p>
      {/* Display other meal details here */}
    </div>

   
  );
};

export default MealDetails;
