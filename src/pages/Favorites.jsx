import axios from "axios";
import { useState, useEffect } from "react";
import getConfig from "../store/Slices/getConfig";
import { Button, Col, Row, ListGroup } from "react-bootstrap";

const Favorites = () => {
    
    const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    axios
      .get("https://e-commerce-api.academlo.tech/api/v1/purchases", getConfig())
      .then((resp) => setPurchases(resp.data.data.purchases))
      .catch((error) => console.error(error));
  }, []);
console.log(purchases)
  return (
    <div>
      <h1>Purchases</h1>
      <ListGroup>
      {purchases?.map((item) => {
        return item.cart.products?.map((item) => 
        <ListGroup.Item key={item.id}>
          <div className="purchasedlist">
            <div className="imgW">
              <img src={item.productImgs?.[0]} alt="" />
            </div>
          <h3>{item.title}</h3>
          </div>
          </ListGroup.Item>);
      })}
       </ListGroup>
    </div>
  );
};

export default Favorites;
