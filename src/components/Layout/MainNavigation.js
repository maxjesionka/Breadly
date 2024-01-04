import { NavLink } from "react-router-dom"

const MainNavigation = () => {
    return(
        <nav>
            <ul>
                <li>
                    <NavLink to='/'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/meals/m1'>
                        Meal 1
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default MainNavigation;