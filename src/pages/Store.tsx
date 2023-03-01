import { Col, Row } from "react-bootstrap";
import StoreItem from "../components/StoreItem";
import storeItems from "../data/items.json";

const Store = () => {
  return (
    <>
      <h1>Store</h1>
      <Row lg={3} md={2} sm={1} className="g-3">
        {storeItems.map((item) => (
          <Col>
            <StoreItem key={item.id} {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Store;
