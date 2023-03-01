import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Item } from "../models/Item";

interface OrderProps {
  usersOrder: Item[];
  totalPrice: number;
  orderNumber: number;
}

const Order = ({ usersOrder, totalPrice, orderNumber }: OrderProps) => {
  const [showOrders, setShowOrders] = useState<boolean>(false);

  return (
    <Card
      style={{ width: "350px" }}
      className="d-flex flex-column justify-content-center align-items-center p-4 m-3"
    >
      <Button
        variant="outline-primary"
        onClick={() => setShowOrders(!showOrders)}
        className="m-3"
      >
        Order #{orderNumber}
      </Button>
      {showOrders && (
        <div>
          {usersOrder.map((item) => (
            <div>
              <h6>
                Item: <span className="text-muted">{item.name}</span>
              </h6>
              <h6>
                Price: <span className="text-muted">${item.price}</span>
              </h6>
              <h6>
                Quantity: <span className="text-muted">{item.quantity}</span>
              </h6>
            </div>
          ))}
          <div className="d-flex justify-content gap-2 fw-bold mt-3">
            <h6 className="fw-bold">Total:</h6>
            <h6 className="fw-bold">${totalPrice}</h6>
          </div>
        </div>
      )}
    </Card>
  );
};

export default Order;
