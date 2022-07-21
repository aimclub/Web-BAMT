import { bn_managerAPI } from "../../API/bn_manager/bn_managerAPI";
import { useAppSelector } from "../../hooks/redux";
import { AppRoutes } from "../../router/routes";
import ModelButton from "../UI/buttons/ModelButton/ModelButton";

const SampleButton = () => {
  const { model } = useAppSelector((state) => state.model);
  const { user } = useAppSelector((state) => state.auth);
  const { data } = bn_managerAPI.useGetBNDataNamesQuery({
    owner: user?.email || "",
  });

  return (
    <ModelButton
      to={`/${model}/${AppRoutes.SAMPLE}`}
      disabled={!(data && data?.networks.length > 0)}
    >
      sample
    </ModelButton>
  );
};

export default SampleButton;
