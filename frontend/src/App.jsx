import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PatientList from './pages/PatientList';
import PatientDetails from './pages/PatientDetails';
import MedicalRecord from './pages/MedicalRecord';
import RoutineExecution from './pages/RoutineExecution';
import ObservationRegistry from './pages/ObservationRegistry';
import Settings from './pages/Settings';
import UserProfile from './pages/UserProfile';
import SystemAlerts from './pages/SystemAlerts';
import ProcedureRegistration from './pages/ProcedureRegistration';
import PatientRoutines from './pages/PatientRoutines';
import ClinicalHistory from './pages/ClinicalHistory';
import OperationalReports from './pages/OperationalReports';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="pacientes" element={<PatientList />} />
          <Route path="paciente/detalhes/:id" element={<PatientDetails />} />
          <Route path="paciente/rotinas" element={<PatientRoutines />} />
          <Route path="prontuario" element={<MedicalRecord />} />
          <Route path="execucao" element={<RoutineExecution />} />
          <Route path="observacao" element={<ObservationRegistry />} />
          <Route path="configuracoes" element={<Settings />} />
          <Route path="perfil" element={<UserProfile />} />
          <Route path="alertas" element={<SystemAlerts />} />
          <Route path="cadastro" element={<ProcedureRegistration />} />
          <Route path="historico" element={<ClinicalHistory />} />
          <Route path="relatorios" element={<OperationalReports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
