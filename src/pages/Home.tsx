import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1 className="m-2" style={{ fontStyle: "italic", fontWeight: "bold" }}>
        RUNNING SHOES OFFICIAL STORE
      </h1>
      <img
        src="/images/home-banner.jpeg"
        style={{
          height: "500px",
          width: "1000px",
          objectFit: "cover",
          borderRadius: "20px",
        }}
        className="m-3"
      />
      {/* <p className="text-center m-1">
        Here you can find extremely light and comfortable shoes for running.
      </p>
      <p className="text-center m-1">
        Tested and approver by a world class athletes.
      </p>
      <p className="text-center m-1">Made in Ukraine.</p> */}
      <Button className="mt-3 btn-lg">
        <Link to="/store" className="text-decoration-none  text-white">
          Store
        </Link>
      </Button>
    </div>
  );
};

export default Home;
