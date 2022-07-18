import { useEffect, useState } from "react";
import { useAppSelector } from "./redux";

export const useTrainDisabled = (parametersCorrect: boolean) => {
  const [trainDisabled, setTrainDisabled] = useState(true);

  const { links, nodes } = useAppSelector((s) => s.experiment);

  useEffect(() => {
    if (parametersCorrect) {
      const trainDisable = links.length <= 0 || nodes.length <= 0;
      // every node has links
      // nodes.some(
      //   (n) => !links.some((l) => l.source === n.id || l.target === n.id)
      // );

      setTrainDisabled(trainDisable);
    } else {
      setTrainDisabled(true);
    }
  }, [links, nodes, parametersCorrect]);

  return { trainDisabled };
};
