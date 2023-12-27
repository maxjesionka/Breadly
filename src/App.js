import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./components/pages/RootLayout";
import MealInsights from "./components/Meals/MealItem/MealInsights";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    children: [
      {
        index: true,
        element: <RootLayout />,
      },
      {
        path: "meals",
        element: <MealInsights />,
      },
    ],
  },
]);

function App() {
  // const [cartIsShown, setCartIsShown] = useState(false);

  // const showCartHandler = () => {
  //   setCartIsShown(true);
  // };

  // const hideCartHandler = () => {
  //   setCartIsShown(false);
  // };

  return <RouterProvider router={router} />;
}

export default App;
