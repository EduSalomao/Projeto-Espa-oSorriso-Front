// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Agenda from "./pages/agenda";
import Pacientes from "./pages/pacientes";
import Dentistas from "./pages/dentistas";
import Procedimentos from "./pages/procedimentos";
import Manutencoes from "./pages/manutencao";
import MainLayout from "./layout/MainLayout";
import PacienteDetails from './pages/pacientes/PacienteDetails/PacienteDetails';
import DentistaDetails from './pages/dentistas/DentistaDetails';
import ProcedimentoDetails from "./pages/procedimentos/ProcedimentoDetails";
import ManutencaoDetails from "./pages/manutencao/ManutencaoDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="agenda" element={<Agenda />} />
          <Route path="pacientes" element={<Pacientes />} />
          <Route path="pacientes/:id" element={<PacienteDetails />} />
          <Route path="dentistas" element={<Dentistas />} />
          <Route path="dentistas/:id" element={<DentistaDetails />} />
          <Route path="procedimentos" element={<Procedimentos />} />
          <Route path="procedimentos/:id" element={<ProcedimentoDetails />} />
          <Route path="manutencoes" element={<Manutencoes />} />
          <Route path="manutencoes/:id" element={<ManutencaoDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;