import { FC } from "react";
import { NavLink } from "react-router-dom";
import { cl } from "../../../assets/utils/classnames";
import { AppRoutes } from "../../../router/routes";
import scss from "./headerNav.module.scss";

interface IHeaderLink {
  name: string;
  link: string;
}

const navLinks: IHeaderLink[] = [
  { name: "BAMT", link: "https://github.com/ITMO-NSS-team/BAMT" },
  { name: "Team", link: AppRoutes.TEAM },
  { name: "Repository", link: "https://github.com/ITMO-NSS-team/Web-BAMT" },
  { name: "Laboratory", link: "https://itmo-nss-team.github.io/" },
];

const HeaderNavLink: FC<IHeaderLink> = ({ name, link }) => {
  return link.startsWith("http") ? (
    <a href={link} className={scss.link} target="_blank" rel="noreferrer">
      {name}
    </a>
  ) : (
    <NavLink
      to={link}
      className={({ isActive }) => cl(scss.link, isActive && scss.active)}
    >
      {name}
    </NavLink>
  );
};

const HeaderNav = () => {
  return (
    <nav>
      <ul className={scss.list}>
        {navLinks.map((item) => (
          <li key={item.name} className={scss.item}>
            <HeaderNavLink {...item} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderNav;
