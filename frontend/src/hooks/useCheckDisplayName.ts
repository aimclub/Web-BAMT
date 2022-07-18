import { useCallback, useState } from "react";
import { bn_managerAPI } from "../API/bn_manager/bn_managerAPI";
import { useAppSelector } from "./redux";

export const useCheckDisplayName = () => {
  const { user } = useAppSelector((s) => s.auth);
  const { data: names, isError: isBNNamesError } =
    bn_managerAPI.useGetBNDataNamesQuery({
      owner: user?.email || "",
    });

  const [errorPopup, setErrorPopup] = useState<string | undefined>(undefined);

  const checkDisplayName = useCallback(
    (name: string): boolean => {
      if (names?.networks) {
        if (names.networks.length >= 7) {
          setErrorPopup("User can save no more then 7 networks.");
          return true;
        } else {
          if (names.networks.includes(name)) {
            setErrorPopup("User already saved network with this name.");
            return true;
          }
        }
      }
      return false;
    },
    [names]
  );

  const onCloseMessagePopup = useCallback(() => {
    setErrorPopup(undefined);
  }, []);

  return { checkDisplayName, isBNNamesError, errorPopup, onCloseMessagePopup };
};
