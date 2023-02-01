import {useSelector,useDispatch} from 'react-redux'
import { useEffect} from "react";
import {getProductThunk} from "../Store/slices/ProductSlice"
import axios from "axios";
import { Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';


const Home = ()=>{
  const dispatch = useDispatch();
  const product =  useSelector(state => state.product);

 useEffect(() => {
 dispatch(getProductThunk());
},[])

    return (
    <div>
         <h1>home</h1>
         <Row xs={1} md={2} lg={3}>
        {product?.map((productItem) => (
          <Col key={productItem.id}>
            <Card>
              
            <Carousel variant="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={productItem?.productImgs?.[0]}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={productItem?.productImgs?.[1]}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={productItem?.productImgs?.[2]}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
              <Card.Body>
                <Card.Title>{productItem.title}</Card.Title>
                <Card.Text>{productItem.description}</Card.Text>
                <Button variant="primary" as={Link} to={`/products/${productItem.id}`}>
                  Ver detalle
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
  
export default Home