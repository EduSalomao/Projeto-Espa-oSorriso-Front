import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Agenda from "./pages/agenda";
import Pacientes from "./pages/pacientes";
import Dentistas from "./pages/dentistas";
import Procedimentos from "./pages/procedimentos";
import Manutencoes from "./pages/manutencao";
import Consultas from "./pages/consultas";
import MainLayout from "./layout/MainLayout";
import PacienteDetails from './pages/pacientes/PacienteDetails/PacienteDetails';
import DentistaDetails from './pages/dentistas/DentistaDetails';
import ProcedimentoDetails from "./pages/procedimentos/ProcedimentoDetails";
import ManutencaoDetails from "./pages/manutencao/ManutencaoDetails";
import ConsultaDetails from "./pages/consultas/ConsultaDetails";


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
          <Route path="consultas" element={<Consultas />} />
          <Route path="consultas/:id" element={<ConsultaDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;