import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "./features/toggleSlices";
import cartReducer from "./features/cartSlices";
import cartsliderReducer from "./features/cartsliderSlices";
import categoryReducer from "./features/categorySlices";
import paginationReducer from "./features/paginationSlices";
import priceReducer from "./features/priceSlices";
import orderReducer from "./features/orderSlices";
import loginReducer  from "./features/loginSlices";


export const store = configureStore({
    reducer: {
        mode: toggleReducer,
        cart: cartReducer,
        slider: cartsliderReducer,
        category: categoryReducer,
        pagination: paginationReducer,
        price: priceReducer,
        order: orderReducer,
        login: loginReducer,
    },
})