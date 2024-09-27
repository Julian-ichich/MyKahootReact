import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutAdmin from "../pages/LayoutAdmin/LayoutAdmin";
import LayoutCliente from "../pages/LayoutCliente/LayoutCliente";
import CreateTest from "../pages/CreateTest/CreateTest";
import StartGame from "../pages/StartGame/StartGame";
import KahootProvider from "../context/context";
import KahootClienteProvider from "../context/contextCliente";

const RoutesKahoot = () => {
    return (
        <BrowserRouter>
            <KahootProvider>
                <KahootClienteProvider>
                    <Routes>
                        <Route path="/" element={<LayoutAdmin />} />
                        <Route path="/create" element={<CreateTest />} />
                        <Route path="/game/:codigo" element={<LayoutCliente />} />
                        <Route path="/game/:codigo/:start" element={<StartGame />} />
                    </Routes>
                </KahootClienteProvider>
            </KahootProvider>
        </BrowserRouter>

    );
}

export default RoutesKahoot;