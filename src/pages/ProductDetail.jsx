import { useParams,useNavigate } from "react-router-dom"
import { useState,useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Col, Row, Card } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import { getProductThunk } from "../store/Slices/ProductSlice";
import { createFavoriteThunk } from "../store/Slices/favorites.slice"
import { Link } from "react-router-dom";

const ProductDetail = ()=>{

    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(0);


    useEffect(() => {
      dispatch(getProductThunk());
    }, [id]);
  
    const allProducts = useSelector((state) => state.product);
    const detail = allProducts.find((products) => products.id === Number(id));
    console.log(allProducts)
    console.log(detail)
    const productsRelated = allProducts.filter(
      (product) => product.category.name === detail.category.name
    )
   
    const addToFavorites = () => {
      const token = localStorage.getItem("token");
  
      if (token) {
       
        const id = {
          productId: detail.id,
          quantity: quantity
        };
  
        dispatch(createFavoriteThunk(id));
      } else {
      
        navigate("/login");
      }
    };
  


    return (
        <div>
          <div className="detailSection">
      
       <div className="CSlider">
             <Carousel variant="dark">
                <Carousel.Item>
                  <img
                  className="d-block w-100"
                  src={detail?.productImgs?.[0]}
                  alt="First slide"
                  />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={detail?.productImgs?.[1]}
                      alt="Second slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={detail?.productImgs?.[2]}
                      alt="Third slide"
                   />
                  </Carousel.Item>
            </Carousel>
        </div>
        <div className="detailtex">
             <h1>{detail?.title}</h1>
             <p>{detail?.description}</p>
             <h3>Price: {detail?.price}</h3>
             <div className="mb-3">
        <Button onClick={() => setQuantity(quantity - 1)}>-</Button>
        {quantity}
        <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
      </div>
             <Button className="mb-3" onClick={addToFavorites}>
              Add to cart
            </Button>
        </div>

  </div>
{  /*Section of related Products*/}
           <div className="related">

          <h3>Releated Products</h3>

          <Row xs={1} md={3} lg={3}>
        {productsRelated.map((Item) => (
          <Col key={Item.id}>
            <Card >
              
            <div className="wrapper">
            <Carousel variant="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Item?.productImgs?.[0]}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Item?.productImgs?.[1]}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Item?.productImgs?.[2]}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    </div>
              <Card.Body>
                <Card.Title className='cardT'>{Item.title}</Card.Title>
                <Card.Text>Price:
                  <h3>{Item?.price}</h3>
                </Card.Text>
                <Button variant="primary" as={Link} to={`/products/${Item?.id}`}>
                  See details
                </Button>
              </Card.Body>
            </Card>
            
          </Col>
        ))}
      </Row>
           </div>
        </div>
    )
    }
    
    export default ProductDetail