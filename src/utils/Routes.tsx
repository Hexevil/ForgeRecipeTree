import { Routes, Route, Navigate } from "react-router-dom";
import ForgeRecipes from "../pages/forgerecipes/ForgeRecipes";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/forgeRecipes" replace />} />
            <Route path="/forgeRecipes" element={<ForgeRecipes />} />
        </Routes>
    );
}

export default AppRoutes;
