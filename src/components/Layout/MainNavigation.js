import { NavLink } from "react-router-dom";
import classes from './MainNavigation.module.css'

const MainNavigation = () => {

    const isAdminFromLocalStorage = localStorage.getItem("isAdmin") === "true";
    return(
        <nav>
            <ul className={classes.navigation}>
                <li>
                    <NavLink to='/'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/auth'>
                        Account
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/about-us'>
                        About us
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/recipes'>
                        Recipes
                    </NavLink>
                </li>
                {isAdminFromLocalStorage && (
                  <li>
                    <NavLink to='/orders'>
                        Zamówienia
                    </NavLink>
                  </li>
                )}
            </ul>
        </nav>
    )
}

export default MainNavigation;
