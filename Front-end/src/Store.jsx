// store.js
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './redux/reducers';

const store = configureStore({
    reducer: rootReducer,
  });

export default store;
