import drill from "../assets/drill/655.gif";
import wheathoe from "../assets/wheathoe/wheathoe.png";

function Navbar(){
    return(
        <nav className="navbar sticky-top glass-nav" data-bs-theme="dark">
            <div className="container justify-content-center gap-3">
                <img src={drill} 
                    alt="Drill" 
                    height={32} 
                    style={{ imageRendering: "pixelated" }}
                />
                <span><span className="fs-2 fw-bold text-white main-font">GEM</span><span className="fs-2 fw-bold jasper-text main-font">VAULT</span></span>
                <img src={wheathoe} 
                    alt="Wheat Hoe" 
                    height={32} 
                    style={{ imageRendering: "pixelated" }}
                />
            </div>
        </nav>
    );
}

export default Navbar;