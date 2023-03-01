import { Link } from "react-router-dom";
import Login from "../components/Login";

const LoginPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="d-flex flex-column justify-content-center align-items-center text-center m-5 p-5  h-100 w-50 rounded-5">
        <h1>Login</h1>
        <Login />
        <p className="mt-4">
          Or <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
