import scss from "./headerNav.module.scss";

import { NavLink } from "react-router-dom";

import { cl } from "../../../assets/utils/classnames";
import HeaderNavMenu from "./menu/HeaderNavMenu";
import { AppRoutes } from "../../../router/routes";

export interface IHeaderLink {
  name: string;
  link?: string;
  children?: IHeaderLink[];
}

const NAV_LINKS: IHeaderLink[] = [
  {
    name: "Web",
    children: [
      { name: "Main", link: AppRoutes.MAIN },
      { name: "Experiment", link: AppRoutes.EXPERIMENT },
      { name: "Sample", link: AppRoutes.SAMPLE },
      { name: "Team", link: AppRoutes.TEAM },
    ],
  },
  { name: "BAMT", link: "https://github.com/ITMO-NSS-team/BAMT" },
  { name: "Repository", link: "https://github.com/ITMO-NSS-team/Web-BAMT" },
  { name: "Laboratory", link: "https://itmo-nss-team.github.io/" },
];

const HeaderNav = () => {
  return (
    <ul className={scss.list}>
      {NAV_LINKS.map((item) => (
        <li key={item.name} className={scss.item}>
          {item.link?.startsWith("http") ? (
            <a
              href={item.link}
              className={scss.link}
              target="_blank"
              rel="noreferrer"
            >
              {item.name}
            </a>
          ) : item.link ? (
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                cl(scss.link, isActive && scss.active)
              }
            >
              {item.name}
            </NavLink>
          ) : (
            <HeaderNavMenu {...item} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default HeaderNav;
