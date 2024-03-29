import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import axios from "axios";
import getConfig from "../store/Slices/getConfig";

const SideBar = ({ show, handleClose }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/cart", getConfig())
      .then((resp) => {
        setFavorites(resp.data);
        console.log(resp.data);
      })
      .catch((error) => console.error(error));
  }, [show]);

  const checkoutCart = () => {
    axios
      .post(
        "https://e-commerce-api.academlo.tech/api/v1/purchases",
        {
          street: "Green St. 1456",
          colony: "Southwest",
          zipCode: 12345,
          city: "USA",
          references: "Some references"
        },
        getConfig()
      )
      .then((resp) => setFavorites([]))
      .catch((error) => console.error(error));
  };
console.log(favorites)
  return (
    <Offcanvas show={show} onHide={handleClose} placement={"end"}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {favorites.length !== 0 ? (
          favorites?.map((products) => <h5 key={products.product.title}>{`${products.product.title}`} Quantity: {`${products.quantity}`}</h5>)
        ) : (
          <h2>There is no produts</h2>
        )}

        <Button onClick={checkoutCart} disabled={favorites.length === 0}>
          Checkout
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideBar;
