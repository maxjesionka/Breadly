import { NavLink } from "react-router-dom";
import classes from './MainNavigation.module.css'

const MainNavigation = () => {

    const isAdminFromLocalStorage = localStorage.getItem("isAdmin") === "true";
    return(
        <nav>
            <ul className={classes.navigation}>
                <li>
                    <NavLink to='/'>
                        Strona główna
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/auth'>
                        Konto
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/about-us'>
                        O nas
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/recipes'>
                        Przepisy
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
