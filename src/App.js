import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import RootLayout from "./components/pages/RootLayout";
import MealInsights from "./components/Meals/MealItem/MealInsights";
import MealDetails from "./components/Meals/MealItem/MealDetails";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import Header from "./components/Layout/Header";
import AuthenticationPage from "./components/pages/AuthenticationPage";
import Checkout from "./components/Cart/Checkout";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const [token, setToken] = useState();
  const [userData, setUserData] = useState({}); // State variable to store user data

  console.log('app token ' + token)

  return (
    <Router>
      <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} token={token}><Checkout userData={userData}/></Cart>}
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
          <Route path="auth" element={<AuthenticationPage setToken={setToken} setUserData={setUserData}/>} />
          {/* <Route path="meals" element={<MealInsights />} /> */}
          <Route path="meals/:id" element={<MealDetails token={token}/>} />
          
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
