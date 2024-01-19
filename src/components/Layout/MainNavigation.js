import { NavLink } from "react-router-dom"
import classes from './MainNavigation.module.css'

const MainNavigation = () => {
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
            </ul>
        </nav>
    )
}

export default MainNavigation;