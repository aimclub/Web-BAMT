import Logo from "../logo/Logo";
import scss from "./header.module.scss";
import HeaderLine from "./line/HeaderLine";
import HeaderUser from "./user/HeaderUser";
import HeaderNav from "./nav/HeaderNav";

const Header = () => {
  return (
    <header>
      <div className={scss.head}>
        <Logo />
        <HeaderNav />
        <HeaderUser />
      </div>
      <HeaderLine />
    </header>
  );
};

export default Header;
