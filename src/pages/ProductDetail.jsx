import { useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setIsLoading } from "../Store/slices/isLoading.slice"
import { Button, Col, Row, ListGroup } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import {filterCategoriesThunk} from "../store/Slices/ProductSlice"

const ProductDetail = ()=>{

    const {id} = useParams()

    const [detail,setDetail]= useState({})
    const dispatch = useDispatch()

    useEffect( ()=>{
        dispatch(setIsLoading(true))
        axios.get(`https://e-commerce-api.academlo.tech/api/v1/products/${id}/`)
        .then(resp=>{
          setDetail(resp.data.data.product);
          dispatch(filterCategoriesThunk(resp.data.data.categories.id));})
        .catch(error=>console.error(error))
        .finally(()=>dispatch(setIsLoading(false)))
             },[])


    return (
        <div>
        <Row>
        <Col lg={5}>
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
    
        </Col>

        <Col lg="3"></Col>
        </Row>
             <h1>{detail?.title}</h1>
             <p>{detail?.description}</p>
             <p>{detail?.price}</p>
        </div>
    )
    }
    
    export default ProductDetail