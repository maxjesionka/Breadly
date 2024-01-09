import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import MainNavigation from '../../Layout/MainNavigation';
import classes from "./MealDetails.module.css";


const MealDetails = () => {
  const { id } = useParams();
  const [mealDetails, setMealDetails] = useState(null);

  useEffect(() => {
    // Assume you have a function to fetch meal details by ID
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(
          `https://react-http-cfd1b-default-rtdb.europe-west1.firebasedatabase.app/meals/${id}.json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch meal details");
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

  const { name, img, price, longDescription, description } = mealDetails;

  return (
    <div className={classes.mealWrap}>
      <div className={classes.meal}>
        <div className={classes.mealContainer}>
          <h2>{name}</h2>
          <p>Cena: {price}</p>
          <p>Opis: {longDescription ? longDescription : description}</p>
        </div>
        <div className={classes.mealContainer}>
          {img && <img src={require(`../../../assets/${img}`)} alt="zdjęcie produktu" height={200} width={200}/>}
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
