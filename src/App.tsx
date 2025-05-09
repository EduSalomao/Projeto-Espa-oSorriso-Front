import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PatientForm from './components/Patient/PatientForm'
import PatientList from './components/Patient/PatientList/PatientList'
import Dashboard from './components/dashboard/Dashboard'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Pacientes from "./pages/pacientes/Pacientes";
//import Dentistas from "./pages/Dentistas";
import MainLayout from "./layout/MainLayout";
import PacienteCard from './components/Paciente/Card/Card'
import PacienteDetails from './pages/pacientes/PacienteDetails/PacienteDetails'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PacienteDetails />}>
          <Route index element={<Home />} />
          <Route path="pacientes" element={<Pacientes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


          //<Route path="dentistas" element={<Dentistas />} />
export default App;
