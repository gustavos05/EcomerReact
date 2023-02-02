import { configureStore } from "@reduxjs/toolkit";
import isLoadingSlice from "./Slices/isLoading.slice";
import ProductSlice from "./Slices/ProductSlice";
import cartSlice from "./Slices/cart.slice";
import favoritesSlice  from "../pages/Purchased";

export default configureStore({
  reducer: {
    isLoading: isLoadingSlice,
    product: ProductSlice,
    favorites: favoritesSlice,
    cart: cartSlice,
  }
});
