import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import productReducer from './features/products/productSlice'
import { api } from './features/api/apiSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    [api.reducerPath]: api.reducer, 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch