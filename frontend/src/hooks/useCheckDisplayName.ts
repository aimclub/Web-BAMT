import { useCallback, useState } from "react";
import { bn_managerAPI } from "../API/bn_manager/bn_managerAPI";
import { useAppSelector } from "./redux";

export const useCheckDisplayName = () => {
  const { user } = useAppSelector((s) => s.auth);
  const { data: names } = bn_managerAPI.useGetBNDataNamesQuery({
    owner: user?.email || "",
  });

  const [displayNameError, setDisplayNameError] = useState<string | undefined>(
    undefined
  );

  const checkDisplayName = useCallback(
    (name: string): boolean => {
      if (names?.networks) {
        if (names.networks.length >= 7) {
          setDisplayNameError("User can save no more then 7 networks.");
          return true;
        } else {
          if (names.networks.includes(name)) {
            setDisplayNameError("User already saved network with this name.");
            return true;
          }
        }
      }
      return false;
    },
    [names]
  );

  const clearDisplayNameError = useCallback(() => {
    setDisplayNameError(undefined);
  }, []);

  return { checkDisplayName, displayNameError, clearDisplayNameError };
};
