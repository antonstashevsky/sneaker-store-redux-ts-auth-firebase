import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useAppDispatch } from "../hooks/hook";
import { Item } from "../models/Item";
import { deleteFromCart } from "../store/storeItemsSlice";

const CartItem = ({ id, name, price, imgUrl, quantity }: Item) => {
  const dispatch = useAppDispatch();
  const totalItemPrice = Number((price * quantity).toFixed(2));

  return (
    <Stack direction="horizontal" gap={2}>
      <img
        src={imgUrl}
        alt={name}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {name}
          <span
            className="text-muted"
            style={{ fontSize: "0.7rem", margin: "0.5rem" }}
          >
            x {quantity}
          </span>
        </div>
        <div className="text-muted" style={{ fontSize: "0.8rem" }}>
          ${price}
        </div>
      </div>
      <div>${totalItemPrice}</div>
      <Button
        onClick={() => dispatch(deleteFromCart(id))}
        variant="outline-danger"
        size="sm"
      >
        &times;
      </Button>
      <hr className="h-5" />
    </Stack>
  );
};

export default CartItem;
