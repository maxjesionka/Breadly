import React from "react";

import classes from "./RootLayout.module.css";
import Meals from "../Meals/Meals";
import mealsImage from "../../assets/cross.jpg";

function RootLayout() {
  return (
    <>
      <main>
        <div className={classes["main-image"]}>
          <img src={mealsImage} alt="A table full of delicious food!" />
        </div>
        <Meals />
      </main>
    </>
  );
}

export default RootLayout;
