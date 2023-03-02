import { bn_managerAPI } from "../../API/bn_manager/bn_managerAPI";
import { useAppSelector } from "../../hooks/redux";
import { AppRoutes } from "../../router/routes";
import AppButton from "../UI/buttons/app/AppButton";

const SampleButton = () => {
  const { model } = useAppSelector((state) => state.model);
  const { user } = useAppSelector((state) => state.auth);
  const { data } = bn_managerAPI.useGetBNDataNamesQuery({
    owner: user?.username || "",
  });

  return (
    <AppButton
      to={`/${model}/${AppRoutes.SAMPLE}`}
      disabled={!(data && data?.networks.length > 0)}
    >
      sample
    </AppButton>
  );
};

export default SampleButton;
