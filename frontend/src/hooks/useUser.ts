import { IUser } from "../API/auth/authTypes";
import { useAppSelector } from "./redux";

export const useUser = (): IUser =>
  useAppSelector(
    (state) =>
      state.auth.user || {
        username: "null",
      }
  );
