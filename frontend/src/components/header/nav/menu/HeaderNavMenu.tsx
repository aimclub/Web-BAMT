import scss from "./headerNavMenu.module.scss";

import { NavLink } from "react-router-dom";
import { cl } from "../../../../assets/utils/classnames";
import { FC } from "react";
import { IHeaderLink } from "../HeaderNav";

const HeaderNavMenu: FC<IHeaderLink> = (item) => {
  return (
    <nav className={scss.root}>
      <p className={cl(scss.title, scss.text)}>{item.name}</p>
      <ul className={scss.menu}>
        {item.children?.map(
          (item) =>
            item.link && (
              <li key={item.name}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    cl(scss.text, scss.link, isActive && scss.active)
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            )
        )}
      </ul>
    </nav>
  );
};

export default HeaderNavMenu;
