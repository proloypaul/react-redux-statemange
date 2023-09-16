import { IProduct } from "@/types/globalTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ICart {
    products: IProduct[],
    total: number
} 

const initialState:ICart  = {
    products: [],
    total: 0
  }

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IProduct>) => {
            const isExist = state.products.find((product) => product._id === action.payload._id);

            if(isExist){
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                isExist.quantity = isExist.quantity! + 1;
            }else{
                state.products.push({...action.payload, quantity: 1})
            }

            state.total = state.total + action.payload.price;
        },
        removeOneCart: (state, action: PayloadAction<IProduct>) => {
            const clickedCartIsExist = state.products.find((product) => product._id === action.payload._id);

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            if(clickedCartIsExist && clickedCartIsExist.quantity! > 1){
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                clickedCartIsExist.quantity = clickedCartIsExist.quantity! - 1;
            }else{
                state.products = state.products.filter(product => product._id !== action.payload._id);
            }

            state.total = state.total - action.payload.price;
            // sortcurt way state.total -= action.payload.price
        }, 
        removeFromCart: (state, action: PayloadAction<IProduct>) => {
            state.products = state.products.filter(product => product._id !== action.payload._id);

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            state.total = state.total - (action.payload.price*action.payload.quantity!)
        }
    }
}) 

export const {addToCart, removeOneCart, removeFromCart} = cartSlice.actions

export default cartSlice.reducer;