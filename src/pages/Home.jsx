import {useSelector,useDispatch} from 'react-redux'
import { useEffect,useState} from "react";
import {getProductThunk,filterCategoriesThunk} from "../store/Slices/ProductSlice"
import axios from "axios";
import { Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';


const Home = ()=>{
  const dispatch = useDispatch();
  const product =  useSelector(state => state.product);
  const [categories, setCategories] = useState([]);

 useEffect(() => {
 dispatch(getProductThunk());
 axios
      .get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
      .then((resp) => setCategories(resp.data.data.categories))
      .catch((error) => console.error(error));
},[])

    return (
    <div>
         <div className='catButton'>
         {categories.map(category => (
        <Button
          key={category.id}
          variant="primary"
          onClick={() => dispatch(filterCategoriesThunk(category.id))}
        >
          {category.name}
        </Button>
       
         ))} 
         </div>
         <Row xs={1} md={3} lg={3}>
        {product?.map((productItem) => (
          <Col key={productItem.id}>
            <Card >
              
            <div className="wrapper">
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
    </div>
              <Card.Body>
                <Card.Title className='cardT'>{productItem.title}</Card.Title>
                <Card.Text>Price: {productItem.price}</Card.Text>
                <Button variant="primary" as={Link} to={`/products/${productItem.id}`}>
                  See details
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