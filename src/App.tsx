import Navbar from "./layout/Navbar";
import AppRoutes from "./utils/Routes";

function App(){
    
    return(
        <div className="d-flex min-vh-100">
            <Navbar />
            <main className="flex-grow-1 p-2 text-white d-flex">
                <div className="glass-card mx-auto p-4 w-100">
                    <AppRoutes />
                </div>
            </main>
        </div>
    );
}
export default App;