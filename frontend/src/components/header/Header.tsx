import AppLogo from "../AppLogo/AppLogo";
import scss from "./header.module.scss";
import HeaderLine from "./line/HeaderLine";
import HeaderMenu from "./menu/HeaderMenu";

const navLinks: { name: string; link: string }[] = [
  // TODO: add links
  { name: "WMT", link: "#" },
  { name: "Team", link: "#" },
  { name: "Repository", link: "#" },
  { name: "Laboratory", link: "#" },
];

const Header = () => {
  return (
    <header>
      <div className={scss.head}>
        <AppLogo />
        <nav>
          <ul className={scss.list}>
            {navLinks.map(({ link, name }) => (
              <li key={name} className={scss.item}>
                <a href={link} className={scss.link}>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <HeaderMenu />
      </div>
      <HeaderLine />
    </header>
  );
};

export default Header;
