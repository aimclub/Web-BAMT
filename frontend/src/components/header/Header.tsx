import Logo from "../logo/Logo";
import scss from "./header.module.scss";
import HeaderLine from "./line/HeaderLine";
import HeaderMenu from "./menu/HeaderMenu";
import HeaderNav from "./nav/HeaderNav";

const Header = () => {
  return (
    <header>
      <div className={scss.head}>
        <Logo />
        <HeaderNav />
        <HeaderMenu />
      </div>
      <HeaderLine />
    </header>
  );
};

export default Header;
