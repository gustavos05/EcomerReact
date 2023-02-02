import { configureStore } from "@reduxjs/toolkit";
import isLoadingSlice from "./Slices/isLoading.slice";
import ProductSlice from "./Slices/ProductSlice";


export default configureStore({
  reducer: {
    isLoading: isLoadingSlice,
    product: ProductSlice
  }
});
