import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { toast } from "react-toastify";
import { onError, onRegisterUser } from "../store/userSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let cartItems = useAppSelector((state) => state.storeItems.cartItems);
  const registerToast = (email: string | null) => {
    toast.success(<p className="text-center mt-3">Welcome, {email} !</p>, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    setFormIsValid(e.target.value.includes("@") && password.trim().length > 6);
    console.log(formIsValid);
  };

  const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    setFormIsValid(e.target.value.trim().length > 6 && email.includes("@"));
    console.log(formIsValid);
  };

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const newUser = {
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
        };

        localStorage.setItem("newUser", JSON.stringify(newUser));
        dispatch(
          onRegisterUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        registerToast(user.email);
        navigate("/");
      })
      .catch((e) => {
        dispatch(onError(e.message));
      });
  };

  return (
    <Form className="d-flex flex-column gap-2 justify-content-center align-items-center">
      <Form.Group
        className="m-3"
        controlId="formBasicEmail"
        style={{ width: "300px" }}
      >
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={onEmailChanged}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group
        className="m-3"
        controlId="formBasicPassword"
        style={{ width: "300px" }}
      >
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChanged}
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        disabled={!formIsValid}
        onClick={(e) => {
          e.preventDefault();
          handleRegister(email, password);
        }}
      >
        Login
      </Button>
    </Form>
  );
};

export default Register;
