import { createSlice } from '@reduxjs/toolkit'
import { setIsLoading } from './isLoading.slice'
import axios from 'axios'
import getConfig from './getConfig'

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: [],
    reducers: {
        setFavorites : (state, action) => {
            return action.payload
        }
    }
})

export const getFavoritesThunk = () => dispatch => {
    dispatch( setIsLoading(true) )

    axios
    .get("http://localhost:8080/cart", getConfig())
    .then( resp => {dispatch( setFavorites( resp.data ) )})
    .catch( error => console.error(error) )
    .finally( () => dispatch( setIsLoading(false) ) )
   
}

export const createFavoriteThunk = (product) => (dispatch) => {
    dispatch(setIsLoading(true));
        axios
        .post("http://localhost:8080/cart", product, getConfig())
        .then(resp =>{ dispatch( getFavoritesThunk() )})
        .catch( error => console.error(error) )
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
