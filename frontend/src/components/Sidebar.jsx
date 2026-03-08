import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, UserCheck, ClipboardList, PlayCircle, 
  FileEdit, FileText, History, PlusSquare, User, BarChart3, Settings, Activity 
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/pacientes', label: 'Lista de Pacientes', icon: Users },
  { path: '/paciente/rotinas', label: 'Rotinas do Paciente', icon: ClipboardList },
  { path: '/execucao', label: 'Execução de Rotina', icon: PlayCircle },
  { path: '/observacao', label: 'Registrar Observação', icon: FileEdit },
  { path: '/prontuario', label: 'Prontuário Resumido', icon: FileText },
  { path: '/historico', label: 'Histórico Clínico', icon: History },
  { path: '/cadastro', label: 'Cadastro Procedimento', icon: PlusSquare },
  { path: '/perfil', label: 'Perfil do Usuário', icon: User },
  { path: '/relatorios', label: 'Relatórios Operacionais', icon: BarChart3 },
  { path: '/configuracoes', label: 'Configurações', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Activity className="logo-icon" size={24} />
        <h2>CareTrack</h2>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-user">
        <div className="user-avatar">DR</div>
        <div className="user-info">
          <span className="user-name">Dr. Silva</span>
          <span className="user-role">Médico Chefe</span>
        </div>
      </div>
    </aside>
  );
}
