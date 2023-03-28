import { createSlice } from '@reduxjs/toolkit';
import axios from "axios"
import { setIsLoading } from './isLoading.slice';


export const ProductSlice = createSlice({
    name: "product",
    initialState: [],
    reducers: {
                setProducts: ( state ,action) => {
                    return action.payload
                }
    }
})
export const getProductThunk = () =>(dispatch) => {
    dispatch(setIsLoading(true));
    axios
    .get("http://localhost:8080/products")
    .then(resp => dispatch(setProducts(resp.data)))
    .catch(error=>console.error(error))
    .finally(()=>dispatch(setIsLoading(false)))
}



export const filterCategoriesThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    
    axios
    .get(`http://localhost:8080/category/${id}`)
    .then((resp) => { dispatch(setProducts(resp.data.products))})
    .catch((error) => console.error(error))
    .finally(() => dispatch(setIsLoading(false)));
};
export const filterByTermThunk = (term) => (dispatch) => {
    dispatch(setIsLoading(true));
     axios
        .get(`https://e-commerce-api.academlo.tech/api/v1/products?query=${term}`)
        .then((resp) =>  dispatch(setProducts(resp.data.data.products)))
        .catch(error=>console.error(error))
        .finally(() => dispatch(setIsLoading(false)));
}


export const {setProducts} = ProductSlice.actions;

  export default ProductSlice.reducer;