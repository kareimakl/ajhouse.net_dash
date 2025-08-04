import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiService } from "../api/userSlice";
import { countriesApi } from "../api/stories";
import servicesApi from "../api/servicesSlice";
import { messageApi } from "../api/messageSlice";
import { transactionsApi } from "../api/transactionsSlice";
import { bookingsApi } from "../api/bookingSlice";
import { faqApi } from "../api/faqSlice";
import { usersApi } from "../api/users";
import { couponsAll } from "../api/coupons";

export const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [bookingsApi.reducerPath]: bookingsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [faqApi.reducerPath]: faqApi.reducer,
    [couponsAll.reducerPath]: couponsAll.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiService.middleware,
      countriesApi.middleware,
      servicesApi.middleware,
      messageApi.middleware,
      transactionsApi.middleware,
      bookingsApi.middleware,
      faqApi.middleware,
      usersApi.middleware,
      couponsAll.middleware
    ),
});

setupListeners(store.dispatch);
