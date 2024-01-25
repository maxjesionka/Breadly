import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import classes from "./MealDetails.module.css";

const MealDetails = ({ token }) => {
  const { id } = useParams();
  const [mealDetails, setMealDetails] = useState(null);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/products/${id}`
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

  const { name, img, price, short_description, description } = mealDetails;

  // Decode the JWT token to get user information
  const decodedToken = token ? jwtDecode(token) : null;
  const isAdmin = decodedToken && decodedToken.isAdmin;

  return (
    <div className={classes.mealWrap}>
      <div className={classes.meal}>
        <div>
          <h2>{name}</h2>
          {token && <p>logged in</p>}
          {isAdmin && <p>You are an admin</p>}
          <p>Cena: {price}</p>
          <p>Opis: {description ? description : short_description}</p>
        </div>
        <div className={classes.mealContainer}>
          {img && (
            <>
              <img
                className={classes.productImg}
                src={require(`../../../assets/${img}`)}
                alt="zdjęcie produktu"
                height={200}
                width={200}
              />
            </>
          )}
          <button className={classes.backBtn}>
            <Link to="/">Powrót</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
