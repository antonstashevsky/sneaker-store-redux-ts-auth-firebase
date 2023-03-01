import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import Checkout from "../components/Checkout";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { User } from "../models/User";
import { addOrder, clearCartItems } from "../store/storeItemsSlice";

const Cart = () => {
  const [isCheckout, setIsCheckout] = useState(false);
  const dispatch = useAppDispatch();
  const { cartItems, totalPrice } = useAppSelector((state) => state.storeItems);
  const total = Number(totalPrice.toFixed(2));
  const navigate = useNavigate();

  const onOrder = () => {
    setIsCheckout((prev) => true);
  };

  const onCancel = () => {
    setIsCheckout((prev) => false);
  };

  const onConfirm = (orderData: User) => {
    dispatch(addOrder(orderData));
    dispatch(clearCartItems());
    onCancel();
    navigate("/");
  };

  return (
    <Card className="p-5 m-5">
      <h1 className="text-center">Cart</h1>
      <Card.Body className="gap-5">
        <div className="d-flex flex-column align-items-center gap-3">
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
      </Card.Body>
      {total > 0 && (
        <div className="ms-auto me-4 fw-bold fs-3">
          <span className="text-muted fs-4 me-2">Total:</span> ${total}
        </div>
      )}
      {!total && <h4 className="text-center">Add something to the cart 😉</h4>}
      {total > 0 && (
        <Button onClick={onOrder} className=" m-4">
          Order
        </Button>
      )}
      {isCheckout && <Checkout onConfirm={onConfirm} onCancel={onCancel} />}
    </Card>
  );
};

export default Cart;
