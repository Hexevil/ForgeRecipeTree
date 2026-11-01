import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScroll } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function Navbar(){
    return(
        <aside className="sidebar glass-nav d-flex flex-column align-items-center p-2">
            <div className="d-flex align-items-center gap-3 fs-3 fw-bold mb-3">
                <Link to="/" className="sidebar-title nav-link">
                    <span className="bottom-separator p-2">
                        <span className="text-white main-font-bold">Hex</span>
                        <span className="lilac-text main-font-bold">Vault</span>
                    </span>
                </Link>
            </div>

            <ul className="nav flex-column w-100 justify-content-center">
                <li className="nav-item justify-content-center">
                    <NavLink to="/forgeRecipes" className="nav-link text-white text-center p-2 gap-2 d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon icon={faScroll} /><span className="main-font-normal">Forge Recipes</span>
                    </NavLink>
                </li>
            </ul>
            
            <div className="nav-link mt-auto p-2 gap-2 d-flex align-items-center justify-content-center">
                <FontAwesomeIcon className="text-white" icon={faGithub} />
                <a href="https://github.com/Hexevil/ForgeRecipeTree/tree/main" target="_blank" rel="noopener noreferrer" className="main-font-normal text-decoration-none text-white">GitHub Repository</a>
            </div>
        </aside>
    );
}

export default Navbar;