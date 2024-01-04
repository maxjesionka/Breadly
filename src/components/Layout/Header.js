import HeaderCartButton from "./HeaderCartButton";

import classes from "./Header.module.css";

import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          <Link to="/">BakeryApp</Link>
        </h1>
        <HeaderCartButton onClick={props.onShowCart} />
        {/* <MainNavigation/> */}
      </header>
    </>
  );
};

export default Header;
