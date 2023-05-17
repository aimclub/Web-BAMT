import { FC, memo } from "react";
import { ITeamMember } from "../../../types/team";
import scss from "./teamMember.module.scss";

const TeamMember: FC<{ member: ITeamMember }> = ({ member }) => {
  return (
    <article className={scss.root}>
      <h3 className={scss.title}>{member.fullName}</h3>
      <p className={scss.role}>{member.role}</p>
      <a
        className={scss.link}
        href={member.link}
        target="_blank"
        rel="noreferrer"
      >
        {member.link}
      </a>
    </article>
  );
};

export default memo(TeamMember);
