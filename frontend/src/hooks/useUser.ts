import { IUser } from "../types/auth";
import { useAppSelector } from "./redux";

export const useUser = (): IUser =>
  useAppSelector(
    (state) =>
      state.auth.user || {
        username: "null",
      }
  );
