import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Pacientes from "./pages/pacientes";
import Dentistas from "./pages/dentistas";
import Procedimentos from "./pages/procedimentos";
import MainLayout from "./layout/MainLayout";
import PacienteDetails from './pages/pacientes/PacienteDetails/PacienteDetails';
import DentistaDetails from './pages/dentistas/DentistaDetails';
import ProcedimentoDetails from "./pages/procedimentos/ProcedimentosDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="pacientes" element={<Pacientes />} />
          <Route path="pacientes/:id" element={<PacienteDetails />} />
          <Route path="dentistas" element={<Dentistas />} />
          <Route path="dentistas/:id" element={<DentistaDetails />} />
          <Route path="procedimentos" element={<Procedimentos />} />
          <Route path="procedimentos/:id" element={<ProcedimentoDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
