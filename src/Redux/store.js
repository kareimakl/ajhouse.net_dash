import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// Imports for all APIs
import { apiService } from "../api/userSlice";
import { projectsApi } from "../api/projectsApi";
import { offersApi } from "../api/offers";
import { analysisApi } from "../api/analysis";
import servicesApi from "../api/servicesSlice";
import { categoriesApi } from "../api/categoriesApi";
import { messageApi } from "../api/messageSlice";
import { transactionsApi } from "../api/transactionsSlice";
import { bookingsApi } from "../api/bookingSlice";
import { faqApi } from "../api/logo";
import { usersApi } from "../api/users";
import { couponsAll } from "../api/coupons";

// ✅ Configure Redux Store
export const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [offersApi.reducerPath]: offersApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer, // ✅ Added categoriesApi reducer
    [servicesApi.reducerPath]: servicesApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [bookingsApi.reducerPath]: bookingsApi.reducer,
    [analysisApi.reducerPath]: analysisApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [faqApi.reducerPath]: faqApi.reducer,
    [couponsAll.reducerPath]: couponsAll.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiService.middleware,
      projectsApi.middleware,
      offersApi.middleware,
      categoriesApi.middleware, // ✅ Added categoriesApi middleware
      analysisApi.middleware,
      servicesApi.middleware,
      messageApi.middleware,
      transactionsApi.middleware,
      bookingsApi.middleware,
      faqApi.middleware,
      usersApi.middleware,
      couponsAll.middleware
    ),
});

// ✅ Activate listeners for refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);
