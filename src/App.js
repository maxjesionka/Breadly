import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import RootLayout from "./components/pages/RootLayout";
import MealInsights from "./components/Meals/MealItem/MealInsights";
import MealDetails from "./components/Meals/MealItem/MealDetails";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import Header from "./components/Layout/Header";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <Router>
      <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <RootLayout />
                <Outlet />
              </>
            }
          />
          <Route path="meals" element={<MealInsights />} />
          <Route path="meals/:id" element={<MealDetails />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
