import HeaderCartButton from "./HeaderCartButton";
import MainNavigation from "./MainNavigation";
import classes from "./Header.module.css";

import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          <Link to="/" className={classes.pageName}>Breadly</Link>
        </h1>
        <MainNavigation isAdmin={props.isAdmin} />
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
    </>
  );
};

export default Header;
