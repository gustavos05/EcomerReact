import {useSelector,useDispatch} from 'react-redux'
import { useEffect,useState} from "react";
import {getProductThunk,filterCategoriesThunk,filterByTermThunk} from "../store/Slices/ProductSlice"
import axios from "axios";
import { Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';



const Home = ()=>{
  const dispatch = useDispatch();
  const product =  useSelector(state => state.product);
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");

 useEffect(() => {
 dispatch(getProductThunk());
 axios
      .get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
      .then((resp) => setCategories(resp.data.data.categories))
      .catch((error) => console.error(error));
},[])

const filterByTerm = () => {
  dispatch(filterByTermThunk(searchValue));
};

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

         <InputGroup className="mb-3">
        <Form.Control
          placeholder="what are you looking"
          aria-label="what are you looking "
          aria-describedby="basic-addon2"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <InputGroup.Text id="basic-addon2" as='button' onClick={filterByTerm}>search</InputGroup.Text>
      </InputGroup>


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