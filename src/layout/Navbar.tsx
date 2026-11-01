import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScroll } from "@fortawesome/free-solid-svg-icons";

function Navbar(){
    return(
        <aside className="sidebar glass-nav d-flex flex-column align-items-center p-2">
            <div className="d-flex align-items-center gap-3 fs-3 fw-bold mb-3">
                <span className="bottom-separator p-2">
                    <span className="text-white main-font-bold">Hex</span>
                    <span className="lilac-text main-font-bold">Vault</span>
                </span>
            </div>

            <ul className="nav flex-column w-100 justify-content-center">
                <li className="nav-item justify-content-center">
                    <NavLink to="/forgeRecipes" className="nav-link text-white text-center p-1 gap-2 d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon icon={faScroll} /><span className="main-font-normal">Forge Recipes</span>
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
}

export default Navbar;