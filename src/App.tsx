import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./components/Navigation";
import { useAppDispatch } from "./hooks/hook";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Store from "./pages/Store";
import { setCartItems } from "./store/storeItemsSlice";
import { onRegisterUser } from "./store/userSlice";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const user = localStorage.getItem("newUser");
    const items = localStorage.getItem("cartItems");
    const newUser = JSON.parse(user as string);
    const cartItems = JSON.parse(items as string);
    console.log(cartItems);

    if (newUser) {
      dispatch(onRegisterUser(newUser));
    }
    if (cartItems) {
      dispatch(setCartItems(cartItems));
    }
  }, []);

  return (
    <>
      <Navigation />
      <ToastContainer />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
