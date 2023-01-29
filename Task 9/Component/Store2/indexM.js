import { configureStore } from "@reduxjs/toolkit";
import handleEmailReducer from './sentMail-Reducer.js';

const store = configureStore({reducer : {mailManager : handleEmailReducer}})


export default store;