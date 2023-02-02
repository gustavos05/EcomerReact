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
    .get("https://news-app-api.academlo.tech/favorites/", getConfig())
    .then( resp => {
        dispatch( setFavorites( resp.data ) )
    })
    .catch( error => console.error(error) )
    .finally( () => dispatch( setIsLoading(false) ) )

}

export const createFavoriteThunk = (news) => (dispatch) => {
    dispatch(setIsLoading(true));
        axios
        .post("https://news-app-api.academlo.tech/news/add_to_favorite/", news, getConfig())
        .then((resp) => dispatch( getFavoritesThunk() ))
        .catch( error => console.error(error) )
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
