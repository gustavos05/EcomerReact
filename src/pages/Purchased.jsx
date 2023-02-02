import axios from "axios";
import { useState, useEffect } from "react";
import getConfig from "../store/Slices/getConfig";

const Purchased = () => {
    
    const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    axios
      .get("https://e-commerce-api.academlo.tech/api/v1/purchases", getConfig())
      .then((resp) => setPurchases(resp.data.data.purchases))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Favoritos</h1>
      Purchases
      {purchases.map((item) => {
        return item.cart.products?.map((item) => <li>{item.title}</li>);
      })}
    </div>
  );
};

export default Purchased;
