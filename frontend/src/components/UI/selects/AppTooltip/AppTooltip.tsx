import HelpIcon from "@mui/icons-material/Help";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { ComponentType, FC } from "react";

import { styled } from "@mui/material/styles";

import IconButton from "../../buttons/icon/IconButton";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`&.${tooltipClasses.popper}`]: {
    [`& .${tooltipClasses.tooltip}`]: {
      margin: 0,
      padding: 12,

      fontFamily: "Open Sans",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: 16,
      lineHeight: "150%",
      letterSpacing: "0.15px",

      color: "#000000",
      background: "#FFFFFF",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",

      [`&.${tooltipClasses.tooltipPlacementBottom}`]: {
        marginLeft: 5,
        marginTop: 5,
        backgroundColor: "white",
        color: "rgba(0, 0, 0, 0.87)",
      },
    },
  },
});

const AppTooltip: FC<{
  Icon?: ComponentType<{ className?: string; style: React.CSSProperties }>;
  title: string;
}> = ({ Icon = HelpIcon, title }) => {
  return (
    <LightTooltip title={title} placement="bottom-start">
      <IconButton sx={{ padding: 0 }}>
        <Icon style={{ fontSize: 16 }} />
      </IconButton>
    </LightTooltip>
  );
};

export default AppTooltip;
