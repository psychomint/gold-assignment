import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useOutletContext,
} from "react-router-dom";

// Components
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import LoginForm from "./components/auth/LoginForm";
import Shop from "./components/Shop";

// App wrapper with shared state
function AppLayout() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  return (
    <div className="app">
      <Header cartCount={cartItems.length} cartItems={cartItems} />
      <Outlet context={{ addToCart }} />
    </div>
  );
}

// Router setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "", element: <MainPage /> },
      { path: "login", element: <LoginForm /> },
      { path: "shop", element: <Shop /> },
    ],
    errorElement: <h1 className="text-center mt-10 text-red-500">404 Page Not Found</h1>,
  },
]);

// Render App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
