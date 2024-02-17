import React, { useState, useEffect } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const [userData, setUserData] = useState({}); // State to hold user data

  useEffect(() => {
    const existingUserId = localStorage.getItem("currentUserId");

    // Fetch user data based on the existingUserId
    fetch("http://localhost:8000/users/" + existingUserId)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setUserData(data); // Set fetched user data to the state
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []); // Empty dependency array to run the effect only once

  // Destructure user data from state
  const { email = '', name = '', surname = '', phone_number = '' } = userData;

  const confirmHandler = (event) => {
    event.preventDefault();
    // Call the onConfirm function with user data
    props.onConfirm(userData);
  };

  return (
    <div>
      <p>Potwierdź proszę swoje dane:</p>
      <p>Email: {email}</p>
      <p>Imie: {name}</p>
      <p>Nazwisko: {surname}</p>
      <p>Numer telefonu: {phone_number}</p>
      <div className={classes.actions}>
        <button onClick={props.onCancel}>Anuluj</button>
        <button className={classes.submit} onClick={confirmHandler}>Potwierdź</button>
      </div>
    </div>
  );
};

export default Checkout;
