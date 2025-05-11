import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PatientForm from './components/Patient/PatientForm'
import PatientList from './components/Patient/PatientList/PatientList'
import Dashboard from './components/dashboard/Dashboard'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Pacientes from "./pages/pacientes";
import Dentistas from "./pages/dentistas";
import MainLayout from "./layout/MainLayout";
import PacienteDetails from './pages/pacientes/PacienteDetails/PacienteDetails'
import DentistaDetails from './pages/dentistas/DentistaDetails'
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

        </Route>
      </Routes>
    </BrowserRouter>
  );
}


          //<Route path="dentistas" element={<Dentistas />} />
export default App;
