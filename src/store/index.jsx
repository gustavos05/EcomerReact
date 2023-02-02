import { configureStore } from "@reduxjs/toolkit";
import isLoadingSlice from "./Slices/isLoading.slice";
import ProductSlice from "./slices/ProductSlice";


export default configureStore({
  reducer: {
    isLoading: isLoadingSlice,
    product: ProductSlice
  }
});
