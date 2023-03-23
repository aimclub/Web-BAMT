import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import { authAPI } from "../API/auth/authAPI";
import { commonApi } from "../API/baseURL";
import { data_managerAPI } from "../API/data_manager/data_managerAPI";
import { experimentAPI } from "../API/experiment/experimentAPI";

import authReducer from "./auth/auth";
import experimentReducer from "./experiment/experiment";
import sampleReducer from "./sample/sample";

const rootReducer = combineReducers({
  auth: authReducer,
  experiment: experimentReducer,
  sample: sampleReducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [experimentAPI.reducerPath]: experimentAPI.reducer,
  [data_managerAPI.reducerPath]: data_managerAPI.reducer,
  [commonApi.reducerPath]: commonApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupstore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(
        commonApi.middleware,
        authAPI.middleware,
        experimentAPI.middleware,
        data_managerAPI.middleware
      );
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupstore>;
export type AppDispatch = AppStore["dispatch"];
