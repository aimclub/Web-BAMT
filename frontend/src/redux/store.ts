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
import { bn_managerAPI } from "../API/bn_manager/bn_managerAPI";
import { data_managerAPI } from "../API/data_manager/data_managerAPI";
import { exampleAPI } from "../API/example/exampleAPI";
import { experimentAPI } from "../API/experiment/experimentAPI";

import authReducer from "./auth/auth";
import experimentReducer from "./experiment/experiment";
import modelReducer from "./model/model";
import sampleReducer from "./sample/sample";

const rootReducer = combineReducers({
  auth: authReducer,
  model: modelReducer,
  experiment: experimentReducer,
  sample: sampleReducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [experimentAPI.reducerPath]: experimentAPI.reducer,
  [bn_managerAPI.reducerPath]: bn_managerAPI.reducer,
  [exampleAPI.reducerPath]: exampleAPI.reducer,
  [data_managerAPI.reducerPath]: data_managerAPI.reducer,
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
        authAPI.middleware,
        experimentAPI.middleware,
        bn_managerAPI.middleware,
        exampleAPI.middleware,
        data_managerAPI.middleware
      );
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupstore>;
export type AppDispatch = AppStore["dispatch"];
