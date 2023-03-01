import { Link } from "react-router-dom";
import Register from "../components/Register";

const RegisterPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="d-flex flex-column justify-content-center align-items-center text-center m-5 p-5 h-100 w-50 rounded-5">
        <h1>Register</h1>
        <Register />
        <p className="mt-4">
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
