import { Button, Card } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { onLogoutUser } from "../store/userSlice";
import Order from "../components/Order";

const Account = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const userEmail = useAppSelector((state) => state.user.email);
  const usersOrders = useAppSelector((state) => state.storeItems.orders);
  return (
    <Card className="p-5">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <h2>Your Account</h2>
          <div className="d-flex flex-column justify-content-between align-items-center">
            {isLoggedIn && <h4>{userEmail}</h4>}
            <Button
              variant="outline-primary"
              onClick={() => dispatch(onLogoutUser())}
            >
              Logout
            </Button>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center m-3">
          {usersOrders.length > 0 && <h4>Your orders: </h4>}
          {usersOrders.map((order) => (
            <Order {...order} />
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Account;
