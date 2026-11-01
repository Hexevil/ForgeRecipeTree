import Navbar from "./layout/Navbar";
import AppRoutes from "./utils/Routes";

function App(){
    
    return(
        <div className="d-flex min-vh-100">
            <Navbar />
            <main className="flex-grow-1 p-4 text-white">
                <AppRoutes />
            </main>
        </div>
    );
}
export default App;