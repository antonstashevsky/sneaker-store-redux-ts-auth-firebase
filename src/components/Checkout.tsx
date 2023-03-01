import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAppSelector } from "../hooks/hook";
import { User } from "../models/User";

interface Props {
  onCancel: () => void;
  onConfirm: (orderData: User) => void;
}

const Checkout: React.FC<Props> = ({ onCancel, onConfirm }) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredCity, setEnteredCity] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");
  const [formIsValid, setFormIsValid] = useState<boolean | null>(null);

  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const userEmail = useAppSelector((state) => state.user.email);

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEnteredName(e.target.value);
  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEnteredEmail(e.target.value);
  const onCityChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEnteredCity(e.target.value);
  const onAddressChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEnteredAddress(e.target.value);

  const nameIsValid = enteredName.trim().length > 6;
  const cityIsValid = enteredCity.trim().length > 6;
  const addressIsValid = enteredAddress.trim().length > 6;
  const emailIsValid =
    enteredEmail.trim().length > 6 && enteredEmail.includes("@");

  const confirmHandler = (e: FormEvent) => {
    e.preventDefault();

    if (enteredName && enteredEmail && enteredCity && enteredAddress) {
      setFormIsValid((prev) => true);
    }

    onConfirm({
      name: enteredName,
      email: isLoggedIn ? userEmail : enteredEmail,
      city: enteredCity,
      address: enteredAddress,
    });
  };

  return (
    <Form onSubmit={confirmHandler}>
      {!isLoggedIn && (
        <div>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={enteredName}
              onChange={onNameChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={enteredEmail}
              onChange={onEmailChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
        </div>
      )}

      <Form.Group className="mb-3" controlId="formBasicCity">
        <Form.Label>City</Form.Label>

        <Form.Control
          type="text"
          placeholder="City"
          value={enteredCity}
          onChange={onCityChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Address"
          value={enteredAddress}
          onChange={onAddressChange}
        />
      </Form.Group>

      <div className="d-flex justify-content-between">
        <Button variant="outline-primary" type="submit">
          Submit
        </Button>
        <Button variant="outline-danger" type="button" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default Checkout;
