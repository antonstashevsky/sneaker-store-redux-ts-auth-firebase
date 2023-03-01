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
      <Button className="mt-3 btn-lg">
        <Link to="/store" className="text-decoration-none  text-white">
          Store
        </Link>
      </Button>
    </div>
  );
};

export default Home;
