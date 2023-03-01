import React from "react";
import { Button, Card } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { Item } from "../models/Item";
import { addToCart } from "../store/storeItemsSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StoreItem = ({ id, name, price, imgUrl, quantity }: Item) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const onNotAuthorized = () => {
    toast.error(
      <p className="text-center mt-3">You need to be authorized.</p>,
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
    setTimeout(() => {
      navigate("/login");
    }, 1500);

    return;
  };
  return (
    <Card className="m-4">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="250px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column align-items-center gap-3">
        <span className="fs-2">{name}</span>
        <span className="fs-3 text-muted">${price}</span>
        {!isLoggedIn && (
          <Button className="btn-lg" onClick={() => onNotAuthorized()}>
            Add to cart
          </Button>
        )}
        {isLoggedIn && (
          <Button
            className="btn-lg"
            onClick={() =>
              dispatch(
                addToCart({
                  id,
                  name,
                  price,
                  imgUrl,
                  quantity: 1,
                })
              )
            }
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
